import { createHash, createHmac } from "crypto";
import { PaymentStatus, prisma } from "@akptest/database";
import { TRPCError } from "@trpc/server";

import type { IPayPaymentResponse } from "~/modules/payment/payment.types";
import * as paymentRepository from "~/modules/payment/payment.repository";
import { getFormattedDateTime } from "~/utils/utils";

export const getPaymentProducts = async (code: string) => {
  // split the code by code. code: "productId.quantity,productId.quantity" (is base64 encoded)
  const codeDecoded = Buffer.from(code, "base64").toString();
  const products = codeDecoded.split(",");
  // get the product ids
  const productIds = products
    .map(product => product.split(".")[0])
    .filter((productId): productId is string => !!productId);

  if (productIds.length === 0) {
    throw new Error("No product found");
  }

  const results = await paymentRepository.getPaymentProducts(productIds);

  return results.map(result => {
    const product = products.find(product => product.split(".")[0] === result.id)?.split(".");
    if (!product?.length) {
      throw new Error("Product not found");
    }

    const qty = product[1];

    return {
      ...result,
      qty: Number(qty),
    };
  });
};

export const createPayment = async (userId: string, code: string) => {
  const codeDecoded = Buffer.from(code, "base64").toString();
  const productMap = codeDecoded.split(",").map(product => {
    const [id, qty] = product.split(".");
    return {
      id: String(id),
      qty: Number(qty),
    };
  });
  const productIds = productMap.map(product => product.id);

  const products = await paymentRepository.getPaymentProducts(productIds);

  const productNames = products.map(product => product.name);
  const productQty = productMap.map(product => product.qty);
  const productPrices = products.map(product => product.price);

  // request payload for payment
  const requestPayload = {
    product: productNames,
    qty: productQty,
    price: productPrices,
    returnUrl: `${process.env.FRONTEND_URL}/payment/callback`,
    cancelUrl: `${process.env.FRONTEND_URL}}/payment/cancel`,
    notifyUrl: `${process.env.BASE_URL}/payment/callback`,
  };

  try {
    // generate signature for the request payment (IPaymu)
    // https://documenter.getpostman.com/view/7508947/SWLfanD1?version=latest#0fe32da7-3bb8-43a3-8f7d-af1cee1ecaa3
    const dataSign = createHash("sha256").update(JSON.stringify(requestPayload)).digest("hex");
    const paymentSign = createHmac("sha256", String(process.env.API_KEY))
      .update(`POST:${process.env.VA_NUMBER}:${dataSign.toLowerCase()}:${process.env.API_KEY}`)
      .digest("hex");

    const response = await fetch("https://sandbox.ipaymu.com/api/v2/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        signature: paymentSign,
        va: String(process.env.VA_NUMBER),
        timestamp: getFormattedDateTime(),
      },
      body: JSON.stringify(requestPayload),
    });

    const res = (await response.json()) as IPayPaymentResponse;
    // check if the response is ok
    if (response.status !== 200) {
      throw new Error("Error creating payment: " + res.Message);
    }

    // mapping order data
    const orderItems = productMap.map(product => {
      const p = products.find(p => p.id === product.id);
      return {
        productId: product.id,
        quantity: product.qty,
        priceTotal: product.qty * Number(p?.price ?? 0),
      };
    });

    const paymentTotal = orderItems.reduce((acc, item) => acc + item.priceTotal, 0);

    // create order
    const order = await prisma.order.create({
      data: {
        userId,
        payTotal: paymentTotal,
      },
    });

    // create order items
    await prisma.orderItem.createMany({
      data: orderItems.map(item => ({
        orderId: order.id,
        ...item,
      })),
      skipDuplicates: true,
    });

    // create payment
    await prisma.payment.create({
      data: {
        paymentReferenceId: res.Data.SessionID,
        orderId: order.id,
        paymentType: "IPAYMU", // this is temporary, will be update when the user complete the payment
        paymentData: res.Data,
        payTotal: paymentTotal,
        status: "PENDING",
      },
    });

    // remove cart items
    await prisma.cart.deleteMany({
      where: {
        userId,
        productId: {
          in: productIds,
        },
      },
    });

    return res.Data;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error creating payment",
      cause: error,
    });
  }
};

export const updatePaymentStatus = async (
  paymentId: string,
  status: "berhasil" | "expired" | "pending",
  paymentType: string
) => {
  const statusMap = {
    berhasil: PaymentStatus.PAID,
    pending: PaymentStatus.PENDING,
    expired: PaymentStatus.EXPIRED,
  } as const;

  const statusCode = statusMap[status];

  try {
    await prisma.payment.update({
      where: {
        paymentReferenceId: paymentId,
      },
      data: {
        paymentType: paymentType,
        status: statusCode,
      },
    });
    return true;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error updating payment status",
      cause: error,
    });
  }
};

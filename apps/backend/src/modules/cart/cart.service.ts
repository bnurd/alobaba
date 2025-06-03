import { TRPCError } from "@trpc/server";

import * as cartRepository from "~/modules/cart/cart.repository";
import * as productRepository from "~/modules/products/product.repository";

export const getCart = async (userId: string) => {
  const carts = await cartRepository.getCartByUserId(userId);

  return carts.map(cart => ({
    id: cart.id,
    productId: cart.productId,
    quantity: cart.quantity,
    product: cart.Product,
  }));
};

export const updateCart = async (
  userId: string,
  productId: string,
  quantity: number,
  type: "add" | "subtract"
) => {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Product not found" });
  }

  // check if product is already in cart
  const existingCart = await cartRepository.getCartByProductIdAndUserId(userId, productId);

  // condition if the type is subtract
  if (type === "subtract") {
    if (!existingCart) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Cart item not found" });
    }

    // update quantity
    const newQuantity = existingCart.quantity - quantity;
    // remove all cart if quantity is less than 1
    if (newQuantity < 1) {
      return await cartRepository.deleteAllCartByUserIdAndProductId(userId, productId);
    }

    return await cartRepository.updateProductQuantity(existingCart.id, newQuantity);
  }

  // check if product is in stock
  if ((product.stockQuantity ?? 0) < quantity) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Out of stock" });
  }

  if (existingCart) {
    // update quantity
    const newQuantity = existingCart.quantity + quantity;
    return await cartRepository.updateProductQuantity(existingCart.id, newQuantity);
  }

  // create new cart
  return await cartRepository.addProductToCart(userId, productId, quantity);
};

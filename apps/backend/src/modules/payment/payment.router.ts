import type { Context } from "hono";

import type { PaymentWebhookRequest } from "~/modules/payment/payment.types";
import * as paymentSchema from "~/modules/payment/payment.schema";
import * as paymentService from "~/modules/payment/payment.service";
import { protectedProcedure, router } from "~/trpc";

export const paymentRouter = router({
  getPaymentProducts: protectedProcedure
    .input(paymentSchema.getPaymentProductsSchema)
    .query(async ({ ctx, input }) => {
      return paymentService.getPaymentProducts(ctx.user.sub, input.code);
    }),
  createPayment: protectedProcedure
    .input(paymentSchema.createPaymentSchema)
    .mutation(async ({ input, ctx }) => {
      return paymentService.createPayment(ctx.user.sub, input.code, input.address);
    }),
  getHistories: protectedProcedure.query(async ({ ctx }) => {
    return paymentService.getOrderHistories(ctx.user.sub);
  }),
});

export const paymentWebhook = async (ctx: Context) => {
  const body = await ctx.req.json();
  const data = body as PaymentWebhookRequest;

  const paymentId = data.reference_id;
  const status = data.status;
  const paymentType = `${data.via}_${data.channel}`;

  await paymentService.updatePaymentStatus(paymentId, status, paymentType);

  return ctx.json({});
};

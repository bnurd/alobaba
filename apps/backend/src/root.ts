import { authRouter } from "~/modules/auth/auth.router";
import { cartRouter } from "~/modules/cart/cart.router";
import { paymentRouter } from "~/modules/payment/payment.router";
import { productRouter } from "~/modules/products/product.router";
import { router } from "~/trpc";

export const appRouter = router({
  auth: authRouter,
  products: productRouter,
  cart: cartRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;

import { authRouter } from "~/modules/auth/auth.router";
import { productRouter } from "~/modules/products/product.router";
import { router } from "~/trpc";

export const appRouter = router({
  auth: authRouter,
  products: productRouter,
});

export type AppRouter = typeof appRouter;

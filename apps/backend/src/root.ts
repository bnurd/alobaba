import { productRouter } from "~/modules/products/product.router";
import { router } from "~/trpc";

export const appRouter = router({
  products: productRouter,
});

export type AppRouter = typeof appRouter;

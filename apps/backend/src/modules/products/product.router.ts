import * as productService from "~/modules/products/product.service";
import { publicProcedure, router } from "~/trpc";

export const productRouter = router({
  getAll: publicProcedure.query(() => productService.getAllProducts()),
});

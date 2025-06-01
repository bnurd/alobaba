import * as productSchema from "~/modules/products/product.schema";
import * as productService from "~/modules/products/product.service";
import { publicProcedure, router } from "~/trpc";

export const productRouter = router({
  getAll: publicProcedure.query(() => productService.getAllProducts()),
  search: publicProcedure
    .input(productSchema.searchSchema)
    .query(({ input }) => productService.searchProducts(input.q)),
});

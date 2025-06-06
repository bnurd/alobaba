import * as productSchema from "~/modules/products/product.schema";
import * as productService from "~/modules/products/product.service";
import { publicProcedure, router } from "~/trpc";

export const productRouter = router({
  getAll: publicProcedure
    .input(productSchema.GetAllProduct)
    .query(({ input }) => productService.getAllProducts(input)),
  getDetail: publicProcedure
    .input(productSchema.getDetailSchema)
    .query(({ input }) => productService.getProductBySlug(input.slug)),
  search: publicProcedure
    .input(productSchema.searchSchema)
    .query(({ input }) => productService.searchProducts(input.q)),
});

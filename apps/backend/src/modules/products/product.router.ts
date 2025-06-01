import { z } from "zod/v4";

import { getAllProductsSchema } from "~/modules/products/product.schema";
import * as productService from "~/modules/products/product.service";
import { publicProcedure, router } from "~/trpc";

export const productRouter = router({
  getAll: publicProcedure
    .output(z.array(getAllProductsSchema))
    .query(() => productService.getAllProducts()),
});

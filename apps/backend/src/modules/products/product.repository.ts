import { prisma } from "@akptest/database";

import type { GetAllProductsSchema } from "~/modules/products/product.schema";

export const getAllProducts = (): Promise<GetAllProductsSchema[]> => {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
};

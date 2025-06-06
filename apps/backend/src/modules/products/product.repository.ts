import { prisma } from "@akptest/database";

import type * as productSchema from "~/modules/products/product.schema";

export const getAllProducts = (filters: productSchema.GetAllProduct) => {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      minumumOrderQuantity: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      stockQuantity: true,
    },
    where: {
      price: {
        gte: filters.minPrice ? Number(filters.minPrice) : 0,
        lte: filters.maxPrice ? Number(filters.maxPrice) : 99999999,
      },
    },
  });
};

export const getAllProductsByName = (name: string) => {
  return prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      imageUrl: true,
    },
  });
};

export const getProductBySlug = async (slug: string) => {
  const query = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      ProductImages: true,
      ProductCategory: true,
    },
  });

  return query;
};

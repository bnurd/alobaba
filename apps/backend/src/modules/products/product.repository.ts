import { prisma } from "@akptest/database";

export const getAllProducts = () => {
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
  });
};

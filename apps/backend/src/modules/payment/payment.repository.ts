import { prisma } from "@akptest/database";

export const getPaymentProducts = async (productIds: string[]) => {
  return prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      imageUrl: true,
      stockQuantity: true,
    },
  });
};

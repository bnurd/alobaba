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

export const getOrderHistories = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      payTotal: true,
      OrderItem: {
        include: {
          Product: true,
        },
      },
      Payment: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      createdAt: true,
    },
  });
};

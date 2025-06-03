import { prisma } from "@akptest/database";

export const addProductToCart = async (userId: string, productId: string, quantity: number) => {
  return prisma.cart.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
};

export const getCartByUserId = async (userId: string) => {
  return prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      // get all cart and product data of cart
      Product: {
        select: {
          id: true,
          name: true,
          price: true,
          slug: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getCartByProductIdAndUserId = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      productId,
    },
  });

  return cart;
};

export const updateProductQuantity = async (cartId: string, quantity: number) => {
  // update the quantity of the cart
  return prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      quantity,
    },
  });
};

export const deleteAllCartByUserIdAndProductId = async (userId: string, productId: string) => {
  // First, find the cart item by userId and productId
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (!cart) {
    throw new Error("Cart item not found");
  }

  // Then, delete by unique id
  return prisma.cart.delete({
    where: {
      id: cart.id,
    },
  });
};

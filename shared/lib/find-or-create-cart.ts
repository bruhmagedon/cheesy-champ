import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
  // найдем корзину
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  // не нашли - создадим новую
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};

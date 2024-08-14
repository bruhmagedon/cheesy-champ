import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

// найти корзину и обновить её
export const updateCartTotalAmount = async (token: string) => {
  // до вызова этой функции мы обновили данные элементов корзины (quantity), теперь обновим корзину
  // сначала найдем корзину и всю её инфу
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          ProductVariantion: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  // новая стоимость корзины
  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);

  // обновим корзину
  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          ProductVariantion: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};

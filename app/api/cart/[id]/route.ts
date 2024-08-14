import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { Api } from "@/shared/services/api-client";
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params }: RequestParams) {
  try {
    // cart/id (вытащили динамическое id)
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number }; // дай json с quantity
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    // найди айтем
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      // Товар не найден
      return NextResponse.json({ error: "Cart item not found" });
    }

    // у найденного айтема обнови количество (quantity)
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    // обновляем корзину после обновления бд
    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RequestParams) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    // нашли айтем корзины
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    // удаляем айтем из корзины
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    // обновляем корзину
    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить корзину" },
      { status: 500 }
    );
  }
}

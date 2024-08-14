import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

// бэк)
export async function GET(req: NextRequest) {
  try {
    // достали токен корзины из кукисов
    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      // токена нет - вернем пустую корзину
      return NextResponse.json({ totalAmount: 0, items: [] });
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        // заберем айтемсы корзины
        items: {
          orderBy: {
            createdAt: "desc",
          },
          // внутри каждого айтема берем инфу о продукте и ингредиентах
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
    return NextResponse.json(userCart);
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    // Нет токена? Ну сгенерим его
    if (!token) {
      token = crypto.randomUUID();
    }

    // Создаем корзину (ну или находим по токену ранее созданную, хз)
    const userCart = await findOrCreateCart(token);

    // Что сервер получает от клиента
    const data = (await req.json()) as CreateCartItemValues;

    // Чтоб не создавался дубликат товара, проверим был ли он добавлен
    // когда в корзине уже есть товар, не дублировать его, а увеличить quantity
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVarId: data.productVarId,
        ingredients: {
          // каждый id ингридиента в бд соответствует массиву data от клиента
          // [1, 5, 6] => [1, 5, 6]
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          // найти айтем корзины
          id: findCartItem.id,
        },
        data: {
          // обновить у него количество
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Если товар не найден - добавим его в корзину
      await prisma.cartItem.create({
        data: {
          // добавили товар (айтем)
          cartId: userCart.id,
          // добавили его вариант
          productVarId: data.productVarId,
          // создали quantity (первый)
          quantity: 1,
          // добавили все ингридиенты
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    // Обновляем корзину
    const updatedUserCart = await updateCartTotalAmount(token);

    // создали ответ
    const resp = NextResponse.json(updatedUserCart);
    // в созданный ответ добавляем токен в кукисы
    resp.cookies.set("cartToken", token);
    // отправляем ответ с новой корзиной + добавит токен (если его небыло)
    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}

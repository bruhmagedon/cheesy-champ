"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/ui/email-templates/pay-order";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { sendEmail } from "@/shared/lib/sendEmail";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

// server action (только post запросы без ответа)
// TODO не особо понял его объяснение, нужно детальнее изучить вопрос серверных экшенов
export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            ProductVariantion: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину (стоимоость и все элементы) */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: "testid",
      },
    });

    const paymentUrl = "paymentData.confirmation.confirmation_url";

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    // TODO потом подразобраться с ссылкой из сервер экшена, чтобы она редиректила на главный сайт при оплате
    // юкассы не будет, я в рот ебал в ней регаться, похуйпохуйпохуй
    // TODO В будущем хочу потом сделать админку, чтобы все заказы там отображались и статус в ЛК юзера
    return "url";
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}

// export async function updateUserInfo(body: Prisma.UserUpdateInput) {
//   try {
//     const currentUser = await getUserSession();

//     if (!currentUser) {
//       throw new Error('Пользователь не найден');
//     }

//     const findUser = await prisma.user.findFirst({
//       where: {
//         id: Number(currentUser.id),
//       },
//     });

//     await prisma.user.update({
//       where: {
//         id: Number(currentUser.id),
//       },
//       data: {
//         fullName: body.fullName,
//         email: body.email,
//         password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
//       },
//     });
//   } catch (err) {
//     console.log('Error [UPDATE_USER]', err);
//     throw err;
//   }
// }

// export async function registerUser(body: Prisma.UserCreateInput) {
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         email: body.email,
//       },
//     });

//     if (user) {
//       if (!user.verified) {
//         throw new Error('Почта не подтверждена');
//       }

//       throw new Error('Пользователь уже существует');
//     }

//     const createdUser = await prisma.user.create({
//       data: {
//         fullName: body.fullName,
//         email: body.email,
//         password: hashSync(body.password, 10),
//       },
//     });

//     const code = Math.floor(100000 + Math.random() * 900000).toString();

//     await prisma.verificationCode.create({
//       data: {
//         code,
//         userId: createdUser.id,
//       },
//     });

//     await sendEmail(
//       createdUser.email,
//       'Next Pizza / 📝 Подтверждение регистрации',
//       VerificationUserTemplate({
//         code,
//       }),
//     );
//   } catch (err) {
//     console.log('Error [CREATE_USER]', err);
//     throw err;
//   }
// }

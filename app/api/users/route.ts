import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // Достаем из постгреса все поля таблицы user
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  // Получаем json из ответа post
  const data = await req.json();

  // Создаем поле по полученным данным
  const user = await prisma.user.create({
    data,
  });

  // Сохраняем данные
  return NextResponse.json(user);
}

import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number); //Достаем размеры из фильтров
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number); //Достаем типы
  const ingredientsIdArr = params.ingredients?.split(",").map(Number); //Достаем ингредиенты

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE; //Достаем мин стоимость
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE; //Достаем макс стоимость

  // Применяем фильтры, которые достали
  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          // Найти продукты, у которых эти ингредиенты
          ingredients: ingredientsIdArr
            ? {
                // в массиве игредиентов найди нужный айдишник
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : // если ингридиенты не ищем
              undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};

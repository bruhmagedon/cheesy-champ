import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  // Стоимость всех ингридиентов у продукта
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  // продукт + ингредиенты * скейл(кол.во этих продуктов (2 пиццы))
  return (ingredientsPrice + item.ProductVariantion.price) * item.quantity;
};

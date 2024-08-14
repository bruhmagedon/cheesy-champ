import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductVariantion,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  ProductVariantion: ProductVariantion & {
    product: Product;
  };
  ingredients: Ingredient[];
};

// Типизация полного ответа корзины со всеми сущностями
export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productVarId: number;
  ingredients?: number[];
}

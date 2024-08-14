import { Ingredient, Product, ProductVariantion } from "@prisma/client";

export type ProductWithRelations = Product & {
  variants: ProductVariantion[];
  ingredients: Ingredient[];
};

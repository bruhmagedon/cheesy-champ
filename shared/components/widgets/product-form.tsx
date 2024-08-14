"use client";

import { ProductWithRelations } from "@/@types/prisma";
import React from "react";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.variants[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productVarId?: number, ingredients?: number[]) => {
    try {
      // проверяем пицца это или другой продукт (если есть productVariant - знач пицца)
      const itemId = productVarId ?? firstItem.id;

      await addCartItem({
        productVarId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлена в корзину");

      _onSubmit?.(); //route back
    } catch (err) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};

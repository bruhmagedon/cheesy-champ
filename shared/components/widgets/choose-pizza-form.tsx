"use client";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import {
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { useState } from "react";
import { Ingredient, ProductVariantion } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { DialogTitle } from "../ui/dialog";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductVariantion[];
  loading?: boolean;
  onClickAdd?: () => void;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  onSubmit,
  loading = false,
  className,
}: ChoosePizzaFormProps) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} alt={""} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        {/* <DialogTitle> */}
        <Title
          text={name}
          size="p"
          className="font-extrabold mb-1 text-[26px]"
        />
        {/* </DialogTitle> */}

        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="px-2 pb-2 rounded-md h-[380px] overflow-auto scrollbar mt-4">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-4"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

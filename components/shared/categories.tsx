"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/categories";
import { useEffect } from "react";

interface CategoriesProps {
  className?: string;
}

const categoriesElements = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Завтрак" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейли" },
  { id: 5, name: "Напитки" },
  { id: 6, name: "Десерты" },
];

export const Categories = ({ className }: CategoriesProps) => {
  const activeCategotyId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categoriesElements.map(({ name, id }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeCategotyId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};

"use client";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/categories";
import { Category } from "@prisma/client";
import { useEffect } from "react";

interface CategoriesProps {
  categoriesElements: Category[];
  className?: string;
}

export const Categories = ({
  className,
  categoriesElements,
}: CategoriesProps) => {
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

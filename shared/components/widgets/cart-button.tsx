"use client";
import { cn } from "@/shared/lib/utils";
import { User, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";

interface CardButtonProps {
  className?: string;
}

export const CardButton = ({ className }: CardButtonProps) => {
  const [totalAmount, loading, items] = useCartStore((state) => [
    state.totalAmount,
    state.loading,
    state.items,
  ]);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn("group relative", { "w-[105px]": loading }, className)}
      >
        {/* group чтобы анимация работала на всей кнопке */}
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};

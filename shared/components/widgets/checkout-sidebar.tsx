import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

const VAT = 15; //Налог
const DELIVERY_PRICE = 250; //Стоимость доставки

interface CheckoutSidebarProps {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

/**
 * Компонент боковой панели оформления заказа.
 * Отображает итоговую стоимость заказа, включая налог и доставку.
 *
 * @param {Object} props - Свойства компонента.
 * @param {number} props.totalAmount - Сумма корзины.
 * @param {boolean} [props.loading] - Флаг, указывающий на состояние загрузки. Если true, показываются скелетоны.
 * @param {string} [props.className] - Дополнительный CSS-класс для кастомизации стилей компонента.
 * @returns {JSX.Element} Компонент боковой панели оформления заказа.
 */
export const CheckoutSidebar = ({
  totalAmount,
  loading,
  className,
}: CheckoutSidebarProps) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice; //Общая стоимость

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {/* TODO хочу попробовать реализовать скелетон по другому, чтобы для каждого поля не прописывать проверку */}
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

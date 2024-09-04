"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { Controller, useFormContext } from "react-hook-form";
import { FormTextarea } from "../form";
import { ErrorText } from "../error-text";
import { AdressInput } from "../address-input";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/* Регистрация инпута если это проблематичено в компоненте*/}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              {/* TODO ошибку хочется перенести на уровень компонента AdressInput */}
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};

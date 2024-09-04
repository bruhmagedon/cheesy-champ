"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  className,
  name,
  label,
  required,
  ...props
}: FormInputProps) => {
  // Состояние формы
  const {
    register, //регистрация input в react-hook-form (теперь инпут работает в рамках r-h-f)
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name); //текст из поля, следит за изменеями и возвращает значение
  const errorText = errors[name]?.message as string;

  // Очистка инпута
  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true }); //валидация тригерится при очистке ещё
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {/* Кнопка очистки */}
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {/* Текст об ошибке */}
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

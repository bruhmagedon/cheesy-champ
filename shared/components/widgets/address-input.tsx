"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    // TODO Изменить стили (можно например этот скрыть, брать только данные, их перемещать в другой инпут, уже контролируемый нами)
    // TODO Добавить ещё кнопку очищения поля как в других компонентах
    <AddressSuggestions
      token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

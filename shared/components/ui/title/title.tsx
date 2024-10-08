import clsx from "clsx";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "p";

interface TitleProps {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title = ({ text, size = "sm", className }: TitleProps) => {
  // Парметры в зависимости от пропсов
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
    p: "p",
  } as const; //const = только для чтения

  const mapClassNameBySize = {
    xs: "text-[16px]",
    sm: "text-[22px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
    p: "",
  } as const;

  const Comp = mapTagBySize[size];

  return (
    <Comp className={clsx(mapClassNameBySize[size], className)}>{text}</Comp>
  );
};

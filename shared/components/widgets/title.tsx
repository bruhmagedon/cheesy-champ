import clsx from "clsx";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "p";

interface TitleProps {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title = ({ text, size = "sm", className }: TitleProps) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
    p: "p",
  } as const;

  const mapClassNameBySize = {
    xs: "text-[16px]",
    sm: "text-[22px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
    p: "",
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text
  );
};

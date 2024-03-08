import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

export enum ThemeButton {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OTLINE = "outline",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export const enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
}

export const Button = ({
  className,
  children,
  theme,
  square,
  size = ButtonSize.M,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(cls.Button, { [cls.square]: square }, [
        className || "",
        cls[theme || ""],
        cls[size],
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

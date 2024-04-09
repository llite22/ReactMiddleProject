import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";
import { ButtonHTMLAttributes, memo } from "react";

export enum ThemeButton {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
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
  disabled?: boolean;
}

export const Button = memo(
  ({
    className,
    children,
    theme,
    square,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  }: ButtonProps) => {
    const mods: Record<string, boolean | undefined> = {
      [cls.square]: square,
      [cls.disabled]: disabled,
    };

    return (
      <button
        type="button"
        className={classNames(cls.Button, mods, [
          className || "",
          cls[theme || ""],
          cls[size],
        ])}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss";
import LightIcon from "@/shared/assets/icons/theme-light.svg?react";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg?react";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { memo } from "react";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/types/theme";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});

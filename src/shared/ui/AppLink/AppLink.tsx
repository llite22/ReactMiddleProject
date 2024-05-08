import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { NavLink, NavLinkProps } from "react-router-dom";
import { HTMLAttributeAnchorTarget, memo, ReactNode } from "react";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends NavLinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    target,
  } = props;
  return (
    <NavLink
      to={to}
      target={target}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
    >
      {children}
    </NavLink>
  );
});

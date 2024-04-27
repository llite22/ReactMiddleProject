import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { FunctionComponent, memo, SVGProps } from "react";

interface IconProps {
  className?: string;
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
  return <Svg className={classNames(cls.Icon, {}, [className])} />;
});

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { FunctionComponent, memo, SVGProps } from "react";

interface IconProps {
  className?: string;
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted }: IconProps) => {
  return (
    <Svg
      className={classNames(inverted ? cls.Inverted : cls.Icon, {}, [
        className,
      ])}
    />
  );
});

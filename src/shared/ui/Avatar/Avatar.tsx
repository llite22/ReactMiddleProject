import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";
import { CSSProperties, useMemo } from "react";
import { AppImage } from "../AppImage/AppImage";
import { Icon } from "../Icon/Icon";
import AvatarIcon from "@/shared/assets/icons/avatar.svg?react";
import { Skeleton } from "../Skeleton/Skeleton";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({ width: size, height: size }),
    [size]
  );

  const fallback = <Skeleton width={size} height={size} border={"50%"} />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      Svg={AvatarIcon}
      width={size}
      height={size}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};

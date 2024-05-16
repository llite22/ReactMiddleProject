import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./StarRating.module.scss";
import { memo, useState } from "react";
import { Icon } from "../Icon/Icon";
import StarIcon from "@/shared/assets/icons/star.svg?react";

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars: number[] = [1, 2, 3, 4, 5];

export const StarRating = memo(
  ({ className, size = 30, selectedStars = 0, onSelect }: StarRatingProps) => {
    const [currentStarsCount, setCurrentStarsCount] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean>(
      Boolean(selectedStars)
    );

    const onHover = (starsCount: number) => () => {
      if (!isSelected) {
        console.log(starsCount);
        
        setCurrentStarsCount(starsCount);
      }
    };

    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarsCount(0);
      }
    };

    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);
        setCurrentStarsCount(starsCount);
        setIsSelected(true);
      }
    };

    return (
      <div className={classNames(cls.StarRating, {}, [className])}>
        {stars.map((startNumber) => (
          <Icon
            className={classNames(
              cls.starIcon,
              { [cls.selected]: isSelected },
              [
                className,
                currentStarsCount >= startNumber ? cls.hovered : cls.normal,
              ]
            )}
            Svg={StarIcon}
            key={startNumber}
            width={size}
            height={size}
            onMouseLeave={onLeave}
            onMouseEnter={onHover(startNumber)}
            onClick={onClick(startNumber)}
          />
        ))}
      </div>
    );
  }
);

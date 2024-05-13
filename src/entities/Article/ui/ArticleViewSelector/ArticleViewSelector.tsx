import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleViewSelector.module.scss";
import ListBoxIcon from "@/shared/assets/icons/viewbox.svg?react";
import ListBurgerIcon from "@/shared/assets/icons/viewburger.svg?react";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { memo } from "react";
import { ArticleView } from "../../model/consts/articleConsts";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: ListBoxIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListBurgerIcon,
  },
];

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType, index) => (
          <Button
            key={index}
            theme={ThemeButton.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames("", {
                [cls.notSelected]: viewType.view !== view,
              })}
            />
          </Button>
        ))}
      </div>
    );
  }
);

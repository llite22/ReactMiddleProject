import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { memo } from "react";
import { ArticleView } from "../../model/types/article";
import { Text } from "@/shared/ui/Text/Text";
import { Card } from "@/shared/ui/Card/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemSkeletonProps {
  className?: string;
  view?: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  ({ className, view }: ArticleListItemSkeletonProps) => {
    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton border={"50%"} width={30} height={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />
            <div className={cls.footer}>
              <Skeleton width={200} height={36} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    );
  }
);
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 4)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));
};

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
  }: ArticleListProps) => {
    const { t } = useTranslation("article");

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t("Статьи не найдены")} />
        </div>
      );
    }

    const renderArticle = (article: Article) => {
      return (
        <ArticleListItem
          key={article.id}
          article={article}
          view={view}
          className={cls.card}
        />
      );
    };

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && getSkeletons(view)}
      </div>
    );
  }
);

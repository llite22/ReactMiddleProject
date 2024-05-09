import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import {
  HTMLAttributeAnchorTarget,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from "@/shared/const/localstorage";
import { PAGE_ID } from "@/widgets/Page/Page";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  onLoadNextPart?: () => void;
}


const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 4)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={cls.skeleton}
        key={index}
        view={view}
      />
    ));
};

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    target,
    view = ArticleView.SMALL,
  }: ArticleListProps) => {
    const [selectedArticleId, setSelectedArticleId] = useState<number>(1);
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
    const { t } = useTranslation("article");

    useEffect(() => {
      const paged =
        sessionStorage.getItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX) || 1;
      setSelectedArticleId(+paged);
    }, []);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (view === ArticleView.SMALL) {
        timeoutId = setTimeout(() => {
          if (virtuosoGridRef.current) {
            virtuosoGridRef.current.scrollToIndex(selectedArticleId);
          }
        }, 100);
      }
      return () => clearTimeout(timeoutId);
    }, [selectedArticleId, view]);

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t("Статьи не найдены")} />
        </div>
      );
    }

    const Footer = memo(() => {
      if (isLoading) {
        return <div className={cls.skeleton}>{getSkeletons(view)}</div>;
      }
      return null;
    });

    const ItemContainerComp = ({
      // @ts-ignore
      height,
      // @ts-ignore
      width,
      index,
    }: {
      height: number;
      width: number;
      index: number;
    }) => (
      <div className={cls.itemsWrapper}>
        <ArticleListItemSkeleton
          className={cls.skeleton}
          key={index}
          view={ArticleView.SMALL}
        />
      </div>
    );

    const renderArticle = (index: number, article: Article) => {
      return (
        <ArticleListItem
          key={article.id}
          article={article}
          view={view}
          className={cls.card}
          target={target}
          index={index}
        />
      );
    };

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {view === ArticleView.BIG ? (
          <Virtuoso
            style={{ height: "100%" }}
            data={articles}
            itemContent={renderArticle}
            totalCount={articles.length}
            customScrollParent={document.getElementById(PAGE_ID) as HTMLElement}
            initialTopMostItemIndex={selectedArticleId}
            components={{ Footer }}
          />
        ) : (
          <VirtuosoGrid
            ref={virtuosoGridRef}
            totalCount={articles.length}
            customScrollParent={document.getElementById(PAGE_ID) as HTMLElement}
            components={{ ScrollSeekPlaceholder: ItemContainerComp, Footer }}
            data={articles}
            itemContent={renderArticle}
            listClassName={cls.itemsWrapper}
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 200,
              exit: (velocity) => Math.abs(velocity) < 30,
            }}
          />
        )}
      </div>
    );
  }
);

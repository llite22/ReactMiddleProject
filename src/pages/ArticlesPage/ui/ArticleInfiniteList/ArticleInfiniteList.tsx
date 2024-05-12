import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getArticles } from "../../model/slices/articlesPageSlice";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { ArticleList } from "@/entities/Article";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = ({
  className,
}: ArticleInfiniteListProps) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch]);

  if (error) {
    return (
      <Text
        className={className}
        theme={TextTheme.ERROR}
        title={t("Произошла ошибка при загрузке статей")}
        text={t("Попробуйте обновить страницу")}
        align={TextAlign.CENTER}
      />
    );
  }

  return <ArticleList isLoading={isLoading} view={view} articles={articles} />;
};

import { classNames } from "@/shared/lib/classNames/classNames";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article";
import { getCanEditArticle } from "@/pages/ArticleDetailsPage/model/selectors/article";
import { HStack } from "@/shared/ui/Stack";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation("article");
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      if (article) {
        navigate(getRouteArticleEdit(article.id));
      }
    }, [article, navigate]);

    return (
      <HStack
        justify={"between"}
        max
        className={classNames("", {}, [className])}
      >
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
            {t("Редактировать")}
          </Button>
        )}
      </HStack>
    );
  }
);

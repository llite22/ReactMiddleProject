import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article";
import { getCanEditArticle } from "@/pages/ArticleDetailsPage/model/selectors/article";

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
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEditArticle}
          >
            {t("Редактировать")}
          </Button>
        )}
      </div>
    );
  }
);

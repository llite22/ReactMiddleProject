import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleEditPage.module.scss";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t("Редактирование статьи c ID = ") + id
        : t("Создание новой статьи")}
    </Page>
  );
};

export default memo(ArticleEditPage);

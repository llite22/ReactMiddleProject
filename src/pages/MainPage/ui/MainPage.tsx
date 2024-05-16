import { RatingCard } from "@/entities/Rating";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");

  return (
    <Page>
      {t("Главная")}
      <RatingCard
        title={t("Как вам статья?")}
        feedbackTitle={t("Оставьте отзыв о статье")}
        hasFeedback
      />
    </Page>
  );
};

export default memo(MainPage);

import { RatingCard } from "@/entities/Rating";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");

  return <Page>{t("Главная")}</Page>;
};

export default memo(MainPage);

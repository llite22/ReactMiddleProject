import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return <Page>{t("О сайте")}</Page>;
};

export default memo(AboutPage);

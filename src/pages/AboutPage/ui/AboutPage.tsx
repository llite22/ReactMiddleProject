import { Counter } from "@/entities/Counter";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return (
    <Page>
      {t("О сайте")} <Counter />
    </Page>
  );
};

export default memo(AboutPage);

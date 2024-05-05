import { Counter } from "@/entities/Counter";
import { Page } from "@/shared/ui/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");

  return (
    <Page>
      {t("Главная")} <Counter />
    </Page>
  );
};

export default memo(MainPage);

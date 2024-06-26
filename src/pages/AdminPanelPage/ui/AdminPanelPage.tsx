import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";

const AdminPanelPage = () => {
  const { t } = useTranslation("about");
  return <Page>{t("Админ панель")}</Page>;
};

export default memo(AdminPanelPage);

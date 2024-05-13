import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";

interface AdminPanelPageProps {
  className?: string;
}

const ForbiddenPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation("");
  return <Page>{t("У вас нет доступа к этой странице")}</Page>;
};

export default memo(ForbiddenPage);

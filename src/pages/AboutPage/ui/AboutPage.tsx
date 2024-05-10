import { ListBox } from "@/shared/ui/ListBox/ListBox";
import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return (
    <Page>
      {t("О сайте")}
      <div>
        <ListBox
          defaultValue={"Выберите значение"}
          onChange={(value) => console.log(value)}
          value={undefined}
          items={[
            {
              value: "1",
              content: "Значение 1",
            },
            {
              value: "2",
              content: "Значение 2",
            },
            {
              value: "3",
              content: "Значение 3",
            },
          ]}
        />
      </div>
    </Page>
  );
};

export default memo(AboutPage);

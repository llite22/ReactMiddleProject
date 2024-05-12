import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextAlign, TextSize, TextTheme } from "@/shared/ui/Text/Text";
import { ArticleList } from "@/entities/Article";
import { useTranslation } from "react-i18next";
import { VStack } from "@/shared/ui/Stack";
import { useArticleRecommendationsList } from "../../api/apiRecommendations";
import { memo } from "react";

interface ArticleRecommendatonsListProps {
  className?: string;
}

export const ArticleRecommendatonsList = memo(
  ({ className }: ArticleRecommendatonsListProps) => {
    const { t } = useTranslation("article");
    const {
      data: articles,
      isLoading,
      error,
    } = useArticleRecommendationsList(4);

    if (error) {
      return (
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      );
    }

    return (
      <VStack gap={"8"} className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Рекомендуем")} />
        {articles && <ArticleList isLoading={isLoading} articles={articles} />}
        <ArticleList
          isLoading={isLoading}
          articles={articles || []}
          target={"_blank"}
        />
      </VStack>
    );
  }
);

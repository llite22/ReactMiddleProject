import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { memo } from "react";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import {
  DynamicModuleLoader,
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecommendatonsList } from "@/features/articleRecommendatonsList";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap={"16"} max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendatonsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

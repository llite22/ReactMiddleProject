import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { ArticleDetails, ArticleList } from "@/entities/Article";
import { useParams } from "react-router-dom";
import { Text, TextAlign, TextSize, TextTheme } from "@/shared/ui/Text/Text";
import { CommentList } from "@/entities/Comment";
import {
  DynamicModuleLoader,
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "@/features/AddCommentForm";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Page } from "@/widgets/Page/Page";
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationSlice";
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from "../../model/selectors/recommendations";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "@/shared/ui/Stack";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading
  );
  const recommendationsError = useSelector(getArticleRecommendationsError);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  
  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch, id]
  );

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  if (recommendationsError) {
    return (
      <div
        className={classNames(cls.ArticleDetailsPage, {}, [
          className,
          cls.error,
        ])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap={"16"} max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t("Рекомендуем")}
          />
          <ArticleList
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            className={cls.recommendations}
            target={"_blank"}
          />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t("Комментарии")}
          />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList comments={comments} isLoading={commentsIsLoading} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

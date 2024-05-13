import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "@/features/AddCommentForm";
import { CommentList } from "@/entities/Comment";
import { useCallback, useEffect } from "react";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useTranslation } from "react-i18next";
import { VStack } from "@/shared/ui/Stack";

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = ({
  className,
  id,
}: ArticleDetailsCommentsProps) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch, id]
  );

  return (
    <VStack gap={"16"} max className={classNames("", {}, [className])}>
      <Text size={TextSize.L} title={t("Комментарии")} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </VStack>
  );
};

import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import { Text } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import { VStack } from "@/shared/ui/Stack";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(
  ({ className, comments, isLoading }: CommentListProps) => {
    const { t } = useTranslation("article");

    if (isLoading) {
      return (
        <VStack gap={"16"} max className={classNames("", {}, [className])}>
          <CommentCard isLoading={isLoading} />
          <CommentCard isLoading={isLoading} />
          <CommentCard isLoading={isLoading} />
        </VStack>
      );
    }

    return (
      <VStack gap={"16"} max className={classNames("", {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))
        ) : (
          <Text text={t("Комментарии отсутствуют")} />
        )}
      </VStack>
    );
  }
);

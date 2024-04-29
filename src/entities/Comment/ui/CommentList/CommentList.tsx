import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./CommentList.module.scss";
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import { Text } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";

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
        <div className={classNames(cls.CommentList, {}, [className])}>
          <CommentCard isLoading={isLoading} />
          <CommentCard isLoading={isLoading} />
          <CommentCard isLoading={isLoading} />
        </div>
      );
    }

    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              className={cls.comment}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={t("Комментарии отсутствуют")} />
        )}
      </div>
    );
  }
);

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import {
  DynamicModuleLoader,
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { Text, TextAlign } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import { Icon } from "@/shared/ui/Icon/Icon";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { HStack, VStack } from "@/shared/ui/Stack";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            block={block}
            key={block.id}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            block={block}
            key={block.id}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            block={block}
            key={block.id}
            className={cls.block}
          />
        );
      default:
        return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border={"50%"}
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t("Произошла ошибка при загрузке статьи")}
      />
    );
  } else {
    content = (
      <>
        <HStack justify={"center"} max>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>
        <VStack gap={"4"} max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
          />
          <HStack gap={"8"} className={cls.articleInfo}>
            <Icon Svg={EyeIcon} className={cls.icon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap={"8"}>
            <Icon Svg={CalendarIcon} className={cls.icon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <VStack
        gap={"16"}
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});

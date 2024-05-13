import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { HTMLAttributeAnchorTarget, memo } from "react";
import {
  Article,
  ArticleTextBlock,
} from "../../model/types/article";
import { Text } from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import { Card } from "@/shared/ui/Card/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from "@/shared/const/localstorage";
import { ArticleBlockType, ArticleView } from "../../model/consts/articleConsts";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  index?: number;
}

export const ArticleListItem = memo(
  ({ className, article, view, target, index }: ArticleListItemProps) => {
    const { t } = useTranslation("article");
    const types = <Text text={article.type.join(", ")} className={cls.types} />;
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    );
    const handleButtonClick = () => {
      sessionStorage.setItem(
        ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX,
        JSON.stringify(index)
      );
    };

    if (view === ArticleView.BIG) {
      let textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT
      ) as ArticleTextBlock;

      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text title={article.title} className={cls.title} />
            {types}
            <img src={article.img} className={cls.img} alt={article.title} />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <AppLink
                target={target}
                to={RoutePath.article_details + article.id}
              >
                <Button onClick={handleButtonClick} theme={ThemeButton.OUTLINE}>
                  {t("Читать далее")}
                </Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <AppLink
        target={target}
        to={RoutePath.article_details + article.id}
        className={classNames('', {}, [className, cls[view]])}
      >
        <Card onClick={handleButtonClick}>
          <div className={cls.imageWrapper}>
            <img src={article.img} alt={article.title} className={cls.img} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </Card>
      </AppLink>
    );
  }
);

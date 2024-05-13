import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleSortSelector.module.scss";
import { Select, SelectOption } from "@/shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { SortOrder } from "@/shared/types";
import { ArticleSortField } from "../../model/consts/articleConsts";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo(
  ({
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort,
  }: ArticleSortSelectorProps) => {
    const { t } = useTranslation("article");

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        {
          value: "asc",
          content: t("возрастанию"),
        },
        {
          value: "desc",
          content: t("убыванию"),
        },
      ],
      [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t("дате создания"),
        },
        {
          value: ArticleSortField.TITLE,
          content: t("названию"),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t("просмотрам"),
        },
      ],
      [t]
    );

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select<ArticleSortField>
          options={sortFieldOptions}
          label={t("Сортировать ПО")}
          value={sort}
          onChange={onChangeSort}
        />
        <Select<SortOrder>
          value={order}
          onChange={onChangeOrder}
          options={orderOptions}
          label={t("по")}
          className={cls.order}
        />
      </div>
    );
  }
);

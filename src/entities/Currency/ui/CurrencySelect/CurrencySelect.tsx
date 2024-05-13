import { classNames } from "@/shared/lib/classNames/classNames";
import { Currency } from "../../model/types/currency";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ListBox } from "@/shared/ui/Popups";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (currency: Currency) => void;
  readonly?: boolean;
}

export const options = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    return (
      <ListBox
        className={classNames("", {}, [className])}
        value={value}
        defaultValue={t("Укажите валюту")}
        onChange={onChangeHandler}
        items={options}
        readonly={readonly}
        direction={"top right"}
        label={t("Укажите валюту")}
      />
    );
  }
);

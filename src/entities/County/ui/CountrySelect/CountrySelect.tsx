import { classNames } from "@/shared/lib/classNames/classNames";
import { Select } from "@/shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Country } from "../../model/types/county";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (country: Country) => void;
  readonly?: boolean;
}

export const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.USA, content: Country.USA },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Germany, content: Country.Germany },
  { value: Country.Poland, content: Country.Poland },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );

    return (
      <Select
        label={t("Укажите страну")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        className={classNames("", {}, [className])}
        readonly={readonly}
      />
    );
  }
);

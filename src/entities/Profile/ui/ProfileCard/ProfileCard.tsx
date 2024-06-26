import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./ProfileCard.module.scss";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Loader } from "@/shared/ui/Loader/Loader";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";
import { HStack, VStack } from "@/shared/ui/Stack";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
  className,
  data,
  error,
  isLoading,
  readonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar,
  onChangeCountry,
  onChangeCurrency,
}: ProfileCardProps) => {
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <HStack
        justify={"center"}
        max
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        justify={"center"}
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap={"8"}
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify={"center"} max className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} alt={"avatar"} />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t("Ваше имя")}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        value={data?.lastname}
        placeholder={t("Ваша фамилия")}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        value={data?.age}
        placeholder={t("Ваша возраст")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t("Город")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t("Введите имя пользователя")}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t("Введите ссылку на аватар")}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};

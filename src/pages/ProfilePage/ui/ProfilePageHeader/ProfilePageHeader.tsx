import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "@/entities/Profile";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation("profile");
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack max justify={"between"} className={classNames("", {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit && (
        <>
          {readonly ? (
            <Button
              onClick={onEdit}
              theme={ThemeButton.OUTLINE}
            >
              {t("Редактировать")}
            </Button>
          ) : (
            <HStack gap={"8"}>
              <Button
                onClick={onCancelEdit}
                theme={ThemeButton.OUTLINE_RED}
              >
                {t("Отменить")}
              </Button>
              <Button
                onClick={onSave}
                theme={ThemeButton.OUTLINE}
              >
                {t("Сохранить")}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  );
};

import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ProfilePage.module.scss";
import { memo } from "react";
import {
  DynamicModuleLoader,
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileReducer } from "@/entities/Profile";

const reducers: ReducerList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation();
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames("", {}, [className || ""])}>
        {t("Профиль")}
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;

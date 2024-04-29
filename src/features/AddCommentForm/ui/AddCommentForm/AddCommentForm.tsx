import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AddCommentForm.module.scss";
import { Input } from "@/shared/ui/Input/Input";
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useSelector } from "react-redux";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";
import { memo, useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import {
  DynamicModuleLoader,
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text/Text";

interface addCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducer: ReducerList = {
  addCommentForm: addCommentFormReducer,
};

const addCommentForm = memo(
  ({ className, onSendComment }: addCommentFormProps) => {
    const { t } = useTranslation("article");
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch]
    );

    const onSendCommentHandle = useCallback(() => {
      onSendComment?.(text || "");
      onCommentTextChange("");
    }, [onSendComment, onCommentTextChange, text]);

    if (error) {
        return (
          <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
            <Text
              theme={TextTheme.ERROR}
              title={t("Произошла ошибка при загрузке комментария")}
              text={t("Попробуйте обновить страницу")}
              align={TextAlign.CENTER}
            />
          </div>
        );
      }

    return (
      <DynamicModuleLoader reducers={reducer}>
        <div className={classNames(cls.addCommentForm, {}, [className])}>
          <Input
            placeholder={t("Введите текст комментария")}
            value={text}
            onChange={onCommentTextChange}
            className={cls.input}
          />
          <Button onClick={onSendCommentHandle} theme={ThemeButton.OUTLINE}>
            {t("Отправить")}
          </Button>
        </div>
      </DynamicModuleLoader>
    );
  }
);

export default addCommentForm;

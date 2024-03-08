import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useCallback, useState } from "react";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t("Войти")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae tempore
        officiis, sed magni omnis voluptatum nesciunt error quaerat maxime eius
        consectetur laudantium non itaque aliquam numquam repellendus culpa
        temporibus a!
      </Modal>
    </div>
  );
};

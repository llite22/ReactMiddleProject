import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DEALY = 300;

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalProps) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DEALY,
    onClose,
    isOpen,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className, theme])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};

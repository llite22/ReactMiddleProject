import { memo, ReactNode } from "react";
import { Overlay } from "../Overlay/Overlay";
import cls from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { useTheme } from "@/app/providers/ThemeProvider";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo(
  ({ className, children, onClose, isOpen, lazy }: DrawerProps) => {
    const { close, isClosing, isMounted } = useModal({
      animationDelay: 300,
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
        <div className={classNames(cls.Drawer, mods, [className, theme])}>
          <Overlay onClick={close} />
          <div className={cls.content}>{children}</div>
        </div>
      </Portal>
    );
  }
);

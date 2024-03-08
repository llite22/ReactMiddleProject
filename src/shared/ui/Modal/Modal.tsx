import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DEALY = 300;

export const Modal = ({ className, children, isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout>();

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DEALY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (

      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    
  );
};

import {
  Popover as HPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import { DropDownDirection } from "@/shared/types/ui";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Popover.module.scss";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";

interface PopoverProps {
  className?: string;
  trigger?: ReactNode;
  direction?: DropDownDirection;
  children?: ReactNode;
}

export function Popover({
  className,
  trigger,
  direction = "bottom right",
  children,
}: PopoverProps) {
  const menuClasses = [mapDirectionClass[direction]];
  return (
    <HPopover
      as={"div"}
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <PopoverButton as={"div"} className={popupCls.trigger}>{trigger}</PopoverButton>
      <PopoverPanel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </PopoverPanel>
    </HPopover>
  );
}

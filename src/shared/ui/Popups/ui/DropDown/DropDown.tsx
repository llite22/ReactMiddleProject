import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cls from "./DropDown.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { DropDownDirection } from "@/shared/types/ui";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";

export interface DropDownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}
interface DropDownProps {
  className?: string;
  items: DropDownItem[];
  trigger?: ReactNode;
  href?: string;
  direction?: DropDownDirection;
}
export function DropDown({
  className,
  items,
  trigger,
  direction = "bottom right",
}: DropDownProps) {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as={"div"}
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ focus }: { focus: boolean }) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.focus]: focus }, [
                className,
              ])}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <MenuItem
                key={index}
                to={item.href}
                as={AppLink}
                disabled={item.disabled}
              >
                {content}
              </MenuItem>
            );
          }
          return (
            <MenuItem key={index} as={Fragment} disabled={item.disabled}>
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

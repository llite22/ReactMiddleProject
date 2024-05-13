import {
  Listbox as HListBox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import cls from "./ListBox.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { DropDownDirection } from "@/shared/types/ui";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: <T extends string>(value: T) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
  label?: string;
}

export function ListBox({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "bottom left",
  label,
}: ListBoxProps) {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap={"4"}>
      {label && <span>{label + ">"}</span>}

      <HListBox
        disabled={readonly}
        as={"div"}
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton disabled={readonly} className={popupCls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </ListboxButton>
        <ListboxOptions className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ focus, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.focus]: focus,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {selected && "!"}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListBox>
    </HStack>
  );
}

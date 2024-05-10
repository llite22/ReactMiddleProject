import {
  Listbox as HListBox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import cls from "./ListBox.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "../Button/Button";
import { HStack } from "../Stack";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropDownDirection = "top" | "bottom";

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

const mapDirectionClass: Record<DropDownDirection, string> = {
  bottom: cls.optionBottom,
  top: cls.optionTop,
};
export function ListBox({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "bottom",
  label,
}: ListBoxProps) {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap={"4"}>
      {label && <span>{label + ">"}</span>}

      <HListBox
        disabled={readonly}
        as={"div"}
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton disabled={readonly} className={cls.trigger}>
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
                    [cls.focus]: focus,
                    [cls.disabled]: item.disabled,
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

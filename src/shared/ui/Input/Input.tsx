import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [caretPosition, setCaretPosition] = useState<number>(0);
    const ref = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true);
        ref.current?.focus();
      }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
      [cls.readonly]: readonly,
    };

    return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
        <div className={cls.caretWrapper}>
          <input
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            ref={ref}
            readOnly={readonly}
            {...otherProps}
          />
          {isCaretVisible && (
            <span
              className={cls.caret}
              style={{ left: `${caretPosition * 9}px` }}
            />
          )}
        </div>
      </div>
    );
  }
);

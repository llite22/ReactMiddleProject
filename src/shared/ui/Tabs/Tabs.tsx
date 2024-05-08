import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Tabs.module.scss";
import { memo, ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tab: TabItem<T>) => void;
}

export const TabsComponent = <T extends string>({
  className,
  tabs,
  value,
  onTabClick,
}: TabsProps<T>) => {
  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          onClick={clickHandle(tab)}
          key={tab.value}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};

export const Tabs = memo(TabsComponent) as <T extends string>(
  props: TabsProps<T>
) => ReturnType<typeof TabsComponent>;

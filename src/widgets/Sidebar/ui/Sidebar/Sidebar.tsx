import { memo, useMemo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { LangSwitcher } from "@/widgets/LangSwitcher";
import { Button, ButtonSize, ThemeButton } from "@/shared/ui/Button/Button";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { VStack } from "@/shared/ui/Stack";


interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = (): void => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} collapsed={collapsed} item={item} />
      )),
    [sidebarItemsList, collapsed]
  );

  return (
    <menu
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        className={cls.collapseBtn}
        onClick={onToggle}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <VStack gap={"8"} className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </menu>
  );
});

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NotificationButton.module.scss";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { NotificationList } from "@/entities/Notification";
import Notification from "@/shared/assets/icons/notification.svg?react";
import { Popover } from "@/shared/ui/Popups";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={Notification} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames("", {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
};

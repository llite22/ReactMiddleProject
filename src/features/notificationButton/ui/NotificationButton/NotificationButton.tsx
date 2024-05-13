import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NotificationButton.module.scss";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { NotificationList } from "@/entities/Notification";
import Notification from "@/shared/assets/icons/notification.svg?react";
import { Popover } from "@/shared/ui/Popups";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  return (
    <div>
      <Popover
        className={classNames('', {}, [className])}
        direction="bottom left"
        trigger={
          <Button theme={ThemeButton.CLEAR}>
            <Icon Svg={Notification} inverted />
          </Button>
        }
      >
        <NotificationList className={cls.notifications} />
      </Popover>
    </div>
  );
};

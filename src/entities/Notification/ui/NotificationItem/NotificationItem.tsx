import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import { Card, CardTheme } from "@/shared/ui/Card/Card";
import { Text } from "@/shared/ui/Text/Text";

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = ({
  className,
  notification,
}: NotificationItemProps) => {
  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <a
        className={cls.link}
        target={"_blank"}
        href={notification.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};

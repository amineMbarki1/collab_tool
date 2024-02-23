import { TopicInviteNotification as NotificationType } from "../types";
import { Avatar } from "@/components/Avatar";

import styles from "./Notification.module.css";

interface Props {
  notification: NotificationType;
}

export default function TopicInviteNotification({ notification }: Props) {
  return (
    <div className={styles.container}>
      <Avatar />
      <strong>{notification.topicOwnerName}</strong>
      has added you to his topic<strong>{notification.topicName}</strong>
    </div>
  );
}

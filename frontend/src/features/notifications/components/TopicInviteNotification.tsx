import { TopicInviteNotification as NotificationType } from "../types";
import { Avatar } from "@/components/Avatar";
import timeAgo from "@/utils/timeAgo";

import styles from "./Notification.module.css";
import { Link } from "react-router-dom";

interface Props {
  notification: NotificationType;
}

export default function TopicInviteNotification({ notification }: Props) {
  return (
    <Link to={`/topics/${notification.topicId}`} className={styles.container}>
      <Avatar />
      <div>
        <strong>{notification.topicOwnerName}</strong>
        has added you to his topic <strong>{notification.topicName}</strong>
        <span style={{display: "block"}}>{timeAgo.format(new Date(notification.time), "twitter-now")}`</span>
      </div>
    </Link>
  );
}

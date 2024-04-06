import { Avatar } from "@/components/Avatar";
import TagIcon from "@/assets/icons/tag-icon.svg?react";
import DotIcon from "@/assets/icons/dot-icon.svg?react";
import { NewPostNotification as NotificationType } from "../types";
import styles from "./Notification.module.css";
import timeAgo from "@/utils/timeAgo";
import { Link } from "react-router-dom";

export default function NewPostNotification({
  notification,
}: {
  notification: NotificationType;
}) {
  return (
    <Link
      to={`/topics/${notification.topicId}/post/${notification.postId}`}
      className={styles.container}
    >
      <Avatar />
      <div>
        <strong>
          {notification.postedBy.firstName +
            " " +
            notification.postedBy.lastName}{" "}
        </strong>{" "}
        Just published a new
        <strong> post </strong>
        in
        <strong className={styles.topic}>
          <TagIcon />
          {notification.topicName}
        </strong>
        &nbsp;topic
        <div>{`${timeAgo.format(
          new Date(notification.time),
          "twitter-now"
        )}`}</div>
      </div>
      <div style={{ alignSelf: "baseline" }}>
        <DotIcon className={styles.unreadIcon} height={10} />
      </div>
    </Link>
  );
}

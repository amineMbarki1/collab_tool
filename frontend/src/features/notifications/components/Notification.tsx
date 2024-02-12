import { Avatar } from "@/components/Avatar";
import TagIcon from "@/assets/icons/tag-icon.svg?react";
import styles from "./Notification.module.css";
import DotIcon from "@/assets/icons/dot-icon.svg?react";
import { NewPostNotification } from "../types";

export default function Notification({
  notification,
}: {
  notification: NewPostNotification;
}) {
  return (
    <div className={styles.container}>
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
        <div>{`${notification.time}`}</div>
      </div>
      <div style={{ alignSelf: "baseline" }}>
        <DotIcon className={styles.unreadIcon} height={10} />
      </div>
    </div>
  );
}

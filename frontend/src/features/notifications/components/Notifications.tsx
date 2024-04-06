import { Popover, ArrowContainer } from "react-tiny-popover";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader } from "@/components/Card";
import { IconButton } from "@/components/Button";

import CloseIcon from "@/assets/icons/icon-close.svg?react";
import NotificationIcon from "@/assets/icons/icon-notification.svg?react";
import styles from "./Notifications.module.css";
import NewPostNotification from "./NewPostNotification";
import TopicInviteNotification from "./TopicInviteNotification";
import { useAppStore } from "@/hooks";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import { getNotificationsAction } from "..";

export default function Notifications() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { useAppSelector, dispatch } = useAppStore();

  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, [dispatch]);

  return (
    <Popover
      ref={ref}
      isOpen={isOpen}
      containerStyle={{ zIndex: "4" }}
      positions={["top"]}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          popoverRect={popoverRect}
          position={position}
          childRect={childRect}
          arrowSize={7}
          arrowColor="white"
          arrowClassName="arrow"
        >
          <Card className={styles.container}>
            <CardHeader className={styles.header}>
              <NotificationIcon className={styles.closeButton} />
              <h4>Notifications</h4>
              <IconButton
                className={styles.closeButton}
                onClick={() => {
                  setIsOpen(false);
                }}
                icon={<CloseIcon height={20} />}
              />
            </CardHeader>
            {notifications.map((notification) =>
              notification.type === "newPost" ? (
                <NewPostNotification notification={notification} />
              ) : (
                <TopicInviteNotification notification={notification} />
              )
            )}

            {notifications.length === 0 && (
              <EmptyDataIndicator
                wrapperClassName={styles.empty}
                message="No notifications yet"
              />
            )}
          </Card>
        </ArrowContainer>
      )}
    >
      <a
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? styles.active : ""} ${styles.navLink}`}
      >
        <NotificationIcon className={styles.icon} />
      </a>
    </Popover>
  );
}

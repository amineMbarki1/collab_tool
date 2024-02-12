import { Popover, ArrowContainer } from "react-tiny-popover";
import { useRef, useState } from "react";
import { Card, CardHeader } from "@/components/Card";
import { IconButton } from "@/components/Button";

import CloseIcon from "@/assets/icons/icon-close.svg?react";
import NotificationIcon from "@/assets/icons/icon-notification.svg?react";
import styles from "./Notifications.module.css";
import Notification from "./Notification";
import { useAppStore } from "@/hooks";

export default function Notifications() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const { useAppSelector } = useAppStore();

  const notifications = useAppSelector((state) => state.notification);

  return (
    <Popover
      ref={ref}
      isOpen={isOpen}
      containerStyle={{ zIndex: "2" }}
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
            {notifications.map((notification) => (
              <Notification notification={notification} />
            ))}
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

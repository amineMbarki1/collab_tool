import { Card, CardBody, CardFooter } from "@/components/Card";
import clsx from "clsx";

import styles from "./Message.module.css";
import { ChatMessage } from "../types";

export default function Message({
  message,
  className,
  messageWrapperClassName,
}: {
  message: ChatMessage;
  className?: string;
  messageWrapperClassName?: string;
}) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.avatar}></div>
      <Card className={clsx(styles.messageContainer, messageWrapperClassName)}>
        <CardBody className={styles.messageBodyWrapper}>
          <p className={styles.messageBody}>{message.body}</p>
        </CardBody>
        <CardFooter className={styles.statusWrapper}>
          <small style={{ fontSize: "0.8rem" }}>
            {message.status === "loading"
              ? "sending..."
              : message.status === "failed"
              ? "failed to send"
              : message.status === "succeeded"
              ? "sent"
              : ""}
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}

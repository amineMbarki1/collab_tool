import { Avatar } from "@/components/Avatar";
import { Card, CardBody, CardFooter } from "@/components/Card";

import styles from "./Message.module.css";
import { ChatMessage } from "../types";

export default function Message({ message }: { message: ChatMessage }) {
  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} />
      <Card className={styles.messageContainer}>
        <CardBody className={styles.messageBodyWrapper}>
          <p className={styles.messageBody}>{message.body}</p>
        </CardBody>
        <CardFooter className={styles.statusWrapper}>
          <small>
            {message.status === "loading"
              ? "sending..."
              : message.status === "failed"
              ? "failed to send"
              : "Sent"}
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}

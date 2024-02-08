import { Avatar } from "@/components/Avatar";
import { Card, CardBody } from "@/components/Card";
import { User } from "@/types";

import styles from "./Member.module.css";
import { ReactNode } from "react";

interface Props {
  member: User;
  action?: ReactNode;
}

export default function Member({ member, action }: Props) {
  const { email, firstName, lastName } = member;

  return (
    <>
      
      <Card className={styles.member}>
        <CardBody className={styles.content}>
          <Avatar />
          <small title={`${firstName} ${lastName}`} className={styles.text}>
            {firstName} {lastName}
          </small>

          <small title={email} className={styles.text}>
            {email}
          </small>
          {action}
        </CardBody>
      </Card>
    </>
  );
}

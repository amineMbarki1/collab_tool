import { useEffect } from "react";

import { Button } from "@/components/Button";
import { useAppStore } from "@/hooks";
import { Member } from "@/features/team";
import { getMembersAction } from "../topicsSlice";
import { Topic } from "../types";
import styles from "./InviteMembers.module.css";

import PersonRemoveIcon from "@/assets/icons/person-remove.svg?react";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import NextIcon from "@/assets/icons/next-icon.svg?react";
import InviteMembers from "./InviteMembers";

export default function TopicMembers({ topic }: { topic: Topic }) {
  const { dispatch, useAppSelector } = useAppStore();
  const { getMembersStatus } = useAppSelector((state) => state.topic);

  useEffect(() => {
    if (!getMembersStatus[topic.id] || getMembersStatus[topic.id] === "idle")
      dispatch(getMembersAction(topic)).unwrap().then(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {getMembersStatus[topic.id] === "succeeded" &&
        topic.members.length === 0 && (
          <>
            <EmptyDataIndicator
              wrapperClassName={styles.emptyDataIndicator}
              message="No members Yet start adding members from your team"
            />
            <Button className={styles.nextButton} iconRight={<NextIcon />}>
              Add members
            </Button>
          </>
        )}
      {getMembersStatus[topic.id] === "succeeded" && (
        <div className={styles.container}>
          {topic.members.map((member) => (
            <Member
              key={member.id}
              member={member}
              action={
                <Button
                  iconLeft={<PersonRemoveIcon />}
                  fullWidth
                  size="sm"
                  color="accent"
                >
                  remove
                </Button>
              }
            />
          ))}
        </div>
      )}
      <InviteMembers topic={topic}/>
    </>
  );
}

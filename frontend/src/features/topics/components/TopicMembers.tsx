import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { useAppStore } from "@/hooks";
import { Member, MemberSkeleton } from "@/features/team";
import { getMembersAction, removeMemberAction } from "../topicsSlice";
import { Topic } from "../types";
import styles from "./InviteMembers.module.css";

import PersonRemoveIcon from "@/assets/icons/person-remove.svg?react";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import NextIcon from "@/assets/icons/next-icon.svg?react";
import BackIcon from "@/assets/icons/chevron-left-icon.svg?react";
import InviteMembers from "./InviteMembers";

export default function TopicMembers({ topic }: { topic: Topic }) {
  const [showMembers, setShowMembers] = useState(true);
  const { dispatch, useAppSelector } = useAppStore();
  const { getMembersStatus, removeMemberStatus } = useAppSelector((state) => state.topic);

  useEffect(() => {
    if (!getMembersStatus[topic.id] || getMembersStatus[topic.id] === "idle")
      dispatch(getMembersAction(topic)).unwrap().then(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return showMembers ? (
    <>
      <Button
        onClick={() => setShowMembers(false)}
        className={styles.nextButton}
        iconRight={<NextIcon />}
      >
        Add members
      </Button>
      {getMembersStatus[topic.id] === "succeeded" &&
        topic.members.length === 0 && (
          <EmptyDataIndicator
            wrapperClassName={styles.emptyDataIndicator}
            message="No members Yet start adding members from your team"
          />
        )}

      <div className={styles.container}>
        {getMembersStatus[topic.id] === "loading" && skeleton}
        {getMembersStatus[topic.id] === "succeeded" &&
          topic.members.map((member) => (
            <Member
              key={member.id}
              member={member}
              action={
                <Button
                  iconLeft={<PersonRemoveIcon />}
                  fullWidth
                  size="sm"
                  color="accent"
                  isLoading={removeMemberStatus[topic.id + member.id] === "loading"}
                  onClick={() =>
                    dispatch(removeMemberAction({ topic, member }))
                  }
                >
                  remove
                </Button>
              }
            />
          ))}
      </div>
    </>
  ) : (
    <>
      <Button
        iconLeft={<BackIcon />}
        className={styles.nextButton}
        onClick={() => setShowMembers(true)}
      >
        Members
      </Button>
      <small style={{ fontWeight: 600 }}>Add new members from your team</small>
      <InviteMembers topic={topic} />
    </>
  );
}

const skeleton = (
  <>
    <MemberSkeleton />
    <MemberSkeleton />
    <MemberSkeleton />
    <MemberSkeleton />
    <MemberSkeleton />
  </>
);

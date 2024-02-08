import { useEffect } from "react";
import { toast } from "react-toastify";

import { useAppStore } from "@/hooks";
import { getTeamAction } from "@/features/team";
import { Button } from "@/components/Button";
import { Member } from "@/features/team";
import styles from "./InviteMembers.module.css";
import {
  addNewMemberAction,
  selectTopicById,
  selectTopicMemberExistsById,
} from "../topicsSlice";
import { Topic } from "../types";

import { MemberSkeleton } from "@/features/team";

export default function InviteMembers({ topic }: { topic: Topic }) {
  const { useAppSelector, dispatch } = useAppStore();
  const { members, status } = useAppSelector((state) => state.team);
  const { addMemberStatus, topics } = useAppSelector((state) => state.topic);

  useEffect(() => {
    if (status === "idle" && members.length === 0) dispatch(getTeamAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {status === "loading" && skeleton}
      {status === "succeeded" &&
        members.map((member) => (
          <Member
            key={member.id}
            member={member}
            action={
              <Button
                fullWidth
                disabled={selectTopicMemberExistsById(
                  selectTopicById(topics, topic.id)!,
                  member.id
                )}
                isLoading={
                  addMemberStatus[member.id + `${topic.id}`] === "loading"
                }
                onClick={() => {
                  dispatch(addNewMemberAction({ topic, member }))
                    .unwrap()
                    .then((res) => {
                      toast.success(res);
                    })
                    .catch((error) => {
                      toast.error(error);
                    });
                }}
                size="sm"
              >
                Invite
              </Button>
            }
          />
        ))}
    </div>
  );
}

const skeleton = (
  <>
    <MemberSkeleton />
    <MemberSkeleton />
    <MemberSkeleton />
    <MemberSkeleton />
  </>
);

import { useEffect, useState } from "react";

import { TextFieldInput } from "@/components/Form";
import { getTeamAction } from "..";
import { Button } from "@/components/Button";
import {
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
} from "@/components/Layout";
import { useAppStore } from "@/hooks";
import { NavLink } from "@/components/NavLink";
import { Avatar } from "@/components/Avatar";
import styles from "./TeamMembers.module.css";
import EditTeamModal from "./EditTeam";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import MemberSkeletonInline from "./MemberSkeletonInline";

export default function Topics() {
  const { dispatch, useAppSelector } = useAppStore();
  const { members, status } = useAppSelector((state) => state.team);
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  useEffect(() => {
    if (status === "idle") dispatch(getTeamAction());
  }, [dispatch, status]);
  return (
    <>
      <EditTeamModal
        isOpen={isAddMembersModalOpen}
        onClose={() => setIsAddMembersModalOpen(false)}
      />
      <Section className={styles.teamSection}>
        <SectionHeader>
          <h1>Team</h1>
        </SectionHeader>
        <TextFieldInput size="lg" placeholder="Search team members..." />

        <SectionContent>
          {status === "loading" && (
            <>
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
              {<MemberSkeletonInline />}
            </>
          )}

          {status === "succeeded" && (
            <ul className={styles.postsList}>
              {members.length === 0 && status === "succeeded" && (
                <EmptyDataIndicator message="No members on your team yet" />
              )}
              {members.map(({ firstName, lastName, email, id }) => (
                <li key={id}>
                  <NavLink
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar />
                    <div>
                      <span style={{ display: "block" }}>
                        {firstName} {lastName}
                      </span>
                      <small>{email}</small>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </SectionContent>
        <SectionFooter>
          <Button
            onClick={() => setIsAddMembersModalOpen(true)}
            fullWidth
            size="lg"
          >
            EDIT TEAM
          </Button>
        </SectionFooter>
      </Section>
    </>
  );
}

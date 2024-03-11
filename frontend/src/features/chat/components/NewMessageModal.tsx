import { Avatar } from "@/components/Avatar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@/components/Dialog";
import { TextFieldInput } from "@/components/Form";
import { useAppStore } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { MemberSkeletonInline, getTeamAction } from "@/features/team";

import styles from "./NewMessageModal.module.css";
import { Link } from "react-router-dom";

export default function NewMessageModal({ isOpen, onClose }: ModalProps) {
  const { dispatch, useAppSelector } = useAppStore();
  const { members, status } = useAppSelector((state) => state.team);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    return members.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`.startsWith(searchTerm)
    );
  }, [searchTerm, members]);

  useEffect(() => {
    if (status === "idle" && isOpen) dispatch(getTeamAction());
  }, [dispatch, status, isOpen]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader onCLose={onClose} title="New Message"></ModalHeader>
      <ModalContent>
        <TextFieldInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          wrapperClassName={styles.searchInput}
          placeholder="Search Team"
        />

        {status === "loading" && (
          <>
            <MemberSkeletonInline />
            <MemberSkeletonInline />
            <MemberSkeletonInline />
          </>
        )}
        <ul>
          {searchResults.map((member) => (
            <li>
              <Link
                onClick={onClose}
                to={`/chat/${member.id}`}
                state={{ receiver: member }}
              >
                <NavLink className={styles.member}>
                  <Avatar />
                  <strong>
                    {member.firstName} {member.lastName}
                  </strong>
                </NavLink>
              </Link>
            </li>
          ))}
        </ul>
      </ModalContent>
    </Modal>
  );
}

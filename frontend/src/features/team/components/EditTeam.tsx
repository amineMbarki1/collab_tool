import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@/components/Dialog";
import Member from "./Member";
import ExpandMoreIcon from "@/assets/icons/expand-more.svg?react";
import { useAppStore } from "@/hooks";
import { Button } from "@/components/Button";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import AddIcon from "@/assets/icons/add-circle-icon.svg?react";
import { TextFieldInput } from "@/components/Form";
import DoneIcon from "@/assets/icons/done-icon.svg?react";
import {
  addMemberAction,
  removeMemberAction,
  resetSearchedUsers,
  searchUsersAction,
  selectUserExistsById,
} from "..";
import Loader from "@/components/Loader/Loader";

import styles from "./AddMembers.module.css";
import { toast } from "react-toastify";

export default function EditTeam(props: ModalProps) {
  const { useAppSelector, dispatch } = useAppStore();
  const {
    members,
    searchedUsers,
    searchUsersStatus,
    addMemberStatus,
    removeMemberStatus,
  } = useAppSelector((state) => state.team);
  const debounced = useDebouncedCallback(
    (value) => {
      dispatch(searchUsersAction(value));
    },

    500
  );

  const [isMyTeamOpen, setIsMyTeamOpen] = useState(true);

  function handleClose() {
    if (props.onClose) props.onClose();
    dispatch(resetSearchedUsers());
  }

  return (
    <Modal {...props} onClose={handleClose}>
      <ModalHeader title="Add members" />
      <ModalContent className={styles.content}>
        <div
          className={styles.header}
          onClick={() => setIsMyTeamOpen(!isMyTeamOpen)}
        >
          <h5>My Team</h5>
          <ExpandMoreIcon />
        </div>

        {members.length === 0 && (
          <small>
            Your team is empty :'( add a new member to your team below
          </small>
        )}
        {isMyTeamOpen && members.length > 0 && (
          <div className={styles.membersList}>
            {members.map((member) => (
              <Member
                action={
                  <Button
                    fullWidth
                    isLoading={removeMemberStatus[member.id] === "loading"}
                    onClick={() =>
                      dispatch(removeMemberAction(member))
                        .unwrap()
                        .then((message) => toast.success(message))
                    }
                    iconRight={<RemoveIcon />}
                    color="accent"
                    size="sm"
                  >
                    REMOVE
                  </Button>
                }
                key={member.id}
                member={member}
              />
            ))}
          </div>
        )}
        <br />
        <h5>Add new members</h5>
        <div style={{ display: "flex" }}></div>
        <div className={styles.searchContainer}>
          <TextFieldInput
            wrapperClassName={styles.searchInput}
            placeholder="Search existing users by email or full name"
            onChange={(e) => {
              debounced({
                email: e.target.value,
                fullName: e.target.value,
              });
            }}
          />
          <div style={{ marginLeft: "auto" }}>
            {searchUsersStatus === "loading" && <Loader color="primary" />}
            {searchUsersStatus === "succeeded" && (
              <DoneIcon className={styles.doneIcon} />
            )}
          </div>
        </div>
        <div className={styles.membersList}>
          {searchUsersStatus === "succeeded" &&
            searchedUsers.length > 0 &&
            searchedUsers.map((user) => (
              <Member
                key={user.id}
                member={user}
                action={
                  <Button
                    fullWidth
                    disabled={selectUserExistsById(members, user.id)}
                    isLoading={addMemberStatus[user.id] === "loading"}
                    onClick={() =>
                      dispatch(addMemberAction(user))
                        .unwrap()
                        .then((message) => toast.success(message))
                        .catch((error) => toast.error(error.message))
                    }
                    size="sm"
                    iconRight={<AddIcon />}
                  >
                    Add
                  </Button>
                }
              />
            ))}
          {searchedUsers.length === 0 && searchUsersStatus === "succeeded" && (
            <p>No users were found</p>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}

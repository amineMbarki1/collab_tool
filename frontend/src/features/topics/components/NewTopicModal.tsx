import { SyntheticEvent, useState } from "react";

import { Button } from "@/components/Button";
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@/components/Dialog";
import { TextFieldInput, TextareaFieldInput } from "@/components/Form";
import styles from "./NewTopicModal.module.css";
import { useAppStore } from "@/hooks";
import { createTopicAction } from "../topicsSlice";
import { toast } from "react-toastify";
import InviteMembers from "./InviteMembers";
import { Topic } from "../types";
import Alert from "@/components/Alert/Alert";

export default function NewTopicModal(props: ModalProps) {
  const { dispatch, useAppSelector } = useAppStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newTopic, setNewTopic] = useState<null | Topic>(null);

  const { createTopicStatus } = useAppSelector((state) => state.topic);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(createTopicAction({ name, description }))
      .unwrap()
      .then((topic) => {
        toast.success("Topic created successfully");
        setNewTopic(topic);
      });
  };

  return (
    <Modal {...props}>
      <ModalHeader title="New topic" />
      <ModalContent>
        {newTopic ? (
          <>
            <Alert variant="success" />
            <InviteMembers topic={newTopic} />
          </>
        ) : (
          <>
            <form id="new-topic" onSubmit={handleSubmit}>
              <TextFieldInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
                label="Topic name"
              />
              <TextareaFieldInput
                onChange={(e) => setDescription(e.target.value)}
                label="description"
              />
            </form>
          </>
        )}
      </ModalContent>
      <ModalFooter className={styles.modalFooter}>
        {newTopic ? (
          <Button onClick={props.onClose} variant="outline" type="button">
            DONE
          </Button>
        ) : (
          <Button
            type="submit"
            form="new-topic"
            isLoading={createTopicStatus === "loading"}
          >
            Create
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

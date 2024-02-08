import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/Dialog";
import { ModalProps } from "@/components/Dialog";
import { useState } from "react";

import { Topic } from "../types";
import { Button } from "@/components/Button";

import styles from "./TopicDetails.module.css";

import TopicMembers from "./TopicMembers";
import TopicDetails from "./TopicDetails";

interface Props extends ModalProps {
  topic: Topic;
}

export default function TopicDetailsModal({ topic, ...props }: Props) {
  const [openTab, setOpenTab] = useState<"members" | "details">("details");

  return (
    <Modal {...props}>
      <ModalHeader className={styles.header} title={"#" + topic.name}>
        <button
          onClick={() => setOpenTab("details")}
          className={`${styles.tab} ${
            openTab === "details" ? styles.active : ""
          }`}
        >
          DETAILS
        </button>
        <button
          onClick={() => setOpenTab("members")}
          className={`${styles.tab} ${
            openTab === "members" ? styles.active : ""
          }`}
        >
          MEMBERS
        </button>
      </ModalHeader>
      <ModalContent className={styles.content}>
        {openTab === "details" && <TopicDetails topic={topic} />}

        {openTab === "members" && <TopicMembers topic={topic} />}

        
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button className={styles.deleteButton} color="accent">DELETE</Button>
        <Button variant="outline" color="primary">SAVE</Button>
      </ModalFooter>
    </Modal>
  );
}

import { useState } from "react";

import {
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
} from "@/components/Layout";
import styles from "./Messages.module.css";
import NewMessageModal from "./NewMessageModal";
import { Button } from "@/components/Button";

export default function Messages() {
  const [isNewMessageModalOpen, setIsNewTopicModalOpen] = useState(false);

  return (
    <Section className={styles.section}>
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewTopicModalOpen(false)}
      />
      <SectionHeader>
        <h2>Messages</h2>
      </SectionHeader>
      <SectionContent>messages</SectionContent>
      <SectionFooter>
        <Button
          onClick={() => setIsNewTopicModalOpen(true)}
          fullWidth
          size="lg"
        >
          New Message
        </Button>
      </SectionFooter>
    </Section>
  );
}

import { useParams } from "react-router-dom";

import {
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
} from "@/components/Layout";
import styles from "./Chat.module.css";
import MessageInput from "../components/MessageInput";
import Message from "../components/Message";
import { useAppStore } from "@/hooks";

export default function Chat() {
  const { id } = useParams();
  const { useAppSelector } = useAppStore();
  const messages = useAppSelector((state) => state.chat.messages[+id!]);

  return (
    <Section className={styles.section}>
      <SectionHeader>helloo</SectionHeader>
      <SectionContent>
        {messages &&
          messages.map(({ body, direction, status }) => (
            <Message message={{ body, direction, status }} />
          ))}
      </SectionContent>
      <SectionFooter>
        <MessageInput receiverId={+id!} />
      </SectionFooter>
    </Section>
  );
}

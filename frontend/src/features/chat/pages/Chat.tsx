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
import { useEffect } from "react";
import { getChatPartnerAction, getMessagesAction } from "../chatSlice";
import { Avatar } from "@/components/Avatar";
import Skeleton from "react-loading-skeleton";

export default function Chat() {
  const { id } = useParams();
  const { useAppSelector, dispatch } = useAppStore();
  const messages = useAppSelector((state) => state.chat.messages[+id!]);

  const partner = useAppSelector((state) =>
    state.chat.chatPartners.find((user) => user.id === +id!)
  );

  const status = useAppSelector(
    (state) => state.chat.getPartnerRequestStatus[+id!]
  );

  useEffect(() => {
    dispatch(getMessagesAction(+id!));
    if (id && status !== "succeeded") dispatch(getChatPartnerAction(+id!));
  }, [dispatch, id, status]);

  return (
    <Section className={styles.section}>
      <SectionHeader className={styles.header}>
        {status === "loading" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Skeleton circle style={{ width: 32, height: 32 }} />
            <Skeleton width={100} />
          </div>
        )}
        {partner && (
          <>
            <Avatar />
            <span className={styles.fullName}>
              {partner.firstName + " " + partner.lastName}
            </span>
          </>
        )}
      </SectionHeader>
      <SectionContent className={styles.messagesWrapper}>
        {messages &&
          messages.map(({ body, direction, status }) => (
            <Message
              className={direction === "RECEIVED" ? styles.right : undefined}
              messageWrapperClassName={
                direction === "SENT" ? styles.left : undefined
              }
              message={{ body, direction, status }}
            />
          ))}
      </SectionContent>
      <SectionFooter>
        <MessageInput receiverId={+id!} />
      </SectionFooter>
    </Section>
  );
}

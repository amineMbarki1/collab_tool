import { useEffect, useState } from "react";

import {
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
  Sidesection,
} from "@/components/Layout";
import styles from "./Messages.module.css";
import NewMessageModal from "./NewMessageModal";
import { Button } from "@/components/Button";
import { useAppStore } from "@/hooks";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { getRecentMessagesAction } from "..";
import Skeleton from "react-loading-skeleton";

export default function Messages() {
  const [isNewMessageModalOpen, setIsNewTopicModalOpen] = useState(false);

  const { useAppSelector, dispatch } = useAppStore();
  const { getRecentMessagesStatus, recentMessages } = useAppSelector(
    (state) => state.chat
  );
  console.log(recentMessages);

  useEffect(() => {
    dispatch(getRecentMessagesAction());
  }, [dispatch]);

  return (
    <Sidesection className={styles.section}>
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewTopicModalOpen(false)}
      />
      <SectionHeader>
        <h2>Messages</h2>
      </SectionHeader>
      <SectionContent>
        {getRecentMessagesStatus === "loading" &&
          Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                style={{ marginBottom: 8, paddingLeft: 12, paddingRight: 12 }}
              >
                <Skeleton width={200} key={i} count={2} />
              </div>
            ))}
        <ul className={styles.topicsList}>
          {recentMessages.map((message) => (
            <li key={message.partnerId}>
              <Link to={`/chat/${message.partnerId}`}>
                <NavLink>
                  <span style={{ fontWeight: "bold" }}>
                    {message.partnerFullName}
                  </span>
                  <small style={{ display: "block" }}>
                    {message.lastMessage}
                  </small>
                </NavLink>
              </Link>
            </li>
          ))}
        </ul>
      </SectionContent>
      <SectionFooter>
        <Button
          onClick={() => setIsNewTopicModalOpen(true)}
          fullWidth
          size="lg"
        >
          New Message
        </Button>
      </SectionFooter>
    </Sidesection>
  );
}

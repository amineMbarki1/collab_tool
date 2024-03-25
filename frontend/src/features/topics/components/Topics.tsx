import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { TextFieldInput } from "@/components/Form";
import { Button } from "@/components/Button";
import NewTopicModal from "./NewTopicModal";
import {
  SectionContent,
  SectionFooter,
  SectionHeader,
  Sidesection,
} from "@/components/Layout";
import { NavLink } from "@/components/NavLink";
import { useAppStore } from "@/hooks";
import { getTopicsAction } from "../topicsSlice";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";

import styles from "./Topic.module.css";

export default function Topics() {
  const { dispatch, useAppSelector } = useAppStore();
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const { topics, getTopicsStatus } = useAppSelector((state) => state.topic);
  const { pathname } = useLocation();

  useEffect(() => {
    if (getTopicsStatus !== "succeeded") dispatch(getTopicsAction());
  }, [dispatch, getTopicsStatus]);

  return (
    <>
      {isNewTopicModalOpen && (
        <NewTopicModal
          isOpen={isNewTopicModalOpen}
          onClose={() => setIsNewTopicModalOpen(false)}
        />
      )}
      <Sidesection className={styles.topicsSection}>
        <SectionHeader>
          <h1>Topics</h1>
        </SectionHeader>

        <TextFieldInput size="lg" placeholder="Search..." />

        <SectionContent>
          {topics.length === 0 && getTopicsStatus === "succeeded" && (
            <EmptyDataIndicator message="No topics yet" />
          )}
          <ul className={styles.topicsList}>
            {getTopicsStatus === "loading" && renderTopicsLoader()}
            {topics.map((topic) => (
              <li key={topic.id}>
                <Link to={`/topics/${topic.id}`}>
                  <NavLink active={pathname === `/topics/${topic.id}`}>
                    #{topic.name}
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
            New topic
          </Button>
        </SectionFooter>
      </Sidesection>
    </>
  );
}

function renderTopicsLoader() {
  return (
    <>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
      <div className={styles.skeleton}>
        <Skeleton />
      </div>
    </>
  );
}

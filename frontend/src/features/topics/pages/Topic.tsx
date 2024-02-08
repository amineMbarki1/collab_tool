import { useEffect, useState } from "react";

import { IconButton } from "@/components/Button";
import Post from "../components/Post/Post";
import NewPostInput from "../components/Post/NewPostInput";
import InfoIcon from "@/assets/icons/icon-info.svg?react";

import {
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
} from "@/components/Layout";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/hooks";
import { selectTopicById } from "../topicsSlice";
import { getAllPostsAction, selectPostsByTopicId } from "../postsSlice";
import styles from "./Topic.module.css";
import TopicDetails from "../components/TopicDetailsModal";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import Test from "@/Test";

export default function Topic() {
  const { useAppSelector, dispatch } = useAppStore();
  const { id } = useParams();

  const topic = useAppSelector(({ topic: { topics } }) =>
    selectTopicById(topics, parseInt(id!))
  );
  const posts = useAppSelector((state) =>
    selectPostsByTopicId(state, parseInt(id!))
  );

  const { getPostsStatus } = useAppSelector((state) => state.post);

  const [isTopicDetailsOpen, setIsTopicDetailsOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(getAllPostsAction({ topicId: parseInt(id) }));
  }, [id, dispatch]);

  return (
    topic && (
      <>
        <Test />
        {isTopicDetailsOpen && (
          <TopicDetails
            topic={topic}
            isOpen={isTopicDetailsOpen}
            onClose={() => setIsTopicDetailsOpen(false)}
          />
        )}
        <Section className={styles.postsSection}>
          <SectionHeader className={styles.header}>
            <h1>#{topic?.name}</h1>
            <IconButton
              onClick={() => setIsTopicDetailsOpen(true)}
              icon={<InfoIcon />}
            />
          </SectionHeader>
          <SectionContent>
            {posts.length === 0 && getPostsStatus[id!] === "succeeded" && (
              <EmptyDataIndicator
                wrapperClassName={styles.empty}
                message={"No posts Yet"}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "10px 20px",
              }}
            >
              {posts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </SectionContent>
          <SectionFooter>
            <NewPostInput topic={topic!} />
          </SectionFooter>
        </Section>
      </>
    )
  );
}

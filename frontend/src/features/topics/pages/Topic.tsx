
/*
A bug here "isToday(new Date("1994-12-04")"
if the month name too long overlaps the timeline
*/

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
import TopicDetails from "../components/TopicDetailsModal";
import { EmptyDataIndicator } from "@/components/EmptyDataIndicator";
import isToday from "@/utils/isToday";

import styles from "./Topic.module.css";

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
            <div className={styles.timeline}>
              <div className={styles.postsWrapper}>
                {posts.map((post) => {
                  return (
                    <div key={post.id} className={styles.postWrapper}>
                      <span className={styles.postedOn}>
                        <small className={styles.postedAt}>
                          {isToday(new Date(post.createdOn))}
                        </small>
                        7:24
                      </span>
                      <div className={styles.circle}></div>
                      <Post post={post} key={post.id} />
                    </div>
                  );
                })}
              </div>
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


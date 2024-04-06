import { Link } from "react-router-dom";

import { Avatar } from "@/components/Avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import ThumbsUpIcon from "@/assets/icons/icon-thumbs-up.svg?react";
import CommentIcon from "@/assets/icons/icon-comment.svg?react";
import SendIcon from "@/assets/icons/icon-send.svg?react";
import { Button, IconButton } from "@/components/Button";
import { TextFieldInput } from "@/components/Form";
import { MarkdownReader } from "@/components/MarkdownEditor";
import { Post as PostType } from "../../types";
import OpenIcon from "@/assets/icons/icon-open.svg?react";
import styles from "./Post.module.css";

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.arrow}></div>
        <Card className={styles.post}>
          <CardHeader className={styles.header}>
            <Avatar className={styles.avatar} />
            <div>
              <span className={styles.postInfo}>
                {post.user.firstName} {post.user.lastName}
              </span>
              <small style={{ display: "block" }}>4min ago</small>
            </div>
            <Link className={styles.openButton} to={`post/${post.id}`}>
              <IconButton  icon={<OpenIcon />} />
            </Link>
          </CardHeader>
          <CardBody>
            <MarkdownReader markdown={post.content} />
          </CardBody>
          <CardFooter>
            <div className={styles.comment}>
              <TextFieldInput placeholder="Write your commment beautiful" />
              <Button
                variant="ghost"
                color="secondary"
                iconLeft={<SendIcon />}
              />
            </div>
            <div className={styles.reaction}>
              <Button
                className={styles.ghostButton}
                variant="ghost"
                color="secondary"
                iconLeft={<ThumbsUpIcon />}
              >
                120
              </Button>
              <Button
                className={styles.ghostButton}
                variant="ghost"
                color="secondary"
                iconLeft={<CommentIcon />}
              >
                Comments
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

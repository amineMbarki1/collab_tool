import { useNavigate, useParams } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@/components/Dialog";
import { selectPostById } from "../..";
import { useAppStore } from "@/hooks";
import { Button } from "@/components/Button";
import { MarkdownReader } from "@/components/MarkdownEditor";
import ThumbsUpIcon from "@/assets/icons/icon-thumbs-up.svg?react";
import CommentIcon from "@/assets/icons/icon-comment.svg?react";

import styles from "./Post.module.css";

export default function PostModal() {
  const { useAppSelector } = useAppStore();
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector((state) => selectPostById(state, +postId!));

  const isOpen = true;
  const onClose = () => navigate(-1);

  return (
    post && (
      <Modal className={styles.modal} isOpen={isOpen} onClose={onClose}>
        <ModalHeader
          onCLose={onClose}
          title={`${post.user.firstName + " " + post.user.lastName}'s post`}
        ></ModalHeader>
        <ModalContent className={styles.modalContent}>
          <MarkdownReader markdown={post.content} />
        </ModalContent>
        <ModalFooter>
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
        </ModalFooter>
      </Modal>
    )
  );
}

import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef } from "react";

import { MarkdownEditor } from "@/components/MarkdownEditor";
import { Card, CardBody, CardFooter } from "@/components/Card";
import { Button } from "@/components/Button";
import SendIcon from "@/assets/icons/icon-send.svg?react";
import styles from "./NewPostInput.module.css";
import AttachFiles from "./AttachFiles";
import { Topic } from "../../types";
import { useAppStore } from "@/hooks";
import { createPostAction } from "../../postsSlice";
import { toast } from "react-toastify";

export default function NewPostInput({ topic }: { topic: Topic }) {
  const ref = useRef<MDXEditorMethods>(null);

  const { dispatch, useAppSelector } = useAppStore();
  const { createPostStatus } = useAppSelector((state) => state.post);

  async function handleSubmit() {
    const markdown = ref.current?.getMarkdown();
    if (markdown === "") return toast.error("Empty post");
    dispatch(createPostAction({ content: markdown!, topicId: topic.id }))
      .unwrap()
      .then(() => {
        toast.success("Post created successfully");
        ref.current?.setMarkdown("");
      });
  }

  return (
    <Card>
      <CardBody>
        <MarkdownEditor
          ref={ref}
          onChange={(val) => console.log(val)}
          markdown=""
        />
      </CardBody>
      <CardFooter className={styles.footer}>
        {/* <AttachFiles /> */}
        <Button
          onClick={handleSubmit}
          variant="outline"
          iconRight={<SendIcon />}
          className={styles.postButton}
          isLoading={createPostStatus === "loading"}
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}

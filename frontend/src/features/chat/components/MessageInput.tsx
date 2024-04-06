import { FormEventHandler, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { TextFieldInput } from "@/components/Form";
import SendIcon from "@/assets/icons/icon-send.svg?react";
import EmojIcon from "@/assets/icons/icon-emoji.svg?react";
import AttachIcon from "@/assets/icons/icon-attatch.svg?react";

import styles from "./MessageInput.module.css";
import { createMessageAction } from "../chatSlice";
import { useAppStore } from "@/hooks";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ receiverId }: { receiverId: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const { dispatch, useAppSelector } = useAppStore();

  const senderId = useAppSelector((state) => state.auth.user!.id);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const message = inputRef.current?.value;

    if (message) {
      dispatch(createMessageAction({ body: message, receiverId, senderId }));
      inputRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextFieldInput
        ref={inputRef}
        type="textarea"
        wrapperClassName={styles.inputWrapper}
        size="lg"
      />
      <button
        type="button"
        style={{ position: "relative" }}
        onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
        className={styles.emojiButton}
      >
        <EmojIcon />
        <div onClick={(e) => e.stopPropagation()}>
          {isEmojiPickerOpen && (
            <EmojiPicker
              onEmojiClick={({ emoji }) =>
                (inputRef!.current!.value = `${inputRef?.current?.value}${emoji}`)
              }
              className={styles.emojiPicker}
            />
          )}
        </div>
      </button>
      <button className={styles.emojiButton}>
        <AttachIcon />
      </button>
      <Button iconLeft={<SendIcon />} />
    </form>
  );
}

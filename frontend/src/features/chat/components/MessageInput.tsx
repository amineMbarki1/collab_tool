import { FormEventHandler, useRef } from "react";
import { Button } from "@/components/Button";
import { TextFieldInput } from "@/components/Form";
import SendIcon from "@/assets/icons/icon-send.svg?react";

import styles from "./MessageInput.module.css";
import { createMessageAction } from "../chatSlice";
import { useAppStore } from "@/hooks";

export default function MessageInput({ receiverId }: { receiverId: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch, useAppSelector } = useAppStore();

  const senderId = useAppSelector((state) => state.auth.user!.id);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const message = inputRef.current?.value;

    if (message)
      dispatch(createMessageAction({ body: message, receiverId, senderId }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextFieldInput
        ref={inputRef}
        type="textarea"
        wrapperClassName={styles.inputWrapper}
        size="lg"
      />
      <Button iconLeft={<SendIcon />} />
    </form>
  );
}

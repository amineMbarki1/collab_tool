import { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { Card } from "../Card";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  onClose,
  isOpen,
}: PropsWithChildren<Props>) {
  return (
    isOpen && (
      <div onClick={onClose} className={styles.overlay}>
        <Card className={styles.content} onClick={(e) => e.stopPropagation()}>
          {children}
        </Card>
      </div>
    )
  );
}

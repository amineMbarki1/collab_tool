import { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { Card } from "../Card";
import clsx from "clsx";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
}

export default function Modal({
  children,
  onClose,
  isOpen,
  className,
}: PropsWithChildren<Props>) {
  return (
    isOpen && (
      <div onClick={onClose} className={styles.overlay}>
        <Card
          className={clsx(styles.content, className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </Card>
      </div>
    )
  );
}

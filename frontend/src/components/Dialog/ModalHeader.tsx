import clsx from "clsx";
import { CardHeader } from "../Card";
import styles from "./Modal.module.css";
import { IconButton } from "../Button";
import CloseIcon from "@/assets/icons/icon-close.svg?react";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
  title: string;
  onCLose?: () => void;
}

export default function ModalHeader({
  className,
  title,
  onCLose,
  children,
}: PropsWithChildren<Props>) {
  return (
    <CardHeader className={clsx(className)}>
      <div className={styles.modalHeader}>
        <h4>{title}</h4>
        <IconButton onClick={onCLose && onCLose} icon={<CloseIcon />} />
      </div>
      {children}
    </CardHeader>
  );
}

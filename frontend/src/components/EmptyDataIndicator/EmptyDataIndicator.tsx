import clsx from "clsx";

import emptyDataImage from "@/assets/icons/empty-data-icon.png";
import styles from "./EmptyDataIndicator.module.css";

export default function EmptyDataIndicator({
  className = "",
  wrapperClassName = "",
  message,
}: {
  className?: string;
  wrapperClassName?: string;
  message?: string;
}) {
  return (
    <div className={clsx(wrapperClassName, styles.wrapper)}>
      <img src={emptyDataImage} className={clsx(styles.image, className)} />
      <span className={styles.message}>{message}</span>
    </div>
  );
}

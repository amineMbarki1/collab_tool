import { ComponentProps } from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

export default function Card({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} className={clsx(styles.card, className)}>
      {children}
    </div>
  );
}

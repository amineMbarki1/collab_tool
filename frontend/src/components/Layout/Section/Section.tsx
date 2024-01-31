import { ReactNode } from "react";
import styles from "./Section.module.css";
import clsx from "clsx";

export default function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx(styles.section, className)}>{children}</section>
  );
}

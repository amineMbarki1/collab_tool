import { ReactNode } from "react";
import styles from "./Section.module.css";
import clsx from "clsx";

export default function SectionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(styles.sectionContent, className)}>{children}</div>
  );
}

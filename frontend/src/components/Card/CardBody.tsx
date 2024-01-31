import { ReactNode } from "react";

import styles from "./CardBody.module.css";
import clsx from "clsx";

export default function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.cardBody, className)}>{children}</div>;
}

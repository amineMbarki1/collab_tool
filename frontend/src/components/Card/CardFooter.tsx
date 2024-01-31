import { PropsWithChildren } from "react";

import styles from "./CardFooter.module.css";
import clsx from "clsx";

interface Props {
  className?: string;
}

export default function CardFooter({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx(styles.cardfooter, { [className!]: !!className })}>
      {children}
    </div>
  );
}

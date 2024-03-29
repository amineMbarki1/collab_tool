import { ComponentProps, PropsWithChildren } from "react";

import styles from "./NavLink.module.css";
import clsx from "clsx";

interface Props extends ComponentProps<"span"> {
  active?: boolean;
}

export default function NavLink({
  children,
  active = false,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span
      {...props}
      className={clsx({
        [styles.navLink]: true,
        [styles.active]: active,
        [className!]: !!className,
      })}
    >
      {children}
    </span>
  );
}

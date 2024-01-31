import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./IconButton.module.css";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
}

export default function IconButton({ icon, className, ...props }: Props) {
  return (
    <button className={clsx(styles.iconButton, className)} {...props}>
      {icon}
    </button>
  );
}

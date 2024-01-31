import clsx from "clsx";

import CheckIcon from "@/assets/icons/done-icon.svg?react";
import styles from "./Alert.module.css";

interface Props {
  variant: "success";
  className?: string;
}

export default function Alert({ variant, className }: Props) {
  const composedClassName = clsx({
    [styles.alert]: true,
    [styles.success]: variant === "success",
    [className!]: !!className,
  });

  return (
    <div className={composedClassName}>
      <div className={styles.alertIcon}>{renderIcon(variant)}</div>

      <small style={{ display: "block", fontWeight: 600 }}>
        {/* <DotIcon style={{ height: 7, fill: "green", width:15 }} /> */}
        Topic created successfully you can start adding members from your team
      </small>
    </div>
  );
}

function renderIcon(variant: string) {
  if (variant === "success") return <CheckIcon />;
}

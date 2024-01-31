import { ComponentProps} from "react";

import  styles from "./CardHeader.module.css";

export default function CardHeader({
  children,
  className,
  ...props
}:ComponentProps<"div">) {
  return (
    <div {...props} className={`${styles.cardHeader} ${className ? className : ""}`} >
      {children}
    </div>
  );
}

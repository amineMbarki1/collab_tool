import { ReactNode } from "react";

import Loader from "../Loader/Loader";
import styles from "./OverlayLoader.module.css";

export default function OverlayLoader({
  children,
  isLoading = true,
}: {
  children: ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.overlay}>
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
}

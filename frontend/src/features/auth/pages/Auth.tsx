import { Outlet } from "react-router-dom";

import styles from "./Auth.module.css";
import { Card } from "@/components/Card";

export default function Auth() {
  return (
    <div className={styles.container}>
      <Card className={styles.formContainer}>
        <Outlet />
      </Card>
    </div>
  );
}

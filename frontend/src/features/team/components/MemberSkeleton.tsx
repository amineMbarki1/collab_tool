import Skeleton from "react-loading-skeleton";
import { Card } from "@/components/Card";
import styles from "./Member.module.css";

export default function MemberSkeletonCard() {
  return (
    <Card className={styles.skeleton}>
      <Skeleton circle style={{ height: 50, width: 50 }} />
      <Skeleton width={100} style={{ flex: 1 }} />
      <Skeleton width={100} style={{ flex: 1 }} />
    </Card>
  );
}





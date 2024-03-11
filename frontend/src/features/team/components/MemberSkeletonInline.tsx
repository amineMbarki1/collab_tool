import Skeleton from "react-loading-skeleton";
import styles from "./Member.module.css";

export default function MemberSkeletonInline() {
  return (
    <div className={styles.skeletonContainer}>
      <Skeleton className={styles.circleSkeleton} circle />
      <Skeleton containerClassName={styles.skeleton} count={2} />
    </div>
  );
}

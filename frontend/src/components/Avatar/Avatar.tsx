import styles from "./Avatar.module.css";
import personPic from "../../assets/images/person.jpg";
import clsx from "clsx";

interface Props {
  image?: string;
  initials?: string;
  className?: string;
}

export default function Avatar({ image, className }: Props) {
  return (
    <div className={clsx(styles.avatar, className)}>
      <img src={image || personPic} />
    </div>
  );
}

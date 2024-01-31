import clsx from "clsx";
import styles from "./Loader.module.css";
interface Props {
  color?: "primary" | "white";
  className?: string;
}

export default function Loader({ color, className }: Props) {
  const style = clsx({
    [styles.primary]: color === "primary",
    [styles.loader]: true,
    [styles.className]: !!className,
    [className!]: !!className,
  });

  return <div className={style}></div>;
}

import Section from "./Section";
import styles from "./Section.module.css";
import { useAppStore } from "@/hooks";

import { PropsWithChildren } from "react";

import clsx from "clsx";

interface Props {
  className: string;
}

export default function Sidesection({
  className,
  children,
}: PropsWithChildren<Props>) {
  const { useAppSelector } = useAppStore();
  const { showSidesection } = useAppSelector((state) => state.sidesection);
  return (
    <Section
      className={clsx(
        className,
        styles.sidesection,
        !showSidesection && styles.hide,
        styles.fitContent
      )}
    >
      {children}
    </Section>
  );
}

import type { FC } from "react";
import styles from "./section.module.css";

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export const Section: FC<SectionProps> = ({ id, children }) => {
  return (
    <section id={id} className={styles.section}>
      {children}
    </section>
  );
};

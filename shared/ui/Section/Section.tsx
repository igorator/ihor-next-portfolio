import type { FC, HTMLAttributes } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export const Section: FC<SectionProps> = ({
  id,
  children,
  className,
  ...props
}) => {
  return (
    <section
      id={id}
      className={`${styles.section} ${className ?? ""}`}
      {...props}
    >
      {children}
    </section>
  );
};

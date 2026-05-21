import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...rest }: Props) {
  return (
    <div
      className={`${styles.card} glass-card${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

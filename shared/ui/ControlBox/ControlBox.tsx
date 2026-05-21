import type { HTMLAttributes } from "react";
import styles from "./ControlBox.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export function ControlBox({ className, children, ...rest }: Props) {
  return (
    <div
      className={`${styles.controlBox}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

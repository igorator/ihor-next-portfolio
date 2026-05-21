import type { HTMLAttributes } from "react";
import styles from "./InputWrapper.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export function InputWrapper({ className, children, ...rest }: Props) {
  return (
    <div
      className={`${styles.inputWrapper}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

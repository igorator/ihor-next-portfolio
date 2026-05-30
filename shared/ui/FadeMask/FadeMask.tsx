import type { HTMLAttributes } from "react";
import styles from "./FadeMask.module.css";

type Variant = "left" | "right" | "both";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
};

export function FadeMask({
  variant = "both",
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={[styles.mask, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

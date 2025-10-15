import type { ReactNode } from "react";
import styles from "./AnimatedGradient.module.css";

/** Полноэкранный анимированный фон. Цвета берутся из html[data-theme="light"|"dark"]. */
export default function AnimatedGradient({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div className={styles.wrapper} aria-hidden={children ? undefined : true}>
      {children}
    </div>
  );
}

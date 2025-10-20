"use client";

import styles from "./ThemedMotionBackground.module.css";

export function ThemedMotionBackground() {
  return (
    <div className={styles.oceanWrapper}>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </div>
  );
}

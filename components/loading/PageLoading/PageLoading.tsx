"use client";

import styles from "./PageLoading.module.css";

export const PageLoading = () => {
  return (
    <div
      className={styles.overlay}
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <div className={styles.center}>
        <span className={styles.spinner} aria-hidden="true" />
        <span className={styles.label}>Loading…</span>
      </div>
    </div>
  );
};

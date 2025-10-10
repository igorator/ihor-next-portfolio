import styles from "./PageLoading.module.css";

export const PageLoading = () => (
  <div className={styles.wrapper} aria-busy="true">
    <span className={styles.spinner} aria-hidden="true" />
    <span className={styles.text}>Loading…</span>
  </div>
);

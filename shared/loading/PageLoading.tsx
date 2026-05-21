import { Spinner } from "./Spinner";
import styles from "./PageLoading.module.css";

export function PageLoading() {
  return (
    <div className={styles.wrap}>
      <Spinner size={40} />
    </div>
  );
}

export default PageLoading;

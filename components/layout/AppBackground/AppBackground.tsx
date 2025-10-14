import styles from "./AppBackground.module.css";
import Plasma from "@/components/decorative/Plasma/Plasma";

export const AppBackground: React.FC = () => (
  <div className={styles.appBackground}>
    <Plasma />
  </div>
);

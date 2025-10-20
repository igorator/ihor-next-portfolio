import { ThemedMotionBackground } from "../../ui/ThemedMotionBackground/ThemedMotionBackground";
import styles from "./AppBackground.module.css";

export const AppBackground: React.FC = () => (
  <div className={styles.appBackground}>
    <ThemedMotionBackground />
  </div>
);

import AnimatedGradient from "@/components/decorative/AnimatedGradient/AnimatedGradient";
import styles from "./AppBackground.module.css";

export const AppBackground: React.FC = () => (
  <div className={styles.appBackground}>
    <AnimatedGradient />
  </div>
);

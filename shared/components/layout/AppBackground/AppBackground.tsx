import AnimatedGradient from "@/shared/components/ui/AnimatedGradient/AnimatedGradient";
import styles from "./AppBackground.module.css";

export const AppBackground: React.FC = () => (
  <div className={styles.appBackground}>
    <AnimatedGradient />
  </div>
);

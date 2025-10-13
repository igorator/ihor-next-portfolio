import { RippleGrid } from "@/components/decorative/RippleGrid/RippleGrid";
import styles from "./AppBackground.module.css";

export const AppBackground: React.FC = () => (
  <div className={styles.appBackground}>
    <RippleGrid />
  </div>
);

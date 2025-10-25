"use client";

import { motion } from "motion/react";
import styles from "./MobileOverlay.module.css";

export const MobileOverlay = () => {
  return (
    <motion.div
      className={styles.overlay}
      role="alertdialog"
      aria-modal="true"
      aria-label="Mobile version notice"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.overlayContent}>
        <h1>Mobile currently in progress</h1>
        <p className={styles.overlayText}>
          better check the desktop version...
        </p>
        <p>
          <strong>Thank you!</strong>
        </p>
      </div>
    </motion.div>
  );
};

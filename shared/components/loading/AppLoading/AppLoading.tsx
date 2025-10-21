"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./AppLoading.module.css";

export function AppLoading() {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  // Плавная интерполяция до ~95%
  useEffect(() => {
    const tick = () => {
      setProgress((p) => {
        const target = 95;
        const next = p + Math.max(0.4, (target - p) * 0.06);
        return Math.min(target, next);
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const rounded = Math.round(progress);

  return (
    <motion.div
      className={styles.wrapper}
      aria-busy="true"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.box}>
        <p id="loading-label" className={styles.title}>
          Loading…
        </p>

        <div className={styles.progressWrap}>
          <progress
            className={styles.progress}
            value={rounded}
            max={100}
            aria-labelledby="loading-label"
          />
          <span className={styles.progressStripe} />
        </div>

        <output
          className={styles.percent}
          htmlFor="loading-label"
          aria-live="polite"
        >
          {rounded}%
        </output>
      </div>
    </motion.div>
  );
}

"use client";
import styles from "./AppLoading.module.css";
import { useEffect, useState } from "react";

export const AppLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p < 95 ? Math.min(95, p + Math.random() * 5) : p));
    }, 200);
    return () => clearInterval(t);
  }, []);

  const rounded = Math.round(progress);

  return (
    <div className={styles.wrapper} aria-busy="true">
      <div className={styles.box}>
        <p id="loading-label" className={styles.title}>
          Loading app…
        </p>

        {/* Семантичный нативный прогресс */}
        <progress
          className={styles.progress}
          value={rounded}
          max={100}
          aria-labelledby="loading-label"
        />

        {/* Семантичный вывод значения */}
        <output className={styles.percent} htmlFor="loading-label">
          {rounded}%
        </output>
      </div>
    </div>
  );
};

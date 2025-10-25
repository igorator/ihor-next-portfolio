"use client";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./AppLoading.module.css";

export function AppLoading({ ready = false }: { ready?: boolean }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const fillCtl = useAnimationControls();
  const t = useTranslations("loading");

  useEffect(() => {
    if (ready) {
      setValue(100);
      fillCtl.start({
        width: "100%",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      });
      return;
    }
    let raf = 0;
    const tick = () => {
      setValue((v) =>
        v < 95 ? Math.min(95, v + (reduce ? 5 : Math.random() * 4 + 1)) : v,
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduce, fillCtl]);

  return (
    <div
      className={styles.screen}
      aria-busy="true"
      role="dialog"
      aria-modal="true"
    >
      {/* Blur-фон с анимированными блобами */}
      <div className={styles.bg} aria-hidden>
        <motion.div
          className={styles.blob}
          initial={{ x: "-10%", y: "-10%", scale: 0.9, opacity: 0.55 }}
          animate={{
            x: ["-10%", "20%", "0%"],
            y: ["-10%", "10%", "-5%"],
            scale: reduce ? 1 : [0.9, 1.08, 1],
            opacity: [0.45, 0.7, 0.55],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.div
          className={styles.blob2}
          initial={{ x: "30%", y: "40%", scale: 1, opacity: 0.5 }}
          animate={{
            x: ["30%", "-10%", "15%"],
            y: ["40%", "15%", "35%"],
            scale: reduce ? 1 : [1, 1.1, 0.95],
            opacity: [0.4, 0.65, 0.5],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Карточка прогресса */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <p id="loading-label" className={styles.title}>
          {t("loading")}
        </p>

        <div className={styles.progressWrap}>
          <progress
            className={styles.progress}
            max={100}
            value={value}
            aria-labelledby="loading-label"
          />
          <motion.span
            className={styles.fill}
            aria-hidden
            animate={fillCtl}
            style={{ width: `${value}%` }}
            transition={!reduce ? { duration: 0.2 } : undefined}
          />
          <span className={styles.gloss} aria-hidden />
        </div>
      </motion.div>
    </div>
  );
}

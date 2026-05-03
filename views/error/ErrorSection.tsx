"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./ErrorSection.module.css";

interface ErrorSectionProps {
  reset: () => void;
}

export const ErrorSection = ({ reset }: ErrorSectionProps) => {
  const t = useTranslations("error");

  return (
    <Section id="error" className={styles.error}>
      <div className={styles.content}>
        <motion.div
          className={styles.codeWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.code} aria-hidden="true">
            500
          </span>
        </motion.div>

        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.message}>{t("title")}</p>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassSurface>
            <button onClick={reset} className={styles.btn}>
              {t("tryAgain")}
            </button>
          </GlassSurface>
          <GlassSurface>
            <Link href={routes.root.path} className={styles.btn}>
              {t("backHome")}
            </Link>
          </GlassSurface>
        </motion.div>
      </div>
    </Section>
  );
};

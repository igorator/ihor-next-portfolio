"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Section } from "@/shared/ui/Section/Section";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./NotFoundSection.module.css";

type Props = { title: string; backHome: string };

export const NotFoundSection = ({ title, backHome }: Props) => {
  return (
    <Section id="not-found" className={styles.notFound}>
      <div className={styles.content}>
        <motion.div
          className={styles.codeWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.code} aria-hidden="true">
            404
          </span>
        </motion.div>

        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.message}>{title}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassSurface>
            <Link href={routes.root.path} className={styles.btn}>
              {backHome}
            </Link>
          </GlassSurface>
        </motion.div>
      </div>
    </Section>
  );
};

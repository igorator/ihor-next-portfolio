"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { BsArrowRight } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/shared/ui/Section/Section";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./NotFoundSection.module.css";

type Props = { title: string };

export const NotFoundSection = ({ title }: Props) => {
  const t = useTranslations("navigation");
  const prefersReduced = useReducedMotion();

  const navLinks = [
    { href: routes.root.path, label: t("root") },
    { href: routes.projects.path, label: t("projects") },
    { href: routes.employment.path, label: t("employment") },
  ];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const line: Variants = {
    hidden: {
      y: prefersReduced ? 0 : 18,
      filter: prefersReduced ? "blur(0px)" : "blur(6px)",
      opacity: 0,
    },
    visible: {
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const btnWrap: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  return (
    <Section id="not-found" className={styles.notFound}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.code} variants={line} aria-label="404">
          404
        </motion.h1>

        <motion.p className={styles.message} variants={line}>
          {title}
        </motion.p>

        <motion.div className={styles.navList} variants={btnWrap}>
          {navLinks.map(({ href, label }) => (
            <GlassSurface
              key={href}
              style={
                { "--gs-radius": "var(--radius-lg)" } as React.CSSProperties
              }
            >
              <Link href={href} className={styles.btn}>
                <span>{label}</span>
                <BsArrowRight />
              </Link>
            </GlassSurface>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
};

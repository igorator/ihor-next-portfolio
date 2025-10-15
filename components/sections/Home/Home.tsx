"use client";

import Link from "next/link";
import { motion, type Variants, cubicBezier } from "framer-motion";
import { Section } from "@/components/layout/Section/Section";
import { GlassSurface } from "@/components/decorative/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import { GoArrowDownRight } from "react-icons/go";
import styles from "./Home.module.css";

const heroLinks = {
  projects: { label: "Projects", href: routes.projects.path },
  cv: { label: "CV", href: routes.cv.path },
  employment: { label: "Employment", href: routes.employment.path },
} as const;

const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const titleLine: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const buttonsWrap: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export const HomeSection = () => (
  <Section className={styles.home}>
    <div className={styles.content}>
      <motion.h1
        className={styles.title}
        variants={titleContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.span className={styles.fade} variants={titleLine}>
          Hello
        </motion.span>
        <motion.span className={styles.name} variants={titleLine}>
          I’m Ihor
        </motion.span>
        <motion.span className={styles.role} variants={titleLine}>
          Web&nbsp;Developer
        </motion.span>
      </motion.h1>

      <motion.div
        variants={buttonsWrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <GlassSurface>
          <div className={styles.buttons}>
            {Object.values(heroLinks).map(({ href, label }) => (
              <Link key={href} href={href} className={styles.btn}>
                {label} <GoArrowDownRight />
              </Link>
            ))}
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  </Section>
);

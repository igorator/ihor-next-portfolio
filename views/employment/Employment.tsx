"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import type { Employment } from "@/entities/employment/types";
import { EmploymentCard } from "./components/EmploymentCard/EmploymentCard";
import styles from "./Employment.module.css";

type EmploymentSectionProps = {
  employmentHistory: Employment[];
};

export const EmploymentSection = ({
  employmentHistory,
}: EmploymentSectionProps) => {
  const t = useTranslations();
  const format = useFormatter();
  const prefersReduced = useReducedMotion();

  const formatPeriod = (emp: Employment): string | null => {
    if (emp.period) return emp.period;
    if (!emp.startDate) return null;

    const toDate = (str: string): Date | null => {
      const [year, month] = str.split("-").map(Number);
      if (!year || !month || isNaN(year) || isNaN(month)) return null;
      return new Date(year, month - 1, 1);
    };

    const formatDate = (str: string): string | null => {
      const date = toDate(str);
      if (!date || isNaN(date.getTime())) return null;
      try {
        return format.dateTime(date, { month: "short", year: "numeric" });
      } catch {
        return null;
      }
    };

    const startStr = formatDate(emp.startDate);
    if (!startStr) return null;

    if (!emp.endDate) return startStr;
    if (emp.endDate === "present")
      return `${startStr} — ${t("employment.present")}`;

    const endStr = formatDate(emp.endDate);
    return endStr ? `${startStr} — ${endStr}` : startStr;
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  return (
    <Section className={styles.employment}>
      <h2 className={styles.title}>{t("employment.title")}</h2>

      <motion.ul
        className={styles.timeline}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {employmentHistory.map((itemData) => (
          <motion.li key={itemData.id} className={styles.item} variants={item}>
            <EmploymentCard
              company={itemData.company}
              type={itemData.type}
              category={itemData.category}
              position={itemData.position}
              roles={itemData.roles}
              linkedProjects={itemData.linkedProjects}
              period={formatPeriod(itemData)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
};

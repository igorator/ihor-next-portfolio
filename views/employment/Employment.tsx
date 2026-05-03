"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import { Link } from "@/i18n/navigation";
import { BsFolder2 } from "react-icons/bs";
import type { Employment } from "@/entities/employment/types";
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
        {employmentHistory.map((itemData) => {
          const period = formatPeriod(itemData);
          return (
            <motion.li
              key={itemData.id}
              className={styles.item}
              variants={item}
            >
              <article className={styles.card}>
                <header className={styles.header}>
                  <h3 className={styles.company}>{itemData.company}</h3>
                  <div className={styles.badgesGroup}>
                    <span className={styles.typeBadge}>{itemData.type}</span>
                    {itemData.category && (
                      <span className={styles.categoryBadge}>
                        {itemData.category}
                      </span>
                    )}
                  </div>
                  {itemData.position && (
                    <span className={styles.position}>{itemData.position}</span>
                  )}
                </header>

                {period && <div className={styles.period}>{period}</div>}

                <ul className={styles.roles}>
                  {itemData.roles.map((role: string) => (
                    <li
                      key={`${role}-${itemData.company}`}
                      className={styles.role}
                    >
                      {role}
                    </li>
                  ))}
                </ul>

                {itemData.linkedProjects &&
                  itemData.linkedProjects.length > 0 && (
                    <div className={styles.projectsBlock}>
                      <div className={styles.projectsLabel}>
                        {t("employment.linkedProjects", {
                          default: "Linked projects",
                        })}
                        :
                      </div>
                      <ul className={styles.projects}>
                        {itemData.linkedProjects.map((linkedProject) => (
                          <li key={linkedProject.slug}>
                            <Link
                              className={styles.projectBadge}
                              href={`/projects/${linkedProject.slug}`}
                            >
                              <BsFolder2
                                className={styles.projectBadgeIcon}
                                aria-hidden="true"
                              />
                              <span>{linkedProject.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </article>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
};

"use client";

import { useRef } from "react";
import { cubicBezier, motion, type Variants } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import type { Employment } from "@/entities/employment/types";
import { formatPeriod } from "@/entities/employment/lib/formatPeriod";
import { EmploymentCard } from "./components/EmploymentCard/EmploymentCard";
import { TimelineRail } from "./components/TimelineRail/TimelineRail";
import { useTimelineScroll } from "./useTimelineScroll";
import styles from "./Employment.module.css";

type EmploymentSectionProps = {
  employmentHistory: Employment[];
};

export const EmploymentSection = ({
  employmentHistory,
}: EmploymentSectionProps) => {
  const t = useTranslations();
  const format = useFormatter();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { railClip, activeIndex, prefersReduced } = useTimelineScroll(
    timelineRef,
    employmentHistory.length,
  );

  const formatDate = (date: Date) =>
    format.dateTime(date, { month: "short", year: "numeric" });
  const present = t("employment.present");

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

      <div className={styles.timelineWrapper} ref={timelineRef}>
        <TimelineRail clipPath={railClip} />

        <motion.ul
          className={styles.timeline}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {employmentHistory.map((itemData, index) => (
            <motion.li
              key={itemData.id}
              className={styles.item}
              variants={item}
            >
              <span
                className={[
                  styles.marker,
                  index <= activeIndex ? styles.markerActive : "",
                  index === activeIndex ? styles.markerCurrent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              />
              <EmploymentCard
                company={itemData.company}
                type={itemData.type}
                category={itemData.category}
                position={itemData.position}
                roles={itemData.roles}
                linkedProjects={itemData.linkedProjects}
                period={formatPeriod(itemData, formatDate, present)}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
};

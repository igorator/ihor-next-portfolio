"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import { CountUp } from "@/shared/ui/CountUp/CountUp";
import styles from "./ProjectsStatsCard.module.css";

type Props = {
  commercialCount: number;
  personalCount: number;
};

export const ProjectsStatsCard = ({
  commercialCount,
  personalCount,
}: Props) => {
  const t = useTranslations("projects.overview");

  return (
    <Card className={styles.card} aria-label={t("label")}>
      <span className={styles.label}>{t("label")}</span>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            <CountUp to={commercialCount} />
          </span>
          <span className={styles.statUnit}>{t("commercial")}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            <CountUp to={personalCount} />
          </span>
          <span className={styles.statUnit}>{t("personal")}</span>
        </div>
      </div>

      <div className={styles.descriptionBlock}>
        <p className={styles.description}>
          {t.rich("description", {
            strong: (chunk) => (
              <strong className={styles.strong}>{chunk}</strong>
            ),
          })}
        </p>
        <ul className={styles.reasonsList}>
          {t.raw("reasons").map((reason: string) => (
            <li key={reason} className={styles.reasonsItem}>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.metaList} aria-label={t("stackHighlightsAria")}>
        {t.raw("tags").map((tag: string) => (
          <li key={tag} className={styles.metaItem}>
            {tag}
          </li>
        ))}
      </ul>
    </Card>
  );
};

"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import styles from "./ProjectOverviewCard.module.css";

type Props = {
  commercialCount: number;
  personalCount: number;
};

export const ProjectOverviewCard = ({
  commercialCount,
  personalCount,
}: Props) => {
  const t = useTranslations("projects_ui.other");

  return (
    <Card className={styles.card} aria-label={t("title")}>
      <span className={styles.label}>{t("label")}</span>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{commercialCount}</span>
          <span className={styles.statUnit}>{t("commercial")}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{personalCount}</span>
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

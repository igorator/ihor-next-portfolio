"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import layout from "../../Project.module.css";
import styles from "./OverviewCard.module.css";

type Props = {
  title: string;
  type: string;
  category: string;
  date: string;
};

export function OverviewCard({ title, type, category, date }: Props) {
  const t = useTranslations("projects_ui");
  const format = useFormatter();

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-").map(Number);
    return format.dateTime(new Date(year!, month! - 1, 1), {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className={layout.overviewCard}>
      <h1 className={styles.projectTitle}>{title}</h1>
      <ul className={styles.metaList}>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("type")}</span>
          <span className={styles.metaValue}>{type}</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("category")}</span>
          <span className={styles.metaValue}>{category}</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("date")}</span>
          <time className={styles.metaValue} dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      </ul>
    </Card>
  );
}

export default OverviewCard;

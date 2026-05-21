"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import styles from "./ProjectOverviewCard.module.css";

export const ProjectOverviewCard = () => {
  const t = useTranslations("projects_ui.other");

  return (
    <Card className={styles.card} aria-label={t("title")}>
      <h3 className={styles.title}>{t("title")}</h3>

      <p className={styles.description}>
        {t.rich("description", {
          strong: (chunk) => <strong className={styles.strong}>{chunk}</strong>,
        })}
      </p>

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

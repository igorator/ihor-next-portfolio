"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import layout from "../../Project.module.css";
import styles from "./LinksCard.module.css";

type Props = {
  demoUrl?: string | null;
  githubUrl?: string | null;
};

export function LinksCard({ demoUrl, githubUrl }: Props) {
  const t = useTranslations("projects_ui");

  return (
    <Card className={layout.linksCard}>
      <h2 className={layout.cardTitle}>{t("linksTitle")}</h2>
      <div className={styles.links}>
        {demoUrl ? (
          <a
            className={`${styles.link} ${styles.linkGhost}`}
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("links.liveDemo")}
          </a>
        ) : null}

        {githubUrl ? (
          <a
            className={`${styles.link} ${styles.linkGhost}`}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("links.github")}
          </a>
        ) : null}

        {!demoUrl && !githubUrl && (
          <span className={styles.emptyState}>{t("noLinks")}</span>
        )}
      </div>
    </Card>
  );
}

export default LinksCard;

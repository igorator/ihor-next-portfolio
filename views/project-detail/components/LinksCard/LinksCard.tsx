"use client";

import { useTranslations } from "next-intl";
import { BsGithub, BsGlobe2 } from "react-icons/bs";
import { Card } from "@/shared/ui/Card";
import type { GithubUrlValue } from "@/entities/project/types";
import { normalizeGithubLinks } from "@/entities/project/lib/normalizeGithubLinks";
import layout from "../../Project.module.css";
import styles from "./LinksCard.module.css";

type Props = {
  demoUrl?: string | null;
  githubUrl?: GithubUrlValue;
};

export function LinksCard({ demoUrl, githubUrl }: Props) {
  const t = useTranslations("projectDetail");
  const githubLinks = normalizeGithubLinks(githubUrl);

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
            <BsGlobe2 aria-hidden size={14} className={styles.githubIcon} />
            {t("liveDemo")}
          </a>
        ) : null}

        {githubLinks.map((link, i) => (
          <a
            key={i}
            className={`${styles.link} ${styles.linkGhost}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub aria-hidden size={15} className={styles.githubIcon} />
            {link.label ?? t("github")}
          </a>
        ))}

        {!demoUrl && githubLinks.length === 0 && (
          <span className={styles.emptyState}>{t("noLinks")}</span>
        )}
      </div>
    </Card>
  );
}

export default LinksCard;

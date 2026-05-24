"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { BsArrowRight, BsGithub, BsGlobe2 } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { Card } from "@/shared/ui/Card";
import type { GithubUrlValue } from "@/entities/project/types";
import { normalizeGithubLinks } from "@/entities/project/lib/normalizeGithubLinks";
import { ProjectCardTooltip } from "./ProjectCardTooltip/ProjectCardTooltip";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  cover?: string;
  date?: string;
  technologies?: Array<{
    id: string;
    name: string;
    color?: string;
    textColor?: string;
  }>;
  githubUrl?: GithubUrlValue;
  demoUrl?: string | null;
  isCommercial?: boolean;
  isHighlighted?: boolean;
  onTechnologyClick?: (techId: string) => void;
  viewMode?: "grid" | "list";
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title,
  description,
  type,
  category,
  cover,
  date,
  technologies,
  githubUrl,
  demoUrl,
  isCommercial,
  onTechnologyClick,
  viewMode = "grid",
}) => {
  const t = useTranslations();
  const format = useFormatter();
  const githubLinks = normalizeGithubLinks(githubUrl);

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-").map(Number);
    return format.dateTime(new Date(year!, month! - 1, 1), {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      className={`${styles.projectCard}${viewMode === "list" ? ` ${styles.listCard}` : ""}`}
    >
      <div className={styles.listBadgeSlot}>
        <ProjectCardTooltip isCommercial={isCommercial} />
      </div>

      {(date || isCommercial) && (
        <div className={styles.meta}>
          {date ? (
            <time className={styles.date} dateTime={date}>
              {formatDate(date)}
            </time>
          ) : (
            <span />
          )}
          <div className={styles.metaTooltipWrapper}>
            <ProjectCardTooltip isCommercial={isCommercial} />
          </div>
        </div>
      )}

      <h3 className={styles.title}>{title}</h3>

      {viewMode === "grid" && (
        <Link
          href={`/projects/${slug}`}
          className={styles.coverLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div
            className={`${styles.coverWrapper}${!cover ? ` ${styles.coverPlaceholder}` : ""}`}
          >
            {cover && (
              <Image
                src={cover}
                alt={title}
                fill
                className={styles.coverImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iIzg4ODg4OCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4="
              />
            )}
          </div>
        </Link>
      )}

      <div className={styles.typesBadges}>
        <span className={`${styles.badge} ${styles.badgeType}`} title={type}>
          {type}
        </span>
        <span
          className={`${styles.badge} ${styles.badgeType}`}
          title={category}
        >
          {category}
        </span>
      </div>

      <p className={styles.description} title={description}>
        {description}
      </p>

      {!!technologies?.length && (
        <div className={styles.technologies}>
          {technologies.slice(0, viewMode === "list" ? 4 : 6).map((tech) => (
            <button
              key={tech.id}
              className={styles.tech}
              style={
                {
                  "--tech-color": tech.color,
                  "--tech-text": tech.textColor ?? tech.color,
                  "--tech-bg": tech.textColor
                    ? tech.color
                    : `color-mix(in srgb, ${tech.color} 12%, transparent)`,
                } as React.CSSProperties
              }
              onClick={() => onTechnologyClick?.(tech.id)}
              type="button"
              title={tech.name}
            >
              {tech.name}
            </button>
          ))}
          {(() => {
            const limit = viewMode === "list" ? 4 : 6;
            const overflow = technologies.length - limit;
            return overflow > 0 ? (
              <span className={styles.techMore}>+{overflow}</span>
            ) : null;
          })()}
        </div>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.links}>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <BsGlobe2 aria-hidden size={13} className={styles.githubIcon} />
              {t("projects_ui.links.liveDemo", { default: "Live demo" })}
            </a>
          )}
          {githubLinks[0] && (
            <a
              href={githubLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub aria-hidden size={13} className={styles.githubIcon} />
              {githubLinks[0].label ??
                t("projects_ui.links.github", { default: "GitHub" })}
              {githubLinks.length > 1 && (
                <span className={styles.linksMore}>
                  +{githubLinks.length - 1}
                </span>
              )}
            </a>
          )}
        </div>

        <Link
          href={`/projects/${slug}`}
          rel="noopener noreferrer"
          aria-label={t("projects_ui.viewProjectAria", { title })}
        >
          <BsArrowRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
};

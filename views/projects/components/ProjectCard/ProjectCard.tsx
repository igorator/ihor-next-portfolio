"use client";

import { useFormatter, useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { ProjectCardTooltip } from "./ProjectCardTooltip/ProjectCardTooltip";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  date?: string;
  technologies?: Array<{
    id: string;
    name: string;
    color?: string;
    textColor?: string;
  }>;
  githubUrl?: string | null;
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
  date,
  technologies,
  githubUrl,
  demoUrl,
  isCommercial,
  isHighlighted,
  onTechnologyClick,
  viewMode = "grid",
}) => {
  const t = useTranslations();
  const format = useFormatter();

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-").map(Number);
    return format.dateTime(new Date(year!, month! - 1, 1), {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`${styles.projectCard} glass-card${isHighlighted ? ` ${styles.highlighted}` : ""}${viewMode === "list" ? ` ${styles.listCard}` : ""}`}
    >
      {/* Always first in DOM — CSS hides in grid mode, shows in list mode */}
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
          {/* Wrapped so it can be hidden in list mode without affecting grid view */}
          <div className={styles.metaTooltipWrapper}>
            <ProjectCardTooltip isCommercial={isCommercial} />
          </div>
        </div>
      )}

      <h3 className={styles.title}>{title}</h3>

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
          {(viewMode === "list" ? technologies.slice(0, 4) : technologies).map(
            (tech) => (
              <button
                key={tech.id}
                className={styles.tech}
                style={{
                  color: tech.textColor ?? tech.color,
                  background: tech.textColor
                    ? tech.color
                    : `color-mix(in srgb, ${tech.color} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${tech.color} 42%, transparent)`,
                }}
                onClick={() => onTechnologyClick?.(tech.id)}
                type="button"
                title={tech.name}
              >
                {tech.name}
              </button>
            ),
          )}
          {viewMode === "list" && technologies.length > 4 && (
            <span className={styles.techMore}>+{technologies.length - 4}</span>
          )}
        </div>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.links}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              {t("projects_ui.links.github", { default: "GitHub" })}
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              {t("projects_ui.links.liveDemo", { default: "Live demo" })}
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
    </div>
  );
};

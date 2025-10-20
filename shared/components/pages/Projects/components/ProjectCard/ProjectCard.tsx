import type { CSSProperties } from "react";
import styles from "./ProjectCard.module.css";
import { useTranslations } from "next-intl";

export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  technologies?: Array<{ id: string; name: string; color?: string }>;
  imageUrl?: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  type,
  category,
  technologies,
  githubUrl,
  demoUrl,
  onTechnologyClick,
}) => {
  const t = useTranslations();

  return (
    <div className={styles.projectCard}>
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
          {technologies.map((tech) => (
            <button
              key={tech.id}
              className={styles.tech}
              style={{ color: tech.color } as CSSProperties}
              onClick={() => onTechnologyClick?.(tech.id)}
              type="button"
              title={tech.name}
            >
              {tech.name}
            </button>
          ))}
        </div>
      )}

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
    </div>
  );
};

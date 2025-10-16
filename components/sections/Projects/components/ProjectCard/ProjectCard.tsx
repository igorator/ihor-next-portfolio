import type { Project } from "@/shared/types/project";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onTechnologyClick,
}) => (
  <div className={`${styles.projectCard}`}>
    <h3 className={styles.title}>{project.title}</h3>

    <p className={styles.description} title={project.description_en}>
      {project.description_en}
    </p>

    <div className={styles.technologies}>
      {project.technologies.map((tech) => (
        <button
          key={tech.id}
          className={`${styles.tech}`}
          style={{ color: tech.color }}
          onClick={() => onTechnologyClick?.(tech.id)}
          type="button"
        >
          {tech.name}
        </button>
      ))}
    </div>

    <div className={styles.links}>
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )}

      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
      )}
    </div>
  </div>
);

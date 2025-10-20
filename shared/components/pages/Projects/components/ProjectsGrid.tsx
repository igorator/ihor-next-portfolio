import { motion } from "framer-motion";
import type { ProjectWithTechnologies } from "@/shared/types/project";
import styles from "../Projects.module.css";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { useTranslations } from "next-intl";

type ProjectsGridProps = {
  projects: ProjectWithTechnologies[];
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectsGrid = ({
  projects,
  onTechnologyClick,
}: ProjectsGridProps) => (
  <ProjectsGridInner
    projects={projects}
    onTechnologyClick={onTechnologyClick}
  />
);

const ProjectsGridInner = ({
  projects,
  onTechnologyClick,
}: ProjectsGridProps) => {
  const t = useTranslations();

  return (
    <motion.div layout className={styles.projectsWrapper}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard
              onTechnologyClick={onTechnologyClick}
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              type={project.type}
              category={project.category}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
            />
          </motion.div>
        ))
      ) : (
        <motion.div
          className={styles.noProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("projects_ui.noMatches")}
        </motion.div>
      )}
    </motion.div>
  );
};

import { motion } from "framer-motion";
import type { Project } from "@/shared/types/project";
import styles from "../Projects.module.css";
import { ProjectCard } from "./ProjectCard/ProjectCard";

type ProjectsGridProps = {
  projects: Project[];
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectsGrid = ({
  projects,
  onTechnologyClick,
}: ProjectsGridProps) => (
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
            project={project}
            onTechnologyClick={onTechnologyClick}
          />
        </motion.div>
      ))
    ) : (
      <motion.div
        className={styles.noProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No projects match your filters
      </motion.div>
    )}
  </motion.div>
);

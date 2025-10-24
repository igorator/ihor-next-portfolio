"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";
import styles from "./ProjectGrid.module.css";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectOverviewCard } from "../ProjectOverviewCard/ProjectOverviewCard";

type ProjectsGridProps = {
  projects: ProjectWithTechnologies[];
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectsGrid = ({
  projects,
  onTechnologyClick,
}: ProjectsGridProps) => {
  const t = useTranslations("projects_ui");

  return (
    <motion.div layout className={styles.projectsWrapper}>
      {projects.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <ProjectOverviewCard />
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard
                onTechnologyClick={onTechnologyClick}
                id={project.slug}
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
          ))}
        </AnimatePresence>
      ) : (
        <motion.div
          className={styles.noProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("noMatches")}
        </motion.div>
      )}
    </motion.div>
  );
};

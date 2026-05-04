"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { ProjectWithTechnologies } from "@/entities/project/types";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectOverviewCard } from "../ProjectOverviewCard/ProjectOverviewCard";
import styles from "./ProjectGrid.module.css";

type ProjectsGridProps = {
  projects: ProjectWithTechnologies[];
  onTechnologyClick?: (techId: string) => void;
  viewMode?: "grid" | "list";
};

export const ProjectsGrid = ({
  projects,
  onTechnologyClick,
  viewMode = "grid",
}: ProjectsGridProps) => {
  const t = useTranslations("projects_ui");

  return (
    <div
      className={`${styles.projectsWrapper} ${viewMode === "list" ? styles.listView : ""}`}
    >
      {projects.length > 0 ? (
        <AnimatePresence>
          {viewMode === "grid" && <ProjectOverviewCard />}

          {projects.map((project) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                onTechnologyClick={onTechnologyClick}
                slug={project.slug}
                title={project.title}
                description={project.description}
                type={project.type}
                date={project.date}
                category={project.category}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                isCommercial={project.isCommercial}
                isHighlighted={project.isHighlighted}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <motion.div
          className={styles.noProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {t("noMatches")}
        </motion.div>
      )}
    </div>
  );
};

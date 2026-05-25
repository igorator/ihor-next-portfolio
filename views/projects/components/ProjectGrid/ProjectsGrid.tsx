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
  hasActiveFilters?: boolean;
};

export const ProjectsGrid = ({
  projects,
  onTechnologyClick,
  viewMode = "grid",
  hasActiveFilters = false,
}: ProjectsGridProps) => {
  const t = useTranslations("projects_ui");

  const gridKey = viewMode + projects.map((p) => p.slug).join(",");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gridKey}
        className={`${styles.projectsWrapper} ${viewMode === "list" ? styles.listView : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        {projects.length > 0 ? (
          <>
            {viewMode === "grid" && !hasActiveFilters && (
              <ProjectOverviewCard />
            )}

            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                onTechnologyClick={onTechnologyClick}
                slug={project.slug}
                title={project.title}
                description={project.description}
                type={project.type}
                date={project.date}
                category={project.category}
                cover={project.cover}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                isCommercial={project.isCommercial}
                isHighlighted={project.isHighlighted}
                viewMode={viewMode}
              />
            ))}
          </>
        ) : (
          <motion.div
            className={styles.noProjects}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {t("noMatches")}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

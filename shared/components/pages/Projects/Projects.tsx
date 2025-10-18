"use client";

import { AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";
import type { Project } from "@/shared/types/project";
import type { Technology } from "@/shared/types/technology";
import { Section } from "@/shared/components/layout/Section/Section";
import { ProjectFilters } from "./components/ProjectFilters/ProjectFilters";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { useProjectFilters } from "./hooks/useProjectFilters";

interface ProjectsSectionProps {
  projects: Project[];
  technologies: Technology[];
}

export const ProjectsSection = ({
  projects,
  technologies,
}: ProjectsSectionProps) => {
  const {
    selectedTechs,
    sortBy,
    filteredProjects,
    handleTechSelect,
    setSortBy,
  } = useProjectFilters(projects, technologies);

  return (
    <Section>
      <h2 className={styles.title}>My Projects</h2>
      <ProjectFilters
        technologies={technologies}
        selectedTechnologies={selectedTechs}
        sortBy={sortBy}
        onTechnologySelect={handleTechSelect}
        onSortChange={setSortBy}
      />
      <AnimatePresence mode="popLayout">
        <ProjectsGrid
          projects={filteredProjects}
          onTechnologyClick={handleTechSelect}
        />
      </AnimatePresence>
    </Section>
  );
};

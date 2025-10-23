"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/components/layout/Section/Section";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";
import { ProjectFilters } from "./components/ProjectFilters/ProjectFilters";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { useProjectFilters } from "./hooks/useProjectFilters";
import styles from "./Projects.module.css";

interface ProjectsSectionProps {
  projects: ProjectWithTechnologies[];
  technologies: Technology[];
}

export const ProjectsSection = ({
  projects,
  technologies,
}: ProjectsSectionProps) => {
  const t = useTranslations();
  const {
    selectedTechs,
    sortBy,
    filteredProjects,
    toggleTech,
    setOnlyTechnology,
    setSortBy,
    availableTechnologies,
  } = useProjectFilters(projects, technologies);

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("projects.title")}</h2>

      <ProjectFilters
        technologies={availableTechnologies ?? technologies}
        selectedTechnologies={selectedTechs}
        sortBy={sortBy}
        onTechnologySelect={toggleTech}
        onSortChange={setSortBy}
      />

      <AnimatePresence mode="popLayout">
        <ProjectsGrid
          projects={filteredProjects as ProjectWithTechnologies[]}
          onTechnologyClick={setOnlyTechnology}
        />
      </AnimatePresence>
    </Section>
  );
};

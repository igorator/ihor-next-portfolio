"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import type { ProjectWithTechnologies } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import { ProjectFilters } from "@/features/project-filters/ProjectFilters";
import { useProjectFilters } from "@/features/project-filters/useProjectFilters";
import { ProjectsGrid } from "./components/ProjectGrid/ProjectsGrid";
import styles from "./Projects.module.css";

interface ProjectsSectionProps {
  projects: ProjectWithTechnologies[];
  technologies: Technology[];
}

export const ProjectsSection = ({
  projects,
  technologies,
}: ProjectsSectionProps) => {
  const t = useTranslations("projects");

  const {
    selectedTechs,
    sortBy,
    filteredProjects,
    toggleTech,
    setOnlyTechnology,
    setSortBy,
    availableTechnologies,
    commercialOnly,
    setCommercialOnly,
    clearAll,
  } = useProjectFilters(projects, technologies);

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("title")}</h2>

      <ProjectFilters
        technologies={availableTechnologies ?? technologies}
        selectedTechnologies={selectedTechs}
        sortBy={sortBy}
        onTechnologySelect={toggleTech}
        onSortChange={setSortBy}
        commercialOnly={commercialOnly}
        onCommercialChange={setCommercialOnly}
        onClearAll={clearAll}
      />

      <ProjectsGrid
        projects={filteredProjects}
        onTechnologyClick={setOnlyTechnology}
      />
    </Section>
  );
};

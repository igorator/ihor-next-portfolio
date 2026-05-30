"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import type { ProjectWithTechnologies } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";
import { useProjectFilters } from "./useProjectFilters";
import { useViewMode } from "./useViewMode";
import { FilterBar } from "./FilterBar/FilterBar";
import { ControlsBar } from "./ControlsBar/ControlsBar";
import { ProjectsGrid } from "./ProjectGrid/ProjectsGrid";
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
    hasActiveFilters,
    clearAll,
  } = useProjectFilters(projects, technologies);

  const { viewMode, toggleViewMode } = useViewMode();

  useScrollToTop(selectedTechs.join(","), sortBy, commercialOnly);

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("title")}</h2>

      <div className={styles.controlsRow}>
        <FilterBar
          availableTechnologies={availableTechnologies}
          technologies={technologies}
          selectedTechs={selectedTechs}
          onToggleTech={toggleTech}
          sortBy={sortBy}
          onSortChange={setSortBy}
          commercialOnly={commercialOnly}
          onCommercialChange={setCommercialOnly}
          onClearAll={clearAll}
          hasActiveFilters={hasActiveFilters}
        />
        <ControlsBar viewMode={viewMode} onToggleView={toggleViewMode} />
      </div>

      <ProjectsGrid
        projects={filteredProjects}
        commercialCount={projects.filter((p) => p.isCommercial).length}
        personalCount={projects.filter((p) => !p.isCommercial).length}
        onTechnologyClick={setOnlyTechnology}
        viewMode={viewMode}
        hasActiveFilters={hasActiveFilters}
      />
    </Section>
  );
};

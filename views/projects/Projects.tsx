"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Section } from "@/shared/ui/Section/Section";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import type { ProjectWithTechnologies } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import { TechnologyMultiSelect } from "./filters/TechnologyMultiSelect/TechnologyMultiSelect";
import { SortSelect } from "./filters/SortSelect/SortSelect";
import { CommercialSwitch } from "./filters/CommercialSwitch/CommercialSwitch";
import { ViewToggleButton } from "./filters/ViewToggleButton/ViewToggleButton";
import { FilterClearButton } from "./filters/FilterClearButton/FilterClearButton";
import { useProjectFilters } from "./filters/useProjectFilters";
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const viewMode = (searchParams.get("view") as "grid" | "list") ?? "grid";
  const toggleViewMode = () => {
    const next = viewMode === "grid" ? "list" : "grid";
    const params = new URLSearchParams(searchParams.toString());
    if (next === "grid") params.delete("view");
    else params.set("view", "list");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const techs = availableTechnologies ?? technologies;
  const loading = !techs || techs.length === 0;
  const isPristine =
    selectedTechs.length === 0 && sortBy === "newest" && commercialOnly;

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("title")}</h2>

      <div className={styles.filtersBar} aria-busy={loading}>
        <GlassSurface className={styles.technologySelectWrapper}>
          <TechnologyMultiSelect
            technologies={techs}
            selectedTechnologies={selectedTechs}
            onToggle={toggleTech}
            loading={loading}
          />
        </GlassSurface>

        <GlassSurface className={styles.sortSelectWrapper}>
          <SortSelect value={sortBy} onChange={setSortBy} loading={loading} />
        </GlassSurface>

        <GlassSurface className={styles.commercialSwitchWrapper}>
          <CommercialSwitch
            value={commercialOnly}
            onChange={setCommercialOnly}
            loading={loading}
          />
        </GlassSurface>

        <GlassSurface
          className={styles.viewToggleWrapper}
          style={{ "--gs-width": "auto" }}
        >
          <ViewToggleButton
            viewMode={viewMode}
            onToggle={toggleViewMode}
            loading={loading}
          />
        </GlassSurface>

        <GlassSurface
          className={styles.filterClearButtonWrapper}
          style={{ "--gs-width": "auto" }}
        >
          <FilterClearButton
            onClear={clearAll}
            disabled={isPristine}
            loading={loading}
          />
        </GlassSurface>
      </div>

      <ProjectsGrid
        projects={filteredProjects}
        onTechnologyClick={setOnlyTechnology}
        viewMode={viewMode}
      />
    </Section>
  );
};

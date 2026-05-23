"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Section } from "@/shared/ui/Section/Section";
import { Card } from "@/shared/ui/Card";
import { InputWrapper } from "@/shared/ui/InputWrapper";
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
  const hasActiveFilters =
    selectedTechs.length > 0 || sortBy !== "newest" || !commercialOnly;

  const didMount = useRef(false);
  const selectedTechsKey = selectedTechs.join(",");
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedTechsKey, sortBy, commercialOnly]);

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("title")}</h2>

      <Card className={styles.filtersBar} aria-busy={loading}>
        <InputWrapper
          className={styles.technologySelectWrapper}
          data-active={selectedTechs.length > 0 || undefined}
        >
          <TechnologyMultiSelect
            technologies={techs}
            selectedTechnologies={selectedTechs}
            onToggle={toggleTech}
            loading={loading}
          />
        </InputWrapper>

        <InputWrapper
          className={styles.sortSelectWrapper}
          data-active={sortBy !== "newest" || undefined}
        >
          <SortSelect value={sortBy} onChange={setSortBy} loading={loading} />
        </InputWrapper>

        <InputWrapper
          className={styles.commercialSwitchWrapper}
          data-active={!commercialOnly || undefined}
        >
          <CommercialSwitch
            value={commercialOnly}
            onChange={setCommercialOnly}
            loading={loading}
          />
        </InputWrapper>

        <InputWrapper className={styles.viewToggleWrapper}>
          <ViewToggleButton
            viewMode={viewMode}
            onToggle={toggleViewMode}
            loading={loading}
          />
        </InputWrapper>

        <InputWrapper className={styles.filterClearButtonWrapper}>
          <FilterClearButton
            onClear={clearAll}
            disabled={!hasActiveFilters}
            loading={loading}
          />
        </InputWrapper>
      </Card>

      <ProjectsGrid
        projects={filteredProjects}
        onTechnologyClick={setOnlyTechnology}
        viewMode={viewMode}
        hasActiveFilters={hasActiveFilters}
      />
    </Section>
  );
};

import { useState, useMemo } from "react";
import type { Project } from "@/shared/types/project";
import type { Technology } from "@/shared/types/technology";

export const useProjectFilters = (
  projects: Project[],
  technologies: Technology[],
) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by specific technologies
    if (selectedTechs.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechs.every((techId) =>
          project.technologies.some((tech) => tech.id === techId),
        ),
      );
    }

    // Sort projects
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return Number(b.id) - Number(a.id);
        case "oldest":
          return Number(a.id) - Number(b.id);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [projects, selectedTechs, sortBy]);

  const handleTechSelect = (techId: string) => {
    setSelectedTechs((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    );
  };

  const availableTechnologies = useMemo(
    () =>
      technologies.filter((tech) =>
        projects.some((project) =>
          project.technologies.some((pt) => pt.id === tech.id),
        ),
      ),
    [projects, technologies],
  );

  return {
    selectedTechs,
    sortBy,
    filteredProjects,
    handleTechSelect,
    setSortBy,
    availableTechnologies,
  };
};

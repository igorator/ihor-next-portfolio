import { useMemo, useState } from "react";
import type {
  Project,
  ProjectWithTechnologies,
} from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";

export const useProjectFilters = (
  projects: Project[],
  technologies: Technology[],
) => {
  // теперь массив выбранных технологий
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest",
  );

  const toggleTech = (id: string) => {
    setSelectedTechs((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  // КЛИК ИЗ КАРТОЧКИ: оставить только одну технологию
  const setOnlyTechnology = (id: string) => setSelectedTechs([id]);

  const clearTechnologies = () => setSelectedTechs([]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (selectedTechs.length > 0) {
      filtered = filtered.filter((project) => {
        const list = ((project as ProjectWithTechnologies).technologies ??
          project.technologyIds ??
          []) as Array<{ id?: string } | string>;
        const projectTechIds = list
          .map((x) => (typeof x === "string" ? x : x.id))
          .filter(Boolean);
        // OR-логика: проект попадает, если у него есть ХОТЯ БЫ ОДНА из выбранных технологий
        return selectedTechs.some((id) => projectTechIds.includes(id));
      });
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [projects, selectedTechs, sortBy]);

  const availableTechnologies = useMemo(
    () =>
      technologies.filter((tech) =>
        projects.some((project) => {
          const list = ((project as ProjectWithTechnologies).technologies ??
            project.technologyIds ??
            []) as Array<{ id?: string } | string>;
          return list.some((pt) =>
            typeof pt === "string" ? pt === tech.id : pt.id === tech.id,
          );
        }),
      ),
    [projects, technologies],
  );

  return {
    // состояние
    selectedTechs,
    sortBy,
    filteredProjects,
    availableTechnologies,
    // экшены
    toggleTech,
    setOnlyTechnology,
    clearTechnologies,
    setSortBy,
  };
};

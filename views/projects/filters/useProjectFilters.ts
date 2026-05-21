import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProjectWithTechnologies } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";

type SortKey = "newest" | "oldest" | "az" | "za";
type MatchMode = "any" | "all";

const SORT_VALUES = new Set<SortKey>(["newest", "oldest", "az", "za"]);
const MATCH_VALUES = new Set<MatchMode>(["any", "all"]);

function parseSortKey(value: string | null): SortKey {
  return value && SORT_VALUES.has(value as SortKey)
    ? (value as SortKey)
    : "newest";
}

function parseMatchMode(value: string | null): MatchMode {
  return value && MATCH_VALUES.has(value as MatchMode)
    ? (value as MatchMode)
    : "all";
}

export const useProjectFilters = (
  projects: ProjectWithTechnologies[],
  technologies: Technology[],
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const param = searchParams.get("tech");
  const selectedTechs = param ? param.split(",").filter(Boolean) : [];

  const sortBy = parseSortKey(searchParams.get("sort"));
  const matchMode = parseMatchMode(searchParams.get("match"));
  const commercialOnly = searchParams.get("commercial") !== "false";

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const toggleTech = (id: string) => {
    const next = selectedTechs.includes(id)
      ? selectedTechs.filter((techId) => techId !== id)
      : [...selectedTechs, id];
    updateParams({ tech: next.length > 0 ? next.join(",") : null });
  };

  const setOnlyTechnology = (id: string) => updateParams({ tech: id });

  const clearTechnologies = () => updateParams({ tech: null });

  const setSortBy = (value: SortKey) =>
    updateParams({ sort: value === "newest" ? null : value });

  const setMatchMode = (value: MatchMode) =>
    updateParams({ match: value === "all" ? null : value });

  const setCommercialOnly = (value: boolean) =>
    updateParams({ commercial: value ? null : "false" });

  const clearAll = () =>
    updateParams({ tech: null, sort: null, match: null, commercial: null });

  const toTechIds = (project: ProjectWithTechnologies): string[] =>
    (project.technologies ?? []).map((tech) => tech.id).filter(Boolean);

  let filtered = projects;
  if (selectedTechs.length > 0) {
    filtered = projects.filter((project) => {
      const projectTechIds = toTechIds(project);
      return matchMode === "all"
        ? selectedTechs.every((id) => projectTechIds.includes(id))
        : selectedTechs.some((id) => projectTechIds.includes(id));
    });
  }
  if (commercialOnly) {
    filtered = filtered.filter((project) => Boolean(project.isCommercial));
  }
  const filteredProjects = filtered.toSorted((a, b) => {
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

  const projectHasTech = (project: ProjectWithTechnologies, techId: string) =>
    (project.technologies ?? []).some((tech) => tech.id === techId);

  const availableTechnologies = technologies
    .filter((tech) =>
      projects.some((project) => projectHasTech(project, tech.id)),
    )
    .toSorted((a, b) => a.priority - b.priority);

  return {
    selectedTechs,
    sortBy,
    matchMode,
    commercialOnly,
    filteredProjects,
    availableTechnologies,
    toggleTech,
    setOnlyTechnology,
    clearTechnologies,
    setSortBy,
    setMatchMode,
    setCommercialOnly,
    clearAll,
  };
};

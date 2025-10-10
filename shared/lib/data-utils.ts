import type { ProjectBase, Project } from "@/shared/types/project";
import type { Technology } from "@/shared/types/technology";

export function mergeProjectsWithTechnologies(
  projects: ProjectBase[],
  technologies: Technology[],
): Project[] {
  const techMap = new Map(technologies.map((tech) => [tech.id, tech]));

  return projects.map((project) => {
    const projectTechnologies = project.technologyIds
      .map((id) => techMap.get(id))
      .filter((tech): tech is Technology => tech !== undefined);

    return {
      ...project,
      technologies: projectTechnologies,
    };
  });
}

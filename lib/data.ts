import { unstable_noStore as noStore } from "next/cache";
import projectsData from "@/server/data/projects/projects.json";
import technologiesData from "@/server/data/technologies.json";
import employmentData from "@/server/data/employment.json";
import { mergeProjectsWithTechnologies } from "@/shared/lib/data-utils";
import type { Project } from "@/shared/types/project";
import type { Technology } from "@/shared/types/technology";
import type { Employment } from "@/shared/types/employment";

export async function getProjects(): Promise<Project[]> {
  noStore();

  const projects = projectsData.projects;
  const technologies = technologiesData.technologies;

  return mergeProjectsWithTechnologies(projects, technologies);
}

export async function getTechnologies(): Promise<Technology[]> {
  noStore();

  return technologiesData.technologies;
}

export async function getEmployment(): Promise<Employment[]> {
  noStore();

  return employmentData;
}

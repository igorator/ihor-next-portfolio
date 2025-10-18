import { unstable_noStore as noStore } from "next/cache";
import projectsData from "@/server/data/projects/projects.json";
import type { Project } from "@/shared/types/project";

export async function getProjects(): Promise<Project[]> {
  noStore();
  return projectsData.projects;
}

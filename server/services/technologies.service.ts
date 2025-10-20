import "server-only";
import technologiesData from "@/server/data/projects/technologies.json";
import type { Technology } from "@/shared/types/technology";

export async function getTechnologies(): Promise<Technology[]> {
  return technologiesData.technologies;
}

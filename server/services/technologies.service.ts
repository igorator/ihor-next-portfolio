import { unstable_noStore as noStore } from "next/cache";
import technologiesData from "@/server/data/technologies.json";
import type { Technology } from "@/shared/types/technology";

export async function getTechnologies(): Promise<Technology[]> {
  noStore();
  return technologiesData.technologies;
}

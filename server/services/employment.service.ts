import { unstable_noStore as noStore } from "next/cache";
import employmentData from "@/server/data/employment.json";
import type { Employment } from "@/shared/types/employment";

export async function getEmployment(): Promise<Employment[]> {
  noStore();
  return employmentData;
}

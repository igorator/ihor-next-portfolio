import type { Locale } from "next-intl";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";

export const getProjects = async (locale: Locale = "en") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?locale=${locale}`,
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json() as Promise<Array<ProjectWithTechnologies>>;
};

import { API_CONFIG } from "@/shared/config/api";
import { apiClient } from "@/shared/lib/api-client";
import type { Project } from "@/shared/types/project";

export async function getProjects(): Promise<Project[]> {
  return apiClient.fetch<Project[]>(API_CONFIG.endpoints.projects, {
    cache: "no-store",
  });
}

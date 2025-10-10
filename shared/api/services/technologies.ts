import { API_CONFIG } from "@/shared/config/api";
import { apiClient } from "@/shared/lib/api-client";
import type { Technology } from "@/shared/types/technology";

export async function getTechnologies(): Promise<Technology[]> {
  return apiClient.fetch<Technology[]>(API_CONFIG.endpoints.technologies, {
    cache: "no-store",
  });
}

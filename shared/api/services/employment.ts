import { API_CONFIG } from "@/shared/config/api";
import { apiClient } from "@/shared/lib/api-client";
import type { EmploymentItem } from "@/shared/types";

export async function getEmployment(): Promise<EmploymentItem[]> {
  return apiClient.fetch<EmploymentItem[]>(API_CONFIG.endpoints.employment, {
    cache: "no-store",
  });
}

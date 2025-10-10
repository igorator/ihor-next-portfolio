export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  endpoints: {
    projects: "/api/projects",
    technologies: "/api/technologies",
    employment: "/api/employment",
  },
} as const;

export type ApiEndpoints = keyof typeof API_CONFIG.endpoints;

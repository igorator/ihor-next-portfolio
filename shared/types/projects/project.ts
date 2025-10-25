import type { Technology } from "../technology";

export type Project = {
  slug: string;
  title: string;
  date: string;
  year: number;
  description: string;
  type: string;
  category: string;
  technologiesIds: string[];
  imageUrl: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  isCommercial?: boolean;
};

export type ProjectWithTechnologies = Omit<Project, "technologiesIds"> & {
  technologies: Technology[];
};

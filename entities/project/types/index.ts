import type { Technology } from "@/entities/technology/types";

export type GithubLink = {
  url: string;
  label?: string;
};

export type GithubUrlValue =
  | string
  | GithubLink
  | (string | GithubLink)[]
  | null;

export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: string;
  category: string;
  technologiesIds: string[];
  cover?: string;
  screens?: string[];
  video?: string;
  githubUrl?: GithubUrlValue;
  demoUrl?: string | null;
  isCommercial?: boolean;
  isHighlighted?: boolean;
  isHidden?: boolean;
};

export type ProjectWithTechnologies = Omit<Project, "technologiesIds"> & {
  technologies: Technology[];
};

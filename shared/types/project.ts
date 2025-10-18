export type Project = {
  id: string;
  title: string;
  date: string;
  year: number;
  description_ua: string;
  description_en: string;
  technologyIds: string[];
  imageUrl: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
};

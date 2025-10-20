import type { Technology } from "./technology";

export type Project = {
  id: string;
  title: string;
  date: string;
  year: number;

  /** Краткое описание проекта на активном языке */
  description: string;

  /** Тип проекта (например: стартап, сервіс, бізнес, вітрина, internal tool) */
  type: string;

  /** Категория (landing, marketplace, bot, integration и т.п.) */
  category: string;

  /** Список технологий, связанных с проектом */
  technologyIds: string[];

  /** Путь к изображению проекта */
  imageUrl: string;

  /** GitHub-репозиторий (опционально) */
  githubUrl?: string | null;

  /** Демонстрационный URL (опционально) */
  demoUrl?: string | null;
};

export type ProjectWithTechnologies = Project & {
  technologies?: Technology[];
};

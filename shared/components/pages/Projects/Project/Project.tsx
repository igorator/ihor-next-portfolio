"use client";

import { Section } from "@/shared/components/layout/Section/Section";
import type { Project } from "@/shared/types/projects/project";

type Props = { project: Project };

export const ProjectSection = () => (
  <Section>
    <h1>Project</h1>
    <p>Description</p>
  </Section>
);

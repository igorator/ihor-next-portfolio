"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useRouter } from "@/i18n/navigation";
import { Section } from "@/shared/ui/Section/Section";
import { GlassSurface } from "@/shared/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import type { Technology } from "@/entities/technology/types";
import type { GithubUrlValue } from "@/entities/project/types";
import type { MediaItem } from "@/shared/ui/Lightbox/types";
import { Lightbox } from "@/shared/ui/Lightbox/Lightbox";
import { OverviewCard } from "./components/OverviewCard/OverviewCard";
import { StackCard } from "./components/StackCard/StackCard";
import { LinksCard } from "./components/LinksCard/LinksCard";
import { ImageCard } from "./components/ImageCard/ImageCard";
import { DescriptionCard } from "./components/DescriptionCard/DescriptionCard";
import styles from "./Project.module.css";

type ProjectSectionProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  cover: string;
  technologies: Technology[];
  githubUrl?: GithubUrlValue;
  demoUrl?: string | null;
  screens?: string[];
  video?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export function ProjectSection({
  title,
  description,
  type,
  category,
  date,
  cover,
  technologies,
  githubUrl,
  demoUrl,
  screens = [],
  video,
}: ProjectSectionProps) {
  const t = useTranslations("projects_ui");
  const router = useRouter();

  const items: MediaItem[] = [];
  if (cover) items.push({ type: "image", url: cover });
  if (video) items.push({ type: "video", url: video });
  screens.forEach((url) => items.push({ type: "image", url }));

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMany = items.length > 1;

  const goTo = (next: number) => {
    if (!hasMany) return;
    const normalizedIndex = (next + items.length) % items.length;
    setDir(next > idx || (idx === items.length - 1 && next === 0) ? 1 : -1);
    setIdx(normalizedIndex);
  };
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const openLightbox = (startAt = idx) => {
    setIdx(startAt);
    setLightboxOpen(true);
  };

  return (
    <Section className={styles.section}>
      <div className={styles.header}>
        <GlassSurface className={styles.backButtonWrapper}>
          <Link
            href={routes.projects.path}
            className={styles.backLink}
            aria-label={t("backToProjectsAria")}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                const ref = document.referrer;
                if (ref) {
                  try {
                    const referrerUrl = new URL(ref);
                    if (referrerUrl.origin === window.location.origin) {
                      router.back();
                      return;
                    }
                  } catch {}
                }
              }
              router.push(routes.projects.path);
            }}
          >
            <BsArrowLeft aria-hidden size={16} />
            <span>{t("back")}</span>
          </Link>
        </GlassSurface>
      </div>

      <motion.section
        className={styles.cardsGrid}
        variants={cardsContainer}
        initial="hidden"
        animate="show"
        transition={{ ease }}
      >
        <OverviewCard
          title={title}
          type={type}
          category={category}
          date={date}
        />

        <StackCard technologies={technologies} />

        <LinksCard demoUrl={demoUrl} githubUrl={githubUrl} />

        <ImageCard
          items={items}
          idx={idx}
          dir={dir}
          hasMany={hasMany}
          title={title}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
          onOpenLightbox={openLightbox}
        />

        <DescriptionCard description={description} />
      </motion.section>

      <div className="proxy"></div>

      {lightboxOpen && items.length > 0 && (
        <Lightbox
          items={items}
          index={idx}
          setIndex={setIdx}
          onClose={() => setLightboxOpen(false)}
          title={title}
        />
      )}
    </Section>
  );
}

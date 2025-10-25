"use client";

import { motion, type Variants } from "motion/react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import type { Technology } from "@/shared/types/technology";
import styles from "./Project.module.css";

type ProjectSectionProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  year: number;
  date: string;
  imageUrl: string;
  technologies: Technology[];
  githubUrl?: string | null;
  demoUrl?: string | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease },
  },
};

const Card = ({
  className,
  children,
  variants,
}: {
  className?: string;
  children: React.ReactNode;
  variants: Variants;
}) => (
  <motion.article
    className={`${styles.card} ${className ?? ""}`}
    variants={variants}
  >
    {children}
  </motion.article>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={styles.cardTitle}>{children}</h2>
);

const LinkBtn = ({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) => (
  <a
    className={`${styles.btn} ${
      variant === "primary" ? styles.btnPrimary : styles.btnGhost
    }`}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const TechChip = ({ name }: { name: string }) => (
  <motion.li
    className={styles.techChip}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    {name}
  </motion.li>
);

/* ---------- Page header blocks ---------- */
const BackToProjects = () => (
  <GlassSurface className={styles.backRow}>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease }}
    >
      <Link href={routes.projects.path} className={styles.back}>
        <BsArrowLeft size={16} />

        <span>Back to projects</span>
      </Link>
    </motion.div>
  </GlassSurface>
);

const PageHeader = ({
  title,
  type,
  category,
  year,
}: {
  title: string;
  type: string;
  category: string;
  year: number;
}) => (
  <motion.header
    className={styles.header}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease }}
  >
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.sub}>
      <span className={styles.badge}>{type}</span>
      <span className={styles.dot} aria-hidden />
      <span className={styles.badgeAlt}>{category}</span>
      <span className={styles.dot} aria-hidden />
      <time className={styles.year} dateTime={String(year)}>
        {year}
      </time>
    </div>
  </motion.header>
);

/* ---------- Content cards ---------- */
const ImageCard = ({
  imageUrl,
  title,
  date,
}: {
  imageUrl: string;
  title: string;
  date: string;
}) => (
  <Card className={styles.imageCard} variants={itemVariants}>
    <div className={styles.imageWrap}>
      <img className={styles.image} src={imageUrl} alt={title} />
      <div className={styles.imageGloss} aria-hidden />
    </div>
    <footer className={styles.imageMeta}>
      <time className={styles.date} dateTime={date}>
        {date}
      </time>
    </footer>
  </Card>
);

const MetaCard = ({
  type,
  category,
  year,
  date,
}: {
  type: string;
  category: string;
  year: number;
  date: string;
}) => (
  <Card className={styles.metaCard} variants={itemVariants}>
    <SectionTitle>Overview</SectionTitle>
    <ul className={styles.metaList}>
      <li className={styles.metaItem}>
        <span className={styles.metaLabel}>Type</span>
        <span className={styles.metaValue}>{type}</span>
      </li>
      <li className={styles.metaItem}>
        <span className={styles.metaLabel}>Category</span>
        <span className={styles.metaValue}>{category}</span>
      </li>
      <li className={styles.metaItem}>
        <span className={styles.metaLabel}>Year</span>
        <span className={styles.metaValue}>{year}</span>
      </li>
      <li className={styles.metaItem}>
        <span className={styles.metaLabel}>Date</span>
        <time className={styles.metaValue} dateTime={date}>
          {date}
        </time>
      </li>
    </ul>
  </Card>
);

const DescriptionCard = ({ description }: { description: string }) => (
  <Card className={styles.descCard} variants={itemVariants}>
    <SectionTitle>Description</SectionTitle>
    <p className={styles.description}>{description}</p>
  </Card>
);

const TechnologiesCard = ({ technologies }: { technologies: Technology[] }) => (
  <Card className={styles.techCard} variants={itemVariants}>
    <SectionTitle>Technologies</SectionTitle>
    {technologies?.length ? (
      <ul className={styles.techList} aria-label="Technology stack">
        {technologies.map((t) => (
          <TechChip key={t.id} name={t.name} />
        ))}
      </ul>
    ) : (
      <p className={styles.muted}>No technologies listed.</p>
    )}
  </Card>
);

const LinksCard = ({
  demoUrl,
  githubUrl,
}: {
  demoUrl?: string | null;
  githubUrl?: string | null;
}) => (
  <Card className={styles.linksCard} variants={itemVariants}>
    <SectionTitle>Links</SectionTitle>
    <div className={styles.linksRow}>
      {demoUrl && <LinkBtn href={demoUrl}>Live Demo</LinkBtn>}
      {githubUrl && (
        <LinkBtn href={githubUrl} variant="ghost">
          GitHub
        </LinkBtn>
      )}
    </div>
  </Card>
);

export const ProjectSection = ({
  title,
  description,
  type,
  category,
  year,
  date,
  imageUrl,
  technologies,
  githubUrl,
  demoUrl,
}: ProjectSectionProps) => {
  return (
    <Section className={styles.wrap}>
      <BackToProjects />
      <PageHeader title={title} type={type} category={category} year={year} />

      <motion.section
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ ease }}
      >
        <ImageCard imageUrl={imageUrl} title={title} date={date} />
        <MetaCard type={type} category={category} year={year} date={date} />
        <DescriptionCard description={description} />
        <TechnologiesCard technologies={technologies} />
        <LinksCard
          demoUrl={demoUrl ?? undefined}
          githubUrl={githubUrl ?? undefined}
        />
      </motion.section>
    </Section>
  );
};

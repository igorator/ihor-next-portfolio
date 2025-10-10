import { Section } from "@/components/layout/Section/Section";
import styles from "./Home.module.css";
import Link from "next/link";
import { routes } from "@/shared/config/routes";

const heroLinks = {
  projects: { label: "Projects", href: routes.projects.path },
  cv: { label: "CV", href: routes.cv.path },
  employment: { label: "Employment", href: routes.employment.path },
} as const;

export const HomeSection = () => (
  <Section className={styles.home}>
    <div className={styles.content}>
      <h1 className={styles.title}>
        <span className={styles.fade}>Hello,</span> <br />
        <span className={styles.name}>I'm Ihor</span> <br />
        <span className={styles.role}>Web Developer</span>
      </h1>

      <div className={styles.buttons}>
        {Object.values(heroLinks).map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.btn} glass-wrapper`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </Section>
);

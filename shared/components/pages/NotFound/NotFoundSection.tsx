import { Section } from "@/shared/components/layout/Section/Section";
import styles from "./NotFoundSection.module.css";
import Link from "next/link";
import { routes } from "@/shared/config/routes";

export const NotFoundSection = () => (
  <Section id="not-found" className={styles.notFound}>
    <div className={styles.content}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link href={routes.root.path} className={`${styles.btn} glass-wrapper`}>
        Back to Home
      </Link>
    </div>
  </Section>
);

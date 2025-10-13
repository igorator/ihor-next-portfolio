import { Section } from "@/components/layout/Section/Section";
import styles from "./Employment.module.css";
import type { EmploymentItem } from "@/shared/types";

type EmploymentSectionProps = {
  employmentHistory: EmploymentItem[];
};

export const EmploymentSection = ({
  employmentHistory,
}: EmploymentSectionProps) => (
  <Section className={styles.employment}>
    <h2 className={styles.title}>Employment</h2>

    <ol className={styles.timeline}>
      {employmentHistory.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.marker} aria-hidden="true" />
          <article className={styles.card}>
            <header className={styles.header}>
              <h3 className={styles.company}>{item.company}</h3>
              <p className={styles.period}>
                {item.period} • <span className={styles.type}>{item.type}</span>
              </p>
            </header>

            <ul className={styles.roles}>
              {item.roles.map((role) => (
                <li key={`${role}-${item.company}`} className={styles.role}>
                  {role}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  </Section>
);

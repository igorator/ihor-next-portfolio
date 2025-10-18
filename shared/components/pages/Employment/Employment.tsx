import { Section } from "@/shared/components/layout/Section/Section";
import styles from "./Employment.module.css";
import type { Employment } from "@/shared/types";

type EmploymentSectionProps = {
  employmentHistory: Employment[];
};

export const EmploymentSection = ({
  employmentHistory,
}: EmploymentSectionProps) => (
  <Section className={styles.employment}>
    <h2 className={styles.title}>Employment</h2>

    <ol className={styles.timeline}>
      {employmentHistory.map((item) => (
        <li key={item.id} className={styles.item}>
          <article className={styles.card}>
            <header className={styles.header}>
              <h3 className={styles.company}>{item.company}</h3>
              <span className={styles.period}>{item.period}</span>
            </header>

            <div className={styles.type}>{item.type}</div>

            <ul className={styles.roles}>
              {item.roles.map((role: string) => (
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

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

    <div className={styles.list}>
      {employmentHistory.map((item) => (
        <div key={item.id} className={styles.card}>
          <h3 className={styles.company}>{item.company}</h3>
          <p className={styles.period}>
            {item.period} • <span className={styles.type}>{item.type}</span>
          </p>

          <ul className={styles.roles}>
            {item.roles.map((role, index) => (
              <li key={`${role}-${index}`}>{role}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BsFolder2 } from "react-icons/bs";
import type { Employment } from "@/entities/employment/types";
import styles from "./EmploymentCard.module.css";

type EmploymentCardProps = {
  employment: Employment;
  period: string | null;
};

export const EmploymentCard = ({ employment, period }: EmploymentCardProps) => {
  const t = useTranslations();

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.company}>{employment.company}</h3>
        <div className={styles.badgesGroup}>
          <span className={styles.typeBadge}>{employment.type}</span>
          {employment.category && (
            <span className={styles.categoryBadge}>{employment.category}</span>
          )}
        </div>
        {employment.position && (
          <span className={styles.position}>{employment.position}</span>
        )}
      </header>

      {period && <div className={styles.period}>{period}</div>}

      <ul className={styles.roles}>
        {employment.roles.map((role: string) => (
          <li key={`${role}-${employment.company}`} className={styles.role}>
            {role}
          </li>
        ))}
      </ul>

      {employment.linkedProjects && employment.linkedProjects.length > 0 && (
        <div className={styles.projectsBlock}>
          <div className={styles.projectsLabel}>
            {t("employment.linkedProjects", { default: "Linked projects" })}:
          </div>
          <ul className={styles.projects}>
            {employment.linkedProjects.map((linkedProject) => (
              <li key={linkedProject.slug}>
                <Link
                  className={styles.projectBadge}
                  href={`/projects/${linkedProject.slug}`}
                >
                  <BsFolder2
                    className={styles.projectBadgeIcon}
                    aria-hidden="true"
                  />
                  <span>{linkedProject.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

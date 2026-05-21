import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BsFolder2 } from "react-icons/bs";
import type { Employment } from "@/entities/employment/types";
import { Card } from "@/shared/ui/Card";
import styles from "./EmploymentCard.module.css";

type LinkedProject = NonNullable<Employment["linkedProjects"]>[number];

type EmploymentCardProps = {
  company: string;
  type: string;
  category?: string;
  position?: string;
  roles: string[];
  linkedProjects?: LinkedProject[];
  period: string | null;
};

export const EmploymentCard = ({
  company,
  type,
  category,
  position,
  roles,
  linkedProjects,
  period,
}: EmploymentCardProps) => {
  const t = useTranslations();

  return (
    <Card className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.company}>{company}</h3>
        <div className={styles.badgesGroup}>
          <span className={styles.typeBadge}>{type}</span>
          {category && <span className={styles.categoryBadge}>{category}</span>}
        </div>
        {position && <span className={styles.position}>{position}</span>}
      </header>

      {period && <div className={styles.period}>{period}</div>}

      <ul className={styles.roles}>
        {roles.map((role) => (
          <li key={`${role}-${company}`} className={styles.role}>
            {role}
          </li>
        ))}
      </ul>

      {linkedProjects && linkedProjects.length > 0 && (
        <div className={styles.projectsBlock}>
          <div className={styles.projectsLabel}>
            {t("employment.linkedProjects", { default: "Linked projects" })}:
          </div>
          <ul className={styles.projects}>
            {linkedProjects.map((linkedProject) => (
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
    </Card>
  );
};

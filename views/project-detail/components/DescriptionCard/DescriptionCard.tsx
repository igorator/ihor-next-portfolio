"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import layout from "../../Project.module.css";
import styles from "./DescriptionCard.module.css";

type Props = { description: string };

export function DescriptionCard({ description }: Props) {
  const t = useTranslations("projects_ui");
  return (
    <Card className={layout.descriptionCard}>
      <h2 className={layout.cardTitle}>{t("descriptionTitle")}</h2>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}

export default DescriptionCard;

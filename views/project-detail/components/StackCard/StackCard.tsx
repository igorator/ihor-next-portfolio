"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import type { Technology } from "@/entities/technology/types";
import { Card } from "@/shared/ui/Card";
import layout from "../../Project.module.css";
import styles from "./StackCard.module.css";

type TechWithColor = Technology & { color?: string };

function colorFromString(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue} 70% 55%)`;
}

type Props = { technologies: Technology[] };

export function StackCard({ technologies }: Props) {
  const t = useTranslations("projectDetail");

  return (
    <Card className={layout.stackCard}>
      <h2 className={layout.cardTitle}>{t("technologiesTitle")}</h2>
      {technologies?.length ? (
        <ul
          className={styles.technologyList}
          aria-label={t("technologyStackAria")}
        >
          {technologies.map((t) => {
            const tw = t as TechWithColor;
            const c = tw.color ?? colorFromString(t.name);
            const chipStyle = tw.textColor
              ? {
                  "--chip-fg": tw.textColor,
                  "--chip-bg": c,
                  "--chip-border": `color-mix(in srgb, ${c} 65%, transparent)`,
                }
              : {
                  "--chip-fg": c,
                  "--chip-bg": `color-mix(in srgb, ${c} 12%, transparent)`,
                  "--chip-border": `color-mix(in srgb, ${c} 42%, transparent)`,
                };
            return (
              <li
                key={t.id}
                className={styles.technologyChip}
                style={chipStyle as CSSProperties}
                title={t.name}
              >
                <span>{t.name}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className={styles.emptyState}>{t("noTechnologies")}</span>
      )}
    </Card>
  );
}

export default StackCard;

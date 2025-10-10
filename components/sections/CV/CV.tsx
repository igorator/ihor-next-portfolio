"use client";

import { Section } from "@/components/layout/Section/Section";
import styles from "./CV.module.css";
import { BsFileEarmarkPerson, BsDownload, BsEye } from "react-icons/bs";

export const CVSection = () => {
  const cvFile = "/cv/CV_Kliushnyk_Frontend.pdf"; // ← строка, НЕ import

  return (
    <Section className={styles.cv}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <BsFileEarmarkPerson className={styles.cvIcon} />
        </div>

        <div className={styles.buttons}>
          <a
            href={cvFile}
            download
            className={`${styles.button} ${styles.download}`}
          >
            <BsDownload size={18} />
            <span>Download CV</span>
          </a>

          <a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.view}`}
          >
            <BsEye size={18} />
            <span>View in Browser</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

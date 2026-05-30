import { useTranslations } from "next-intl";
import type { MediaItem } from "./types";
import styles from "./Lightbox.module.css";

type LightboxToolbarProps = {
  title: string;
  index: number;
  total: number;
  item: MediaItem;
  onInteraction: (e: React.MouseEvent) => void;
};

export const LightboxToolbar = ({
  title,
  index,
  total,
  item,
  onInteraction,
}: LightboxToolbarProps) => {
  const t = useTranslations("projectDetail.lightbox");

  return (
    <div
      className={styles.toolbar}
      role="toolbar"
      onClick={onInteraction}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <span className={styles.caption}>{title}</span>
      <span className={styles.counter}>
        {index + 1} / {total}
      </span>
      <a
        className={styles.openOriginal}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onInteraction}
      >
        {item.type === "video" ? t("openOriginalVideo") : t("openOriginal")}
      </a>
    </div>
  );
};

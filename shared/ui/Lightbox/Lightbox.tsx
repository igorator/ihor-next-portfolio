import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LightboxButton } from "./LightboxButton";
import { LightboxToolbar } from "./LightboxToolbar";
import type { MediaItem } from "./types";
import styles from "./Lightbox.module.css";

type LightboxProps = {
  items: MediaItem[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  title: string;
};

export const Lightbox = ({
  items,
  index,
  setIndex,
  onClose,
  title,
}: LightboxProps) => {
  const t = useTranslations("projects_ui.lightbox");
  const total = items.length;
  const current = items[index];

  const navigate = (delta: number) => {
    setIndex((i) => {
      const next = (i + delta) % total;
      return next < 0 ? next + total : next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate, onClose]);

  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) =>
    e.stopPropagation();

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <LightboxButton
        variant="close"
        ariaLabel={t("closeAria")}
        onClick={onClose}
        onPointerDown={stopPropagation}
      />

      <LightboxButton
        variant="previous"
        ariaLabel={t("previousAria")}
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
        onPointerDown={stopPropagation}
      />

      <LightboxButton
        variant="next"
        ariaLabel={t("nextAria")}
        onClick={(e) => {
          e.stopPropagation();
          navigate(1);
        }}
        onPointerDown={stopPropagation}
      />

      <div className={styles.stage} aria-live="polite">
        <div className={styles.figure}>
          {current?.type === "video" ? (
            <video
              key={current.url}
              src={current.url}
              controls
              playsInline
              className={styles.video}
              aria-label={t("imageAlt", { title, current: index + 1, total })}
              onClick={stopPropagation}
              onPointerDown={stopPropagation}
            />
          ) : (
            <Image
              key={current?.url}
              src={current?.url ?? ""}
              alt={t("imageAlt", { title, current: index + 1, total })}
              fill
              sizes="(min-width: 1158px) 1100px, 95vw"
              className={styles.image}
              priority
              onClick={onClose}
            />
          )}
        </div>
      </div>

      <LightboxToolbar
        title={title}
        index={index}
        total={total}
        item={current ?? { type: "image", url: "" }}
        onInteraction={stopPropagation}
      />
    </div>,
    document.body,
  );
};

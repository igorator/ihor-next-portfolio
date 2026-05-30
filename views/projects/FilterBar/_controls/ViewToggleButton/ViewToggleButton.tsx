"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { Button } from "@/shared/ui/Button";

type Props = {
  viewMode: "grid" | "list";
  onToggle: () => void;
  loading?: boolean;
};

export const ViewToggleButton = ({
  viewMode,
  onToggle,
  loading = false,
}: Props) => {
  const prefersReduced = useReducedMotion();

  return (
    <Button onClick={onToggle} loading={loading} pressed={viewMode === "list"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={viewMode}
          initial={{
            opacity: 0,
            scale: prefersReduced ? 1 : 0.5,
            rotate: prefersReduced ? 0 : -90,
          }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{
            opacity: 0,
            scale: prefersReduced ? 1 : 0.5,
            rotate: prefersReduced ? 0 : 90,
          }}
          transition={{
            duration: prefersReduced ? 0 : 0.15,
            ease: "easeInOut",
          }}
          style={{ display: "flex" }}
        >
          {viewMode === "grid" ? (
            <BsGrid3X3Gap aria-hidden />
          ) : (
            <BsListUl aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

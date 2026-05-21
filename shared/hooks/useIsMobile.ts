"use client";

import { useSyncExternalStore } from "react";

const BREAKPOINT = "(max-width: 720px)";

export function useIsMobile(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(BREAKPOINT);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(BREAKPOINT).matches,
    () => false,
  );
}

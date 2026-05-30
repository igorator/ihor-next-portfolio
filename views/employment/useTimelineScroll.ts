import { type RefObject, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export const useTimelineScroll = (
  ref: RefObject<HTMLDivElement | null>,
  count: number,
) => {
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const railClip = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced
      ? ["inset(0 0 0% 0)", "inset(0 0 0% 0)"]
      : ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );

  const [activeIndex, setActiveIndex] = useState(
    prefersReduced ? count - 1 : -1,
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let next = -1;
    for (let i = count - 1; i >= 0; i--) {
      if (latest >= i / Math.max(count - 1, 1)) {
        next = i;
        break;
      }
    }
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return { railClip, activeIndex, prefersReduced };
};

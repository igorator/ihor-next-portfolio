"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";
import styles from "./GlassSurface.module.css";

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter";
  className?: string;
  style?: React.CSSProperties;
  overflowVisible?: boolean;
}

function supportsSVGFilters(): boolean {
  if (typeof window === "undefined") return false;
  const isWebkit =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  if (isWebkit || isFirefox) return false;
  const div = document.createElement("div");
  div.style.backdropFilter = "url(#test)";
  return div.style.backdropFilter !== "";
}

let _svgSupported: boolean | null = null;
function getSvgSupported(): boolean {
  if (_svgSupported === null) _svgSupported = supportsSVGFilters();
  return _svgSupported;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width,
  height,
  borderRadius = 9999,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0.55,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {},
  overflowVisible,
}) => {
  const id = useId();
  const filterId = `glass-filter-${id}`;
  const redGradId = `red-grad-${id}`;
  const blueGradId = `blue-grad-${id}`;

  const svgSupported = useSyncExternalStore(
    () => () => {},
    getSvgSupported,
    () => false,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [
    redGradId,
    blueGradId,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    mixBlendMode,
  ]);

  const updateDisplacementMap = useCallback(() => {
    if (!containerRef.current || !feImageRef.current) return;
    const { width: w, height: h } =
      containerRef.current.getBoundingClientRect();
    if (w === 0 || h === 0) return;
    feImageRef.current.setAttribute("href", generateDisplacementMap());
  }, [generateDisplacementMap]);

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          "scale",
          (distortionScale + offset).toString(),
        );
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    updateDisplacementMap,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    let rafId: ReturnType<typeof requestAnimationFrame>;
    const trigger = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDisplacementMap);
    };

    const ro = new ResizeObserver(trigger);
    ro.observe(el);

    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) trigger();
    });
    io.observe(el);

    const mo = new MutationObserver(trigger);
    let node: Element | null = el.parentElement;
    while (node) {
      mo.observe(node, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
      node = node.parentElement;
    }

    const onVisibility = () => {
      if (!document.hidden) trigger();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [updateDisplacementMap]);

  const containerStyle = {
    ...style,
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
    borderRadius: `${borderRadius}px`,
    ...(overflowVisible ? { overflow: "visible" } : {}),
    ...(svgSupported
      ? {
          background: `light-dark(hsl(0 0% 100% / ${backgroundOpacity}), hsl(0 0% 0% / ${backgroundOpacity}))`,
          backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${svgSupported ? styles.svg : styles.fallback} ${className}`}
      style={containerStyle}
    >
      <svg className={styles.filterSvg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              ref={redChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              ref={blueChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="output"
              stdDeviation="0.7"
            />
          </filter>
        </defs>
      </svg>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

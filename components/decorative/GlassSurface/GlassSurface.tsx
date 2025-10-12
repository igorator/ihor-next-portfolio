"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import "./GlassSurface.css";

/* =========================
   Types
========================= */
export interface GlassSurfaceProps {
  children?: ReactNode;
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
  style?: CSSProperties;
}

/* =========================
   Component
========================= */
export const GlassSurface = ({
  children,
  width = "fit-content",
  height = "",
  borderRadius = 9999,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 24,
  displace = 0,
  backgroundOpacity = 0,
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
}: GlassSurfaceProps) => {
  /* ---------- IDs (стабильные между SSR/CSR) ---------- */
  const id = useId();
  const filterId = `glass-filter-${id}`;
  const redGradId = `red-grad-${id}`;
  const blueGradId = `blue-grad-${id}`;

  /* ---------- Refs ---------- */
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  /* ---------- Поддержка SVG-фильтра (фиксим гидрацию) ---------- */
  // На сервере и при первом клиентском рендере — всегда false,
  // чтобы DOM полностью совпадал с SSR.
  const [supportsSVGFilters, setSupportsSVGFilters] = useState(false);

  useEffect(() => {
    // Проверяем только после монтирования
    const check = () => {
      if (typeof document === "undefined" || typeof navigator === "undefined") {
        return false;
      }
      // Отсекаем браузеры, где часто бывают проблемы
      const ua = navigator.userAgent;
      const isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua);
      const isFirefox = /Firefox/.test(ua);
      if (isWebkit || isFirefox) return false;

      // Эвристика: умеет ли backdrop-filter принимать url(#id)
      const el = document.createElement("div");
      el.style.backdropFilter = `url(#${filterId})`;
      return el.style.backdropFilter !== "";
    };

    setSupportsSVGFilters(check());
  }, [filterId]);

  /* ---------- Генератор displacement-карты ---------- */
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
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/>
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [
    borderRadius,
    borderWidth,
    blur,
    brightness,
    mixBlendMode,
    opacity,
    redGradId,
    blueGradId,
  ]);

  const updateDisplacementMap = useCallback(() => {
    const href = generateDisplacementMap();
    if (feImageRef.current) {
      feImageRef.current.setAttribute("href", href);
    }
  }, [generateDisplacementMap]);

  /* ---------- Effects ---------- */
  // 1) Обновлять карту при изменении визуальных параметров/размеров
  useEffect(() => {
    updateDisplacementMap();
  }, [updateDisplacementMap]);

  // 2) Каналы + scale
  useEffect(() => {
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute("scale", String(distortionScale + offset));
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });
  }, [distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel]);

  // 3) Размытие
  useEffect(() => {
    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute("stdDeviation", String(displace));
    }
  }, [displace]);

  // 4) ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      // следующий тик — чтобы избежать layout thrash
      setTimeout(updateDisplacementMap, 0);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateDisplacementMap]);

  /* ---------- Style ---------- */
  type CSSVars = CSSProperties & {
    ["--glass-frost"]?: number;
    ["--glass-saturation"]?: number;
    ["--filter-id"]?: string;
  };

  const containerStyle: CSSVars = useMemo(
    () => ({
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      "--glass-frost": backgroundOpacity,
      "--glass-saturation": saturation,
      "--filter-id": `url(#${filterId})`,
    }),
    [
      style,
      width,
      height,
      borderRadius,
      backgroundOpacity,
      saturation,
      filterId,
    ],
  );

  /* ---------- Render ---------- */
  const rootClasses = [
    "glass-surface",
    supportsSVGFilters ? "glass-surface--svg" : "glass-surface--fallback",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle}
      data-supports-svg={supportsSVGFilters ? "true" : "false"}
    >
      {/* SVG-фильтр есть в DOM всегда: это безопасно.
          Важное: класс модифицируется только ПОСЛЕ монтирования,
          так что SSR/первый клиентский рендер совпадают. */}
      <svg
        className="glass-surface__filter"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>Glass Surface Filter</title>
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
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
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
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
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
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
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

      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

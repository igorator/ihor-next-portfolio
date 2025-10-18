"use client";

import React, { ReactNode, useId, CSSProperties, useMemo } from "react";

type GlassSurfaceProps = {
  children: ReactNode;
  /** Класс только для внешнего враппера (если используешь CSS Modules/обычный CSS) */
  className?: string;
  /** Класс для контейнера контента (children) */
  contentClassName?: string;

  /** Инлайн-стили (добавятся к базовым) */
  style?: CSSProperties;
  contentStyle?: CSSProperties;

  /** Геометрия/визуал */
  radius?: number | string; // px | rem | %
  padding?: number | string; // px | rem | %
  blur?: number; // backdrop-filter blur (px)
  tint?: string; // rgba/hex поверх стекла
  displacementScale?: number; // сила feDisplacementMap
  seed?: number; // feTurbulence seed
  baseFrequency?: number; // feTurbulence baseFrequency
  specularExponent?: number; // блеск
  light?: { x: number; y: number; z: number }; // источник света
  withShine?: boolean; // внутренние блики
};

export const GlassSurface = ({
  children,
  className,
  contentClassName,
  style,
  contentStyle,

  radius = 9999,

  padding = "0",
  blur = 3,
  tint = "rgba(255,255,255,0.1)",
  displacementScale = 150,
  seed = 5,
  baseFrequency = 0.01,
  specularExponent = 100,
  light = { x: -200, y: -200, z: 300 },
  withShine = true,
}: GlassSurfaceProps) => {
  const filterId = useId().replace(/:/g, "-");

  const wrapperRadius = useMemo(() => toCssSize(radius), [radius]);
  const wrapperPadding = useMemo(() => toCssSize(padding), [padding]);

  const baseWrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 400ms",
    boxShadow: "0 2px 2px rgba(0,0,0,0.2), 0 0 50px rgba(0,0,0,0.1)",
    borderRadius: wrapperRadius,
    padding: wrapperPadding,
  };

  const effectStyle: CSSProperties = {
    inset: 0,
    position: "absolute",
    zIndex: 0,
    backdropFilter: `blur(${blur}px)`,
    filter: `url(#${filterId})`,
    borderRadius: wrapperRadius,
    overflow: "hidden",
  };

  const tintStyle: CSSProperties = {
    inset: 0,
    position: "absolute",
    zIndex: 1,
    background: tint,
    borderRadius: wrapperRadius,
  };

  const shineStyle: CSSProperties | undefined = withShine
    ? {
        inset: 0,
        position: "absolute",
        zIndex: 2,
        boxShadow:
          "inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.5)",
        borderRadius: wrapperRadius,
        overflow: "hidden",
      }
    : undefined;

  const baseContentStyle: CSSProperties = {
    position: "relative",
    zIndex: 3,
    borderRadius: wrapperRadius,
  };

  return (
    <div className={className} style={{ ...baseWrapperStyle, ...style }}>
      {/* Эффект стекла */}
      <div style={effectStyle} />

      {/* Тонировка */}
      <div style={tintStyle} />

      {/* Блики */}
      {withShine && <div style={shineStyle} />}

      {/* Контент */}
      <div
        className={contentClassName}
        style={{ ...baseContentStyle, ...contentStyle }}
      >
        {children}
      </div>

      {/* SVG-фильтр (уникальный id через useId) */}
      <svg style={{ display: "none" }} aria-hidden="true" focusable="false">
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`${baseFrequency} ${baseFrequency}`}
            numOctaves="1"
            seed={seed}
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent={specularExponent}
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x={light.x} y={light.y} z={light.z} />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};

/** Преобразует число в px; строки возвращает как есть */
function toCssSize(v: number | string): string {
  return typeof v === "number" ? `${v}px` : v;
}

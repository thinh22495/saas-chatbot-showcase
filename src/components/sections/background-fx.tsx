"use client";

import { useEffect, useRef, useState } from "react";

import { BackgroundFxConfig } from "@/config/site.types";

type BackgroundFxProps = {
  data: BackgroundFxConfig;
};

const DEFAULT_CURSOR = {
  x: "50vw",
  y: "30vh",
};

export function BackgroundFx({ data }: BackgroundFxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.style.setProperty("--cursor-x", DEFAULT_CURSOR.x);
    node.style.setProperty("--cursor-y", DEFAULT_CURSOR.y);
    node.style.setProperty("--grid-x", "0px");
    node.style.setProperty("--grid-y", "0px");
  }, []);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const update = () => {
      const isMobile =
        mobileQuery.matches || (navigator.maxTouchPoints ?? 0) > 0;
      setDisabled(reduceQuery.matches || (data.disableOnMobile && isMobile));
    };

    update();

    if (reduceQuery.addEventListener) {
      reduceQuery.addEventListener("change", update);
      mobileQuery.addEventListener("change", update);
    } else {
      reduceQuery.addListener(update);
      mobileQuery.addListener(update);
    }

    return () => {
      if (reduceQuery.removeEventListener) {
        reduceQuery.removeEventListener("change", update);
        mobileQuery.removeEventListener("change", update);
      } else {
        reduceQuery.removeListener(update);
        mobileQuery.removeListener(update);
      }
    };
  }, [data.disableOnMobile]);

  useEffect(() => {
    if (disabled) return;

    const node = containerRef.current;
    if (!node) return;

    let frame = 0;
    let latestX = 0;
    let latestY = 0;

    const update = () => {
      node.style.setProperty("--cursor-x", `${latestX}px`);
      node.style.setProperty("--cursor-y", `${latestY}px`);
      node.style.setProperty("--grid-x", `${-latestX * 0.04}px`);
      node.style.setProperty("--grid-y", `${-latestY * 0.04}px`);
      frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [disabled]);

  if (!data.enabled) return null;

  const [primary, secondary, tertiary] = data.colors;
  const size = Math.max(240, data.size);
  const intensity = Math.min(1, Math.max(0, data.intensity));
  const gridSize = Math.max(140, Math.round(size * 0.5));
  const gridOpacity = data.mode === "particles" ? 0.12 : 0.2;
  const glowOpacity = disabled ? intensity * 0.4 : intensity;

  const glowStyle: React.CSSProperties = {
    backgroundImage: `
      radial-gradient(${size}px circle at var(--cursor-x) var(--cursor-y), ${primary}, transparent 60%),
      radial-gradient(${Math.round(size * 0.7)}px circle at calc(var(--cursor-x) - ${
        size * 0.35
      }px) calc(var(--cursor-y) + ${size * 0.25}px), ${
        secondary ?? primary
      }, transparent 60%),
      radial-gradient(${Math.round(size * 0.55)}px circle at calc(var(--cursor-x) + ${
        size * 0.45
      }px) calc(var(--cursor-y) - ${size * 0.3}px), ${
        tertiary ?? primary
      }, transparent 60%)
    `,
    opacity: glowOpacity,
    filter: `blur(${data.blur}px)`,
    transform: "translateZ(0)",
  };

  const gridStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(to right, rgba(148,163,184,${gridOpacity}) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148,163,184,${gridOpacity}) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: "var(--grid-x) var(--grid-y)",
    maskImage: "radial-gradient(circle at 50% 20%, black, transparent 72%)",
  };

  const particlesStyle: React.CSSProperties =
    data.mode === "particles"
      ? {
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.35,
        }
      : {};

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        {
          "--cursor-x": DEFAULT_CURSOR.x,
          "--cursor-y": DEFAULT_CURSOR.y,
          "--grid-x": "0px",
          "--grid-y": "0px",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0" style={gridStyle} />
      {data.mode === "particles" ? (
        <div className="absolute inset-0" style={particlesStyle} />
      ) : null}
      <div className="absolute inset-0 mix-blend-screen" style={glowStyle} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] opacity-70" />
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, JSX } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText = ({
  text,
  className,
  intensity = "medium",
  as: Tag = "span",
}: GlitchTextProps) => {
  const jitter =
    intensity === "high"
      ? "animate-glitch-jitter"
      : intensity === "low"
        ? ""
        : "animate-glitch-skew";

  const baseStyle: CSSProperties = {
    textShadow:
      "0.04em 0 0 hsl(0 100% 55% / 0.85), -0.04em -0.02em 0 hsl(180 100% 55% / 0.85), 0 0 0.4em hsl(var(--foreground) / 0.25)",
  };

  return (
    <Tag
      className={cn(
        "relative inline-block font-mono font-bold tracking-tight select-none",
        "text-foreground animate-glitch-flicker",
        jitter,
        className
      )}
      style={baseStyle}
      data-text={text}
      aria-label={text}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Red channel slice */}
      <span
        aria-hidden
        className="absolute inset-0 z-20 animate-glitch-clip-1 animate-glitch-red mix-blend-screen pointer-events-none"
        style={{
          color: "hsl(0 100% 55%)",
          textShadow: "2px 0 hsl(0 100% 55%)",
        }}
      >
        {text}
      </span>

      {/* Cyan channel slice */}
      <span
        aria-hidden
        className="absolute inset-0 z-20 animate-glitch-clip-2 animate-glitch-cyan mix-blend-screen pointer-events-none"
        style={{
          color: "hsl(180 100% 55%)",
          textShadow: "-2px 0 hsl(180 100% 55%)",
        }}
      >
        {text}
      </span>

      {/* Scanline overlay */}
      <span
        aria-hidden
        className="absolute inset-0 z-30 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 2px, hsl(var(--background)) 2px, hsl(var(--background)) 3px)",
        }}
      />
    </Tag>
  );
};

export default GlitchText;

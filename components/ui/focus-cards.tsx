"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type FocusCard = {
  title: string;
  src: string;
  label?: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: FocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative bg-surface-container-lowest overflow-hidden h-60 md:h-96 w-full transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-outline-variant",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-60"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      {/* Corner stamp */}
      <div className="absolute top-3 right-3 font-mono text-[10px] text-primary-container/40 font-bold uppercase pointer-events-none">
        NXR-{String(index + 1).padStart(3, "0")}
      </div>
      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-[#0A0A0A]/70 flex items-end p-6 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        {card.label && (
          <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container">
            {card.label}
          </span>
        )}
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={`${card.src}-${index}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X } from "@phosphor-icons/react";

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
    onOpen,
  }: {
    card: FocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onOpen: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      className={cn(
        "stagger-item relative bg-surface-container-lowest overflow-hidden h-60 md:h-96 w-full transition-[transform,opacity,filter] duration-200 ease-[var(--ease-spring)] border border-outline-variant cursor-pointer active:scale-[0.97]",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-60"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute top-3 right-3 font-mono text-[10px] text-primary-container/40 font-bold uppercase pointer-events-none">
        NXR-{String(index + 1).padStart(3, "0")}
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-[#0A0A0A]/70 flex items-end p-6 transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
          hovered === index ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
        )}
      >
        <div className="flex items-center justify-between w-full">
          {card.label && (
            <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container">
              {card.label}
            </span>
          )}
          <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase">
            Click to expand
          </span>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

function Lightbox({ card, onClose }: { card: FocusCard; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next frame
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200); // Wait for exit animation
  }, [onClose]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-[opacity] duration-200 ease-[var(--ease-out)]",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-outline-variant bg-surface-container text-on-surface-variant transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-surface-container-high active:scale-[0.90]"
        aria-label="Close lightbox"
      >
        <X size={18} weight="bold" />
      </button>

      {/* Image */}
      <img
        src={card.src}
        alt={card.title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-10 max-w-[90vw] max-h-[85vh] object-contain border border-outline-variant/50 transition-[transform,opacity] duration-200 ease-[var(--ease-spring)]",
          visible ? "scale-100 opacity-100" : "scale-[0.95] opacity-0"
        )}
      />

      {/* Label */}
      {card.label && (
        <div className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container/60 transition-[opacity] duration-200",
          visible ? "opacity-100" : "opacity-0"
        )}>
          {card.label}
        </div>
      )}
    </div>
  );
}

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {cards.map((card, index) => (
          <Card
            key={`${card.src}-${index}`}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onOpen={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          card={cards[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

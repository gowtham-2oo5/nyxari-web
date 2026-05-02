"use client";

import { FocusCards } from "@/components/ui/focus-cards";
import type { FocusCard } from "@/components/ui/focus-cards";

const galleryCards: FocusCard[] = [
  {
    title: "Epic Moment",
    src: "/gallery/img-1.png",
    label: "CLASSIFIED // NXR",
  },
  {
    title: "Epic Moment",
    src: "/gallery/img-2.png",
    label: "CLASSIFIED // NXR",
  },
  {
    title: "Epic Moment",
    src: "/gallery/img-3.png",
    label: "CLASSIFIED // NXR",
  },
  {
    title: "Epic Moment",
    src: "/gallery/img-4.png",
    label: "CLASSIFIED // NXR",
  },
  {
    title: "Epic Moment",
    src: "/gallery/img-5.png",
    label: "CLASSIFIED // NXR",
  },
  {
    title: "Epic Moment",
    src: "/gallery/img-6.png",
    label: "CLASSIFIED // NXR",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24 px-8 relative border-b border-primary-container/20"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant pb-6">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-[48px] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase">
              Intel Feed
            </h2>
            <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant mt-2">
              Classified Visual Archives
            </p>
          </div>
          <p className="font-mono text-xs text-on-surface-variant mt-4 md:mt-0 border border-outline-variant px-3 py-1 bg-surface-container-lowest/50">
            CLEARANCE: PUBLIC
          </p>
        </div>

        {/* Focus Cards Grid */}
        <FocusCards cards={galleryCards} />
      </div>
    </section>
  );
}

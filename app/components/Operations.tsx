"use client";

import ScrollReveal from "./ScrollReveal";

const operations = [
  {
    id: "01",
    title: "Backup Calls",
    description: "Someone's getting teamed? We pull up. No questions.",
  },
  {
    id: "02",
    title: "Clan Wars",
    description: "Organized fights against other clans. High stakes, no mercy.",
  },
  {
    id: "03",
    title: "The Glads",
    description: "1v1 arena. Prove yourself or get humbled.",
  },
  {
    id: "04",
    title: "Tournament Arc",
    description: "Internal competitions. Brackets, prizes, bragging rights.",
  },
  {
    id: "05",
    title: "Alliances",
    description: "We keep friends close. Diplomacy with other clans.",
  },
  {
    id: "06",
    title: "Off-Duty",
    description: "Not everything is war. Chill sessions, memes, vibes.",
  },
];

export default function Operations() {
  return (
    <section
      id="operations"
      className="py-24 px-8 relative border-b-2 border-primary-container/20"
    >
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" /> What We Do
          </h2>
          <p className="font-body text-sm text-on-surface-variant/60 mb-16 ml-12">
            Everything that keeps Nyxari running.
          </p>
        </ScrollReveal>

        {/* Vertical list — like a briefing document */}
        <div className="border-t-2 border-outline-variant/40">
          {operations.map((op, i) => (
            <ScrollReveal key={op.id} delay={i * 0.06}>
              <div className="grid grid-cols-12 border-b border-outline-variant/20 py-6 group hover:bg-surface-container-lowest/50 px-2">
                {/* Number */}
                <div className="col-span-1 font-mono text-[10px] font-bold tracking-[0.1em] text-primary-container/50">
                  {op.id}
                </div>

                {/* Title */}
                <div className="col-span-4 md:col-span-3">
                  <h3 className="font-display font-bold text-lg uppercase text-on-surface group-hover:text-primary-container">
                    {op.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-7 md:col-span-8">
                  <p className="font-body text-sm text-on-surface-variant/70">
                    {op.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

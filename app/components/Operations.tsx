import {
  Siren,
  Sword,
  PersonSimple,
  Trophy,
  Handshake,
  GameController,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

interface Operation {
  icon: Icon;
  title: string;
  description: string;
}

const operations: Operation[] = [
  {
    icon: Siren,
    title: "Backup Calls",
    description: "Anti-teaming rapid response protocols.",
  },
  {
    icon: Sword,
    title: "Clan Wars",
    description: "High-stakes organized skirmishes.",
  },
  {
    icon: PersonSimple,
    title: "The Glads",
    description: "1v1 combat mastery and training.",
  },
  {
    icon: Trophy,
    title: "Tournament Arc",
    description: "Internal clan competitions.",
  },
  {
    icon: Handshake,
    title: "Alliances",
    description: "Diplomatic ties and external relations.",
  },
  {
    icon: GameController,
    title: "Off-Duty",
    description: "Casual events and downtime.",
  },
];

export default function Operations() {
  return (
    <section
      id="operations"
      className="py-24 px-8 relative border-b border-primary-container/20 bg-surface-container-lowest/30"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Left-aligned heading with accent line */}
        <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-16 flex items-center gap-4">
          <span className="w-8 h-px bg-primary-container" /> Operations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-outline-variant/30">
          {operations.map((op, i) => {
            const Icon = op.icon;
            return (
              <div
                key={op.title}
                style={{ animationDelay: `${i * 60}ms` }}
                className="bg-surface p-6 flex flex-col gap-4 transition-[background-color] duration-200 hover:bg-surface-container-low"
              >
                <div className="flex items-center gap-4 border-b border-primary-container/20 pb-4">
                  <Icon size={24} weight="duotone" className="text-primary-container" />
                  <h3 className="font-mono text-sm font-bold tracking-[0.1em] uppercase text-on-surface">
                    {op.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-on-surface-variant">
                  {op.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

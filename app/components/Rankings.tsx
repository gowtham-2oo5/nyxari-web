import ScrollReveal from "./ScrollReveal";

export default function Rankings() {
  return (
    <section
      id="rankings"
      className="py-24 px-8 relative border-b-2 border-primary-container/20"
    >
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" /> Leaderboard
          </h2>
          <p className="font-body text-sm text-on-surface-variant/60 ml-12 mb-16">
            Top players this season.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-2 border-outline-variant/30 p-16 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-primary-container/60 mb-4">
              // COMING SOON
            </span>
            <h3 className="font-display font-bold text-2xl text-inverse-surface uppercase mb-3">
              Under Construction
            </h3>
            <p className="font-body text-sm text-on-surface-variant/50 max-w-md">
              The leaderboard is being built. Rankings, stats, and player
              profiles will show up here once we&apos;re ready.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

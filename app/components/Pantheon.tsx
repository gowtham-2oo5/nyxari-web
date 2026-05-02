import { STAFF } from "@/lib/constants";
import DiscordProfile from "./DiscordProfile";

export default function Pantheon() {
  const filtered = STAFF.filter((m) => m.discordId);

  return (
    <section
      id="pantheon"
      className="py-24 px-8 relative border-b border-primary-container/20 bg-[radial-gradient(ellipse_at_top,rgba(139,0,0,0.05)_0%,transparent_70%)]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-[48px] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-4">
            The Pantheon
          </h2>
          <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant border border-outline-variant px-4 py-2 inline-block bg-surface-container-lowest/50">
            Those who built the night.
          </p>
        </div>

        {/* Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((leader) => (
            <div
              key={leader.discordId}
              className="bg-[#121212] border border-outline-variant p-8 relative overflow-hidden group"
            >
              {/* Watermark */}
              <div className="absolute top-4 right-4 font-mono text-4xl font-black uppercase rotate-12 pointer-events-none text-primary-container/20">
                TOP SECRET
              </div>

              {/* Header */}
              <div className="mb-6 flex justify-between items-start border-b border-primary-container/20 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-primary-container block mb-3">
                    {leader.role}
                  </span>
                  <DiscordProfile
                    discordId={leader.discordId}
                    size="lg"
                    showActivity
                  />
                </div>
                <span className="font-mono text-xs bg-surface-container border border-outline-variant px-2 py-1 text-on-surface-variant">
                  LEVEL {leader.level}
                </span>
              </div>

              {/* Name override (alias) */}
              {leader.name && (
                <div className="grid grid-cols-3 gap-4 mb-4 font-mono text-xs">
                  <div className="col-span-1 text-on-surface-variant uppercase tracking-[0.15em]">
                    ALIAS
                  </div>
                  <div className="col-span-2 text-on-surface uppercase font-bold">
                    {leader.name}
                  </div>
                </div>
              )}

              {/* Quirk */}
              {leader.quirk && (
                <div className="grid grid-cols-3 gap-4 mb-4 font-mono text-xs">
                  <div className="col-span-1 text-on-surface-variant uppercase tracking-[0.15em]">
                    QUIRK
                  </div>
                  <div className="col-span-2 text-on-surface uppercase">
                    {leader.quirk}
                  </div>
                </div>
              )}

              {/* Bio */}
              {leader.bio && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="col-span-1 text-on-surface-variant font-mono text-xs uppercase tracking-[0.15em]">
                    BIO
                  </div>
                  <div className="col-span-2 text-on-surface-variant font-body">
                    {leader.bio}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

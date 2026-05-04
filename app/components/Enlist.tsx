"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const GUILD_ID = "1457044306899501060";
const WS_URL = "wss://nyx.gowth.tech/ws";

interface ServerStats {
  total: number;
  online: number;
  idle: number;
  dnd: number;
  offline: number;
}

function useServerStats() {
  const [stats, setStats] = useState<ServerStats | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    let closed = false;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "stats", guildId: GUILD_ID }));
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if ((msg.type === "stats" || msg.type === "stats_update") && typeof msg.total === "number") {
          setStats({
            total: msg.total,
            online: msg.online,
            idle: msg.idle,
            dnd: msg.dnd,
            offline: msg.offline,
          });
        }
      } catch {}
    };

    ws.onerror = () => {};

    return () => {
      closed = true;
      ws.close();
    };
  }, []);

  return stats;
}

export default function Enlist() {
  const stats = useServerStats();
  const activeCount = stats ? stats.online + stats.idle + stats.dnd : 0;

  return (
    <section id="enlist" className="py-24 px-8 relative">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto border border-outline-variant bg-surface-container-lowest relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.05)_0%,transparent_100%)]" />

          {/* Top bar */}
          <div className="border-b border-outline-variant/40 px-8 py-3 flex justify-between items-center relative z-10">
            <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/40">
              // JOIN US
            </span>
            {stats && (
              <div className="flex items-center gap-4 font-mono text-[10px] font-bold tracking-[0.1em] uppercase">
                <span className="text-on-surface-variant/40">
                  {stats.total} members
                </span>
                <span className="flex items-center gap-1.5 text-green-500/70">
                  <span className="relative">
                    <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-60" />
                  </span>
                  {activeCount} online
                </span>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="p-12 text-center relative z-10">
            {/* Headline */}
            <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.1] tracking-[-0.04em] text-inverse-surface uppercase mb-6">
              Can you keep up?
            </h2>

            <p className="font-body text-on-surface-variant/70 mb-12 max-w-md mx-auto">
              We&apos;re looking for players who show up, back their team, and
              don&apos;t fold under pressure.
            </p>

            {/* Requirements */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Active in HBG", "Respect the code", "Back your clan"].map(
                (req) => (
                  <span
                    key={req}
                    className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface border border-outline-variant px-4 py-2"
                  >
                    {req}
                  </span>
                )
              )}
            </div>

            {/* Steps */}
            <div className="flex justify-center items-center gap-3 mb-12 font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/50">
              <span>Join Discord</span>
              <span className="text-primary-container">→</span>
              <span>Read rules</span>
              <span className="text-primary-container">→</span>
              <span>Vibe check</span>
              <span className="text-primary-container">→</span>
              <span className="text-primary-container">You&apos;re in</span>
            </div>

            {/* CTA */}
            <MagneticButton className="inline-block" strength={0.15}>
              <Link
                href="https://discord.com/invite/fFNkqKeY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-container text-[#E8E0D0] font-display font-bold uppercase py-5 px-14 text-xl border border-primary-container transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8B0000] hover:shadow-[0_8px_24px_-4px_rgba(139,0,0,0.3)] active:scale-[0.97]"
              >
                Enlist in Nyxari
              </Link>
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

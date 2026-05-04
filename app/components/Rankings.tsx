"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const GUILD_ID = "1457044306899501060";
const WS_URL = "wss://nyx.gowth.tech/ws";

interface LeaderboardUser {
  userId: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
}

interface LeaderboardEntry {
  position: number;
  label: string;
  roleId: string;
  user: LeaderboardUser | null;
}

export default function Rankings() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    let timeout: NodeJS.Timeout;
    let closed = false;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "leaderboard", guildId: GUILD_ID, region: "default" }));
      timeout = setTimeout(() => { if (!closed) setLoading(false); }, 8000);
    };

    ws.onmessage = (e) => {
      clearTimeout(timeout);
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "leaderboard" && msg.data) {
          setEntries(msg.data);
        }
      } catch {}
      setLoading(false);
      ws.close();
    };

    ws.onerror = () => { clearTimeout(timeout); if (!closed) setLoading(false); };
    return () => { closed = true; clearTimeout(timeout); ws.close(); };
  }, []);

  // Split: filled entries + count trailing vacants
  const filled = entries.filter((e) => e.user);
  const lastFilledPos = filled.length > 0 ? filled[filled.length - 1].position : 0;
  const trailingVacant = entries.filter((e) => !e.user && e.position > lastFilledPos).length;

  return (
    <section id="rankings" className="py-24 px-8 relative border-b-2 border-primary-container/20">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-2 flex items-center gap-4">
              <span className="w-8 h-px bg-primary-container" /> Leaderboard
            </h2>
            <p className="font-body text-sm text-on-surface-variant/60 ml-12">
              Top players this season.
            </p>
          </div>
        </ScrollReveal>

        {/* Header */}
        <div className="grid grid-cols-12 items-center border-b-2 border-outline-variant/40 py-3 px-4">
          <div className="col-span-2 md:col-span-1 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/30">
            #
          </div>
          <div className="col-span-5 md:col-span-5 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/30">
            Player
          </div>
          <div className="col-span-5 md:col-span-6 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant/30">
            Title
          </div>
        </div>

        {/* Loading */}
        {loading && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 items-center border-b border-outline-variant/15 py-4 px-4">
            <div className="col-span-1"><div className="w-6 h-4 bg-surface-container-high rounded animate-pulse" /></div>
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container-high animate-pulse" />
              <div className="w-20 h-3 bg-surface-container-high rounded animate-pulse" />
            </div>
            <div className="col-span-6"><div className="w-32 h-3 bg-surface-container-high rounded animate-pulse" /></div>
          </div>
        ))}

        {/* Filled entries */}
        {!loading && filled.map((entry, i) => (
          <ScrollReveal key={entry.position} delay={i * 0.03}>
            <div className="grid grid-cols-12 items-center border-b border-outline-variant/15 py-4 px-4 hover:bg-surface-container-lowest/50">
              {/* Position */}
              <div className="col-span-2 md:col-span-1">
                <span className={`font-mono text-sm font-bold ${entry.position <= 3 ? "text-primary-container" : "text-on-surface-variant/40"}`}>
                  {String(entry.position).padStart(2, "0")}
                </span>
              </div>

              {/* Player */}
              <div className="col-span-5 md:col-span-5">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={entry.user!.avatar || `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(entry.user!.userId) >> BigInt(22)) % 6}.png`}
                    alt={entry.user!.displayName || entry.user!.username}
                    width={32}
                    height={32}
                    unoptimized
                    className="rounded-full border border-outline-variant/60 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className={`font-display font-bold text-sm truncate block ${entry.position <= 3 ? "text-on-surface" : "text-on-surface-variant/70"}`}>
                      {entry.user!.displayName || entry.user!.username}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant/40 truncate block">
                      @{entry.user!.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="col-span-5 md:col-span-6">
                <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase tracking-[0.05em]">
                  {entry.label}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Trailing vacant spots */}
        {!loading && trailingVacant > 0 && (
          <ScrollReveal delay={filled.length * 0.03}>
            <div className="border-b border-outline-variant/15 py-6 px-4 text-center">
              <span className="font-mono text-[10px] text-on-surface-variant/25 uppercase tracking-[0.15em]">
                {trailingVacant} {trailingVacant === 1 ? "spot" : "spots"} open — think you can claim one?
              </span>
            </div>
          </ScrollReveal>
        )}

        {!loading && entries.length === 0 && (
          <div className="border-2 border-outline-variant/30 p-16 text-center">
            <span className="font-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
              Could not load leaderboard
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

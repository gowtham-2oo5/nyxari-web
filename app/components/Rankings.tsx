"use client";

import { useState } from "react";
import { LEADERBOARD_IND, LEADERBOARD_SG } from "@/lib/constants";
import type { LeaderboardEntry } from "@/lib/constants";
import DiscordProfile from "./DiscordProfile";

function LeaderboardTable({ players }: { players: LeaderboardEntry[] }) {
  const filtered = players.filter((p) => p.discordId);

  if (filtered.length === 0) {
    return (
      <p className="font-mono text-xs text-on-surface-variant/50 uppercase tracking-widest text-center py-12">
        No operatives registered in this region yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-primary-container/30 font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant">
            <th className="py-4 px-4 font-normal w-16">#</th>
            <th className="py-4 px-4 font-normal">Discord</th>
            <th className="py-4 px-4 font-normal">Roblox Username</th>
            <th className="py-4 px-4 font-normal text-right">Victories</th>
          </tr>
        </thead>
        <tbody className="font-body">
          {filtered.map((player, i) => {
            const rank = i + 1;
            const isTop3 = rank <= 3;
            return (
              <tr
                key={player.discordId}
                className={`border-b border-outline-variant/30 hover:bg-surface-container-high transition-colors ${
                  isTop3 ? "text-primary-container" : "text-on-surface"
                }`}
              >
                <td className="py-4 px-4 font-mono font-bold text-sm">
                  {String(rank).padStart(2, "0")}
                </td>
                <td className="py-4 px-4">
                  <DiscordProfile discordId={player.discordId} size="sm" />
                </td>
                <td className="py-4 px-4">
                  <span className="font-display font-bold text-lg uppercase">
                    {player.robloxUsername}
                  </span>
                </td>
                <td
                  className={`py-4 px-4 text-right font-mono font-bold ${!isTop3 ? "text-on-surface-variant" : ""}`}
                >
                  {player.victories}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Rankings() {
  const [activeRegion, setActiveRegion] = useState<"IND" | "SG">("IND");

  return (
    <section
      id="rankings"
      className="py-24 px-8 relative border-b border-primary-container/20"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant pb-6">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-[48px] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase">
              Rankings
            </h2>
            <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant mt-2">
              Current Top Operatives
            </p>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 bg-surface-container-lowest p-1 border border-outline-variant">
            <button
              onClick={() => setActiveRegion("IND")}
              className={`px-6 py-2 font-mono text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
                activeRegion === "IND"
                  ? "bg-primary-container text-[#E8E0D0]"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              IND
            </button>
            <button
              onClick={() => setActiveRegion("SG")}
              className={`px-6 py-2 font-mono text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
                activeRegion === "SG"
                  ? "bg-primary-container text-[#E8E0D0]"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              SG
            </button>
          </div>
        </div>

        {/* Table */}
        <LeaderboardTable
          players={activeRegion === "IND" ? LEADERBOARD_IND : LEADERBOARD_SG}
        />

        {/* Note */}
        <p className="font-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest mt-6 text-right">
          Live presence via Lanyard
        </p>
      </div>
    </section>
  );
}

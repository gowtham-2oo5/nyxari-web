"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Circle } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const GUILD_ID = "1457044306899501060";
const WS_URL = "wss://nyx.gowth.tech/ws";
const DEV_DISCORD_ID = "750971711314329681";

const ROLES = {
  Owner: "1463075318938996767",
  "Co Owner": "1463075809525760090",
  "EA Head": "1480533621239714019",
} as const;

interface MemberData {
  userId: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
  status: string;
  customStatus?: string | null;
  activities?: Array<{ type: number; name: string; details?: string; state?: string }>;
}

// ─── Helpers ─────────────────────────────────────────────

const sColor = (s: string) =>
  s === "online" ? "text-green-500" : s === "idle" ? "text-yellow-500" : s === "dnd" ? "text-red-500" : "text-zinc-600";

const sText = (s: string) =>
  s === "online" ? "Online" : s === "idle" ? "Idle" : s === "dnd" ? "DND" : "Offline";

const aLabel = (t: number) =>
  t === 0 ? "Playing" : t === 1 ? "Streaming" : t === 2 ? "Listening to" : t === 3 ? "Watching" : "";

// ─── Bento tile ──────────────────────────────────────────

function Tile({
  member,
  role,
  size = "sm",
  showMessage = true,
}: {
  member: MemberData;
  role: string;
  size?: "lg" | "sm";
  showMessage?: boolean;
}) {
  const acts = member.activities || [];
  const activity = acts.find((a) => a.type !== 4) || null;
  const customAct = acts.find((a) => a.type === 4) || null;
  const customText = member.customStatus || customAct?.state || null;
  const fallback = `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(member.userId) >> BigInt(22)) % 6}.png`;
  const url = `https://discord.com/users/${member.userId}`;
  const avatarSize = size === "lg" ? 56 : 40;

  return (
    <div className="bg-[#111] border border-outline-variant/40 p-5 flex flex-col justify-between h-full group">
      {/* Top: role + status */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container">
            {role}
          </span>
          <div className="flex items-center gap-1.5">
            <Circle size={7} weight="fill" className={sColor(member.status)} />
            <span className="font-mono text-[10px] text-on-surface-variant/40">
              {sText(member.status)}
            </span>
          </div>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={member.avatar || fallback}
            alt={member.displayName || member.username}
            width={avatarSize}
            height={avatarSize}
            unoptimized
            className="rounded-full border border-outline-variant/60 flex-shrink-0"
          />
          <div className="min-w-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-display font-bold text-on-surface truncate block hover:text-primary-container ${size === "lg" ? "text-lg" : "text-sm"}`}
            >
              {member.displayName || member.username}
            </a>
            <span className="font-mono text-[10px] text-on-surface-variant/40 truncate block">
              @{member.username}
            </span>
          </div>
        </div>

        {/* Activity / custom status */}
        {(activity || customText) && (
          <div className="flex items-center gap-2 py-2 border-t border-outline-variant/15">
            {activity ? (
              <>
                <span className="relative flex-shrink-0">
                  <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-60" />
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant/50 truncate">
                  {aLabel(activity.type)} {activity.name}
                  {activity.details ? ` — ${activity.details}` : ""}
                </span>
              </>
            ) : customText ? (
              <span className="font-mono text-[10px] text-on-surface-variant/35 truncate italic">
                {customText}
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Bottom: CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/25 border border-outline-variant/20 py-2 text-center hover:text-primary-container hover:border-primary-container/30 active:scale-[0.97]"
      >
        {showMessage ? "Message" : "View Profile"}
      </a>
    </div>
  );
}

// ─── Dev tile (Lanyard) ──────────────────────────────────

function DevTile() {
  const [data, setData] = useState<MemberData | null>(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DEV_DISCORD_ID}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json?.success || !json.data?.discord_user) return;
        const d = json.data;
        setData({
          userId: d.discord_user.id,
          username: d.discord_user.username,
          displayName: d.discord_user.display_name || d.discord_user.global_name,
          avatar: d.discord_user.avatar
            ? `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${d.discord_user.avatar.startsWith("a_") ? "gif" : "png"}?size=128`
            : null,
          status: d.discord_status,
          activities: d.activities,
        });
      })
      .catch(() => {});
  }, []);

  if (!data) return <SkeletonTile />;
  return <Tile member={data} role="Developer" size="sm" />;
}

function OwnerTile({ member }: { member: MemberData }) {
  const acts = member.activities || [];
  const activity = acts.find((a) => a.type !== 4) || null;
  const customAct = acts.find((a) => a.type === 4) || null;
  const customText = member.customStatus || customAct?.state || null;
  const fallback = `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(member.userId) >> BigInt(22)) % 6}.png`;
  const url = `https://discord.com/users/${member.userId}`;

  return (
    <div className="bg-[#111] border border-outline-variant/40 p-5 flex flex-col h-full">
      {/* Role + status */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container">
          Owner
        </span>
        <div className="flex items-center gap-1.5">
          <Circle size={7} weight="fill" className={sColor(member.status)} />
          <span className="font-mono text-[10px] text-on-surface-variant/40">
            {sText(member.status)}
          </span>
        </div>
      </div>

      {/* Large centered avatar */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src={member.avatar || fallback}
          alt={member.displayName || member.username}
          width={80}
          height={80}
          unoptimized
          className="rounded-full border-2 border-outline-variant/60 mb-3"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-bold text-xl text-on-surface hover:text-primary-container text-center"
        >
          {member.displayName || member.username}
        </a>
        <span className="font-mono text-[10px] text-on-surface-variant/40">
          @{member.username}
        </span>
      </div>

      {/* Data rows — brutalist metadata */}
      <div className="flex-1 flex flex-col gap-0 border-t border-outline-variant/20">
        <div className="flex justify-between py-2.5 border-b border-outline-variant/10 px-1">
          <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase tracking-[0.1em]">Role</span>
          <span className="font-mono text-[10px] text-on-surface font-bold uppercase">Founder</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-outline-variant/10 px-1">
          <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase tracking-[0.1em]">Access</span>
          <span className="font-mono text-[10px] text-primary-container font-bold uppercase">Level 5</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-outline-variant/10 px-1">
          <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase tracking-[0.1em]">ID</span>
          <span className="font-mono text-[10px] text-on-surface-variant/50">{member.userId.slice(-6)}</span>
        </div>

        {/* Activity */}
        {activity && (
          <div className="flex items-center gap-2 py-2.5 px-1">
            <span className="relative flex-shrink-0">
              <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-60" />
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant/50 truncate">
              {aLabel(activity.type)} {activity.name}
            </span>
          </div>
        )}
        {!activity && customText && (
          <div className="py-2.5 px-1">
            <span className="font-mono text-[10px] text-on-surface-variant/35 italic truncate">
              {customText}
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/25 border border-outline-variant/20 py-2 text-center hover:text-primary-container hover:border-primary-container/30 active:scale-[0.97]"
      >
        Message
      </a>
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────

function SkeletonTile() {
  return (
    <div className="bg-[#111] border border-outline-variant/40 p-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="w-14 h-3 bg-surface-container-high rounded animate-pulse" />
        <div className="w-10 h-3 bg-surface-container-high rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="w-20 h-3 bg-surface-container-high rounded animate-pulse" />
          <div className="w-14 h-2 bg-surface-container-high rounded animate-pulse" />
        </div>
      </div>
      <div className="w-full h-7 bg-surface-container-high rounded animate-pulse mt-auto" />
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────

export default function Pantheon() {
  const [members, setMembers] = useState<Record<string, MemberData[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    let timeout: NodeJS.Timeout;
    let closed = false;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", guildId: GUILD_ID, roleIds: Object.values(ROLES) }));
      timeout = setTimeout(() => { if (!closed) setLoading(false); }, 8000);
    };

    ws.onmessage = (e) => {
      clearTimeout(timeout);
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "members_by_roles" && msg.data) { setMembers(msg.data); setLoading(false); }
        if (msg.type === "presence_update" && msg.userId && msg.data) {
          setMembers((prev) => {
            const u = { ...prev };
            for (const rid of Object.keys(u)) u[rid] = u[rid].map((m) => m.userId === msg.userId ? { ...m, ...msg.data } : m);
            return u;
          });
        }
      } catch {}
    };

    ws.onerror = () => { clearTimeout(timeout); if (!closed) setLoading(false); };

    return () => {
      closed = true; clearTimeout(timeout);
      if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "unsubscribe" }));
      ws.close();
    };
  }, []);

  const owner = members[ROLES["Owner"]] || [];
  const coOwner = members[ROLES["Co Owner"]] || [];
  const eaHead = members[ROLES["EA Head"]] || [];
  const hasMembers = owner.length + coOwner.length + eaHead.length > 0;

  return (
    <section id="pantheon" className="py-24 px-8 relative border-b-2 border-primary-container/20">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] tracking-[-0.02em] text-inverse-surface uppercase mb-2 flex items-center gap-4">
              <span className="w-8 h-px bg-primary-container" /> The Pantheon
            </h2>
            <p className="font-body text-sm text-on-surface-variant/60 ml-12">
              The people who keep this running.
            </p>
          </div>
        </ScrollReveal>

        {loading && (
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 md:col-span-2 md:row-span-2"><SkeletonTile /></div>
            <div className="col-span-3 md:col-span-2"><SkeletonTile /></div>
            <div className="col-span-3 md:col-span-2"><SkeletonTile /></div>
            <div className="col-span-3 md:col-span-2"><SkeletonTile /></div>
            <div className="col-span-3 md:col-span-2"><SkeletonTile /></div>
          </div>
        )}

        {!loading && hasMembers && (
          <div className="grid grid-cols-6 gap-3">
            {/* Owner — tall tile spanning 2 rows */}
            {owner.map((m) => (
              <ScrollReveal key={m.userId} className="col-span-6 md:col-span-2 md:row-span-2">
                <OwnerTile member={m} />
              </ScrollReveal>
            ))}

            {/* Co Owners — fill the remaining 4 cells */}
            {coOwner.map((m, i) => (
              <ScrollReveal key={m.userId} delay={i * 0.04} className="col-span-3 md:col-span-2">
                <Tile member={m} role="Co Owner" />
              </ScrollReveal>
            ))}

            {/* EA Head + Developer — bottom row */}
            {eaHead.map((m) => (
              <ScrollReveal key={m.userId} className="col-span-3 md:col-span-3">
                <Tile member={m} role="External Affairs" showMessage={false} />
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.08} className="col-span-3 md:col-span-3">
              <DevTile />
            </ScrollReveal>
          </div>
        )}

        {!loading && !hasMembers && (
          <div className="border-2 border-outline-variant/30 p-16 text-center">
            <span className="font-mono text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
              Could not load team data
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

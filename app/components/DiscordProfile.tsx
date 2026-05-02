"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Circle } from "@phosphor-icons/react";

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
    discriminator: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    name: string;
    state?: string;
    details?: string;
    type: number;
  }>;
}

interface DiscordProfileProps {
  discordId: string;
  size?: "sm" | "lg";
  showActivity?: boolean;
}

export default function DiscordProfile({
  discordId,
  size = "sm",
  showActivity = false,
}: DiscordProfileProps) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!discordId) return;

    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data?.discord_user) {
          setData(json.data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [discordId]);

  // Loading state
  if (!data && !error) {
    const avatarSize = size === "lg" ? "w-10 h-10" : "w-8 h-8";
    return (
      <div className="flex items-center gap-3">
        <div
          className={`${avatarSize} rounded-full bg-surface-container-high animate-pulse`}
        />
        <div className="flex flex-col gap-1">
          <div className="w-20 h-3 bg-surface-container-high rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Error / user not on Lanyard
  if (error || !data) {
    return (
      <div className="flex items-center gap-3">
        <div
          className={`${size === "lg" ? "w-10 h-10" : "w-8 h-8"} rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center`}
        >
          <span className="text-on-surface-variant/50 text-xs">?</span>
        </div>
        <span className="font-mono text-xs text-on-surface-variant/50">
          Not on Lanyard
        </span>
      </div>
    );
  }

  const user = data.discord_user;
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=${size === "lg" ? 128 : 64}`
    : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(user.id) >> BigInt(22)) % 6}.png`;

  const statusColor =
    data.discord_status === "online"
      ? "text-green-500"
      : data.discord_status === "idle"
        ? "text-yellow-500"
        : data.discord_status === "dnd"
          ? "text-red-500"
          : "text-zinc-600";

  const statusLabel =
    data.discord_status === "online"
      ? "Online"
      : data.discord_status === "idle"
        ? "Idle"
        : data.discord_status === "dnd"
          ? "Do Not Disturb"
          : "Offline";

  const currentActivity = data.activities.length > 0
    ? data.activities.find((a) => a.type !== 4) || null
    : null;

  const customStatus = data.activities.find((a) => a.type === 4) || null;

  const imgSize = size === "lg" ? 40 : 32;

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={user.display_name || user.username}
          width={imgSize}
          height={imgSize}
          unoptimized
          className="rounded-full border border-outline-variant"
        />
        <Circle
          size={size === "lg" ? 12 : 10}
          weight="fill"
          className={`absolute -bottom-0.5 -right-0.5 ${statusColor}`}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0">
        <span
          className={`font-display font-bold text-on-surface truncate ${size === "lg" ? "text-base" : "text-sm"}`}
        >
          {user.display_name || user.username}
        </span>
        <span className="font-mono text-[10px] text-on-surface-variant truncate">
          @{user.username} · {statusLabel}
        </span>
        {customStatus && customStatus.state && (
          <span className="font-mono text-[10px] text-on-surface-variant/70 truncate">
            &quot;{customStatus.state}&quot;
          </span>
        )}
        {showActivity && currentActivity && (
          <span className="font-mono text-[10px] text-on-surface-variant/50 truncate mt-0.5">
            {currentActivity.name}
            {currentActivity.details ? ` — ${currentActivity.details}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────
// Top operatives displayed in the Rankings section.
// Discord IDs are used for live presence via Lanyard.
// Members must join https://discord.gg/lanyard for tracking.

export interface LeaderboardEntry {
  discordId: string;
  robloxUsername: string;
  victories: number;
}

export const LEADERBOARD_IND: LeaderboardEntry[] = [
  { discordId: "", robloxUsername: "", victories: 0 },
  { discordId: "", robloxUsername: "", victories: 0 },
  { discordId: "", robloxUsername: "", victories: 0 },
  { discordId: "", robloxUsername: "", victories: 0 },
  { discordId: "", robloxUsername: "", victories: 0 },
];

export const LEADERBOARD_SG: LeaderboardEntry[] = [
  // { discordId: "", robloxUsername: "", victories: 0 },
];

// ─── STAFF ──────────────────────────────────────────────────
// Leadership displayed in the Pantheon section.

export interface StaffMember {
  discordId: string;
  role: string;
  name: string;
  level: number;
  quirk: string;
  bio: string;
}

export const STAFF: StaffMember[] = [
  {
    discordId: "979259360733696040",
    role: "OWNER",
    name: "",
    level: 5,
    quirk: "",
    bio: "",
  },
  {
    discordId: "772810512378363905",
    role: "CO-OWNER",
    name: "",
    level: 4,
    quirk: "",
    bio: "",
  },
  {
    discordId: "1143527683637137458",
    role: "CO-OWNER",
    name: "",
    level: 4,
    quirk: "",
    bio: "",
  },
  {
    discordId: "932150108143890503",
    role: "CO-OWNER",
    name: "",
    level: 4,
    quirk: "",
    bio: "",
  },
  {
    discordId: "1135518204798713937",
    role: "EXTERNAL AFFAIRS HEAD",
    name: "",
    level: 3,
    quirk: "",
    bio: "",
  },
  {
    discordId: "750971711314329681",
    role: "FALL BACK",
    name: "",
    level: 3,
    quirk: "",
    bio: "",
  },
];

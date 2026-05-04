import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Nyxie Bot | Nyxari",
  description:
    "A Discord bot for ranked leaderboards, 1v1 challenges, tournaments, and server management.",
};

const features = [
  {
    title: "Ranked Leaderboard",
    desc: "Fixed-size ladder with role-based positions and region support.",
  },
  {
    title: "1v1 Challenges",
    desc: "Challenge players above you. Staff-verified results, 24hr expiry.",
  },
  {
    title: "Tournaments",
    desc: "Single-elimination brackets with auto-advancing rounds.",
  },
  {
    title: "Live Profiles",
    desc: "Rich player profiles with stats, match history, and rank info.",
  },
  {
    title: "WebSocket API",
    desc: "Real-time presence, leaderboard updates, and server stats.",
  },
  {
    title: "Forfeit System",
    desc: "Cooldowns, admin overrides, and fair play enforcement.",
  },
];

const commands = [
  { cmd: "/challenge", desc: "Challenge a ranked player" },
  { cmd: "/leaderboard", desc: "View the ranked ladder" },
  { cmd: "/rank", desc: "View rank stats" },
  { cmd: "/profile", desc: "Rich user profile" },
  { cmd: "/register", desc: "Join the leaderboard" },
  { cmd: "/help", desc: "Interactive help menu" },
];

export default function BotPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] noise-bg">
      {/* Nav */}
      <nav className="border-b-2 border-outline-variant/20 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/main-logo.gif"
              alt="NYXARI"
              width={24}
              height={24}
              unoptimized
              priority
              className="h-6 w-auto"
            />
            <span className="font-display font-black text-sm tracking-[0.2em] text-primary-container">
              NYXARI
            </span>
          </Link>
          <Link
            href="/"
            className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/40 hover:text-primary-container"
          >
            ← Back
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-16">
        {/* Banner */}
        <div className="mb-8 border border-outline-variant/30 overflow-hidden">
          <Image
            src="/gallery/bot-banner.webp"
            alt="Nyxie banner"
            width={1200}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Hero */}
        <div className="mb-16 flex items-start gap-6">
          <Image
            src="/gallery/bot-logo.webp"
            alt="Nyxie"
            width={80}
            height={80}
            className="rounded-full border-2 border-outline-variant/40 flex-shrink-0 -mt-12 relative z-10"
          />
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-primary-container block mb-4">
              Discord Bot
            </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,4rem)] leading-[1.1] tracking-[-0.04em] text-inverse-surface uppercase mb-4">
            Nyxie
          </h1>
          <p className="font-body text-on-surface-variant/70 max-w-lg mb-8">
            Ranked leaderboards, 1v1 challenges, tournaments, and server
            management — all in one bot.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://discord.com/invite/fFNkqKeY"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase bg-primary-container text-[#E8E0D0] px-6 py-3 hover:bg-[#8B0000] active:scale-[0.97]"
            >
              Add to Server
            </Link>
            <Link
              href="https://github.com/gowtham-2oo5/nyx-bot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/40 border border-outline-variant/30 px-6 py-3 hover:text-primary-container hover:border-primary-container/40 active:scale-[0.97]"
            >
              GitHub
            </Link>
          </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl text-inverse-surface uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" /> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-outline-variant/20">
            {features.map((f) => (
              <div key={f.title} className="bg-[#0A0A0A] p-5">
                <h3 className="font-mono text-xs font-bold tracking-[0.1em] uppercase text-on-surface mb-2">
                  {f.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant/50">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Commands */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl text-inverse-surface uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" /> Commands
          </h2>
          <div className="border-t-2 border-outline-variant/30">
            {commands.map((c) => (
              <div
                key={c.cmd}
                className="grid grid-cols-12 border-b border-outline-variant/15 py-3 px-2"
              >
                <div className="col-span-4">
                  <code className="font-mono text-xs text-primary-container">
                    {c.cmd}
                  </code>
                </div>
                <div className="col-span-8">
                  <span className="font-body text-sm text-on-surface-variant/50">
                    {c.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-on-surface-variant/30 mt-4 uppercase tracking-[0.1em]">
            + staff commands, prefix support, and more — use /help in Discord
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl text-inverse-surface uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" /> Built With
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Bun",
              "TypeScript",
              "discord.js v14",
              "MySQL",
              "Drizzle ORM",
              "Hono",
              "WebSocket",
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/40 border border-outline-variant/30 px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <div className="border-t-2 border-outline-variant/20 pt-8 flex gap-6">
          <Link
            href="/privacy"
            className="font-mono text-[10px] text-on-surface-variant/30 hover:text-primary-container uppercase tracking-[0.1em]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-mono text-[10px] text-on-surface-variant/30 hover:text-primary-container uppercase tracking-[0.1em]"
          >
            Terms of Service
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

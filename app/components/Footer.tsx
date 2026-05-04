import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080808] w-full border-t-2 border-outline-variant/20 mt-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-outline-variant/20">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/main-logo.gif"
                alt="NYXARI"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-auto"
              />
              <span className="font-display font-black text-lg tracking-[0.2em] text-primary-container">
                NYXARI
              </span>
            </div>
            <p className="font-body text-sm text-on-surface-variant/40 leading-relaxed max-w-xs">
              A Heroes Battlegrounds clan built on teamwork, loyalty, and
              showing up when it counts. IND &amp; SG.
            </p>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/30 mb-5">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#our-quirk"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Our Quirk
                </Link>
              </li>
              <li>
                <Link
                  href="#operations"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  What We Do
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Highlights
                </Link>
              </li>
              <li>
                <Link
                  href="#rankings"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="#pantheon"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Pantheon
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/30 mb-5">
              Connect
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="https://discord.com/invite/fFNkqKeY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Discord Server
                </Link>
              </li>
              <li>
                <Link
                  href="/bot"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Bot
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/30 mb-5">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-mono text-xs text-zinc-500 hover:text-primary-container"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-1">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/30 mb-5">
              &nbsp;
            </h4>
            <Link
              href="#enlist"
              className="inline-block font-mono text-[10px] font-bold tracking-[0.1em] uppercase bg-primary-container text-[#E8E0D0] px-5 py-2.5 hover:bg-[#8B0000] active:scale-[0.97]"
            >
              Join
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-zinc-700 tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} Nyxari. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-zinc-700 tracking-[0.1em] uppercase">
            Born in darkness. Built for battle.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] w-full border-t border-primary-container/10 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image
            src="/main-logo.gif"
            alt="NYXARI"
            width={48}
            height={48}
            unoptimized
            className="h-12 w-auto opacity-50 grayscale"
          />
          <p className="font-display text-xs tracking-widest uppercase text-zinc-600">
            Born in darkness. Built for battle.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 font-display text-xs tracking-widest uppercase text-zinc-600">
          <Link href="#" className="hover:text-white transition-colors duration-200">
            Terms of Engagement
          </Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">
            Privacy Protocol
          </Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">
            Roblox Group
          </Link>
        </div>

        {/* Copyright */}
        <p className="font-display text-xs tracking-widest uppercase text-zinc-600">
          © NYXARI INTELLIGENCE AGENCY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}

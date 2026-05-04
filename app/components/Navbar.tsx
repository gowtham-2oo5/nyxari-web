"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#our-quirk", label: "Quirk" },
  { href: "#operations", label: "What We Do" },
  { href: "#gallery", label: "Highlights" },
  { href: "#rankings", label: "Leaderboard" },
  { href: "#pantheon", label: "Pantheon" },
  { href: "#enlist", label: "Enlist" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center bg-[#0e0e0e]/95 backdrop-blur-md border-2 border-outline-variant/40">
        {/* Logo cell */}
        <Link
          href="/"
          className="flex items-center justify-center h-10 w-10 border-r-2 border-outline-variant/40"
        >
          <Image
            src="/main-logo.gif"
            alt="NYXARI"
            width={20}
            height={20}
            unoptimized
            className="h-5 w-auto"
          />
        </Link>

        {/* Links — instant color on hover */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-zinc-500 border-r border-outline-variant/40 hover:text-primary-container hover:bg-primary-container/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="https://discord.com/invite/fFNkqKeY"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 font-mono text-[10px] font-bold tracking-[0.1em] uppercase bg-primary-container text-[#E8E0D0] hover:bg-[#8B0000] active:scale-[0.97]"
        >
          [ Discord ]
        </Link>
      </div>
    </nav>
  );
}

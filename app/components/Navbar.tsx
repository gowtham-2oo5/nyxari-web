"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";

const navLinks = [
  { href: "#our-quirk", label: "Our Quirk" },
  { href: "#operations", label: "Operations" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rankings", label: "Rankings" },
  { href: "#pantheon", label: "Pantheon" },
  { href: "#enlist", label: "Enlist" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-primary-container/20">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/main-logo.gif"
            alt="NYXARI clan logo"
            width={40}
            height={40}
            unoptimized
            className="h-10 w-auto"
          />
          <span className="text-2xl font-black tracking-[0.2em] text-primary-container hidden md:block font-display">
            NYXARI
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-[0.1em] uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-500 hover:text-primary-container transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#"
          className="hidden md:flex bg-primary-container text-[#E8E0D0] font-mono text-xs font-bold tracking-[0.15em] uppercase py-3 px-6 items-center gap-2 transition-[transform,background-color] duration-200 hover:bg-[#8B0000] hover:-translate-y-px active:scale-[0.97]"
        >
          JOIN DISCORD
          <ArrowRight size={14} weight="bold" />
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-on-surface p-2 active:scale-[0.95]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X size={24} weight="bold" />
          ) : (
            <List size={24} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-[#0A0A0A]/95 backdrop-blur-md">
          <div className="flex flex-col px-8 py-6 gap-4 font-mono text-xs font-bold tracking-[0.1em] uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-zinc-500 hover:text-primary-container transition-colors duration-200 py-2 border-b border-outline-variant/30"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              className="bg-primary-container text-[#E8E0D0] font-mono text-xs font-bold tracking-[0.15em] uppercase py-3 px-6 mt-2 text-center active:scale-[0.97]"
            >
              JOIN DISCORD
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import GlitchText from "@/components/GlitchText";

export default function Hero() {
  return (
    <header className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-[#0A0A0A]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        {/* Tag */}
        <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-6 border border-outline-variant px-4 py-2 bg-surface-container-lowest/50">
          Heroes Battlegrounds · IND &amp; SG · Est. 2023
        </p>

        {/* Headline with glitch */}
        <h1 className="font-display font-extrabold text-inverse-surface mb-6 uppercase">
          <GlitchText
            text="Tired of fighting alone?"
            intensity="medium"
            className="!text-[clamp(2.5rem,7vw,4.5rem)] !leading-[1.1] !tracking-[-0.04em] !font-display !font-extrabold"
          />
        </h1>

        {/* Subhead */}
        <p className="font-body text-lg leading-relaxed text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Nyxari has your back. Every server. Every fight.
        </p>

        {/* CTA */}
        <Link
          href="#"
          className="bg-primary-container text-[#E8E0D0] font-display font-bold text-2xl md:text-[32px] uppercase py-4 px-12 border border-primary-container transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8B0000] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(139,0,0,0.3)] active:scale-[0.97] active:translate-y-0"
        >
          Join the Discord
        </Link>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary-container/50 to-transparent" />
    </header>
  );
}

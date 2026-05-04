"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import MagneticButton from "./MagneticButton";
import TextScramble from "./TextScramble";

const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
});

export default function Hero() {
  return (
    <header className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-x-hidden">
      {/* FaultyTerminal background */}
      <div className="absolute inset-0 opacity-30">
        <FaultyTerminal
          scale={1}
          digitSize={1.5}
          scanlineIntensity={0.3}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.4}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#CC0000"
          mouseReact
          mouseStrength={0.15}
          brightness={1}
          dpr={1}
          pageLoadAnimation
          className="!w-full !h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />

      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        {/* Tag with scramble */}
        <p className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-6 border border-outline-variant px-4 py-2 bg-surface-container-lowest/50">
          <TextScramble
            text="Heroes Battlegrounds · IND & SG · Est. 2026"
            speed={25}
          />
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

        {/* CTA with magnetic pull */}
        <MagneticButton strength={0.2}>
          <Link
            href="https://discord.com/invite/fFNkqKeY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-container text-[#E8E0D0] font-display font-bold text-2xl md:text-[32px] uppercase py-4 px-12 border border-primary-container transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8B0000] hover:shadow-[0_8px_24px_-4px_rgba(139,0,0,0.3)] active:scale-[0.97]"
          >
            Join the Discord
          </Link>
        </MagneticButton>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary-container/50 to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50">
          Scroll
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-container/60 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </header>
  );
}

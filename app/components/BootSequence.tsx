"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const DURATION = 4000;

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [tagVisible, setTagVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tagTimer = setTimeout(() => setTagVisible(true), 400);

    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / DURATION, 1);

      // Ease-out cubic — fast start, slows toward end
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    requestAnimationFrame(tick);

    return () => {
      clearTimeout(tagTimer);
    };
  }, []);

  useEffect(() => {
    if (done) onComplete();
  }, [done, onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/main-logo.gif"
          alt="NYXARI"
          width={64}
          height={64}
          unoptimized
          priority
          className="h-16 w-auto"
        />

        <span className="font-display font-black text-2xl tracking-[0.3em] text-primary-container uppercase">
          NYXARI
        </span>

        <p
          className={`font-mono text-[10px] tracking-[0.15em] uppercase text-on-surface-variant/50 transition-opacity duration-500 ${
            tagVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Heroes Battlegrounds &middot; IND &amp; SG
        </p>

        <div className="w-48 mt-4">
          <div className="h-[2px] w-full bg-outline-variant/20 overflow-hidden">
            <div
              className="h-full bg-primary-container"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

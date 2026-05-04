"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  speed = 30,
}: TextScrambleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(text);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}

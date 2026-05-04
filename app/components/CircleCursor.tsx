"use client";

import { useEffect, useRef } from "react";

const LERP = 0.15;
const DOT_SIZE = 8;
const RING_SIZE = 40;
const RING_BORDER = 2;
const PADDING = 8;

export default function CircleCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hoveredEl = useRef<Element | null>(null);
  const isVisible = useRef(false);
  const isClicked = useRef(false);
  const hasMovedOnce = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native cursor (idempotent)
    const styleId = "circle-cursor-hide";
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.textContent = "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(s);
    }

    const container = containerRef.current;
    if (!container) return;
    const dot = container.children[0] as HTMLDivElement;
    const ring = container.children[1] as HTMLDivElement;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isVisible.current = true;
      if (!hasMovedOnce.current) {
        hasMovedOnce.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onLeave = () => { isVisible.current = false; };
    const onEnter = () => { isVisible.current = true; };
    const onDown = () => { isClicked.current = true; };
    const onUp = () => { isClicked.current = false; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Interactive element hover
    const onElEnter = (e: Event) => { hoveredEl.current = e.currentTarget as Element; };
    const onElLeave = () => { hoveredEl.current = null; };

    const bindInteractives = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, .cursor-hover")
        .forEach((el) => {
          el.addEventListener("mouseenter", onElEnter);
          el.addEventListener("mouseleave", onElLeave);
        });
    };
    bindInteractives();
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    let currentW = RING_SIZE;
    let currentH = RING_SIZE;
    let currentR = RING_SIZE / 2;
    let raf = 0;

    const animate = () => {
      const vis = isVisible.current ? 1 : 0;

      // Dot
      dot.style.opacity = String(vis);
      dot.style.transform = `translate(${mouse.current.x - DOT_SIZE / 2}px, ${mouse.current.y - DOT_SIZE / 2}px)`;

      // Ring
      ring.style.opacity = String(vis);

      const target = hoveredEl.current;
      let targetW: number, targetH: number, targetR: number, targetX: number, targetY: number;

      if (target) {
        const rect = target.getBoundingClientRect();
        targetW = rect.width + PADDING * 2;
        targetH = rect.height + PADDING * 2;
        targetR = 4;
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      } else {
        const s = isClicked.current ? 0.8 : 1;
        targetW = RING_SIZE * s;
        targetH = RING_SIZE * s;
        targetR = targetW / 2;
        targetX = mouse.current.x;
        targetY = mouse.current.y;
      }

      currentW += (targetW - currentW) * 0.2;
      currentH += (targetH - currentH) * 0.2;
      currentR += (targetR - currentR) * 0.2;

      const pl = isClicked.current && !target ? 0.4 : LERP;
      ringPos.current.x += (targetX - ringPos.current.x) * pl;
      ringPos.current.y += (targetY - ringPos.current.y) * pl;

      ring.style.width = `${currentW}px`;
      ring.style.height = `${currentH}px`;
      ring.style.borderRadius = `${currentR}px`;
      ring.style.transform = `translate(${ringPos.current.x - currentW / 2}px, ${ringPos.current.y - currentH / 2}px)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      observer.disconnect();
      hasMovedOnce.current = false;
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: "#CC0000",
          borderRadius: "50%",
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        style={{
          position: "absolute",
          width: RING_SIZE,
          height: RING_SIZE,
          border: `${RING_BORDER}px solid rgba(204, 0, 0, 0.5)`,
          borderRadius: RING_SIZE / 2,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}

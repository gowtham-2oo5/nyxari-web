"use client";

import { useEffect, useRef, useCallback } from "react";

const LERP = 0.15;
const DOT_SIZE = 8;
const RING_SIZE = 40;
const RING_BORDER = 2;
const PADDING = 8; // extra space around hovered element

export default function CircleCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hoveredEl = useRef<Element | null>(null);
  const visible = useRef(false);
  const raf = useRef<number>(0);

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    visible.current = true;
    if (dotRef.current) dotRef.current.style.opacity = "1";
    if (ringRef.current) ringRef.current.style.opacity = "1";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native cursor
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      visible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const onDown = () => {
      if (ringRef.current && !hoveredEl.current) {
        ringRef.current.style.scale = "0.75";
      }
    };
    const onUp = () => {
      if (ringRef.current && !hoveredEl.current) {
        ringRef.current.style.scale = "1";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Hover detection
    const onElEnter = (e: Event) => {
      hoveredEl.current = e.currentTarget as Element;
    };
    const onElLeave = () => {
      hoveredEl.current = null;
    };

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

    // Animation loop
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate(${mouse.current.x - DOT_SIZE / 2}px, ${mouse.current.y - DOT_SIZE / 2}px)`;
      }

      if (ring) {
        const target = hoveredEl.current;

        if (target) {
          // Morph ring to element bounds
          const rect = target.getBoundingClientRect();
          const tx = rect.left - PADDING;
          const ty = rect.top - PADDING;
          const tw = rect.width + PADDING * 2;
          const th = rect.height + PADDING * 2;

          ringPos.current.x += (tx + tw / 2 - ringPos.current.x) * 0.2;
          ringPos.current.y += (ty + th / 2 - ringPos.current.y) * 0.2;

          ring.style.width = `${tw}px`;
          ring.style.height = `${th}px`;
          ring.style.borderRadius = "4px";
          ring.style.transform = `translate(${ringPos.current.x - tw / 2}px, ${ringPos.current.y - th / 2}px)`;
          ring.style.borderColor = "rgba(204, 0, 0, 0.4)";
          ring.style.scale = "1";
        } else {
          // Default circle following mouse
          ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP;
          ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP;

          ring.style.width = `${RING_SIZE}px`;
          ring.style.height = `${RING_SIZE}px`;
          ring.style.borderRadius = "50%";
          ring.style.transform = `translate(${ringPos.current.x - RING_SIZE / 2}px, ${ringPos.current.y - RING_SIZE / 2}px)`;
          ring.style.borderColor = "rgba(204, 0, 0, 0.5)";
        }
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      observer.disconnect();
      style.remove();
    };
  }, [onMove]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: "#CC0000",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
      {/* Ring — morphs to element bounds on hover */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          border: `${RING_BORDER}px solid rgba(204, 0, 0, 0.5)`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: "difference",
          transition: "width 250ms cubic-bezier(0.16,1,0.3,1), height 250ms cubic-bezier(0.16,1,0.3,1), border-radius 250ms cubic-bezier(0.16,1,0.3,1), border-color 200ms ease, scale 200ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </>
  );
}

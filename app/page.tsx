"use client";

import { useState, useEffect, useCallback } from "react";
import BootSequence from "./components/BootSequence";
import CircleCursor from "./components/CircleCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurQuirk from "./components/OurQuirk";
import Operations from "./components/Operations";
import Gallery from "./components/Gallery";
import Rankings from "./components/Rankings";
import Pantheon from "./components/Pantheon";
import Enlist from "./components/Enlist";
import Footer from "./components/Footer";

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  // Safety net
  useEffect(() => {
    const fallback = setTimeout(() => setBooted(true), 7000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      <CircleCursor />

      {booted && (
        <div className="animate-[fadeIn_400ms_ease-out]">
          <Navbar />
          <Hero />
          <OurQuirk />
          <Operations />
          <Gallery />
          <Rankings />
          <Pantheon />
          <Enlist />
          <Footer />
        </div>
      )}
    </>
  );
}

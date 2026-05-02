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
  return (
    <>
      <Navbar />
      <Hero />
      <OurQuirk />
      <Operations />
      <Gallery />
      <Rankings />
      <Pantheon />
      <Enlist />
      <Footer />
    </>
  );
}

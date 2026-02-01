import SystemDiag from "./components/SystemDiag";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Departments from "./components/Departments";
import Timeline from "./components/Timeline";
import Showdown from "./components/Showdown";
import FAQ from "./components/FAQ";
import Dossier from "./components/Dossier";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <SystemDiag />
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Departments />
      <Timeline />
      <Showdown />
      <FAQ />
      <Dossier />
      <Footer />
    </>
  );
}

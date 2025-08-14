"use client";

import "./page.css";
import { useState, useCallback } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Qualification } from "./components/Qualification";
import { WorkHistory } from "./components/WorkHistory";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { ParallaxBackground } from "./graphs/ParallaxBackground";
import { MotionNav } from "./components/Nav";
import { MotionSection } from "./graphs/MotionSection";
import { NAV_ITEMS, SECTION } from "./utils/paths";
import { useData } from "./context/DataContext";

type Page = "home" | "projects";

export default function App() {
  const isClient = typeof window !== "undefined";
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { intro } = useData();

  const mouseXPercentNumber = 0;
  const scrollVelocity = 0;
  const scrollDirection: "up" | "down" = "down";

  


  const scrollToSection = useCallback((sectionId: string) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen relative overflow-hidden app-bg">
      <LazyMotion features={domAnimation} strict>
        
        <ParallaxBackground />

        
        <MotionNav
          items={NAV_ITEMS}
          activeId={SECTION.HERO}      // or derive from your scroll observer if you keep it
          
          onClickItem={scrollToSection}
          // MotionNav expects a number for mouseXPercent; get a snapshot from MV:
          mouseXPercent={mouseXPercentNumber}
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
        />

        <main className="relative z-10">
          <AnimatePresence  mode="wait">
            <div key="main">
            <MotionSection id={SECTION.HERO} className="cyber-glass-green">
              <Hero />
            </MotionSection>

            <MotionSection id={SECTION.ABOUT} className="cyber-glass-blue">
              <About />
            </MotionSection>

            <MotionSection id={SECTION.PROJECTS} className="cyber-glass-green2">
              <Projects />
            </MotionSection>

            <MotionSection id={SECTION.EXPERIENCE} className="cyber-glass-purple">
              <WorkHistory />
            </MotionSection>

            <MotionSection id={SECTION.SKILLS} className="cyber-glass-pink">
              <Skills />
            </MotionSection>
            
            <MotionSection id={SECTION.SKILLS} className="cyber-glass-green2">
              <Qualification />
            </MotionSection>

            <MotionSection id={SECTION.CONTACT} className="cyber-glass-green">
              <Contact />
            </MotionSection>
            </div>
          </AnimatePresence>
        </main>

        <footer className="relative py-12 px-4 border-t footer-shell">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm small-note">
              &copy; 2025 {intro.name || 'TBD'}
              <span style={{ color: "#00ff41" }}> // </span>
              <span style={{ color: "#00d4ff" }}>Engineered with precision</span>
              <span style={{ color: "#ff006e" }}> &amp; passion</span>
            </p>
          </div>
        </footer>
      </LazyMotion>
    </div>
  );
}
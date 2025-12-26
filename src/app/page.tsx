"use client";

import "./page.css";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { WorkHistory } from "./components/WorkHistory";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { AnimatedBackground } from "./graphs/AnimatedBackground";
import { Nav, SECTION } from "./components/Nav/Nav";
import { MotionSection } from "./graphs/MotionSection";
import { useData } from "./context/DataContext";

export default function App() {
  const isClient = typeof window !== "undefined";
  const { intro } = useData();

  if (!isClient) return null;

  return (
    <div className="min-h-screen relative overflow-hidden app-bg">
      <LazyMotion features={domAnimation} strict>
        <AnimatedBackground />

        <Nav />

        <main className="relative z-10">
          <AnimatePresence mode="wait">
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

              <MotionSection id={SECTION.CONTACT} className="cyber-glass-green">
                <Contact />
              </MotionSection>
            </div>
          </AnimatePresence>
        </main>

        <footer className="relative py-12 px-4 border-t footer-shell">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <a
                href="/Resume_Yulia_Kanapatskaya_2026.pdf.pdf"
                download="Resume_Yulia_Kanapatskaya_2026.pdf.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  borderColor: '#00d4ff',
                  color: '#00d4ff',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Resume
              </a>
              <a
                href="/CL_Yulia_Kanapatskaya_2026.pdf"
                download="CL_Yulia_Kanapatskaya_2026.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm"
                style={{
                  background: 'rgba(255, 0, 110, 0.1)',
                  borderColor: '#ff006e',
                  color: '#ff006e',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 110, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 110, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Cover Letter
              </a>
            </div>
            <p className="text-sm small-note text-center">
              &copy; 2026 {intro.name}
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



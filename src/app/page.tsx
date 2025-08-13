"use client";

import "./page.css";
import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { WorkHistory } from "./components/WorkHistory";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { Contact } from "./components/Contact";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { projectsData } from "./components/ProjectData";
import { MotionBackground } from "./motions/MotionBackground";
import { MotionNav } from "./motions/MotionNav";
import { MotionSection } from "./motions/MotionSection";
import { MotionCursor } from "./motions/MotionCursor";
import { useMouseMV, useScrollMV } from "./hooks/useMotionValues";
import { NAV_ITEMS, SECTION } from "./utils/paths";
import { fastSpring } from "./motions/animationPresets";

type Page = "home" | "projects";

export default function App() {
  const isClient = typeof window !== "undefined";
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const { x, y } = useMouseMV();
  const { y: scrollYMV, vy: scrollVeloMV, dir } = useScrollMV();
  const scrollY = scrollYMV.get();     // OK to read occasionally
  const scrollVelocity = scrollVeloMV.get();
  const scrollDirection = dir.get();

  // Use a plain number to avoid calling .to on non-MotionValues during SSR/hydration
  const mouseXPercentNumber = (() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1;
    const xNow = typeof x?.get === "function" ? x.get() : 0;
    return (xNow / w - 0.5) * 2;
  })();

  const selectedProject = useMemo(
    () => projectsData.find((p) => p.id === selectedProjectId),
    [selectedProjectId]
  );

  const handleProjectSelect = useCallback((projectId: string) => {
    if (projectId === "all") setCurrentPage("projects");
    else {
      setSelectedProjectId(projectId);
      setIsProjectModalOpen(true);
    }
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setSelectedProjectId("");
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentPage("home");
    setSelectedProjectId("");
  }, []);

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
        {/* Background grid */}
        <MotionBackground scrollY={scrollY} scrollVelocity={scrollVelocity} />

        {/* Scroll-related light FX (your component) */}
        {/* <ScrollEffects /> */}
        {/* <ParallaxBackground /> */}

        {/* NAV */}
        <MotionNav
          items={NAV_ITEMS}
          activeId={SECTION.HERO}      // or derive from your scroll observer if you keep it
          onBackHome={handleBackToHome}
          onClickItem={scrollToSection}
          // MotionNav expects a number for mouseXPercent; get a snapshot from MV:
          mouseXPercent={mouseXPercentNumber}
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
        />

        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === "home" && (
              <div key="home-content">
                {/* HERO */}
                <MotionSection id={SECTION.HERO} className="cyber-glass">
                  <Hero />
                </MotionSection>

                <MotionSection id={SECTION.ABOUT} className="cyber-glass">
                  <About />
                </MotionSection>

                <MotionSection id={SECTION.EXPERIENCE} className="cyber-glass-purple">
                  <WorkHistory />
                </MotionSection>

                <MotionSection id={SECTION.SKILLS} className="cyber-glass-pink">
                  <Skills />
                </MotionSection>

                <MotionSection id={SECTION.PROJECTS} className="cyber-glass">
                  <Projects onProjectSelect={handleProjectSelect} />
                </MotionSection>

                <MotionSection id={SECTION.CONTACT} className="cyber-glass-purple">
                  <Contact />
                </MotionSection>
              </div>
            )}
          </AnimatePresence>

          {currentPage === "projects" && (
            <div className="pt-24">
              <Projects onProjectSelect={handleProjectSelect} showAll />
            </div>
          )}
        </main>

        {/* Modal */}
        <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto cyber-glass border-2">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedProject?.title || "Project Details"}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <ProjectDetail
                project={selectedProject}
                onBack={handleCloseProjectModal}
                isModal
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Footer (kept simple; no blur/filters) */}
        <footer className="relative py-12 px-4 border-t footer-shell">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm small-note">
              &copy; 2024 Yulia Kanapatskaya
              <span style={{ color: "#00ff41" }}> // </span>
              <span style={{ color: "#00d4ff" }}>Engineered with precision</span>
              <span style={{ color: "#ff006e" }}> &amp; passion</span>
            </p>
          </div>
        </footer>

        {/* Cursor */}
        <MotionCursor x={x} y={y} />
      </LazyMotion>
    </div>
  );
}
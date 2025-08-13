"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { ScrollEffects } from "./components/ScrollEffects";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { WorkHistory } from "./components/WorkHistory";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { Contact } from "./components/Contact";
import { projectsData } from "./components/ProjectData";
import { useMousePosition } from "./components/hooks/useMousePosition";
import { useScrollEffects } from "./components/hooks/useScrollEffects";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";

type Page = "home" | "projects";

export default function App() {
  const isClient = typeof window !== "undefined";
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  // Optimized hooks
  const mousePosition = useMousePosition();
  const scrollData = useScrollEffects();

  // Memoized calculations to prevent re-computation
  const mouseXPercent = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    if (!w) return 0;
    return (mousePosition.x / w - 0.5) * 2;
  }, [mousePosition.x]);

  const selectedProject = useMemo(() => 
    projectsData.find(p => p.id === selectedProjectId),
    [selectedProjectId]
  );

  // Memoized navigation items
  const navigationItems = useMemo(() => [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ], []);

  // Optimized spring configurations
  const fastSpring = useMemo(() => ({
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  }), []);

  const slowSpring = useMemo(() => ({
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
  }), []);

  // Memoized navigation style
  const navigationStyle = useMemo(() => ({
    background: scrollData.scrollY > 50
      ? "rgba(10, 10, 15, 0.95)"
      : "rgba(10, 10, 15, 0.7)",
    backdropFilter: `blur(${Math.min(20 + scrollData.scrollVelocity * 3, 30)}px) saturate(180%)`,
    borderBottom: `1px solid rgba(0, 212, 255, ${scrollData.scrollY > 50 ? 0.5 : 0.2})`,
    boxShadow: scrollData.scrollY > 50
      ? `0 4px 32px rgba(0, 212, 255, ${Math.min(0.1 + scrollData.scrollVelocity * 0.05, 0.2)})`
      : "none",
  }), [scrollData.scrollY, scrollData.scrollVelocity]);

  // Optimized event handlers with useCallback
  const handleProjectSelect = useCallback((projectId: string) => {
    if (projectId === "all") {
      setCurrentPage("projects");
    } else {
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
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage]);

  if (!isClient) {
    // Avoid SSR render when browser APIs are unavailable
    return null; // or a lightweight skeleton if you prefer
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(131, 56, 236, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0f 0%, #121218 100%)
        `,
      }}
    >
      {/* Optimized Grid Background */}
      <motion.div 
        className="fixed inset-0 cyber-grid pointer-events-none" 
        style={{ willChange: 'transform, opacity' }}
        animate={{
          opacity: Math.min(0.2 + scrollData.scrollVelocity * 0.05, 0.3),
          transform: `translate3d(${scrollData.scrollY * -0.05}px, ${scrollData.scrollY * 0.025}px, 0) scale(${1 + scrollData.scrollVelocity * 0.01})`,
        }}
        transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
      />

      {/* Performance-optimized scroll effects */}
      <ScrollEffects />

      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Optimized Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 transition-all duration-200"
        style={{
          ...navigationStyle,
          willChange: 'transform',
        }}
        animate={{
          x: mouseXPercent * 1.5 + (scrollData.scrollVelocity * (scrollData.scrollDirection === 'down' ? 0.5 : -0.5)),
          y: scrollData.scrollVelocity > 2 ? Math.sin(Date.now() * 0.01) * 1 : 0,
        }}
        transition={fastSpring}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              onClick={handleBackToHome}
              className="text-xl font-bold relative group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#00d4ff",
                textShadow: `0 0 ${Math.min(10 + scrollData.scrollVelocity * 3, 15)}px rgba(0, 212, 255, 0.5)`,
                willChange: 'transform',
              }}
              animate={{
                filter: scrollData.scrollVelocity > 1 
                  ? `saturate(${1.1 + scrollData.scrollVelocity * 0.1})` 
                  : 'saturate(1)',
              }}
              transition={fastSpring}
            >
              <span className="relative z-10">yulia.kanapatskaya</span>
              
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #ff006e)",
                  boxShadow: `0 0 ${Math.min(10 + scrollData.scrollVelocity * 3, 15)}px #00d4ff`,
                  willChange: 'width',
                }}
                initial={{ width: 0 }}
                animate={{
                  width: scrollData.currentSection === 'hero' ? '100%' : '0%',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              
              <motion.span
                className="absolute -right-2 top-0 text-sm"
                style={{ color: "#00ff41", willChange: 'transform, opacity' }}
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: scrollData.isScrolling ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  scale: fastSpring,
                }}
              >
                █
              </motion.span>
            </motion.button>

            <div className="hidden md:flex gap-8">
              {navigationItems.map((item, index) => {
                const isActive = scrollData.currentSection === item.id;
                return (
                  <motion.button
                    key={`nav-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className="relative group font-medium"
                    style={{
                      color: isActive ? "#00d4ff" : "rgba(255, 255, 255, 0.7)",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "0.9rem",
                      willChange: 'color, transform',
                    }}
                    whileHover={{
                      y: -1,
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0, 212, 255, 0.7)",
                    }}
                    whileTap={{ y: 0 }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      textShadow: isActive 
                        ? "0 0 15px rgba(0, 212, 255, 0.8)" 
                        : "0 0 0px rgba(0, 212, 255, 0)",
                    }}
                    transition={fastSpring}
                  >
                    {item.label}
                    
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5"
                      style={{
                        background: "linear-gradient(90deg, #00d4ff, transparent)",
                        boxShadow: "0 0 10px #00d4ff",
                        willChange: 'width',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    
                    {/* Optimized shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent)",
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: isActive ? [0, 0.3, 0] : 0,
                      }}
                      transition={{
                        x: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                        opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Optimized Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero with minimal effects for performance */}
              <motion.div
                id="hero"
                style={{ willChange: 'transform, filter' }}
                animate={{
                  transform: `scale(${1 - scrollData.scrollY * 0.00008}) translateZ(0)`,
                  filter: `blur(${Math.min(scrollData.scrollVelocity * 0.3, 1)}px)`,
                }}
                transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
              >
                <Hero />
              </motion.div>
              
              {/* Sections with optimized animations */}
              <motion.div
                id="about"
                className="cyber-glass"
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ ...slowSpring, duration: 0.8 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{ willChange: 'transform' }}
                animate={{
                  x: scrollData.scrollDirection === 'down' 
                    ? scrollData.scrollVelocity * -1.5 
                    : scrollData.scrollVelocity * 1.5,
                }}
              >
                <About />
              </motion.div>
              
              <motion.div
                id="experience"
                className="cyber-glass-purple"
                initial={{ opacity: 0, x: -60, rotateY: -8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ ...slowSpring, duration: 0.8 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{ willChange: 'transform' }}
                animate={{
                  rotateZ: scrollData.scrollVelocity > 1.2 
                    ? Math.sin(Date.now() * 0.005) * Math.min(scrollData.scrollVelocity, 3) * 0.5 
                    : 0,
                }}
              >
                <WorkHistory />
              </motion.div>
              
              <motion.div
                id="skills"
                className="cyber-glass-pink"
                initial={{ opacity: 0, scale: 0.9, rotateZ: 3 }}
                whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                transition={{ ...slowSpring, duration: 0.8 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{ willChange: 'transform' }}
                animate={{
                  y: scrollData.scrollDirection === 'up' 
                    ? scrollData.scrollVelocity * -2 
                    : scrollData.scrollVelocity * 0.8,
                }}
              >
                <Skills />
              </motion.div>
              
              <motion.div
                id="projects"
                className="cyber-glass"
                initial={{ opacity: 0, y: 60, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ ...slowSpring, duration: 0.8 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{ willChange: 'transform' }}
                animate={{
                  skewX: scrollData.scrollVelocity > 1.8 
                    ? Math.min(scrollData.scrollVelocity * 0.3, 1.5) 
                    : 0,
                }}
              >
                <Projects onProjectSelect={handleProjectSelect} />
              </motion.div>
              
              <motion.div
                id="contact"
                className="cyber-glass-purple"
                initial={{ opacity: 0, x: 60, rotateY: 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ ...slowSpring, duration: 0.8 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{ willChange: 'filter' }}
                animate={{
                  filter: `brightness(${1 + scrollData.scrollVelocity * 0.05}) saturate(${1 + scrollData.scrollVelocity * 0.05})`,
                }}
              >
                <Contact />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentPage === "projects" && (
          <motion.div
            className="pt-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Projects
              onProjectSelect={handleProjectSelect}
              showAll={true}
            />
          </motion.div>
        )}
      </main>

      {/* Optimized Project Modal */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent 
          className="max-w-5xl max-h-[90vh] overflow-y-auto cyber-glass border-2"
          style={{
            borderColor: "#00d4ff",
            boxShadow: `0 0 ${Math.min(50 + scrollData.scrollVelocity * 5, 60)}px rgba(0, 212, 255, 0.3)`,
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedProject?.title || 'Project Details'}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <ProjectDetail 
              project={selectedProject} 
              onBack={handleCloseProjectModal}
              isModal={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Optimized Footer */}
      <motion.footer
        className="relative py-12 px-4 border-t"
        style={{
          background: "rgba(10, 10, 15, 0.9)",
          backdropFilter: `blur(${Math.min(20 + scrollData.scrollVelocity * 2, 25)}px)`,
          borderTop: `1px solid rgba(0, 212, 255, ${Math.min(0.3 + scrollData.scrollVelocity * 0.05, 0.4)})`,
          boxShadow: `0 -4px 32px rgba(0, 212, 255, ${Math.min(0.1 + scrollData.scrollVelocity * 0.03, 0.15)})`,
          willChange: 'transform',
        }}
        animate={{
          x: mouseXPercent * -0.5 + (scrollData.scrollVelocity * (scrollData.scrollDirection === 'up' ? 0.5 : -0.5)),
        }}
        transition={fastSpring}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ willChange: 'filter' }}
            animate={{
              filter: scrollData.scrollVelocity > 1 
                ? `blur(${Math.min(scrollData.scrollVelocity * 0.3, 0.8)}px)` 
                : 'blur(0px)',
            }}
          >
            <p
              className="text-sm relative z-10"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              &copy; 2024 Yulia Kanapatskaya
              <span style={{ color: "#00ff41" }}> // </span>
              <span style={{ color: "#00d4ff" }}>Engineered with precision</span>
              <span style={{ color: "#ff006e" }}> & passion</span>
            </p>

            {/* Optimized animated dots */}
            <motion.div
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex gap-1"
              style={{ willChange: 'transform, opacity' }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: 1 + (scrollData.scrollVelocity * 0.05),
              }}
              transition={{
                opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.2 },
              }}
            >
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: "#00ff41",
                    boxShadow: `0 0 ${Math.min(4 + scrollData.scrollVelocity, 8)}px #00ff41`,
                    willChange: 'opacity',
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Optimized Mouse cursors */}
      <motion.div
        className="fixed pointer-events-none z-50 w-5 h-5 rounded-full mix-blend-screen"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          background: "radial-gradient(circle, #00d4ff 0%, #ff006e 100%)",
          boxShadow: `0 0 ${Math.min(20 + scrollData.scrollVelocity * 5, 30)}px #00d4ff`,
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.1 + scrollData.scrollVelocity * 0.05, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed pointer-events-none z-49 w-7 h-7 rounded-full border"
        style={{
          left: mousePosition.x - 14,
          top: mousePosition.y - 14,
          border: `1px solid rgba(0, 212, 255, ${Math.min(0.3 + scrollData.scrollVelocity * 0.05, 0.4)})`,
          willChange: 'transform',
        }}
        animate={{
          scale: [0.8, 1.1 + scrollData.scrollVelocity * 0.1, 0.8],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: Math.max(8 - scrollData.scrollVelocity, 4),
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />
    </div>
  );
}
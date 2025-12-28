"use client";
import { m } from "motion/react";
import { fastSpring, opacityPulse, shimmerLine } from "../../graphs/animationPresets";
import { useNav } from "./NavContext";

type Item = { label: string; id: string };

type Props = {
  items: Item[];
};

export const SECTION = {
  HERO: "hero",
  ABOUT: "about",
  QUALIFICATIONS: "qualifications",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  PROJECTS: "projects",
  RECOMMENDATIONS: "recommendations",
  CONTACT: "contact",
} as const;

export type SectionId = typeof SECTION[keyof typeof SECTION];

export const NAV_ITEMS: { label: string; id: SectionId, hidden?: boolean }[] = [
  { label: "About", id: SECTION.ABOUT },
  { label: "Projects", id: SECTION.PROJECTS },
  { label: "Work", id: SECTION.EXPERIENCE },
  { label: "Skills", id: SECTION.SKILLS },
  { label: "Contact", id: SECTION.CONTACT },
];

export function Nav() {
  const {
    activeId,
    scrollToSection,
    mouseXPercent,
    scrollVelocity,
    scrollDirection,
  } = useNav();
  const onBackHome = () => scrollToSection("hero");
  return (
    <m.nav
      className="fixed top-0 w-full z-50 nav-shell"
      style={{ willChange: "transform" }}
        animate={{
          x:
            mouseXPercent * 1.5 +
            scrollVelocity *
              (scrollDirection === "down"
                ? 0.5
                : scrollDirection === "up"
                ? -0.5
                : 0),
        }}
      transition={fastSpring}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <m.button
          onClick={onBackHome}
          className="text-xl font-bold relative group brand-name"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={fastSpring}
        >
          <span className="relative z-10">yulia.kanapatskaya</span>

          <m.div
            className="absolute -bottom-1 left-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, #00d4ff, #ff006e)",
              boxShadow: "0 0 10px #00d4ff",
              willChange: "width",
            }}
            variants={shimmerLine}
            initial="rest"
            animate={activeId === "hero" ? "active" : "rest"}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          <m.span
            className="absolute -right-2 top-0 text-sm"
            style={{ color: "#00ff41", willChange: "transform, opacity" }}
            variants={opacityPulse}
            animate="animate"
            transition={{
              opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              scale: fastSpring,
            }}
          >
            █
          </m.span>
        </m.button>

        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <m.button
                key={`nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="relative group font-medium uppercase tracking-[0.1em] text-[0.9rem]"
                style={{
                  color: isActive ? "#00d4ff" : "rgba(255,255,255,0.7)",
                  willChange: "color, transform",
                }}
                whileHover={{ y: -1, color: "#00d4ff" }}
                whileTap={{ y: 0 }}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  textShadow: isActive
                    ? "0 0 15px rgba(0,212,255,0.8)"
                    : "0 0 0 rgba(0,212,255,0)",
                }}
                transition={fastSpring}
              >
                {item.label}
                <m.div
                  className="absolute -bottom-1 left-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, #00d4ff, transparent)",
                    boxShadow: "0 0 10px #00d4ff",
                    willChange: "width",
                  }}
                  variants={shimmerLine}
                  initial="rest"
                  animate={isActive ? "active" : "rest"}
                  whileHover="active"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </m.button>
            );
          })}
        </div>
      </div>
    </m.nav>
  );
}
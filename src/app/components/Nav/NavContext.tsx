"use client";

import { createContext, ReactNode, useContext } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useScrollEffects } from "./useScrollEffects";

export interface NavContextType {
  activeId: string;
  scrollVelocity: number;
  scrollDirection: "up" | "down" | "idle";
  mouseXPercent: number;
  scrollToSection: (id: string) => void;
}

const NavContext = createContext<NavContextType>({
  activeId: "hero",
  scrollVelocity: 0,
  scrollDirection: "down",
  mouseXPercent: 0,
  scrollToSection: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const { currentSection, scrollVelocity, scrollDirection } = useScrollEffects();
  const { x } = useMousePosition();
  const mouseXPercent = typeof window !== "undefined" && window.innerWidth > 0
    ? (x / window.innerWidth - 0.5) * 2
    : 0;

  const scrollToSection = (id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <NavContext.Provider value={{ activeId: currentSection, scrollVelocity, scrollDirection, mouseXPercent, scrollToSection }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);


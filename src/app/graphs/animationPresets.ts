"use client";
import { Transition, Variants } from "motion/react";

export const fastSpring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.8,
};

export const slowSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

export const inViewSection: Variants = {
  initial: { opacity: 0, y: 60, rotateX: 8 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
};

export const shimmerLine: Variants = {
  rest: { width: 0 },
  active: { width: "100%" },
};

export const navHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -1, scale: 1.03 },
};

export const opacityPulse: Variants = {
  animate: { opacity: [1, 0.3, 1] },
};

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
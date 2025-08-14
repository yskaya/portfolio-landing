"use client";
import { m } from "motion/react";
import { clamp } from "./animationPresets";

type Props = {
  scrollY: number;
  scrollVelocity: number;
};

export function AnimatedBackground({ scrollY, scrollVelocity }: Props) {
  return (
    <m.div
      className="fixed inset-0 cyber-grid pointer-events-none"
      style={{ willChange: "transform, opacity" }}
      animate={{
        opacity: clamp(0.2 + scrollVelocity * 0.05, 0, 0.3),
        transform: `translate3d(${scrollY * -0.05}px, ${scrollY * 0.025}px, 0) scale(${1 + scrollVelocity * 0.01})`,
      }}
      transition={{ type: "tween", duration: 0.1, ease: "linear" }}
    />
  );
}
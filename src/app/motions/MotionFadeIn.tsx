"use client";
import { ReactNode } from "react";
import { m } from "motion/react";
import { fadeInUp, slowSpring } from "./animationPresets";

interface MotionFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function MotionFadeIn({
  children,
  className,
  delay = 0,
  once = true,
}: MotionFadeInProps) {
  return (
    <m.div
      className={className}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
      transition={{ ...slowSpring, duration: 0.6, delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </m.div>
  );
}

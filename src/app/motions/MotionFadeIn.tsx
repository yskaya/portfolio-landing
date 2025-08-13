"use client";
import { ReactNode } from "react";
import { m, HTMLMotionProps } from "motion/react";

interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  once = true,
  viewport,
  ...rest
}: MotionFadeInProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, ...(viewport || {}) }}
      transition={{ duration, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

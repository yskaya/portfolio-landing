"use client";
import { ReactNode } from "react";
import { m } from "motion/react";

type ElementKey = keyof typeof m;

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementKey;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function MotionFadeIn({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
}: Props) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once }}
    >
      {children}
    </Component>
  );
}

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
  offset?: number;
  direction?: "left" | "right";
  once?: boolean;
};

export function MotionSlideIn({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.6,
  offset = 30,
  direction = "left",
  once = true,
}: Props) {
  const Component = m[as];
  const x = direction === "left" ? -offset : offset;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration, delay }}
      viewport={{ once }}
    >
      {children}
    </Component>
  );
}

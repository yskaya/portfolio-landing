"use client";

import { m } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { MotionFadeIn } from "./MotionFadeIn";
import { cn } from "../ui/utils";

interface AnimatedHeadlineProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  delay?: number;
  once?: boolean;
  style?: CSSProperties;
}

export function AnimatedHeadline({
  children,
  className,
  accent = false,
  delay,
  once,
  style,
}: AnimatedHeadlineProps) {
  return (
    <MotionFadeIn
      as="h2"
      className={cn(
        "text-4xl md:text-5xl font-bold mb-8 text-white relative",
        className,
      )}
      delay={delay}
      once={once}
      style={style}
    >
      {children}
      {accent && (
        <m.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      )}
    </MotionFadeIn>
  );
}


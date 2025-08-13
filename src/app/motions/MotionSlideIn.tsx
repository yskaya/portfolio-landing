"use client";
import { ReactNode, CSSProperties } from "react";
import { m } from "motion/react";
import { slowSpring } from "./animationPresets";

type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  style?: CSSProperties;
};

export function MotionSlideIn({
  children,
  className,
  delay = 0,
  direction = "left",
  distance = 20,
  style,
}: Props) {
  const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const y = direction === "up" ? -distance : direction === "down" ? distance : 0;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ ...slowSpring, delay }}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </m.div>
  );
}

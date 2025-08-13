"use client";
import { ReactNode, CSSProperties } from "react";
import { m } from "motion/react";
import { fadeInUp, slowSpring } from "./animationPresets";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  margin?: string;
  animateStyle?: CSSProperties | any;
  style?: CSSProperties;
  transition?: any;
};

export function MotionFadeIn({
  children,
  className,
  delay = 0,
  once = true,
  margin,
  animateStyle,
  style,
  transition,
}: Props) {
  return (
    <m.div
      className={className}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={margin ? { once, margin } : { once }}
      transition={{ ...slowSpring, delay, ...(transition || {}) }}
      style={{ willChange: "transform", ...style }}
      animate={animateStyle}
    >
      {children}
    </m.div>
  );
}

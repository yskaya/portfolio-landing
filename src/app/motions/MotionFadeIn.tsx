"use client";

import { ReactNode, ElementType } from "react";
import { m } from "motion/react";
import { fadeInUp, slowSpring } from "./animationPresets";

type MotionTag = keyof typeof m;

type Props = {
  as?: MotionTag;
  className?: string;
  children: ReactNode;
  delay?: number;
  once?: boolean;
  style?: React.CSSProperties;
};

export function MotionFadeIn({ as = "div", className, children, delay = 0, once = true, style }: Props) {
  const Component = (m as Record<MotionTag, ElementType>)[as];
  return (
    <Component
      className={className}
      style={style}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
      transition={{ ...slowSpring, duration: 0.6, delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </Component>
  );
}

"use client";
import { ReactNode } from "react";
import { m } from "motion/react";
import { inViewSection, slowSpring } from "./animationPresets";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  once?: boolean;
  margin?: string;
  animateStyle?: any; // optional extra animate styles derived from scroll velocity, etc.
};

export function MotionSection({
  id,
  className,
  children,
  once = true,
  margin = "-80px",
  animateStyle,
}: Props) {
  return (
    <m.section
      id={id}
      className={className}
      variants={inViewSection}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once, margin }}
      transition={{ ...slowSpring, duration: 0.8 }}
      style={{ willChange: "transform" }}
      animate={animateStyle}
    >
      {children}
    </m.section>
  );
}
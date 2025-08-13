"use client";
import { m } from "motion/react";
import { fastSpring } from "./animationPresets";

type Props = {
  x: any; // MotionValue<number>
  y: any; // MotionValue<number>
  speed?: number;
};

export function MotionCursor({ x, y, speed = 0.05 }: Props) {
  // translate keeping the center
  return (
    <>
      <m.div
        className="fixed z-50 cursor-core"
        style={{
          translateX: x - 10,
          translateY: y - 10,
          willChange: "transform",
          boxShadow: "0 0 30px #00d4ff",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="fixed z-40 cursor-ring"
        style={{
          translateX: x - 14,
          translateY: y - 14,
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, ...fastSpring }}
      />
    </>
  );
}
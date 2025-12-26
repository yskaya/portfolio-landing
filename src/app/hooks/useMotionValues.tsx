"use client";
import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useMotionValueEvent,
  useDomEvent,
} from "motion/react";

// Track mouse position using Motion's utilities
export function useMouseMV() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Attach mousemove listener via Motion's useDomEvent
  if (typeof window !== "undefined") {
    useDomEvent(window, "mousemove", (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    });
  }

  const xs = useSpring(x, { stiffness: 400, damping: 40 });
  const ys = useSpring(y, { stiffness: 400, damping: 40 });

  return { x: xs, y: ys };
}

// Track scroll position, velocity and direction with Motion hooks
export function useScrollMV() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const dir = useMotionValue<"up" | "down">("down");
  const lastY = useRef(0);

  // Determine scroll direction whenever scrollY changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    dir.set(latest - lastY.current >= 0 ? "down" : "up");
    lastY.current = latest;
  });

  const ys = useSpring(scrollY, { stiffness: 200, damping: 30, mass: 0.8 });
  const vys = useSpring(velocity, { stiffness: 300, damping: 40, mass: 0.6 });

  return { y: ys, vy: vys, dir };
}


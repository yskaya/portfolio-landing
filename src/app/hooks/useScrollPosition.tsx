"use client";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

// Returns the current vertical scroll position as a number
export function useScrollPosition() {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => setY(latest));
  return y;
}


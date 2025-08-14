"use client";
import { useState } from "react";
import { useMotionValueEvent } from "motion/react";
import { useMouseMV } from "./useMotionValues";

interface MousePosition {
  x: number;
  y: number;
}

// Expose mouse coordinates as plain numbers
export function useMousePosition() {
  const { x, y } = useMouseMV();
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useMotionValueEvent(x, "change", (latest) => setPos((p) => ({ ...p, x: latest })));
  useMotionValueEvent(y, "change", (latest) => setPos((p) => ({ ...p, y: latest })));

  return pos;
}


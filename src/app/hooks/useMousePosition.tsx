"use client";
import { useRef, useState, useEffect } from "react";
import { useMotionValueEvent } from "motion/react";
import { useMouseMV } from "./useMotionValues";

interface MousePosition {
  x: number;
  y: number;
}

// Expose mouse coordinates as plain numbers with rAF throttling
export function useMousePosition() {
  const { x, y } = useMouseMV();
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });
  const frame = useRef<number>();

  const scheduleUpdate = () => {
    if (frame.current === undefined) {
      frame.current = requestAnimationFrame(() => {
        setPos({ x: x.get(), y: y.get() });
        frame.current = undefined;
      });
    }
  };

  useMotionValueEvent(x, "change", scheduleUpdate);
  useMotionValueEvent(y, "change", scheduleUpdate);

  useEffect(() => {
    return () => {
      if (frame.current !== undefined) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return pos;
}


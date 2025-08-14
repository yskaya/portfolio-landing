"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

// Returns the current vertical scroll position as a number, throttled with rAF
export function useScrollPosition() {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);
  const frame = useRef<number>();

  const scheduleUpdate = (latest: number) => {
    if (frame.current === undefined) {
      frame.current = requestAnimationFrame(() => {
        setY(latest);
        frame.current = undefined;
      });
    }
  };

  useMotionValueEvent(scrollY, "change", scheduleUpdate);

  useEffect(() => {
    return () => {
      if (frame.current !== undefined) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return y;
}


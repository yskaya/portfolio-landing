"use client";
import { useEffect } from "react";
import { motionValue, useSpring } from "motion/react";

export function useMouseMV() {
  const x = motionValue(0);
  const y = motionValue(0);

  useEffect(() => {
    let r = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(r);
      r = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const xs = useSpring(x, { stiffness: 400, damping: 40 });
  const ys = useSpring(y, { stiffness: 400, damping: 40 });

  return { x: xs, y: ys };
}

export function useScrollMV() {
  const y = motionValue(0);
  const vy = motionValue(0);
  const dir = motionValue<"up" | "down">("down");

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const curr = window.scrollY;
        const v = curr - last;
        y.set(curr);
        vy.set(Math.abs(v));
        dir.set(v >= 0 ? "down" : "up");
        last = curr;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [y, vy, dir]);

  const ys = useSpring(y, { stiffness: 200, damping: 30, mass: 0.8 });
  const vys = useSpring(vy, { stiffness: 300, damping: 40, mass: 0.6 });

  return { y: ys, vy: vys, dir };
}
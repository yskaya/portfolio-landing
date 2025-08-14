import { useEffect, useMemo, useRef, useState } from 'react';
import { useScroll, useVelocity, useSpring, useTransform, useMotionValueEvent } from 'motion/react';

export interface ScrollData {
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'idle';
  scrollVelocity: number;
  scrollProgress: number;
  currentSection: string;
  isScrolling: boolean;
}

/**
 * Optimized scroll effects powered by Motion values.
 * - No manual event listeners or RAF management
 * - React state updates are coalesced and thresholded
 * - Velocity is derived from Motion's useVelocity + spring smoothing
 */
export function useScrollEffects() {
  const [data, setData] = useState<ScrollData>({
    scrollY: 0,
    scrollDirection: 'idle',
    scrollVelocity: 0,
    scrollProgress: 0,
    currentSection: 'hero',
    isScrolling: false,
  });

  // Sections map remains memoized
  const sections = useMemo(() => ['hero', 'about', 'projects', 'experience', 'skills',  'contact'], []);

  // Motion-provided scroll values
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth the raw scroll for nicer velocity & downstream transforms
  const smoothY = useSpring(scrollY, { stiffness: 300, damping: 45, mass: 0.6 });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 45, mass: 0.6 });

  // Velocity of smoothY (px/ms in Motion)
  const rawVelocity = useVelocity(smoothY);

  // Normalize & clamp velocity to 0..3 (similar to your cap), keep sign for direction
  const clampedVelocity = useTransform(rawVelocity, (v) => {
    // v is px/ms; convert to px per 16ms frame and clamp
    const perFrame = v * 16; // approx per-frame pixels
    const capped = Math.min(Math.max(perFrame, -3), 3);
    return capped;
  });

  // Derive direction from velocity with a small dead zone
  const directionMV = useTransform(clampedVelocity, (v) => {
    if (Math.abs(v) < 0.15) return 'idle' as const;
    return v > 0 ? ('down' as const) : ('up' as const);
  });

  // Track isScrolling with a small idle timeout
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastSnapshotRef = useRef({ y: 0, progress: 0, section: 'hero' });
  const rafPending = useRef<number | null>(null);

  // Helper to compute section by progress (fast, no DOM queries)
  const progressToSection = (p: number) => {
    const idx = Math.min(Math.floor(p * (sections.length - 1)), sections.length - 1);
    return sections[idx];
  };

  // Coalesce updates into a single rAF tick to avoid flooding React state
  const scheduleUpdate = () => {
    if (rafPending.current != null) return;
    rafPending.current = requestAnimationFrame(() => {
      rafPending.current = null;

      const y = smoothY.get();
      const p = smoothProgress.get();
      const v = Math.abs(clampedVelocity.get());
      const dir = directionMV.get() as ScrollData['scrollDirection'];
      const section = progressToSection(p);

      const last = lastSnapshotRef.current;
      const yChanged = Math.abs(last.y - y) > 1;
      const pChanged = Math.abs(last.progress - p) > 0.0025; // ~0.25%
      const sChanged = last.section !== section;

      if (!yChanged && !pChanged && !sChanged && Math.abs(data.scrollVelocity - v) < 0.05 && data.scrollDirection === dir && data.isScrolling) {
        // No meaningful change
        return;
      }

      lastSnapshotRef.current = { y, progress: p, section };

      setData((prev) => ({
        scrollY: y,
        scrollDirection: dir,
        scrollVelocity: v,
        scrollProgress: p,
        currentSection: section,
        isScrolling: true,
      }));

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setData((prev) => ({ ...prev, isScrolling: false, scrollDirection: 'idle', scrollVelocity: 0 }));
      }, 150);
    });
  };

  // Subscribe to Motion value changes without causing React renders per change
  useMotionValueEvent(smoothY, 'change', scheduleUpdate);
  useMotionValueEvent(smoothProgress, 'change', scheduleUpdate);
  useMotionValueEvent(clampedVelocity, 'change', scheduleUpdate);
  useMotionValueEvent(directionMV, 'change', scheduleUpdate);

  useEffect(() => () => {
    if (rafPending.current != null) cancelAnimationFrame(rafPending.current);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
  }, []);

  return data;
}
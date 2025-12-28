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
 * - Active section detected via IntersectionObserver for accuracy
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

  // Section IDs in order as they appear on the page
  const sectionIds = useMemo(() => [
    'hero',
    'about',
    'qualifications',
    'projects',
    'experience',
    'skills',
    'recommendations',
    'contact'
  ], []);

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
  const currentSectionRef = useRef<string>('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use IntersectionObserver to detect which section is currently in view
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visibleSections = new Map<string, number>();
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            // Store the intersection ratio (how much of the section is visible)
            const ratio = entry.intersectionRatio;
            visibleSections.set(sectionId, ratio);
          } else {
            visibleSections.delete(sectionId);
          }
        });

        // Find the section with the highest intersection ratio
        if (visibleSections.size > 0) {
          let maxRatio = 0;
          let activeSection = currentSectionRef.current;
          
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeSection = sectionId;
            }
          });

          if (activeSection !== currentSectionRef.current) {
            currentSectionRef.current = activeSection;
            setData((prev) => ({ ...prev, currentSection: activeSection }));
          }
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px', // Section is active when it's in the top-middle portion of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    // Observe all section elements
    const observeSections = () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    };

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      observeSections();
    } else {
      const timeoutId = setTimeout(observeSections, 100);
      return () => {
        clearTimeout(timeoutId);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  // Coalesce updates into a single rAF tick to avoid flooding React state
  // Note: currentSection is updated separately by IntersectionObserver
  const scheduleUpdate = () => {
    if (rafPending.current != null) return;
    rafPending.current = requestAnimationFrame(() => {
      rafPending.current = null;

      const y = smoothY.get();
      const p = smoothProgress.get();
      const v = Math.abs(clampedVelocity.get());
      const dir = directionMV.get() as ScrollData['scrollDirection'];

      const last = lastSnapshotRef.current;
      const yChanged = Math.abs(last.y - y) > 1;
      const pChanged = Math.abs(last.progress - p) > 0.0025; // ~0.25%

      if (!yChanged && !pChanged && Math.abs(data.scrollVelocity - v) < 0.05 && data.scrollDirection === dir && data.isScrolling) {
        // No meaningful change
        return;
      }

      lastSnapshotRef.current = { y, progress: p, section: currentSectionRef.current };

      setData((prev) => ({
        ...prev,
        scrollY: y,
        scrollDirection: dir,
        scrollVelocity: v,
        scrollProgress: p,
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
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  return data;
}
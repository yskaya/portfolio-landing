import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export interface ScrollData {
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'idle';
  scrollVelocity: number;
  scrollProgress: number;
  currentSection: string;
  isScrolling: boolean;
}

export function useScrollEffects() {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollDirection: 'idle',
    scrollVelocity: 0,
    scrollProgress: 0,
    currentSection: 'hero',
    isScrolling: false,
  });

  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const rafRef = useRef<number>();
  const velocityHistory = useRef<number[]>([]);
  const isThrottled = useRef(false);

  // Memoized sections array
  const sections = useMemo(() => ['hero', 'about', 'experience', 'skills', 'projects', 'contact'], []);

  // Optimized scroll handler with RAF throttling
  const handleScroll = useCallback(() => {
    if (isThrottled.current) return;
    
    isThrottled.current = true;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      
      // Skip minimal changes to reduce computations
      if (Math.abs(currentScrollY - lastScrollY.current) < 2 && 
          currentTime - lastTimestamp.current < 16) {
        isThrottled.current = false;
        return;
      }
      
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = Math.max(currentTime - lastTimestamp.current, 1); // Prevent division by zero
      
      // Calculate velocity with bounds
      const velocity = Math.min(Math.abs(deltaY / deltaTime), 3); // Capped at 3 for performance
      
      // Efficient velocity smoothing - reduced history
      velocityHistory.current.push(velocity);
      if (velocityHistory.current.length > 3) {
        velocityHistory.current.shift();
      }
      const smoothVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
      
      // Direction with dead zone to prevent jitter
      const direction = Math.abs(deltaY) < 3 ? 'idle' : deltaY > 0 ? 'down' : 'up';
      
      // Cached document height calculation
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.min(currentScrollY / documentHeight, 1) : 0;
      
      // Optimized section detection
      const sectionIndex = Math.min(Math.floor(progress * (sections.length - 1)), sections.length - 1);
      const currentSection = sections[sectionIndex];

      setScrollData(prevData => {
        // Only update if there are significant changes
        if (Math.abs(prevData.scrollY - currentScrollY) < 1 && 
            prevData.currentSection === currentSection &&
            Math.abs(prevData.scrollVelocity - smoothVelocity) < 0.1) {
          isThrottled.current = false;
          return prevData;
        }

        return {
          scrollY: currentScrollY,
          scrollDirection: direction,
          scrollVelocity: smoothVelocity,
          scrollProgress: progress,
          currentSection,
          isScrolling: true,
        };
      });

      // Optimized scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollData(prev => ({ ...prev, isScrolling: false, scrollDirection: 'idle' }));
      }, 150);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
      isThrottled.current = false;
    });
  }, [sections]);

  useEffect(() => {
    // Use passive listener for better performance
    const options = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, options);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, options);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return scrollData;
}
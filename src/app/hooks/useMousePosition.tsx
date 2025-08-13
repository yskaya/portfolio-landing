import { useState, useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const lastUpdate = useRef(0);
  const isThrottled = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isThrottled.current) return;
    
    const now = Date.now();
    // Throttle to ~60fps max
    if (now - lastUpdate.current < 16) return;
    
    isThrottled.current = true;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setMousePosition(prevPosition => {
        // Skip tiny movements to reduce updates
        if (Math.abs(prevPosition.x - e.clientX) < 3 && 
            Math.abs(prevPosition.y - e.clientY) < 3) {
          isThrottled.current = false;
          return prevPosition;
        }
        
        lastUpdate.current = now;
        isThrottled.current = false;
        return { x: e.clientX, y: e.clientY };
      });
    });
  }, []);

  useEffect(() => {
    // Use passive listener and capture for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return mousePosition;
}
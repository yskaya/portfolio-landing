import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollEffects } from './hooks/useScrollEffects';
import { useMousePosition } from './hooks/useMousePosition';

// Pre-calculated random values for consistent performance
const RANDOM_VALUES = Array.from({ length: 100 }, () => Math.random());
const MATRIX_CHARS = ['0', '1'];

export function ScrollEffects() {
  const scrollData = useScrollEffects();
  const mousePosition = useMousePosition();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; life: number; randomIndex: number }>>([]);
  const particleIdRef = useRef(0);
  const lastParticleSpawn = useRef(0);

  // Memoized section colors with better caching
  const sectionColors = useMemo(() => {
    const colorSchemes = {
      hero: { primary: '#00d4ff', secondary: '#ff006e', tertiary: '#8338ec' },
      about: { primary: '#00d4ff', secondary: '#00ff88', tertiary: '#8338ec' },
      experience: { primary: '#8338ec', secondary: '#ff006e', tertiary: '#00d4ff' },
      skills: { primary: '#ff006e', secondary: '#00ff88', tertiary: '#00d4ff' },
      projects: { primary: '#00d4ff', secondary: '#8338ec', tertiary: '#00ff88' },
      contact: { primary: '#00ff88', secondary: '#8338ec', tertiary: '#ff006e' },
    };
    return colorSchemes[scrollData.currentSection as keyof typeof colorSchemes] || colorSchemes.hero;
  }, [scrollData.currentSection]);

  // Optimized particle generation with throttling
  useEffect(() => {
    const now = Date.now();
    if (scrollData.scrollVelocity > 0.8 && 
        scrollData.isScrolling && 
        now - lastParticleSpawn.current > 50) { // Throttle particle spawn
      
      const particleCount = Math.min(Math.floor(scrollData.scrollVelocity * 6), 8); // Reduced count
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        const randomIndex = (particleIdRef.current + i) % RANDOM_VALUES.length;
        return {
          id: particleIdRef.current++,
          x: RANDOM_VALUES[randomIndex] * window.innerWidth,
          y: RANDOM_VALUES[(randomIndex + 1) % RANDOM_VALUES.length] * window.innerHeight,
          life: 1,
          randomIndex,
        };
      });
      
      setParticles(prev => [...prev, ...newParticles].slice(-25)); // Reduced max particles
      lastParticleSpawn.current = now;
    }
  }, [scrollData.scrollVelocity, scrollData.isScrolling]);

  // Optimized particle decay with RAF
  useEffect(() => {
    let rafId: number;
    
    const decay = () => {
      setParticles(prev => {
        if (prev.length === 0) return prev;
        
        const updated = prev
          .map(p => ({ ...p, life: p.life - 0.08 }))
          .filter(p => p.life > 0);
        
        if (updated.length > 0) {
          rafId = requestAnimationFrame(decay);
        }
        
        return updated;
      });
    };
    
    if (particles.length > 0) {
      rafId = requestAnimationFrame(decay);
    }
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [particles.length]);

  // Memoized progress bar visibility
  const showScrollProgress = useMemo(() => scrollData.scrollY > 100, [scrollData.scrollY]);

  // Memoized navigation sections
  const navSections = useMemo(() => 
    ['Hero', 'About', 'Experience', 'Skills', 'Projects', 'Contact'], []);

  // Optimized spring config for better performance
  const springConfig = useMemo(() => ({
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  }), []);

  return (
    <>
      {/* Optimized Scroll Progress Indicator */}
      <AnimatePresence>
        {showScrollProgress && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ willChange: 'opacity, transform' }}
          >
            {/* GPU-accelerated progress bar */}
            <motion.div
              className="h-1"
              style={{
                background: `linear-gradient(90deg, ${sectionColors.primary}, ${sectionColors.secondary}, ${sectionColors.tertiary})`,
                boxShadow: `0 0 20px ${sectionColors.primary}`,
                transformOrigin: 'left center',
                willChange: 'transform',
              }}
              animate={{
                scaleX: scrollData.scrollProgress,
              }}
              transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
            />
            
            {/* Optimized section markers */}
            <div className="absolute top-0 left-0 right-0 h-1 flex justify-between">
              {navSections.map((section, index) => {
                const isActive = scrollData.currentSection.toLowerCase() === section.toLowerCase();
                const progress = index / (navSections.length - 1);
                const isPassed = scrollData.scrollProgress > progress;
                
                return (
                  <motion.div
                    key={section}
                    className="relative flex flex-col items-center"
                    style={{ 
                      left: `${progress * 100}%`,
                      willChange: 'transform',
                    }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full border-2 -mt-1"
                      style={{
                        borderColor: sectionColors.primary,
                        backgroundColor: isPassed ? sectionColors.primary : 'transparent',
                        willChange: 'transform, background-color',
                      }}
                      animate={{
                        scale: isActive ? 1.4 : 1,
                        boxShadow: isPassed ? `0 0 12px ${sectionColors.primary}` : 'none',
                      }}
                      transition={springConfig}
                    />
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          className="text-xs font-mono mt-1 px-2 py-1 rounded whitespace-nowrap"
                          style={{
                            color: sectionColors.primary,
                            backgroundColor: 'rgba(10, 10, 15, 0.9)',
                            border: `1px solid ${sectionColors.primary}`,
                            textShadow: `0 0 8px ${sectionColors.primary}`,
                          }}
                          initial={{ opacity: 0, y: -8, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.8 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          {section}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-velocity glitch effect with GPU acceleration */}
      <AnimatePresence>
        {scrollData.scrollVelocity > 1.5 && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: Math.min(scrollData.scrollVelocity / 4, 0.25),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            style={{ willChange: 'opacity' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 3px,
                    ${sectionColors.primary}15 3px,
                    ${sectionColors.primary}15 5px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    ${sectionColors.secondary}08 2px,
                    ${sectionColors.secondary}08 4px
                  )
                `,
                mixBlendMode: 'screen',
                willChange: 'transform',
              }}
              animate={{
                x: [0, 2, -1, 3, 0],
                skewX: [0, 0.5, -0.3, 0.2, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Dynamic Particles with GPU acceleration */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: '2px',
                height: '2px',
                background: sectionColors.primary,
                boxShadow: `0 0 8px ${sectionColors.primary}`,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: particle.life * 0.8,
                scale: particle.life * 1.5,
                y: particle.y - (1 - particle.life) * 120,
                x: particle.x + (RANDOM_VALUES[particle.randomIndex] - 0.5) * 40,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Matrix Code Rain - optimized with reduced elements */}
      <AnimatePresence>
        {scrollData.scrollVelocity > 2.5 && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'opacity' }}
          >
            {Array.from({ length: 6 }, (_, index) => ( // Reduced from 8
              <motion.div
                key={index}
                className="absolute text-xs font-mono select-none"
                style={{
                  left: `${(index + 1) * 15}%`,
                  color: sectionColors.primary,
                  textShadow: `0 0 6px ${sectionColors.primary}`,
                  willChange: 'transform',
                }}
                animate={{
                  y: ['100vh', '-20vh'],
                }}
                transition={{
                  duration: RANDOM_VALUES[index * 10] * 1.5 + 1,
                  repeat: Infinity,
                  delay: RANDOM_VALUES[index * 5] * 1.5,
                  ease: 'linear',
                }}
              >
                {Array.from({ length: 12 }, (_, i) => ( // Reduced from 15
                  <div key={i} className="mb-2">
                    {MATRIX_CHARS[Math.floor(RANDOM_VALUES[(index * 12 + i) % RANDOM_VALUES.length] * 2)]}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized 3D Background Shapes */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating ring */}
        <motion.div
          className="absolute w-24 h-24 border border-white/10 rounded-full"
          style={{
            top: '20%',
            left: '15%',
            willChange: 'transform',
          }}
          animate={{
            x: scrollData.scrollY * -0.05,
            y: scrollData.scrollY * 0.03,
            rotate: scrollData.scrollY * 0.08,
            scale: 1 + (scrollData.scrollVelocity * 0.08),
          }}
          transition={springConfig}
        />
        
        {/* Triangle shape */}
        <motion.div
          className="absolute w-16 h-16 border border-white/8"
          style={{
            top: '65%',
            right: '20%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            willChange: 'transform',
          }}
          animate={{
            x: scrollData.scrollY * 0.08,
            y: scrollData.scrollY * -0.04,
            rotate: scrollData.scrollY * -0.06,
            skewX: scrollData.scrollVelocity * 1.5,
          }}
          transition={springConfig}
        />

        {/* Glowing square */}
        <motion.div
          className="absolute w-14 h-14 rounded-lg"
          style={{
            top: '80%',
            left: '75%',
            background: `${sectionColors.secondary}15`,
            border: `1px solid ${sectionColors.secondary}25`,
            boxShadow: `0 0 20px ${sectionColors.secondary}20`,
            willChange: 'transform',
          }}
          animate={{
            x: scrollData.scrollY * -0.12,
            y: scrollData.scrollY * 0.06,
            rotate: scrollData.scrollY * 0.1,
            scale: 1 + (scrollData.scrollVelocity * 0.04),
          }}
          transition={springConfig}
        />
      </div>

      {/* Optimized Section Transition Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        style={{ willChange: 'background' }}
        animate={{
          background: `
            radial-gradient(circle at 25% 25%, ${sectionColors.primary}12 0%, transparent 65%),
            radial-gradient(circle at 75% 75%, ${sectionColors.secondary}08 0%, transparent 65%),
            radial-gradient(circle at 50% 50%, ${sectionColors.tertiary}05 0%, transparent 65%)
          `,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* High-velocity scroll indicator */}
      <AnimatePresence>
        {scrollData.isScrolling && scrollData.scrollVelocity > 0.5 && (
          <motion.div
            className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 pointer-events-none"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 p-3 rounded-lg backdrop-blur-md"
              style={{
                background: 'rgba(10, 10, 15, 0.8)',
                border: `1px solid ${sectionColors.primary}40`,
                boxShadow: `0 8px 32px ${sectionColors.primary}20`,
              }}
            >
              <motion.div
                className="text-xs font-mono"
                style={{ color: sectionColors.primary }}
              >
                {scrollData.scrollDirection.toUpperCase()}
              </motion.div>
              <motion.div
                className="w-1 h-6 rounded-full"
                style={{ 
                  background: `linear-gradient(to top, ${sectionColors.primary}, ${sectionColors.secondary})`,
                  willChange: 'transform',
                }}
                animate={{
                  scaleY: Math.min(scrollData.scrollVelocity * 1.5, 2),
                  boxShadow: `0 0 ${8 + scrollData.scrollVelocity * 4}px ${sectionColors.primary}`,
                }}
                transition={{ type: 'tween', duration: 0.1 }}
              />
              <motion.div
                className="text-xs font-mono"
                style={{ color: sectionColors.secondary }}
              >
                {Math.round(scrollData.scrollProgress * 100)}%
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
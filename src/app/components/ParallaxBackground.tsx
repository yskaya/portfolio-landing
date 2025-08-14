import { m } from 'motion/react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import {
  GraphCyberCircuit,
  GraphDigitalMatrix,
  GraphCyberpunkHexagon,
} from '../graphs';

export function ParallaxBackground() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();

  // Calculate mouse movement effects
  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 100;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 100;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cyberpunk Circuit Grid Layer */}
      <GraphCyberCircuit
        scrollY={scrollY}
        mouseXPercent={mouseXPercent}
        mouseYPercent={mouseYPercent}
      />

      {/* Digital Matrix Pattern */}
      <GraphDigitalMatrix
        scrollY={scrollY}
        mouseXPercent={mouseXPercent}
        mouseYPercent={mouseYPercent}
      />

      {/* Floating Holographic Elements */}
      <m.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: `
            radial-gradient(circle, 
              rgba(0, 212, 255, 0.1) 0%, 
              rgba(255, 0, 110, 0.05) 50%, 
              transparent 100%
            )
          `,
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          transform: `translateY(${scrollY * -0.3}px)`,
          boxShadow: '0 0 100px rgba(0, 212, 255, 0.2)',
        }}
        animate={{
          x: mouseXPercent * 0.05,
          y: mouseYPercent * 0.03,
          rotate: mouseXPercent * 0.1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      />

      <m.div
        className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-lg"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(131, 56, 236, 0.1) 0%, 
              rgba(255, 0, 110, 0.1) 50%, 
              rgba(0, 212, 255, 0.1) 100%
            )
          `,
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(131, 56, 236, 0.3)',
          transform: `translateY(${scrollY * 0.2}px)`,
          boxShadow: '0 0 80px rgba(131, 56, 236, 0.2)',
        }}
        animate={{
          x: mouseXPercent * -0.04,
          y: mouseYPercent * -0.02,
          rotate: mouseXPercent * -0.05,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />

      <m.div
        className="absolute top-2/3 left-1/2 w-48 h-48"
        style={{
          background: `
            conic-gradient(from 0deg, 
              rgba(0, 255, 65, 0.1), 
              rgba(0, 212, 255, 0.1), 
              rgba(255, 0, 110, 0.1), 
              rgba(131, 56, 236, 0.1), 
              rgba(0, 255, 65, 0.1)
            )
          `,
          backdropFilter: 'blur(50px)',
          border: '1px solid rgba(0, 255, 65, 0.2)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          transform: `translateY(${scrollY * -0.25}px)`,
          boxShadow: '0 0 60px rgba(0, 255, 65, 0.3)',
        }}
        animate={{
          x: mouseXPercent * 0.03,
          y: mouseYPercent * 0.04,
          rotate: mouseXPercent * 0.15,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 30 }}
      />

      {/* Cyberpunk Hexagon Pattern */}
      <GraphCyberpunkHexagon
        scrollY={scrollY}
        mouseXPercent={mouseXPercent}
        mouseYPercent={mouseYPercent}
      />

      {/* Dynamic Light Rays */}
      <m.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 212, 255, 0.1) 0%, 
              rgba(255, 0, 110, 0.05) 40%, 
              transparent 70%
            )
          `,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Matrix Code Rain Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <m.div
            key={index}
            className="absolute text-xs opacity-20"
            style={{
              left: `${(index + 1) * 10}%`,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#00ff41',
              textShadow: '0 0 5px #00ff41',
            }}
            animate={{
              y: ['-100vh', '100vh'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-1">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </m.div>
        ))}
      </div>

      {/* Pulsing Energy Cores */}
      {Array.from({ length: 5 }).map((_, index) => (
        <m.div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 40}%`,
            background: index % 2 === 0 ? '#00d4ff' : '#ff006e',
            boxShadow: `0 0 20px ${index % 2 === 0 ? '#00d4ff' : '#ff006e'}`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}
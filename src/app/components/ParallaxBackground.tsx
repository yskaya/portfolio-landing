import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import { useMousePosition } from '../hooks/useMousePosition';

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate mouse movement effects
  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 100;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 100;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cyberpunk Circuit Grid Layer */}
      <m.div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 110, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 110, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
        }}
        animate={{
          x: mouseXPercent * 0.02,
          y: mouseYPercent * 0.02,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      {/* Digital Matrix Pattern */}
      <m.div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff41' fill-opacity='1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Cpath d='M15 15h30v30H15z' stroke='%2300ff41' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        animate={{
          x: mouseXPercent * -0.01,
          y: mouseYPercent * -0.01,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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
      <m.div
        className="absolute inset-0 opacity-5 mix-blend-screen"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='0.5'%3E%3Cpath d='M50 10 L75 30 L75 70 L50 90 L25 70 L25 30 Z'/%3E%3Cpath d='M50 25 L65 40 L65 60 L50 75 L35 60 L35 40 Z'/%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Cline x1='35' y1='35' x2='65' y2='65'/%3E%3Cline x1='35' y1='65' x2='65' y2='35'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        animate={{
          x: mouseXPercent * 0.01,
          y: mouseYPercent * 0.01,
          rotate: scrollY * 0.01,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
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
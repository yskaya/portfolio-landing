import { m } from 'motion/react';

interface AnimatedCyberHexagonProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function AnimatedCyberHexagon({ scrollY, mouseXPercent, mouseYPercent }: AnimatedCyberHexagonProps) {
  return (
    <m.div
      className="absolute inset-0 opacity-5 mix-blend-screen"
      style={{
        transform: `translateY(${scrollY * 0.05}px)`,
        backgroundImage: "url('/graphs/cyberpunk-hexagon.svg')",
        backgroundSize: '200px 200px',
      }}
      animate={{
        x: mouseXPercent * 0.01,
        y: mouseYPercent * 0.01,
        rotate: scrollY * 0.01,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    />
  );
}

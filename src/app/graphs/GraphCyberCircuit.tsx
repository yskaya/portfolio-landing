import { m } from 'motion/react';

interface GraphCyberCircuitProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function GraphCyberCircuit({ scrollY, mouseXPercent, mouseYPercent }: GraphCyberCircuitProps) {
  return (
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
  );
}

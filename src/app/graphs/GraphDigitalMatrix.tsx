import { m } from 'motion/react';

interface GraphDigitalMatrixProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function GraphDigitalMatrix({ scrollY, mouseXPercent, mouseYPercent }: GraphDigitalMatrixProps) {
  return (
    <m.div
      className="absolute inset-0 opacity-5"
      style={{
        transform: `translateY(${scrollY * -0.15}px)`,
        backgroundImage: "url('/graphs/digital-matrix.svg')",
        backgroundSize: '120px 120px',
      }}
      animate={{
        x: mouseXPercent * -0.01,
        y: mouseYPercent * -0.01,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  );
}

import { m } from 'motion/react';

interface AnimatedMatrixProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function AnimatedMatrix({ scrollY, mouseXPercent, mouseYPercent }: AnimatedMatrixProps) {
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

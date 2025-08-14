import { m } from 'motion/react';

interface GraphProjectDetailProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function GraphProjectDetail({ scrollY, mouseXPercent, mouseYPercent }: GraphProjectDetailProps) {
  return (
    <m.div
      className="absolute inset-0 opacity-5"
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
        backgroundImage: "url('/graphs/project-detail-bg.svg')",
        backgroundSize: '120px 120px',
      }}
      animate={{
        x: mouseXPercent * -1,
        y: mouseYPercent * -0.5,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  );
}

import { m } from 'motion/react';

interface AnimatedWorkHistoryProps {
  scrollY: number;
  mouseXPercent: number;
  mouseYPercent: number;
}

export function AnimatedWorkHistory({ scrollY, mouseXPercent, mouseYPercent }: AnimatedWorkHistoryProps) {
  return (
    <m.div
      className="absolute inset-0 opacity-5"
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
        backgroundImage: "url('/graphs/work-history-bg.svg')",
        backgroundSize: '120px 120px',
      }}
      animate={{
        x: mouseXPercent * -2,
        y: mouseYPercent * -1,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  );
}

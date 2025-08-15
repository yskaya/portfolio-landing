import { m } from 'motion/react';

export function BgPattern2() {
  return (
    <m.div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: "url('/graphs/project-detail-bg.svg')",
        backgroundSize: '120px 120px',
      }}
    />
  );
}

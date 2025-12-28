import { m } from 'motion/react';
import { MotionFadeIn } from './MotionFadeIn';

export const AnimatedHeadline = ({ as = 'h2', children }) => (
  <MotionFadeIn
    as={as}
    className="text-4xl md:text-5xl font-bold text-center mb-4 text-white relative holographic"
  >
    {children}

    <m.div
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-1"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      }}
      animate={{
        scaleX: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: 0.5,
      }}
    />
  </MotionFadeIn>
)
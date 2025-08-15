import { m } from 'motion/react';

export const GraphPulsingDots = () => (
    <>
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
    </>
)
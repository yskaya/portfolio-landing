import { m } from 'motion/react';

export const GraphMatrixRain = () => (
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
)
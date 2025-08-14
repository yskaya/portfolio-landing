import { m, HTMLMotionProps } from 'motion/react';

interface HoverGlowCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export function HoverGlowCard({
  children,
  className = '',
  whileHover: customHover,
  ...props
}: HoverGlowCardProps) {
  return (
    <m.div
      className={`cursor-pointer transition-all duration-300 ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 40px rgba(131, 56, 236, 0.3)',
        ...(customHover as object),
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}

export default HoverGlowCard;


import { m, HTMLMotionProps } from 'motion/react';

interface HoverGlowCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  color?: string;
}

export function HoverGlowCard({
  children,
  className = '',
  whileHover: customHover,
  color,
  onClick,
  ...props
}: HoverGlowCardProps) {
  return (
    <m.div
      className={`transition-all duration-100 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={{
        boxShadow: `0 0 40px ${color || 'rgba(131, 56, 236, 0.3)'}`,
        ...(customHover as object),
      }}
      style={{
        background: 'rgba(#fff, 0.02)',
        border: '1px solid rgba(#fff, 0.05)',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </m.div>
  );
}

export default HoverGlowCard;


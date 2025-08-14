"use client";

import type { ComponentType } from "react";
import { m, type MotionProps } from "motion/react";
import { cn } from "../ui/utils";

interface AnimatedIconProps extends MotionProps {
  icon: ComponentType<any>;
  className?: string;
  iconClassName?: string;
}

export function AnimatedIcon({
  icon: Icon,
  className,
  iconClassName,
  whileHover,
  transition,
  ...props
}: AnimatedIconProps) {
  return (
    <m.div
      className={cn("flex items-center justify-center", className)}
      whileHover={whileHover ?? { rotate: 360 }}
      transition={transition ?? { duration: 0.5 }}
      {...props}
    >
      <Icon className={cn(iconClassName)} />
    </m.div>
  );
}


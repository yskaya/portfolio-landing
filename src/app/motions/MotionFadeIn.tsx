"use client";
import { ComponentPropsWithoutRef, ElementType } from "react";
import { m } from "motion/react";

interface MotionFadeInProps<T extends ElementType = "div"> extends ComponentPropsWithoutRef<T> {
  as?: T;
  delay?: number;
}

export function MotionFadeIn<T extends ElementType = "div">({
  as,
  delay = 0,
  className,
  children,
  ...rest
}: MotionFadeInProps<T>) {
  const Component = (m as any)[as || "div"] as ElementType;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

export default function TiltCard({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [max, -max]);
  const ry = useTransform(mx, [0, 1], [-max, max]);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = ["#7c3aed", "#ec4899", "#fbbf24", "#10b981", "#f97316"];

export default function SparkCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    let counter = 0;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      counter++;
      if (counter % 3 === 0) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Main cursor dot */}
      {visible && (
        <motion.div
          className="fixed w-3 h-3 rounded-full pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            boxShadow: "0 0 12px rgba(124,58,237,0.5)",
          }}
        />
      )}

      {/* Sparkle trail */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() =>
            setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
          }
          style={{
            position: "fixed",
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: "50%",
            background: sparkle.color,
            boxShadow: `0 0 6px ${sparkle.color}`,
          }}
        />
      ))}
    </div>
  );
}

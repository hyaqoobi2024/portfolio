"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="animated-blob w-96 h-96 top-[-10%] right-[-5%]"
        style={{ background: "linear-gradient(135deg, #c084fc, #3b82f6)" }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="animated-blob w-80 h-80 bottom-[10%] left-[-5%]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #38bdf8)" }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="animated-blob w-64 h-64 top-[40%] left-[40%]"
        style={{ background: "linear-gradient(135deg, #fbbf24, #3b82f6)" }}
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -30, 10, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

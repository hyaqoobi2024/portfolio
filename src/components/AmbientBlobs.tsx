"use client";

import { motion } from "framer-motion";

export default function AmbientBlobs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-32 -right-20 w-[34rem] h-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.45), transparent 60%)",
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-32 w-[36rem] h-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(29,78,216,0.35), transparent 60%)",
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(125,211,252,0.28), transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

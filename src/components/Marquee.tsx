"use client";

import { motion } from "framer-motion";

interface Props {
  items: string[];
  speed?: number;
}

export default function Marquee({ items, speed = 30 }: Props) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-6 select-none">
      <motion.div
        className="flex whitespace-nowrap gap-10 text-4xl md:text-6xl font-black"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="text-sky-400">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

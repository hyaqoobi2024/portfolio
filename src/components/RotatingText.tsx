"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Dreamer",
  "Builder",
  "Scholar",
  "Leader",
  "Founder",
  "Changemaker",
  "Visionary",
];

const colors = [
  "from-purple-500 to-violet-600",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-fuchsia-500 to-pink-500",
  "from-violet-500 to-purple-600",
];

export default function RotatingText({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`inline-block relative ${className}`} style={{ minWidth: "180px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 30, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -30, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`inline-block bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

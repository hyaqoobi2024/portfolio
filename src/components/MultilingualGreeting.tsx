"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "Salam",
  "Bunjo",
  "Ola",
  "Merhaba",
  "Namaste",
];

const colors = [
  "from-purple-500 to-violet-600",
  "from-blue-500 to-sky-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-indigo-500 to-blue-500",
];

export default function MultilingualGreeting({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className={`inline-block relative ${className}`}
      style={{ minWidth: "180px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={greetings[index]}
          initial={{ y: 30, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -30, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`inline-block bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent`}
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  greetings: { text: string; language: string }[];
  intervalMs?: number;
}

export default function MultilingualHello({ greetings, intervalMs = 2000 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (greetings.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % greetings.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [greetings.length, intervalMs]);

  if (greetings.length === 0) return null;

  const current = greetings[index];

  return (
    <div className="relative h-[1.1em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${current.language}-${index}`}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="block"
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

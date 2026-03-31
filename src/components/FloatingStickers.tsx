"use client";

import { motion } from "framer-motion";

const stickers = [
  { emoji: "✨", x: "8%", y: "15%", size: "text-3xl", delay: 0.5, duration: 3 },
  { emoji: "🌍", x: "85%", y: "25%", size: "text-4xl", delay: 1, duration: 4 },
  { emoji: "🧠", x: "12%", y: "70%", size: "text-3xl", delay: 1.5, duration: 3.5 },
  { emoji: "🚀", x: "88%", y: "65%", size: "text-3xl", delay: 0.8, duration: 4.5 },
  { emoji: "⭐", x: "20%", y: "35%", size: "text-2xl", delay: 2, duration: 3 },
  { emoji: "💡", x: "78%", y: "80%", size: "text-2xl", delay: 1.2, duration: 5 },
  { emoji: "📚", x: "5%", y: "50%", size: "text-2xl", delay: 0.3, duration: 4 },
  { emoji: "🎯", x: "92%", y: "45%", size: "text-2xl", delay: 1.8, duration: 3.5 },
  { emoji: "💜", x: "50%", y: "10%", size: "text-xl", delay: 2.5, duration: 4 },
  { emoji: "🌟", x: "40%", y: "85%", size: "text-2xl", delay: 0.6, duration: 3 },
];

export default function FloatingStickers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {stickers.map((sticker, i) => (
        <motion.div
          key={i}
          className={`absolute ${sticker.size}`}
          style={{ left: sticker.x, top: sticker.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
            scale: [0, 1, 0.9, 1],
            y: [0, -15, 5, -10, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            delay: sticker.delay,
            duration: sticker.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </div>
  );
}

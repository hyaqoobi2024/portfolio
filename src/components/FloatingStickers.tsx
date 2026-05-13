"use client";

import { motion } from "framer-motion";

// Subtle sparkle accents — quiet enough not to fight with content.
const stickers = [
  { emoji: "✨", x: "6%", y: "18%", size: "text-2xl", delay: 0.4, duration: 5, opacity: 0.35 },
  { emoji: "✦", x: "92%", y: "30%", size: "text-xl", delay: 1.2, duration: 6, opacity: 0.25 },
  { emoji: "✨", x: "10%", y: "75%", size: "text-xl", delay: 0.8, duration: 5.5, opacity: 0.3 },
  { emoji: "✦", x: "90%", y: "78%", size: "text-2xl", delay: 1.8, duration: 6.5, opacity: 0.3 },
];

export default function FloatingStickers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {stickers.map((sticker, i) => (
        <motion.div
          key={i}
          className={`absolute ${sticker.size} text-purple-300`}
          style={{ left: sticker.x, top: sticker.y, opacity: sticker.opacity }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, sticker.opacity, sticker.opacity * 0.6, sticker.opacity],
            scale: [0, 1, 0.95, 1],
            y: [0, -10, 5, 0],
            rotate: [0, 8, -8, 0],
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

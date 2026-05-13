"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
  eyebrow?: string;
  caption?: string;
  /** Accent gradient — pick the tone per section. */
  accent?: "purple" | "pink" | "amber" | "sky";
}

const ACCENTS = {
  purple: {
    glow: "rgba(168,85,247,0.5)",
    button: "from-purple-500 to-blue-500",
    text: "text-purple-200",
    ring: "ring-purple-200",
  },
  pink: {
    glow: "rgba(59, 130, 246,0.5)",
    button: "from-blue-500 to-sky-500",
    text: "text-blue-200",
    ring: "ring-blue-200",
  },
  amber: {
    glow: "rgba(245,158,11,0.5)",
    button: "from-amber-500 to-orange-500",
    text: "text-amber-200",
    ring: "ring-amber-200",
  },
  sky: {
    glow: "rgba(56,189,248,0.5)",
    button: "from-sky-500 to-blue-500",
    text: "text-sky-200",
    ring: "ring-sky-200",
  },
};

export default function VideoFrame({
  youtubeId,
  title,
  eyebrow,
  caption,
  accent = "purple",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const tone = ACCENTS[accent];
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Halo glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${tone.glow}, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div
        className={`relative rounded-3xl overflow-hidden shadow-[0_40px_100px_-25px_rgba(124,58,237,0.5)] ring-2 ${tone.ring}`}
      >
        <div className="relative aspect-video bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0"
              aria-label={`Play ${title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/40" />

              {/* Play button */}
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="relative">
                  <span
                    className="absolute inset-0 rounded-full opacity-60 animate-ping"
                    style={{ background: tone.glow }}
                  />
                  <span
                    className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${tone.button} text-white flex items-center justify-center shadow-2xl ring-4 ring-white/40`}
                  >
                    <Play className="w-9 h-9 md:w-12 md:h-12 ml-1.5 fill-current" />
                  </span>
                </span>
              </motion.span>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 md:pb-8 pt-16 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                {eyebrow && (
                  <p
                    className={`text-[10px] uppercase tracking-[0.3em] ${tone.text} font-bold mb-2 inline-flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {eyebrow}
                  </p>
                )}
                <h3 className="text-white text-xl md:text-3xl font-black leading-tight max-w-2xl">
                  {title}
                </h3>
                {caption && (
                  <p className="text-white/80 mt-1 text-sm max-w-xl">
                    {caption}
                  </p>
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

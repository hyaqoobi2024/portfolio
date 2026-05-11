"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, type ReactNode } from "react";

interface Props {
  youtubeId: string;
  title: string;
  eyebrow?: string;
  caption?: string;
  extra?: ReactNode;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CinemaFrame({
  youtubeId,
  title,
  eyebrow,
  caption,
  extra,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="relative">
      {/* Stage spotlight glows */}
      <div className="absolute inset-x-0 -top-20 h-[110%] pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[1200px] h-[700px] bg-gradient-radial from-sky-400/30 via-blue-500/10 to-transparent blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(56,189,248,0.30), rgba(29,78,216,0.10) 35%, transparent 60%)",
          }}
        />
      </div>

      {/* Floating dust motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-sky-200/40 rounded-full"
            style={{
              left: `${15 + i * 13}%`,
              top: `${20 + (i * 17) % 60}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 6 + i,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Outer halo glow */}
        <div
          className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-70"
          style={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(29,78,216,0.15), rgba(56,189,248,0.25))",
          }}
        />

        {/* Frame body */}
        <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]">
          {/* Top bezel */}
          <div className="bg-gradient-to-b from-black/60 to-transparent px-6 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 absolute top-0 left-0 right-0 z-10">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live recording
            </span>
            {eyebrow && <span>{eyebrow}</span>}
          </div>

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

                {/* Cinematic vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
                  }}
                />

                {/* Play button */}
                <motion.span
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="absolute inset-0 flex items-center justify-center"
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                >
                  <span className="relative">
                    <span
                      className="absolute inset-0 rounded-full bg-white/20 blur-md"
                      style={{ transform: "scale(1.8)" }}
                    />
                    <span className="absolute inset-0 rounded-full bg-white/15 animate-ping" />
                    <span className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur text-blue-950 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white">
                      <Play className="w-9 h-9 md:w-10 md:h-10 ml-1 fill-current" />
                    </span>
                  </span>
                </motion.span>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 md:pb-8 pt-16 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-sky-300 font-mono mb-2">
                        {eyebrow || "Feature"}
                      </p>
                      <h3 className="text-white text-2xl md:text-3xl font-black leading-tight max-w-2xl">
                        {title}
                      </h3>
                      {caption && (
                        <p className="text-white/70 mt-1 text-sm max-w-xl">
                          {caption}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-xs text-white/40 hidden md:block whitespace-nowrap">
                      ▶ Press to play
                    </span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Corner brackets */}
        <span className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-sky-400/70 rounded-tl-2xl pointer-events-none" />
        <span className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-sky-400/70 rounded-tr-2xl pointer-events-none" />
        <span className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-sky-400/70 rounded-bl-2xl pointer-events-none" />
        <span className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-sky-400/70 rounded-br-2xl pointer-events-none" />

        {extra}
      </motion.div>

      {/* Stage floor reflection */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-gradient-to-b from-sky-400/15 to-transparent blur-2xl rounded-full" />
    </div>
  );
}

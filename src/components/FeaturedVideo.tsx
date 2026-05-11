"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
  description?: string;
  eyebrow?: string;
  thumbnail?: string;
}

export default function FeaturedVideo({
  youtubeId,
  title,
  description,
  eyebrow,
  thumbnail,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-blue-950/10 bg-black">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/70 via-blue-950/20 to-transparent" />
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                <span className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-blue-950 flex items-center justify-center shadow-2xl">
                  <Play className="w-9 h-9 md:w-10 md:h-10 ml-1 fill-current" />
                </span>
              </span>
            </motion.span>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
              {eyebrow && (
                <p className="text-xs uppercase tracking-[0.2em] text-sky-300 mb-1 font-semibold">
                  {eyebrow}
                </p>
              )}
              <h3 className="text-white text-2xl md:text-4xl font-black leading-tight max-w-3xl">
                {title}
              </h3>
              {description && (
                <p className="text-blue-100 mt-2 max-w-2xl text-sm md:text-base">
                  {description}
                </p>
              )}
            </div>
          </button>
        )}
      </div>
    </motion.div>
  );
}

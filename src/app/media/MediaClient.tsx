"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import CinemaFrame from "@/components/CinemaFrame";
import { Mic, Play, Sparkles } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  youtubeUrl: string | null;
  image: string | null;
  description: string;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

export default function MediaClient({ items }: { items: MediaItem[] }) {
  const videos = items.filter((m) => m.type === "Video" && m.youtubeUrl);
  const speech =
    videos.find((v) => /speech|assembly|speaking/i.test(v.title)) ?? videos[0] ?? null;
  const otherVideos = videos.filter((v) => v.id !== speech?.id);
  const photos = items.filter((m) => m.type !== "Video");
  const speechId = speech?.youtubeUrl
    ? extractYouTubeId(speech.youtubeUrl)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* HERO with speech (cinema) */}
      <section className="relative bg-gradient-to-b from-blue-950 via-[#040a1f] to-blue-950 text-white overflow-hidden pt-20 md:pt-28 pb-32 md:pb-40">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="section-container max-w-6xl relative">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-sky-300 font-mono mb-5">
              <Mic className="w-3.5 h-3.5" />{" "}
              <Reveal type="mask">On stage</Reveal>
            </p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-6">
              <Reveal type="mask" delay={0.1}>Media.</Reveal>
            </h1>
            <div className="max-w-2xl mx-auto text-lg text-blue-100/80">
              <WordReveal
                text="Animation, speeches, and the moments worth holding on to."
                delay={0.4}
                staggerMs={40}
              />
            </div>
          </div>

          {speech && speechId && (
            <CinemaFrame
              youtubeId={speechId}
              title={speech.title}
              eyebrow="Assembly speech"
              caption={speech.description}
            />
          )}
        </div>
      </section>

      {/* OTHER VIDEOS */}
      {otherVideos.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="section-container max-w-6xl">
            <header className="flex items-baseline justify-between gap-4 mb-10 pb-4 border-b border-blue-950/10">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
                Reels
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
                {otherVideos.length} video{otherVideos.length === 1 ? "" : "s"}
              </p>
            </header>
            <div className="grid md:grid-cols-2 gap-px bg-blue-950/10 rounded-3xl overflow-hidden border border-blue-950/10">
              {otherVideos.map((v, i) => {
                const id = extractYouTubeId(v.youtubeUrl!);
                if (!id) return null;
                return (
                  <Reveal key={v.id} type="rise" delay={i * 0.08}>
                    <VideoCard youtubeId={id} item={v} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PHOTOS */}
      {photos.length > 0 && (
        <section className="py-20 md:py-24 border-t border-blue-950/10">
          <div className="section-container max-w-6xl">
            <header className="flex items-baseline justify-between gap-4 mb-10 pb-4 border-b border-blue-950/10">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
                Photos &amp; posters
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
                {photos.length} item{photos.length === 1 ? "" : "s"}
              </p>
            </header>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-blue-950/10 rounded-3xl overflow-hidden border border-blue-950/10">
              {photos.map((p, i) => (
                <Reveal key={p.id} type="rise" delay={i * 0.05}>
                  <article className="bg-white p-5 h-full hover:bg-blue-50/40 transition-colors group">
                    <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100 mb-4">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-serif italic text-blue-300">
                            {p.title[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-1">
                      {p.type}
                    </p>
                    <h3 className="font-bold text-blue-950">{p.title}</h3>
                    {p.description && (
                      <p className="text-sm text-blue-950/60 mt-1">
                        {p.description}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {items.length === 0 && (
        <section className="py-24">
          <div className="section-container text-center text-gray-500">
            <p>No media yet — check back soon.</p>
          </div>
        </section>
      )}
    </div>
  );
}

function VideoCard({
  youtubeId,
  item,
}: {
  youtubeId: string;
  item: MediaItem;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <article className="bg-white p-5 h-full hover:bg-blue-50/40 transition-colors group">
      <div className="relative aspect-video bg-black overflow-hidden rounded-2xl mb-4">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0"
            aria-label={`Play ${item.title}`}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/60 via-blue-950/10 to-transparent" />
            <motion.span
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="w-16 h-16 rounded-full bg-white/95 backdrop-blur text-blue-950 flex items-center justify-center shadow-2xl ring-1 ring-white">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </span>
            </motion.span>
          </button>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-1">
        {item.type}
      </p>
      <h3 className="text-xl font-bold text-blue-950">{item.title}</h3>
      {item.description && (
        <p className="text-sm text-blue-950/60 mt-1">{item.description}</p>
      )}
    </article>
  );
}

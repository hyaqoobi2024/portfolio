"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, Mic, Newspaper, Radio } from "lucide-react";
import VideoFrame from "@/components/VideoFrame";

interface FeatureItem {
  outlet: string;
  date: string;
  title: string;
  description: string;
  link: string;
  type: "video" | "article" | "radio";
  accent: "purple" | "pink" | "amber" | "sky";
}

const features: FeatureItem[] = [
  {
    outlet: "Check News",
    date: "2024",
    title:
      "Victoria student from Afghanistan makes waves for project on women's repression, education",
    description:
      "Local TV feature on Sahar's advocacy for Afghan girls' education.",
    link:
      "https://cheknews.ca/victoria-student-from-afghanistan-makes-waves-for-project-on-womens-repression-education-1323261/",
    type: "article",
    accent: "pink",
  },
  {
    outlet: "CBC Radio",
    date: "2024",
    title: "CBC Radio interview",
    description: "Sahar joins CBC to talk about her journey and AlphaSeekers.",
    link: "https://www.cbc.ca/player/play/audio/9.7171253",
    type: "radio",
    accent: "purple",
  },
];

const typeIcon = { video: Mic, article: Newspaper, radio: Radio };

export default function InterviewsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 left-1/3 w-[44rem] h-[44rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="handwriting text-2xl md:text-3xl text-blue-500 mb-3"
            >
              in the press ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black gradient-text leading-[0.92] mb-6"
            >
              Media.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              The speech. The animation. The interviews. Every place my story
              has shown up.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:flex justify-end"
          >
            <span className="text-[10rem] xl:text-[14rem] leading-none">🎙️</span>
          </motion.div>
        </div>
      </section>

      {/* SPEECH */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-b from-transparent via-purple-950 to-purple-950 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246,0.4), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-center mb-10">
            <div>
              <p className="handwriting text-2xl md:text-3xl text-blue-300 mb-3">
                the speech ✨
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
                Standing up{" "}
                <span className="bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent">
                  for girls&apos; education.
                </span>
              </h2>
              <p className="text-blue-100/80">
                Sahar&apos;s assembly speech — advocating through speaking,
                AlphaSeekers, service, and art.
              </p>
            </div>
            <VideoFrame
              youtubeId="mHI0sHsBbPU"
              title="Standing up for girls' education"
              eyebrow="Assembly speech · GNS"
              accent="pink"
            />
          </div>
        </div>
      </section>

      {/* ANIMATION */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-b from-purple-950 via-blue-950 to-blue-950 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/3 right-0 w-[36rem] h-[36rem] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.4), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-center">
            <VideoFrame
              youtubeId="P3fLffVB0YA"
              title="Animation"
              eyebrow="Original work"
              accent="sky"
            />
            <div className="order-first lg:order-last">
              <p className="handwriting text-2xl md:text-3xl text-sky-300 mb-3">
                hand-drawn ✨
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
                Animation,{" "}
                <span className="bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                  in her own hand.
                </span>
              </h2>
              <p className="text-blue-100/80">
                A story drawn, animated, and brought to life — frame by frame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERVIEWS */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-950 via-purple-100/60 to-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl"
          >
            <p className="handwriting text-2xl md:text-3xl text-purple-500 mb-3">
              interviews ✨
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Conversations <span className="gradient-text">in the press.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = typeIcon[f.type];
              const accent =
                f.accent === "pink"
                  ? "from-blue-500 to-sky-500"
                  : f.accent === "purple"
                  ? "from-purple-500 to-indigo-500"
                  : f.accent === "amber"
                  ? "from-amber-500 to-orange-500"
                  : "from-sky-500 to-blue-500";
              return (
                <motion.a
                  key={f.title}
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl bg-white shadow-xl border border-purple-100 overflow-hidden block group"
                >
                  <div className={`h-2 bg-gradient-to-r ${accent}`} />
                  <div className="p-7 lg:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${accent} text-white text-xs font-bold uppercase tracking-[0.15em]`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {f.outlet}
                      </div>
                      <span className="text-xs text-gray-400 inline-flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" /> {f.date}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-black mb-3 leading-tight group-hover:text-purple-600 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {f.description}
                    </p>
                    <span className="text-sm font-bold text-purple-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read / listen{" "}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* YOUTUBE SUBSCRIBE CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.a
            href="https://www.youtube.com/@SaharVerse-1111"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -4 }}
            className="relative block rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-red-600 via-sky-600 to-blue-600 p-10 md:p-14 text-white shadow-2xl group"
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl"
            />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </div>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3">
                  More on{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-blue-100 to-amber-200 bg-clip-text text-transparent">
                    @SaharVerse-1111
                  </span>
                </h2>
                <p className="text-lg text-sky-50/90 max-w-xl">
                  Animation, speeches, and behind-the-scenes — all on her
                  channel.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-red-600 font-black text-base shadow-xl group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe
              </div>
            </div>
          </motion.a>
        </div>
      </section>
    </>
  );
}

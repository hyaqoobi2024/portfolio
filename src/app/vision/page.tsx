"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Heart, Globe, Mic, Palette, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const beliefs = [
  {
    emoji: "📖",
    icon: Globe,
    title: "Education is the lever.",
    desc: "Where you're born shouldn't decide what you get to learn. I'm building so that every Afghan girl who wants a classroom has one.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50 border-purple-200",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    emoji: "🎙️",
    icon: Mic,
    title: "Stories travel further than statistics.",
    desc: "A speech, a video, a drawing — the right story can land where a number can't. So I tell them. Every chance I get.",
    color: "from-blue-500 to-sky-600",
    bg: "bg-blue-50 border-blue-200",
    glow: "rgba(37, 99, 235, 0.2)",
  },
  {
    emoji: "🎨",
    icon: Palette,
    title: "Art belongs in advocacy.",
    desc: "Animation, writing, drawing — they aren't a break from the work. They're the work. They reach people speeches can't.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 border-amber-200",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function VisionPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 right-0 w-[44rem] h-[44rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-20 w-[40rem] h-[40rem] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="handwriting text-2xl md:text-3xl text-blue-500 mb-3"
            >
              what i&apos;m building ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black gradient-text leading-[0.92] mb-6"
            >
              My Vision.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              Three things I work on every day — and the reasons every single
              one matters.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:flex justify-end"
          >
            <motion.span
              className="text-[10rem] xl:text-[14rem] leading-none"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🌅
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
              >
                <TiltCard glowColor={b.glow}>
                  <div
                    className={`glass-card p-8 lg:p-10 ${b.bg} border h-full flex flex-col`}
                  >
                    <motion.span
                      className="text-5xl mb-6"
                      animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {b.emoji}
                    </motion.span>
                    <h2 className="text-2xl lg:text-3xl font-black mb-4 leading-tight">
                      {b.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {b.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE / CLOSER */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-sky-500 p-10 md:p-16 text-center text-white shadow-2xl"
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl"
            />

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-6 relative inline-block"
            >
              💜
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight max-w-3xl mx-auto relative">
              The next chapter is{" "}
              <span className="bg-gradient-to-r from-amber-200 via-blue-100 to-amber-200 bg-clip-text text-transparent">
                louder.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-blue-50/90 max-w-2xl mx-auto mb-8 relative">
              I&apos;m not done. I&apos;m just early.
            </p>
            <Link
              href="/alpha-seekers"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-700 font-bold hover:bg-amber-50 hover:scale-105 transition-all shadow-xl"
            >
              See what I&apos;m building <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

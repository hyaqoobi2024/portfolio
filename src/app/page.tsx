"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mic,
  Sparkles,
  Palette,
  Trophy,
  Pencil,
  Film,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";
import FloatingStickers from "@/components/FloatingStickers";
import TiltCard from "@/components/TiltCard";
import MultilingualGreeting from "@/components/MultilingualGreeting";
import VideoFrame from "@/components/VideoFrame";

const skills = [
  { name: "Animation", icon: Film, color: "from-blue-500 to-sky-500" },
  { name: "Writing", icon: Pencil, color: "from-purple-500 to-indigo-500" },
  { name: "Drawing", icon: Palette, color: "from-amber-500 to-orange-500" },
  { name: "Public Speaking", icon: Mic, color: "from-sky-500 to-cyan-500" },
  { name: "Leadership", icon: Sparkles, color: "from-indigo-500 to-blue-500" },
  { name: "Soccer", icon: Trophy, color: "from-emerald-500 to-teal-500" },
];

const highlights = [
  {
    emoji: "🎓",
    title: "WLOT Scholar",
    desc: "IB Diploma at GNS, Canada",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    emoji: "🚀",
    title: "Co-founded Alpha Seekers",
    desc: "Teaching Afghan students worldwide",
    color: "from-blue-500 to-sky-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    glow: "rgba(37, 99, 235, 0.2)",
  },
  {
    emoji: "🎙️",
    title: "On the mic",
    desc: "Speaking up for girls' education",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  return (
    <>
      {/* ─── HERO — asymmetric split, full width ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] overflow-hidden"
      >
        {/* Background gradient blobs for energy */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-20 w-[44rem] h-[44rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(192,132,252,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 w-[40rem] h-[40rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at 60% 50%, rgba(59, 130, 246,0.45), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.15, 1], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.45), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <FloatingStickers />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center min-h-[88vh]"
        >
          {/* LEFT — content */}
          <div className="order-2 lg:order-1">
            {/* Rotating greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6"
            >
              <p className="handwriting text-3xl md:text-4xl leading-none">
                <MultilingualGreeting />
                <span className="text-purple-600">,</span>
              </p>
            </motion.div>

            {/* Big name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] font-black gradient-text leading-[0.92] tracking-tight mb-6"
            >
              I&apos;m Sahar.
            </motion.h1>

            {/* Inventory paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl"
            >
              Co-founder of{" "}
              <span className="font-semibold text-purple-600">
                Alpha Seekers Network
              </span>
              . WLOT scholar at GNS. Animator. Public speaker. Educator with two
              classrooms behind me and over a thousand hours of service. From
              Afghanistan to Canada — and onto bigger stages, every year.{" "}
              <span className="font-bold text-blue-600">
                The next chapter is louder.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/interviews"
                className="btn-primary group"
              >
                <Play className="w-4 h-4 fill-current" /> Watch the speech
              </Link>
              <Link href="/journey" className="btn-outline group">
                My journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Sticker badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "🎓 IB Student",
                "🏆 WLOT Scholar",
                "🚀 Founder",
                "🎙️ Speaker",
                "🎨 Animator",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.9 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  className="sticker-badge cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — photo bleeds toward the edge */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-[520px] mx-auto lg:max-w-none lg:w-auto">
              {/* Soft glow */}
              <div
                aria-hidden
                className="absolute -inset-6 lg:-inset-12 rounded-[3rem] opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 60% at 40% 40%, rgba(192,132,252,0.55), transparent 65%), radial-gradient(60% 60% at 70% 70%, rgba(59, 130, 246,0.5), transparent 65%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Photo frame */}
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-white shadow-[0_40px_100px_-30px_rgba(124,58,237,0.5)] ring-1 ring-purple-100 rotate-[2deg]"
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Sahar Nikzad"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "55% 30%" }}
                  sizes="(max-width: 1024px) 520px, 50vw"
                  priority
                />
              </motion.div>

              {/* Floating sticker — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 8 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="absolute -top-4 -right-2 lg:-right-6 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-purple-100"
              >
                <p className="handwriting text-xl md:text-2xl text-purple-600 leading-none">
                  storyteller ✨
                </p>
              </motion.div>

              {/* Floating sticker — bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{
                  delay: 1.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="absolute -bottom-3 -left-2 lg:-left-4 bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4 py-2.5 rounded-2xl shadow-xl"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold opacity-90 mb-0.5">
                  Currently
                </p>
                <p className="text-sm font-bold leading-tight">
                  Building AlphaSeekers
                </p>
              </motion.div>

              {/* Decorative sparkle */}
              <motion.span
                aria-hidden
                className="absolute top-1/3 -left-6 text-3xl select-none hidden lg:block"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── HIGHLIGHT BAND ─── */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <TiltCard className="h-full" glowColor={item.glow}>
                  <div
                    className={`glass-card p-7 ${item.bg} border ${item.border} h-full flex items-start gap-4`}
                  >
                    <motion.span
                      className="text-4xl shrink-0"
                      whileHover={{ scale: 1.2, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.emoji}
                    </motion.span>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS — animated icon row ─── */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <p className="handwriting text-2xl md:text-3xl text-purple-500 mb-3">
              what i do ✨
            </p>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.05]">
              Curious{" "}
              <span className="gradient-text">in a lot of ways.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl bg-white border border-purple-100 flex flex-col items-center justify-center gap-3 p-4 shadow-sm group-hover:shadow-xl group-hover:border-purple-300 transition-all">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}
                    animate={{
                      y: [0, -4, 0],
                      rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    <s.icon className="w-7 h-7" strokeWidth={1.8} />
                  </motion.div>
                  <p className="font-bold text-sm text-center text-gray-800">
                    {s.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOMENTS ─── */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-purple-50/40 via-blue-50/30 to-transparent">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <p className="handwriting text-2xl md:text-3xl text-blue-500 mb-3">
              in the moment ✨
            </p>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.05]">
              On stage.{" "}
              <span className="gradient-text">With my people.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl"
            >
              <Image
                src="/images/ms-remembrance-30.jpg"
                alt="Sahar speaking at GNS"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-200 font-bold mb-2 inline-flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5" /> On stage · GNS
                </p>
                <h3 className="text-2xl lg:text-3xl font-black leading-tight">
                  Speaking at the assembly.
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl"
            >
              <Image
                src="/images/other-photo.jpg"
                alt="Sahar with the Solh team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200 font-bold mb-2 inline-flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-current" /> With the Solh team
                </p>
                <h3 className="text-2xl lg:text-3xl font-black leading-tight">
                  Showing up.
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED SPEECH ─── */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-transparent via-purple-950 to-purple-950 text-white overflow-hidden">
        {/* Decorative cosmic glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246,0.4), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center mb-12">
            <div>
              <p className="handwriting text-2xl md:text-3xl text-blue-300 mb-3">
                watch the speech ✨
              </p>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-4">
                Standing up{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
                  for girls&apos; education.
                </span>
              </h2>
              <p className="text-blue-100/80 max-w-md">
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

      {/* ─── ANIMATION SHOWCASE ─── */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-purple-950 via-blue-950 to-blue-950 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/3 right-0 w-[36rem] h-[36rem] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16 items-center">
            <VideoFrame
              youtubeId="P3fLffVB0YA"
              title="Animation"
              eyebrow="Original work"
              accent="sky"
            />
            <div className="order-first lg:order-last">
              <p className="handwriting text-2xl md:text-3xl text-sky-300 mb-3">
                making moving pictures ✨
              </p>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-4">
                Animation,{" "}
                <span className="bg-gradient-to-r from-sky-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                  in her own hand.
                </span>
              </h2>
              <p className="text-blue-100/80 max-w-md">
                Stories Sahar drew, animated, and brought to life — frame by
                frame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ALPHA SEEKERS SPOTLIGHT ─── */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-sky-500 p-10 lg:p-16 text-white shadow-2xl"
          >
            {/* Decorative blobs */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl"
            />

            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <motion.span
                  className="text-5xl mb-6 block"
                  animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.span>
                <p className="text-sm font-mono uppercase tracking-[0.25em] text-blue-100 mb-4">
                  My initiative
                </p>
                <h2 className="text-4xl lg:text-6xl font-black mb-5 leading-[1.02]">
                  Alpha Seekers Network.
                </h2>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-xl">
                  I co-founded Alpha Seekers to create a learning community for
                  ambitious students — especially those from Afghanistan.
                  Education is the most powerful tool for change, and every
                  student deserves access.
                </p>
                <Link
                  href="/alpha-seekers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-700 font-bold hover:bg-amber-50 hover:scale-105 transition-all shadow-xl"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="hidden lg:flex justify-center">
                <motion.div
                  className="text-[10rem] xl:text-[12rem] leading-none"
                  animate={{ rotate: [0, 6, -3, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}

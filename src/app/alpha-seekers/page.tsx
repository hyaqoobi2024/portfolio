"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Users,
  BookOpen,
  Globe,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

const features = [
  {
    icon: Users,
    title: "A growing community",
    desc: "Students supporting students — across borders.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50 border-purple-200",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    icon: BookOpen,
    title: "Bilingual learning",
    desc: "Resources in the languages students actually use.",
    color: "from-blue-500 to-sky-600",
    bg: "bg-blue-50 border-blue-200",
    glow: "rgba(37, 99, 235, 0.2)",
  },
  {
    icon: Globe,
    title: "Built for Afghan students",
    desc: "Made by people who know what's at stake.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 border-amber-200",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function AlphaSeekersPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-32 w-[44rem] h-[44rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(192,132,252,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 w-[40rem] h-[40rem] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="handwriting text-2xl md:text-3xl text-purple-500 mb-3"
            >
              my initiative ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[7rem] font-black gradient-text leading-[0.92] mb-6"
            >
              Alpha Seekers Network.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl"
            >
              A learning platform I co-founded for ambitious Afghan students.
              Built by students, for students — bilingual, free, and growing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://alphaseekers.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit the platform <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/contact" className="btn-outline">
                Get involved <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.div
              className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-sky-500 flex items-center justify-center shadow-[0_40px_100px_-25px_rgba(168,85,247,0.6)]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="text-9xl lg:text-[10rem]"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.span>
            </motion.div>
            <motion.span
              aria-hidden
              className="absolute top-0 right-4 text-3xl"
              animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute bottom-4 left-0 text-2xl"
              animate={{ y: [0, 8, 0], rotate: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              ✦
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* MISSION CARD */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 lg:p-14 bg-gradient-to-br from-purple-50 via-blue-50 to-amber-50 border-purple-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                <Rocket className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-600 font-bold mb-1">
                  Why it exists
                </p>
                <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                  The bridge I wish I&apos;d had.
                </h2>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl">
              When I got the chance to study in Canada, I realized how many
              talented students back home would never get the same opportunity
              — not because they lacked ability, but because they lacked access.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Alpha Seekers is my way of building that bridge. Bilingual
              courses, mentorship, and a community that believes in every
              student&apos;s potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl"
          >
            <p className="handwriting text-2xl md:text-3xl text-blue-500 mb-3">
              what we&apos;re building
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Three pillars,{" "}
              <span className="gradient-text">one network.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard glowColor={f.glow}>
                  <div className={`glass-card p-8 ${f.bg} border h-full`}>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-lg mb-5`}
                    >
                      <f.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black mb-2">{f.title}</h3>
                    <p className="text-gray-700">{f.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-sky-500 p-10 md:p-16 text-white text-center shadow-2xl"
          >
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-amber-200" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight max-w-2xl mx-auto">
              Want to build with us?
            </h2>
            <p className="text-lg text-blue-50/90 mb-8 max-w-xl mx-auto">
              Students, mentors, partners — anyone who believes education is
              the bridge.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://alphaseekers.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-700 font-bold hover:bg-amber-50 hover:scale-105 transition-all shadow-xl"
              >
                Visit Alpha Seekers <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-all"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, BookOpen, Plane, MapPin, Lightbulb, Star, Mic } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const milestones = [
  {
    emoji: "🇦🇫",
    icon: Heart,
    year: "Early years",
    title: "Where it all began",
    desc: "I grew up between Iran and Afghanistan. Curiosity and resilience became my superpowers early on.",
    color: "bg-sky-50 border-sky-200",
    glow: "rgba(244, 63, 94, 0.18)",
    accent: "text-sky-500",
  },
  {
    emoji: "📚",
    icon: BookOpen,
    year: "Grade school",
    title: "Top of my class in Kabul",
    desc: "At Kelid-e-Nejat High School, I found my element — ranking at the top, competing in seminars, singing in performances, building my best memories.",
    color: "bg-blue-50 border-blue-200",
    glow: "rgba(59, 130, 246, 0.18)",
    accent: "text-blue-500",
  },
  {
    emoji: "⚡",
    icon: Lightbulb,
    year: "A turning point",
    title: "Cluster Education changed me",
    desc: "Aziz Royesh's Empowerment program gave me clarity, vision, and a mission: a world where every girl can thrive. I found my voice — and never stopped using it.",
    color: "bg-violet-50 border-violet-200",
    glow: "rgba(139, 92, 246, 0.18)",
    accent: "text-violet-500",
  },
  {
    emoji: "🕊️",
    icon: Star,
    year: "Taking action",
    title: "Co-founding the Solh team",
    desc: "We started teaching literacy classes to nearly a hundred women in our community. My own mother was the first to register — and the proudest of me.",
    color: "bg-emerald-50 border-emerald-200",
    glow: "rgba(16, 185, 129, 0.18)",
    accent: "text-emerald-500",
  },
  {
    emoji: "✈️",
    icon: Plane,
    year: "The bridge",
    title: "Winning the WLOT scholarship",
    desc: "I earned my own money by teaching math, then started searching online for opportunities. The WLOT scholarship was the bridge to Canada — and I grabbed it.",
    color: "bg-amber-50 border-amber-200",
    glow: "rgba(245, 158, 11, 0.18)",
    accent: "text-amber-600",
  },
  {
    emoji: "🇨🇦",
    icon: MapPin,
    year: "A new chapter",
    title: "GNS — IB student in Canada",
    desc: "Now I'm studying the IB Diploma at Glenlyon Norfolk School. I co-founded AlphaSeekers Network to make sure every ambitious Afghan student has a path too.",
    color: "bg-sky-50 border-sky-200",
    glow: "rgba(14, 165, 233, 0.18)",
    accent: "text-sky-500",
  },
  {
    emoji: "🎙️",
    icon: Mic,
    year: "Onstage",
    title: "Speaking up — and not slowing down",
    desc: "From assembly stages to animation, writing, and the Round Square \"Let's Afghan Girls Learn\" campaign — I'm just getting louder.",
    color: "bg-blue-50 border-blue-200",
    glow: "rgba(37, 99, 235, 0.18)",
    accent: "text-blue-500",
  },
];

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(192,132,252,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-20 w-[36rem] h-[36rem] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="handwriting text-2xl md:text-3xl text-purple-500 mb-3"
            >
              my story so far ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black gradient-text leading-[0.92] mb-6"
            >
              My Journey.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              From Afghanistan to an IB school in Canada — every chapter shaped
              who I am, what I build, and who I do it for.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:flex justify-end"
          >
            <span className="text-[10rem] xl:text-[14rem] leading-none">🗺️</span>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 lg:py-16" ref={containerRef}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-4xl mx-auto">
            {/* Track */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-purple-100 rounded-full" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-amber-500 rounded-full origin-top"
            />

            <div className="space-y-10 md:space-y-16">
              {milestones.map((m, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative grid md:grid-cols-2 items-center gap-6 md:gap-10`}
                  >
                    {/* Dot */}
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 250, damping: 16 }}
                      className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-white border-4 border-purple-500 z-10 shadow-md"
                    />

                    {/* Card */}
                    <div
                      className={`pl-12 md:pl-0 ${
                        isRight ? "md:col-start-2" : "md:col-start-1 md:text-right md:[&_.tilt-wrap]:flex md:[&_.tilt-wrap]:justify-end"
                      }`}
                    >
                      <div className="tilt-wrap">
                        <TiltCard glowColor={m.glow}>
                          <div
                            className={`glass-card p-6 md:p-7 ${m.color} border max-w-xl`}
                          >
                            <div className="flex items-start gap-4 mb-2">
                              <motion.span
                                className="text-4xl shrink-0"
                                whileHover={{ scale: 1.2, rotate: 8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {m.emoji}
                              </motion.span>
                              <div className="text-left flex-1">
                                <p
                                  className={`text-[10px] uppercase tracking-[0.2em] ${m.accent} font-bold mb-1`}
                                >
                                  {m.year}
                                </p>
                                <h3 className="text-xl md:text-2xl font-black leading-tight">
                                  {m.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base text-left">
                              {m.desc}
                            </p>
                          </div>
                        </TiltCard>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

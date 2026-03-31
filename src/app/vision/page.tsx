"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Target, GraduationCap, Globe } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import ParallaxSection from "@/components/ParallaxSection";

const roadmapSteps = [
  {
    icon: GraduationCap,
    label: "Now",
    title: "IB Diploma at GNS",
    desc: "Studying the International Baccalaureate curriculum with a focus on sciences",
    active: true,
  },
  {
    icon: Target,
    label: "Next",
    title: "University Applications",
    desc: "Preparing for top university admissions, including MIT",
    active: false,
  },
  {
    icon: Brain,
    label: "Goal",
    title: "Neuroscience + AI at MIT",
    desc: "Pursuing a degree at the intersection of neuroscience and artificial intelligence",
    active: false,
  },
  {
    icon: Globe,
    label: "Dream",
    title: "Change the World",
    desc: "Using brain science and AI to solve real-world problems and empower communities",
    active: false,
  },
];

const passions = [
  {
    emoji: "🧠",
    title: "Neuroscience",
    desc: "How does the brain work? How do we think, learn, and dream? These questions keep me up at night. I want to uncover the mysteries of the mind and use that knowledge to help people.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50 border-purple-200",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    emoji: "🤖",
    title: "Artificial Intelligence",
    desc: "AI is transforming everything — from medicine to education. I want to be at the forefront of building AI that's ethical, inclusive, and genuinely helpful.",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50 border-pink-200",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    emoji: "🌍",
    title: "Education Equity",
    desc: "Where you're born shouldn't determine what you can learn. I started Alpha Seekers because I believe every student deserves access to quality education.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 border-amber-200",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function VisionPage() {
  return (
    <section className="py-20">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: -3 }}
            className="handwriting text-2xl md:text-3xl mb-3"
          >
            what drives me 🔥
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            My <span className="gradient-text">Vision</span>
          </h1>
        </motion.div>

        {/* Big Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
        >
          <TiltCard glowColor="rgba(168, 85, 247, 0.12)">
            <div className="glass-card p-10 md:p-14 text-center mb-20 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              </motion.div>
              <blockquote className="text-2xl md:text-4xl font-bold leading-snug mb-4">
                &ldquo;I want to{" "}
                <motion.span
                  className="gradient-text inline-block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  understand the brain
                </motion.span>{" "}
                and{" "}
                <motion.span
                  className="gradient-text inline-block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  build the future
                </motion.span>
                .&rdquo;
              </blockquote>
              <motion.p
                className="handwriting text-xl text-pink-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                — Sahar
              </motion.p>
            </div>
          </TiltCard>
        </motion.div>

        {/* Passions */}
        <ParallaxSection offset={25}>
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              What Excites Me
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {passions.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: i * 0.15,
                    type: "spring",
                    stiffness: 80,
                  }}
                >
                  <TiltCard glowColor={p.glow}>
                    <div className={`glass-card p-8 ${p.bg} border h-full`}>
                      <motion.span
                        className="text-4xl mb-4 block"
                        whileHover={{ scale: 1.4, rotate: 20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {p.emoji}
                      </motion.span>
                      <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Road to MIT */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ rotate: -5 }}
              whileInView={{ rotate: -3 }}
              viewport={{ once: true }}
              className="handwriting text-2xl md:text-3xl mb-3"
            >
              the plan ✨
            </motion.p>
            <h2 className="text-3xl md:text-4xl font-bold">
              The Road to <span className="gradient-text">MIT</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {roadmapSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`glass-card p-6 flex items-start gap-5 ${
                      step.active
                        ? "bg-purple-50 border-purple-300 ring-2 ring-purple-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        step.active
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          step.active ? "text-purple-600" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                    {step.active && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="sticker-badge text-xs"
                      >
                        Current ✨
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* What I Want to Change */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <TiltCard glowColor="rgba(245, 158, 11, 0.12)">
            <div className="glass-card p-10 md:p-14 text-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What I Want to Change
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-lg text-gray-600 text-left">
                {[
                  { emoji: "🌍", bold: "Access to Education", text: "Every student in Afghanistan, and everywhere, should have access to quality learning." },
                  { emoji: "👩‍🔬", bold: "Women in STEM", text: "I want to inspire more girls from my community to pursue science, technology, and research." },
                  { emoji: "🧠", bold: "Mental Health", text: "Using neuroscience and AI to better understand and support mental health." },
                  { emoji: "🤝", bold: "Bridges, Not Walls", text: "Technology should connect people, not divide them." },
                ].map((item, i) => (
                  <motion.p
                    key={item.bold}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item.emoji} <strong>{item.bold}</strong> — {item.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

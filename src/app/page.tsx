"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Rocket,
  Brain,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import LetterReveal from "@/components/LetterReveal";
import FloatingStickers from "@/components/FloatingStickers";
import TiltCard from "@/components/TiltCard";
import RotatingText from "@/components/RotatingText";
import ParallaxSection from "@/components/ParallaxSection";

const highlights = [
  {
    emoji: "🎓",
    icon: GraduationCap,
    title: "WLOT Scholar",
    desc: "IB Diploma at GNS, Canada",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    emoji: "🚀",
    icon: Rocket,
    title: "Founded Alpha Seekers",
    desc: "Teaching Afghan students worldwide",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    emoji: "🧠",
    icon: Brain,
    title: "Future: Dr. Sahar Nikzad",
    desc: "Neuroscience & medicine",
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
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden"
      >
        <FloatingStickers />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="section-container text-center relative z-10"
        >
          {/* Sahar's real photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="mx-auto mb-6 relative"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-purple-200 ring-offset-4 ring-offset-white shadow-xl mx-auto relative">
              <Image
                src="/images/sahar.jpg"
                alt="Sahar Nikzad at Glenlyon Norfolk School"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 right-1/2 translate-x-8 md:translate-x-10 text-xl"
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Handwriting annotation */}
          <motion.p
            initial={{ opacity: 0, y: -20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="handwriting text-2xl md:text-3xl mb-4"
          >
            just getting started ✨
          </motion.p>

          {/* Name — Letter by Letter */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black gradient-text leading-none mb-2">
            <LetterReveal text="Sahar" delay={0.3} />
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black gradient-text leading-none mb-6">
            <LetterReveal text="Nikzad" delay={0.5} />
          </h1>

          {/* Rotating Identity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <span className="text-xl md:text-2xl text-gray-600 font-medium">
              Student &middot; Scholar &middot;{" "}
              <RotatingText className="font-bold text-2xl md:text-3xl" />
            </span>
          </motion.div>

          {/* Sticker Badges — staggered entrance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {[
              "🎓 IB Student",
              "🏆 WLOT Scholar",
              "🚀 Founder",
              "🧠 Dreamer",
              "🔧 Builder",
            ].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.3 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: Math.random() > 0.5 ? 3 : -3,
                }}
                className="sticker-badge cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed"
          >
            From Afghanistan to Canada on a WLOT scholarship, I chose to dream bigger
            than anyone expected. I taught literacy to women, earned my own way by teaching math,
            and built{" "}
            <motion.span
              className="font-semibold text-purple-600 relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Alpha Seekers Network
              <motion.span
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              />
            </motion.span>{" "}
            to empower students across Afghanistan. Now I&apos;m chasing the biggest dream of all:{" "}
            <span className="font-semibold text-amber-600">&ldquo;Dr. Sahar Nikzad, to the emergency department.&rdquo;</span>
          </motion.p>

          {/* CTAs with bounce */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/journey" className="btn-primary">
                Read My Story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/vision" className="btn-outline">
                See My Vision <Sparkles className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-purple-300 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-purple-400"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── HIGHLIGHT CARDS with Tilt ─── */}
      <ParallaxSection offset={30}>
        <section className="py-20">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                >
                  <TiltCard
                    className="h-full"
                    glowColor={item.glow}
                  >
                    <div
                      className={`glass-card p-8 ${item.bg} border ${item.border} h-full`}
                    >
                      <motion.span
                        className="text-4xl mb-4 block"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        transition={{ type: "spring" }}
                      >
                        {item.emoji}
                      </motion.span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-50/30">
        <div className="section-container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="max-w-3xl mx-auto"
          >
            <motion.p
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: -3 }}
              viewport={{ once: true }}
              className="handwriting text-2xl md:text-3xl mb-4"
            >
              a little about me 💫
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Every big journey starts with a{" "}
              <motion.span
                className="gradient-text inline-block"
                whileInView={{ scale: [0.9, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                bold step
              </motion.span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              I decided early on that my story would be one of strength, not
              circumstance. I taught literacy to women in my community, earned my
              own way by teaching mathematics, and built Alpha Seekers Network
              to make sure no ambitious student has to dream alone. Now at GNS IB
              School in Canada, I&apos;m building toward my biggest dream:
              becoming Dr. Sahar Nikzad 🚀
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/journey" className="btn-primary">
                Read My Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ALPHA SEEKERS PREVIEW ─── */}
      <ParallaxSection offset={20}>
        <section className="py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard glowColor="rgba(168, 85, 247, 0.15)">
                <div className="glass-card p-10 md:p-14 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <motion.span
                    className="text-5xl mb-6 block"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Alpha Seekers Network
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    I founded Alpha Seekers to create a learning community for ambitious
                    students — especially those from Afghanistan. Education is the most
                    powerful tool for change, and I believe every student deserves access
                    to world-class learning.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/alpha-seekers" className="btn-primary">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ─── DREAM BANNER ─── */}
      <section className="py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 text-5xl md:text-7xl font-black text-purple-100 select-none"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>DREAM BIG</span>
                <span className="text-pink-100">✦</span>
                <span>WORK HARD</span>
                <span className="text-amber-100">✦</span>
                <span>STAY CURIOUS</span>
                <span className="text-purple-200">✦</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

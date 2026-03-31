"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, BookOpen, Plane, MapPin, Lightbulb, Target, Star } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const milestones = [
  {
    emoji: "🇦🇫",
    icon: Heart,
    year: "Early Years",
    title: "Where It All Began",
    desc: "Growing up between Iran and Afghanistan, I learned early on that curiosity and resilience are superpowers. Every challenge made me stronger, and I always knew I was meant for something bigger.",
    color: "bg-rose-50 border-rose-200",
    glow: "rgba(244, 63, 94, 0.15)",
  },
  {
    emoji: "📚",
    icon: BookOpen,
    year: "Grade School",
    title: "Top of My Class in Kabul",
    desc: "At Kelid-e-Nejat High School, I found my element — always ranking at the top, competing in seminars, singing in performances, and creating some of my best memories. School was where I truly came alive.",
    color: "bg-blue-50 border-blue-200",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    emoji: "⚡",
    icon: Lightbulb,
    year: "A Transformation",
    title: "My Second Birth: Cluster Education",
    desc: "Joining Aziz Royesh's Cluster Education program was a turning point. The Empowerment sessions gave me clarity, vision, and a mission: to create a world where every girl can thrive. I found my voice and I've never stopped using it.",
    color: "bg-violet-50 border-violet-200",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    emoji: "🕌",
    icon: Star,
    year: "Taking Action",
    title: "Leading Solh Team & Teaching Women",
    desc: "I co-founded the Solh (Peace) team and started teaching literacy classes to nearly a hundred women in our community. My own mother was the first to register. Watching her grow reminded me why I do what I do — and she told me I was the strongest in our family.",
    color: "bg-emerald-50 border-emerald-200",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    emoji: "✈️",
    icon: Plane,
    year: "Life-Changing Moment",
    title: "Winning the WLOT Scholarship",
    desc: "I earned my own money by teaching mathematics and started exploring the online world for opportunities. Then the WLOT scholarship came along — a bridge to Canada, a bridge to my dreams. I grabbed it and never looked back!",
    color: "bg-amber-50 border-amber-200",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    emoji: "🇨🇦",
    icon: MapPin,
    year: "A New Chapter",
    title: "GNS IB School, Canada",
    desc: "Now I'm studying the IB Diploma at Glenlyon Norfolk School — exploring neuroscience, medicine, and every opportunity I can find. I founded Alpha Seekers Network to make sure every ambitious Afghan student can learn, grow, and dream with me.",
    color: "bg-sky-50 border-sky-200",
    glow: "rgba(14, 165, 233, 0.15)",
  },
  {
    emoji: "🎯",
    icon: Target,
    year: "The Dream",
    title: "Dr. Sahar Nikzad",
    desc: "I can already hear it: 'Dr. Sahar Nikzad, to the emergency department.' I'm going to study neuroscience, attend medical school, build hospitals, publish my mother's story, and speak at conferences around the world. This is just the beginning 🚀",
    color: "bg-purple-50 border-purple-200",
    glow: "rgba(168, 85, 247, 0.15)",
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
    <section className="py-20" ref={containerRef}>
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
            my story so far ✨
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-black gradient-text mb-6">
            My Journey
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From Afghanistan to an IB school in Canada — a story of ambition,
            resilience, and dreaming bigger than anyone expected. Every step
            brought me closer to who I&apos;m becoming.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block -translate-x-1/2" />
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-amber-500 hidden md:block -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Mobile line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:hidden" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }}
              className={`relative mb-14 ${
                i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
              } pl-20 md:pl-0`}
            >
              {/* Dot on line */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`absolute left-6 md:left-1/2 top-6 w-5 h-5 rounded-full border-4 border-white shadow-lg -translate-x-1/2 z-10 ${
                  i % 2 === 0 ? "bg-purple-400" : "bg-pink-400"
                }`}
              />

              {/* Pulse ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [1, 2], opacity: [0.5, 0] }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`absolute left-6 md:left-1/2 top-6 w-5 h-5 rounded-full -translate-x-1/2 z-5 ${
                  i % 2 === 0 ? "bg-purple-400" : "bg-pink-400"
                }`}
              />

              {/* Card with Tilt */}
              <TiltCard glowColor={m.glow}>
                <div
                  className={`glass-card p-6 md:p-8 ${m.color} border relative overflow-hidden`}
                >
                  <motion.span
                    className="text-3xl md:text-4xl mb-3 block"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring" }}
                  >
                    {m.emoji}
                  </motion.span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    {m.year}
                  </p>
                  <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mt-16"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="handwriting text-3xl md:text-4xl text-purple-500">
              &ldquo;The best is yet to come.&rdquo; ✨
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

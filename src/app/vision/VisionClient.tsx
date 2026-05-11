"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, WordReveal } from "@/components/motion/Reveal";

export default function VisionClient({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);

  const trimmed = text.trim();

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section
        ref={ref}
        className="relative border-b border-blue-950/10 overflow-hidden"
      >
        <div className="section-container max-w-6xl py-20 md:py-32">
          <motion.div style={{ y: titleY, opacity: titleOpacity }}>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
              <Reveal type="mask">Where I&apos;m headed</Reveal>
            </p>
            <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
              <Reveal type="mask" delay={0.05}>Vision.</Reveal>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-20 md:py-32">
        <div className="section-container max-w-3xl">
          {trimmed ? (
            <div className="text-2xl md:text-4xl font-bold text-blue-950 leading-[1.3] whitespace-pre-line">
              <WordReveal text={trimmed} staggerMs={50} delay={0.1} as="p" />
            </div>
          ) : (
            <Reveal type="rise">
              <div className="border border-dashed border-blue-200 rounded-3xl p-16 text-center">
                <p className="text-blue-950/60 italic text-lg">
                  Vision statement coming soon.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

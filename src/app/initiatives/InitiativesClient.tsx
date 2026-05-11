"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "lucide-react";

interface Initiative {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string | null;
  link: string | null;
}

export default function InitiativesClient({ items }: { items: Initiative[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-blue-950/10">
        <div className="section-container max-w-6xl py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
            <Reveal type="mask">Building &amp; leading</Reveal>
          </p>
          <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
            <Reveal type="mask" delay={0.05}>Initiatives.</Reveal>
          </h1>
          <div className="max-w-2xl mt-8 text-lg text-blue-950/70">
            <WordReveal
              text="Projects, teams, and communities I've co-founded or helped lead."
              delay={0.4}
              staggerMs={40}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="section-container max-w-6xl">
          <header className="flex items-baseline justify-between gap-4 mb-4 pb-4 border-b border-blue-950/10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
              Index
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
              {items.length} project{items.length === 1 ? "" : "s"}
            </p>
          </header>

          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No initiatives yet.</p>
          ) : (
            <ul>
              {items.map((it, i) => (
                <InitiativeRow key={it.id} item={it} index={i} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function InitiativeRow({
  item,
  index,
}: {
  item: Initiative;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const inner = (
    <motion.article
      whileHover="hover"
      className="relative grid md:grid-cols-[64px_1fr_400px] gap-x-10 gap-y-6 items-center py-10 md:py-12 border-b border-blue-950/10 group overflow-hidden"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 origin-top"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <p className="font-mono text-xs text-blue-950/40 md:pt-3">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2">
          {item.role || "Project"}
        </p>
        <h3 className="text-4xl md:text-6xl font-black text-blue-950 leading-[1.02] mb-3 group-hover:text-blue-700 transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-blue-950/70 leading-relaxed max-w-xl whitespace-pre-line">
            {item.description}
          </p>
        )}
        {item.link && (
          <span className="inline-flex items-center gap-1 mt-4 text-sm font-mono text-blue-700">
            <span className="underline underline-offset-4 decoration-2 decoration-blue-200 group-hover:decoration-blue-700 transition-colors">
              Visit
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      <div ref={ref} className="relative">
        <motion.div
          style={{ y }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-serif italic text-blue-300">
                {item.name[0]}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );

  if (item.link) {
    return (
      <li>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {inner}
        </a>
      </li>
    );
  }
  return <li>{inner}</li>;
}

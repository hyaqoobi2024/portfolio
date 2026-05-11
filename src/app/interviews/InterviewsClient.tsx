"use client";

import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Video } from "lucide-react";

interface Interview {
  id: string;
  title: string;
  outlet: string;
  date: string;
  articleUrl: string | null;
  videoUrl: string | null;
  description: string;
  upcoming: boolean;
  coverImage: string | null;
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export default function InterviewsClient({ items }: { items: Interview[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-blue-950/10">
        <div className="section-container max-w-6xl py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
            <Reveal type="mask">In the press</Reveal>
          </p>
          <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
            <Reveal type="mask" delay={0.05}>Interviews.</Reveal>
          </h1>
          <div className="max-w-2xl mt-8 text-lg text-blue-950/70">
            <WordReveal
              text="Conversations and features where my story has been shared."
              delay={0.4}
              staggerMs={45}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="section-container max-w-6xl">
          <header className="flex items-baseline justify-between gap-4 mb-4 pb-4 border-b border-blue-950/10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
              Press list
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
              {items.length} feature{items.length === 1 ? "" : "s"}
            </p>
          </header>

          {items.length === 0 ? (
            <div className="border border-dashed border-blue-200 rounded-3xl p-16 text-center text-blue-950/60">
              <Video className="w-10 h-10 text-blue-300 mx-auto mb-3" />
              <p>More interviews on the way.</p>
            </div>
          ) : (
            <ul>
              {items.map((it, i) => (
                <InterviewRow key={it.id} interview={it} index={i} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function InterviewRow({
  interview,
  index,
}: {
  interview: Interview;
  index: number;
}) {
  const url = interview.articleUrl || interview.videoUrl;

  const content = (
    <motion.div
      whileHover="hover"
      className="relative grid md:grid-cols-[64px_140px_1fr_auto] gap-x-10 gap-y-2 items-start py-8 border-b border-blue-950/10 group overflow-hidden"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 origin-top"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <p className="font-mono text-xs text-blue-950/40 pt-2">
        {String(index + 1).padStart(2, "0")}
      </p>

      <p className="font-mono text-sm text-blue-700 pt-2 tabular-nums">
        {formatDate(interview.date)}
      </p>

      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono">
            {interview.outlet}
          </span>
          {interview.upcoming && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-mono">
              Upcoming
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-3xl font-black text-blue-950 leading-tight group-hover:text-blue-700 transition-colors">
          {interview.title}
        </h3>
        {interview.description && (
          <p className="text-blue-950/70 mt-2 max-w-2xl leading-relaxed">
            {interview.description}
          </p>
        )}
      </div>

      <motion.span
        className="text-blue-300 group-hover:text-blue-700 transition-colors hidden md:block pt-2"
        variants={{ hover: { x: 4, y: -4 } }}
      >
        <ArrowUpRight className="w-6 h-6" />
      </motion.span>
    </motion.div>
  );

  if (url) {
    return (
      <li>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </li>
    );
  }
  return <li>{content}</li>;
}

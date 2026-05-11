"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, WordReveal } from "@/components/motion/Reveal";

interface Milestone {
  id: string;
  title: string;
  date: string | null;
  description: string;
  image: string | null;
}
interface EducationItem {
  id: string;
  institution: string;
  program: string;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  description: string;
}
interface Club {
  id: string;
  name: string;
  role: string;
  description: string;
}

function formatYear(d: string | null): string {
  if (!d) return "—";
  return new Date(d).getFullYear().toString();
}

export default function JourneyClient({
  milestones,
  education,
  clubs,
  bio,
}: {
  milestones: Milestone[];
  education: EducationItem[];
  clubs: Club[];
  bio: string;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-blue-950/10">
        <div className="section-container max-w-6xl py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
            <Reveal type="mask">My story</Reveal>
          </p>
          <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
            <Reveal type="mask" delay={0.05}>Journey.</Reveal>
          </h1>
          {bio && (
            <div className="max-w-2xl mt-8 text-lg text-blue-950/70 leading-relaxed">
              <WordReveal text={bio} delay={0.4} staggerMs={40} />
            </div>
          )}
        </div>
      </section>

      {/* MILESTONES */}
      {milestones.length > 0 && (
        <Timeline milestones={milestones} />
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="section-container max-w-6xl">
            <SectionHeader label="Education" count={education.length} />
            <ul>
              {education.map((e, i) => (
                <Reveal key={e.id} type="rise" delay={i * 0.06}>
                  <EducationRow item={e} index={i} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CLUBS */}
      {clubs.length > 0 && (
        <section className="py-20 md:py-24 border-t border-blue-950/10">
          <div className="section-container max-w-6xl">
            <SectionHeader label="Clubs" count={clubs.length} />
            <div className="grid sm:grid-cols-2 gap-px bg-blue-950/10 rounded-3xl overflow-hidden border border-blue-950/10">
              {clubs.map((c, i) => (
                <Reveal key={c.id} type="rise" delay={i * 0.05}>
                  <article className="bg-white p-7 md:p-8 hover:bg-blue-50/40 transition-colors h-full">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2">
                      {c.role || "Member"}
                    </p>
                    <h3 className="text-2xl font-bold text-blue-950">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="text-sm text-blue-950/70 mt-3 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <header className="flex items-baseline justify-between gap-4 mb-10 pb-4 border-b border-blue-950/10">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
        {label}
      </h2>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
        {count} {count === 1 ? "item" : "items"}
      </p>
    </header>
  );
}

function Timeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-20 md:py-24 border-t border-blue-950/10">
      <div className="section-container max-w-6xl">
        <SectionHeader label="Milestones" count={milestones.length} />

        <div className="relative">
          {/* Track */}
          <div className="absolute left-[58px] md:left-[110px] top-0 bottom-0 w-px bg-blue-950/10" />
          <motion.div
            style={{ height }}
            className="absolute left-[58px] md:left-[110px] top-0 w-px bg-blue-700 origin-top"
          />

          <ul>
            {milestones.map((m, i) => (
              <MilestoneRow key={m.id} milestone={m} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MilestoneRow({ milestone, index }: { milestone: Milestone; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-[140px_1fr] gap-x-10 gap-y-3 py-10 border-b border-blue-950/10 last:border-0 group"
    >
      {/* Dot */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: index * 0.05 }}
        className="absolute left-[52px] md:left-[104px] top-[44px] w-3 h-3 rounded-full bg-blue-700 ring-4 ring-white z-10"
      />

      <p className="font-mono text-sm text-blue-700 pl-20 md:pl-0">
        {formatYear(milestone.date)}
      </p>

      <div>
        <h3 className="text-3xl md:text-4xl font-black text-blue-950 leading-[1.1] mb-2">
          {milestone.title}
        </h3>
        {milestone.description && (
          <p className="text-blue-950/70 leading-relaxed whitespace-pre-line max-w-2xl">
            {milestone.description}
          </p>
        )}
        {milestone.image && (
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative aspect-[16/10] mt-5 rounded-2xl overflow-hidden bg-blue-50 max-w-2xl"
          >
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </motion.div>
        )}
      </div>
    </motion.li>
  );
}

function EducationRow({ item, index }: { item: EducationItem; index: number }) {
  return (
    <motion.li
      whileHover="hover"
      className="relative grid md:grid-cols-[140px_1fr_auto] gap-x-10 gap-y-2 py-8 border-b border-blue-950/10 group overflow-hidden"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 origin-top"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <p className="font-mono text-sm text-blue-700">
        {item.current
          ? "Now"
          : `${formatYear(item.startDate)}${item.endDate ? ` → ${formatYear(item.endDate)}` : ""}`}
      </p>
      <div>
        {item.program && (
          <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2">
            {item.program}
          </p>
        )}
        <h3 className="text-2xl md:text-3xl font-black text-blue-950">
          {item.institution}
        </h3>
        {item.description && (
          <p className="text-blue-950/70 leading-relaxed mt-2 max-w-2xl">
            {item.description}
          </p>
        )}
      </div>
      <span className="font-mono text-xs text-blue-950/30">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

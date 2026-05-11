"use client";

import { motion } from "framer-motion";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import CountUp from "@/components/CountUp";

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  hours: number;
  description: string;
}

function formatYear(d: string | null): string {
  if (!d) return "";
  return new Date(d).getFullYear().toString();
}

function formatRange(e: ExperienceItem): string {
  const start = formatYear(e.startDate);
  const end = e.current ? "Now" : e.endDate ? formatYear(e.endDate) : "";
  if (!end || start === end) return start;
  return `${start} → ${end}`;
}

export default function ExperienceClient({
  experiences,
  volunteering,
  totalHours,
}: {
  experiences: ExperienceItem[];
  volunteering: VolunteerItem[];
  totalHours: number;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-white border-b border-blue-950/10">
        <div className="section-container max-w-6xl py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
            <Reveal type="mask">What I&apos;ve done</Reveal>
          </p>
          <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
            <Reveal type="mask" delay={0.05}>Experience.</Reveal>
          </h1>
          <div className="max-w-xl mt-8 text-lg text-blue-950/70">
            <WordReveal
              text="Teaching, founding, leading — the work that built me."
              delay={0.4}
              staggerMs={40}
            />
          </div>
        </div>
      </section>

      {/* CAREER LIST */}
      {experiences.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="section-container max-w-6xl">
            <header className="flex items-baseline justify-between gap-4 mb-2 pb-4 border-b border-blue-950/10">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
                Career
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
                {experiences.length} role{experiences.length === 1 ? "" : "s"}
              </p>
            </header>

            <ul>
              {experiences.map((e, i) => (
                <Reveal key={e.id} type="rise" delay={i * 0.06}>
                  <ExperienceRow item={e} index={i} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* VOLUNTEERING */}
      {volunteering.length > 0 && (
        <section className="py-20 md:py-24 border-t border-blue-950/10">
          <div className="section-container max-w-6xl">
            <header className="flex items-baseline justify-between gap-4 mb-12 pb-4 border-b border-blue-950/10">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
                Volunteering
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
                {volunteering.length} role
                {volunteering.length === 1 ? "" : "s"}
              </p>
            </header>

            {totalHours > 0 && (
              <Reveal type="rise">
                <div className="mb-16 flex items-baseline gap-6 flex-wrap">
                  <p className="text-[18vw] md:text-[12rem] font-black text-blue-950 leading-[0.85] tabular-nums tracking-tight">
                    <CountUp end={totalHours} suffix="+" />
                  </p>
                  <p className="text-xl text-blue-950/70 max-w-md">
                    hours of service tracked across every role below.
                  </p>
                </div>
              </Reveal>
            )}

            <ul className="grid sm:grid-cols-2 gap-px bg-blue-950/10 rounded-3xl overflow-hidden border border-blue-950/10">
              {volunteering.map((v, i) => (
                <Reveal key={v.id} type="rise" delay={i * 0.06}>
                  <li className="bg-white p-7 hover:bg-blue-50/40 transition-colors h-full group">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors">
                        {v.organization}
                      </h3>
                      {v.hours > 0 && (
                        <p className="font-mono text-xs text-blue-700 shrink-0">
                          {v.hours} hrs
                        </p>
                      )}
                    </div>
                    {v.role && <p className="text-blue-950/70">{v.role}</p>}
                    {v.description && (
                      <p className="text-sm text-blue-950/60 mt-2 leading-relaxed">
                        {v.description}
                      </p>
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

function ExperienceRow({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.li
      whileHover="hover"
      className="relative grid md:grid-cols-[64px_140px_1fr_auto] gap-x-6 gap-y-2 items-start py-10 border-b border-blue-950/10 group"
    >
      {/* Hover accent */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 origin-top"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <p className="font-mono text-xs text-blue-950/40 pt-2 md:pt-3">
        {String(index + 1).padStart(2, "0")}
      </p>

      <p className="font-mono text-sm text-blue-700 pt-2 md:pt-3 tabular-nums">
        {formatRange(item)}
      </p>

      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-sky-600 font-bold mb-2">
          {item.type}
        </p>
        <h3 className="text-3xl md:text-5xl font-black text-blue-950 leading-[1.02] mb-1">
          {item.title}
        </h3>
        {item.organization && (
          <p className="text-lg text-blue-950/70">{item.organization}</p>
        )}
        {item.description && (
          <p className="text-gray-700 mt-4 leading-relaxed max-w-2xl whitespace-pre-line">
            {item.description}
          </p>
        )}
      </div>

      <motion.span
        className="hidden md:block text-blue-300 text-2xl pt-2"
        variants={{ hover: { x: 4, color: "#1d4ed8" } }}
      >
        →
      </motion.span>
    </motion.li>
  );
}

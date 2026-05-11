"use client";

import { motion } from "framer-motion";
import {
  PenLine,
  Palette,
  Film,
  Mic,
  Sparkles,
  Volleyball,
  Pencil,
  type LucideIcon,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
}

function iconFor(name: string): { Icon: LucideIcon; motionKey: string } {
  const n = name.toLowerCase();
  if (/writ/.test(n)) return { Icon: PenLine, motionKey: "write" };
  if (/draw|paint|sketch|art/.test(n)) return { Icon: Palette, motionKey: "draw" };
  if (/anim/.test(n)) return { Icon: Film, motionKey: "anim" };
  if (/speak|speech|present|public/.test(n)) return { Icon: Mic, motionKey: "speak" };
  if (/lead|manage|founder|organi/.test(n)) return { Icon: Sparkles, motionKey: "lead" };
  if (/soccer|football|sport/.test(n)) return { Icon: Volleyball, motionKey: "ball" };
  return { Icon: Pencil, motionKey: "default" };
}

const ICON_ANIMS: Record<string, Parameters<typeof motion.div>[0]["animate"]> = {
  write: { rotate: [0, -10, 8, -6, 0], x: [0, -2, 2, -2, 0] },
  draw: { rotate: [0, 20, -10, 15, 0] },
  anim: { x: [0, 3, -3, 3, 0], scale: [1, 1.06, 1] },
  speak: { scale: [1, 1.12, 1, 1.08, 1] },
  lead: { rotate: [0, 360] },
  ball: { y: [0, -6, 0, -3, 0], rotate: [0, 45, 0] },
  default: { rotate: [0, 6, -6, 0] },
};

const ICON_DURATIONS: Record<string, number> = {
  write: 2.5,
  draw: 4,
  anim: 2.2,
  speak: 1.8,
  lead: 8,
  ball: 1.6,
  default: 3,
};

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-blue-950/10 border-y border-blue-950/10">
      {skills.map((s, i) => (
        <SkillCell key={s.id} skill={s} index={i} />
      ))}
    </div>
  );
}

function SkillCell({ skill, index }: { skill: Skill; index: number }) {
  const { Icon, motionKey } = iconFor(skill.name);
  const duration = ICON_DURATIONS[motionKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover="hover"
      className="relative group p-8 md:p-10 overflow-hidden cursor-default"
    >
      {/* Hover wash */}
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-blue-50 origin-bottom"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative">
        <motion.span
          animate={ICON_ANIMS[motionKey]}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex text-blue-700 mb-6"
        >
          <Icon className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.6} />
        </motion.span>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2">
          <span className="w-4 h-px bg-blue-300" />
          {skill.category}
        </div>

        <p className="text-2xl md:text-3xl font-black text-blue-950 leading-tight">
          {skill.name}
        </p>
        {skill.description && (
          <p className="text-sm text-blue-950/60 mt-2 leading-relaxed">
            {skill.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

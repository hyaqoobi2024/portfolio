"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Item {
  id: string;
  title: string;
  meta?: string;
  description?: string;
  image?: string | null;
  link?: string | null;
}

interface Props {
  items: Item[];
  renderMedia: (item: Item) => ReactNode;
}

export default function StickyShowcase({ items, renderMedia }: Props) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <ShowcaseRow
          key={item.id}
          item={item}
          index={i}
          renderMedia={renderMedia}
        />
      ))}
    </div>
  );
}

function ShowcaseRow({
  item,
  index,
  renderMedia,
}: {
  item: Item;
  index: number;
  renderMedia: (item: Item) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      className={`relative grid md:grid-cols-2 gap-10 md:gap-16 items-center py-20 md:py-32 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="md:sticky md:top-24 self-start">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-[4/5] rounded-3xl overflow-hidden bg-blue-100 relative"
        >
          {renderMedia(item)}
        </motion.div>
      </div>
      <motion.div style={{ opacity, y }} className="md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
          0{index + 1} · {item.meta}
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-blue-950 mb-6 leading-[1.02]">
          {item.title}
        </h2>
        {item.description && (
          <p className="text-lg text-blue-950/70 leading-relaxed mb-6 whitespace-pre-line">
            {item.description}
          </p>
        )}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-700 font-semibold underline decoration-2 underline-offset-4 hover:decoration-sky-400"
          >
            Visit →
          </a>
        )}
      </motion.div>
    </section>
  );
}

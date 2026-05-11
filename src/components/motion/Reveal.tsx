"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealType = "mask" | "fade" | "clip" | "rise";

interface Props {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  type = "rise",
  delay = 0,
  duration = 0.8,
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  if (type === "mask") {
    return (
      <span ref={ref} className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={inView ? { y: "0%" } : { y: "110%" }}
          transition={{ duration, delay, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  if (type === "clip") {
    return (
      <motion.div
        ref={ref}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={inView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: duration * 1.2, delay, ease: EASE_OUT_EXPO }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (type === "fade") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface WordsProps {
  text: string;
  className?: string;
  delay?: number;
  staggerMs?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  once?: boolean;
}

export function WordReveal({
  text,
  className,
  delay = 0,
  staggerMs = 60,
  as = "p",
  once = true,
}: WordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  };

  const Tag = as;

  return (
    <Tag ref={ref as never} className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom mr-[0.25em]"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

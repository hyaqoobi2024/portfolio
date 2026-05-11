"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.55, ease: CURTAIN_EASE }}
        className="relative"
      >
        {children}
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[60] bg-blue-950 origin-bottom pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: CURTAIN_EASE }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

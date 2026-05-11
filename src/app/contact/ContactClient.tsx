"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import { LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import type { ComponentType, SVGProps } from "react";

type ContactLink = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href: string;
};

export default function ContactClient({
  email,
  alphaSeekersEmail,
  linkedinUrl,
  instagramUrl,
}: {
  email: string;
  alphaSeekersEmail: string;
  linkedinUrl: string;
  instagramUrl: string;
}) {
  const links: ContactLink[] = [];
  if (email)
    links.push({
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    });
  if (alphaSeekersEmail)
    links.push({
      icon: Mail,
      label: "AlphaSeekers",
      value: alphaSeekersEmail,
      href: `mailto:${alphaSeekersEmail}`,
    });
  if (linkedinUrl)
    links.push({
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "Connect with me",
      href: linkedinUrl,
    });
  if (instagramUrl)
    links.push({
      icon: InstagramIcon,
      label: "Instagram",
      value: "Follow along",
      href: instagramUrl,
    });

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-blue-950/10">
        <div className="section-container max-w-6xl py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700 font-mono font-semibold mb-4">
            <Reveal type="mask">Say hello</Reveal>
          </p>
          <h1 className="text-[16vw] md:text-[10rem] font-black text-blue-950 leading-[0.85] tracking-tight">
            <Reveal type="mask" delay={0.05}>Contact.</Reveal>
          </h1>
          <div className="max-w-xl mt-8 text-lg text-blue-950/70">
            <WordReveal
              text="For events, collaborations, or just to chat."
              delay={0.4}
              staggerMs={45}
            />
          </div>
        </div>
      </section>

      {/* LINKS */}
      <section className="py-20 md:py-24">
        <div className="section-container max-w-6xl">
          <header className="flex items-baseline justify-between gap-4 mb-10 pb-4 border-b border-blue-950/10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
              Channels
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-950/40">
              {links.length} way{links.length === 1 ? "" : "s"} to reach me
            </p>
          </header>

          {links.length === 0 ? (
            <p className="text-center text-blue-950/60 italic py-12">
              Contact details coming soon.
            </p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-px bg-blue-950/10 rounded-3xl overflow-hidden border border-blue-950/10">
              {links.map((link, i) => (
                <Reveal key={link.label} type="rise" delay={i * 0.06}>
                  <li>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="relative block bg-white p-8 hover:bg-blue-50/40 transition-colors group h-full"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 origin-top"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2 inline-flex items-center gap-2">
                            <link.icon className="w-3.5 h-3.5" />
                            {link.label}
                          </p>
                          <p className="text-2xl font-bold text-blue-950 truncate group-hover:text-blue-700 transition-colors">
                            {link.value}
                          </p>
                        </div>
                        <motion.span
                          className="text-blue-300 group-hover:text-blue-700 transition-colors shrink-0"
                          whileHover={{ x: 4, y: -4 }}
                        >
                          <ArrowUpRight className="w-6 h-6" />
                        </motion.span>
                      </div>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

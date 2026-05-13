"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useRef, useMemo } from "react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

type ContactCard = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
};

const cards: ContactCard[] = [
  {
    label: "Email",
    value: "saharnikzad187@gmail.com",
    href: "mailto:saharnikzad187@gmail.com",
    icon: Mail,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/sahar-nikzad-095ba9337/",
    icon: LinkedinIcon,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    label: "Instagram",
    value: "Follow along",
    href: "https://www.instagram.com/official_sahar_nikzad_",
    icon: InstagramIcon,
    gradient: "from-blue-500 via-sky-500 to-amber-500",
  },
  {
    label: "YouTube",
    value: "@SaharVerse-1111",
    href: "https://www.youtube.com/@SaharVerse-1111",
    icon: YouTubeIcon,
    gradient: "from-red-500 via-sky-500 to-blue-500",
  },
];

function MagneticCard({ card }: { card: ContactCard }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const Icon = card.icon;

  return (
    <a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      href={card.href}
      target={card.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative block rounded-3xl bg-white p-8 lg:p-10 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300"
      style={{ transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s" }}
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-2">
        {card.label}
      </p>
      <p className="text-lg lg:text-xl font-black text-gray-900 break-all">
        {card.value}
      </p>
      <ArrowUpRight className="w-5 h-5 absolute top-7 right-7 text-gray-300 group-hover:text-purple-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
    </a>
  );
}

export default function ContactPage() {
  const links = useMemo(() => cards, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-32 w-[44rem] h-[44rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(192,132,252,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 w-[40rem] h-[40rem] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="handwriting text-2xl md:text-3xl text-blue-500 mb-3"
            >
              say hello ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black gradient-text leading-[0.92] mb-6"
            >
              Let&apos;s connect.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              For events, collaborations, or just to chat about animation,
              education, or anything in between.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:flex justify-end"
          >
            <motion.span
              className="text-[10rem] xl:text-[14rem] leading-none"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              💌
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {links.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <MagneticCard card={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-sky-500 p-10 md:p-16 text-white text-center shadow-2xl"
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
            />
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-amber-200" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight max-w-2xl mx-auto">
              I read every message.
            </h2>
            <p className="text-lg text-blue-50/90 mb-8 inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Even the long ones.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, Users, BookOpen, Globe, ExternalLink, ArrowRight } from "lucide-react";

const stats = [
  { icon: Users, value: "Growing", label: "Student Community", color: "text-purple-500" },
  { icon: BookOpen, value: "Bilingual", label: "Platform", color: "text-pink-500" },
  { icon: Globe, value: "Afghanistan", label: "Focus Region", color: "text-amber-500" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function AlphaSeekersPage() {
  return (
    <section className="py-20">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-6xl mb-6 block">🚀</span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Alpha Seekers</span> Network
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built by students, for students — a learning platform empowering young
            people to reach their full potential.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-14 mb-16 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Rocket className="w-6 h-6 text-purple-500" /> Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Alpha Seekers Network was born from a simple belief: every student
            deserves access to quality education, no matter where they come from.
            We&apos;re building a bilingual platform that connects Afghan students with
            learning resources, mentorship, and a community that believes in their
            potential.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            As the founder, I lead our team in creating courses, building technology,
            and forging partnerships that can change the trajectory of young lives. We
            started small, but our ambitions are limitless.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-8 text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why I Started */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="handwriting text-2xl mb-4">in my own words</p>
          <blockquote className="text-xl text-gray-700 leading-relaxed italic">
            &ldquo;When I got the opportunity to study in Canada, I realized how many
            talented students back home would never get the same chance — not because
            they lacked ability, but because they lacked access. Alpha Seekers is my
            way of building that bridge.&rdquo;
          </blockquote>
          <p className="handwriting text-xl text-pink-500 mt-4">— Sahar</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Visit the Platform</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://alphaseekers.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Go to Alpha Seekers <ExternalLink className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-outline">
              Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

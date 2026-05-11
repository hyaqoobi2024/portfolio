import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import MultilingualHello from "@/components/MultilingualHello";
import CountUp from "@/components/CountUp";
import AmbientBlobs from "@/components/AmbientBlobs";
import FeaturedVideo from "@/components/FeaturedVideo";
import CinemaFrame from "@/components/CinemaFrame";
import SkillsGrid from "@/components/SkillsGrid";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import {
  ArrowRight,
  Mic,
  Play,
} from "lucide-react";

export const dynamic = "force-dynamic";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

export default async function HomePage() {
  const [profile, greetings, skills, initiatives, allMedia] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.greeting.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.initiative.findMany({ orderBy: { order: "asc" }, take: 3 }),
    prisma.media.findMany({ orderBy: { order: "asc" } }),
  ]);

  const name = profile?.name ?? "Sahar Nikzad";
  const firstName = name.split(" ")[0];
  const tagline = profile?.tagline ?? "";
  const nameMeaning = profile?.nameMeaning ?? "";
  const profileImage = profile?.profileImage ?? "/images/sahar.jpg";
  const totalHours = profile?.totalServiceHours ?? 0;

  const videos = allMedia.filter((m) => m.type === "Video" && m.youtubeUrl);
  const speech =
    videos.find((v) => /speech|assembly|speaking/i.test(v.title)) ??
    videos[0] ??
    null;
  const otherVideos = videos.filter((v) => v.id !== speech?.id);
  const speechId = speech?.youtubeUrl
    ? extractYouTubeId(speech.youtubeUrl)
    : null;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
        <AmbientBlobs />

        <div className="section-container relative grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center py-20">
          <div>
            {greetings.length > 0 && (
              <div className="text-sky-600 font-handwriting text-4xl md:text-6xl mb-3 leading-none">
                <MultilingualHello
                  greetings={greetings.map((g) => ({
                    text: g.text,
                    language: g.language,
                  }))}
                />
              </div>
            )}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-blue-950 leading-[0.95] tracking-tight mb-6">
              I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{firstName}.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 md:h-4 bg-sky-300/70 -z-0 rounded" />
              </span>
            </h1>
            {nameMeaning && (
              <p className="text-gray-700 italic max-w-xl mb-5 text-lg">
                {nameMeaning}
              </p>
            )}
            {tagline && (
              <p className="text-lg md:text-xl text-blue-950/80 max-w-xl mb-8 leading-relaxed">
                {tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {speechId && (
                <Magnetic strength={0.25}>
                  <a
                    href="#speech"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-950 text-white font-semibold hover:bg-blue-800 transition shadow-lg shadow-blue-950/20 hover:shadow-xl"
                  >
                    <Play className="w-4 h-4 fill-current" /> Watch my speech
                  </a>
                </Magnetic>
              )}
              <Magnetic strength={0.2}>
                <Link
                  href="/journey"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-950 text-blue-950 font-semibold hover:bg-blue-950 hover:text-white transition"
                >
                  My journey <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {totalHours > 0 && (
                <div>
                  <p className="text-3xl md:text-4xl font-black text-blue-950 leading-none">
                    <CountUp end={totalHours} suffix="+" />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-blue-700 mt-1">
                    Service hours
                  </p>
                </div>
              )}
              {skills.length > 0 && (
                <div>
                  <p className="text-3xl md:text-4xl font-black text-blue-950 leading-none">
                    <CountUp end={skills.length} />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-blue-700 mt-1">
                    Skills & crafts
                  </p>
                </div>
              )}
              {initiatives.length > 0 && (
                <div>
                  <p className="text-3xl md:text-4xl font-black text-blue-950 leading-none">
                    <CountUp end={initiatives.length} />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-blue-700 mt-1">
                    Initiatives
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-blue-950/10 rotate-2">
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white text-blue-950 px-5 py-3 rounded-2xl shadow-2xl border border-blue-100 max-w-[14rem]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-mono mb-1">
                Currently
              </p>
              <p className="text-sm font-semibold">
                Building AlphaSeekers · Telling stories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED SPEECH (cinema) ─── */}
      {speech && speechId && (
        <section
          id="speech"
          className="relative py-24 md:py-32 bg-gradient-to-b from-blue-950 via-[#040a1f] to-blue-950 text-white overflow-hidden"
        >
          {/* Film-grain tint */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="section-container relative max-w-6xl">
            <div className="text-center mb-14">
              <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-sky-300 font-mono mb-5">
                <span className="w-8 h-px bg-sky-300/60" />
                <Mic className="w-3.5 h-3.5" /> Now showing
                <span className="w-8 h-px bg-sky-300/60" />
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.95] mb-4">
                Standing up for girls&apos; education.
              </h2>
              {speech.description && (
                <p className="text-blue-100/70 max-w-2xl mx-auto mt-4 text-lg">
                  {speech.description}
                </p>
              )}
            </div>
            <CinemaFrame
              youtubeId={speechId}
              title={speech.title}
              eyebrow="Assembly speech · 2025"
            />
          </div>
        </section>
      )}

      {/* ─── SKILLS ─── */}
      {skills.length > 0 && (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden">
          <div className="section-container relative">
            <div className="text-center mb-14">
              <span className="section-eyebrow">
                <Reveal type="mask">What I do</Reveal>
              </span>
              <h2 className="section-title mt-2">
                <Reveal type="mask" delay={0.05}>Curious in a lot of ways.</Reveal>
              </h2>
            </div>
            <SkillsGrid
              skills={skills.map((s) => ({
                id: s.id,
                name: s.name,
                category: s.category,
                description: s.description,
              }))}
            />
          </div>
        </section>
      )}

      {/* ─── INITIATIVES PREVIEW ─── */}
      {initiatives.length > 0 && (
        <section className="py-24 md:py-32 bg-white">
          <div className="section-container">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="section-eyebrow">Building &amp; leading</span>
                <h2 className="section-title mt-2">
                  Things I&apos;m building.
                </h2>
              </div>
              <Link
                href="/initiatives"
                className="text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-blue-950/10 rounded-3xl overflow-hidden">
              {initiatives.map((it) => (
                <article
                  key={it.id}
                  className="bg-white p-7 md:p-8 hover:bg-blue-50/40 transition-colors group"
                >
                  {it.image ? (
                    <div className="aspect-video relative rounded-2xl overflow-hidden mb-5 bg-blue-50">
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-2xl mb-5 bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center text-blue-300">
                      <span className="text-5xl font-serif italic">
                        {it.name[0]}
                      </span>
                    </div>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-mono mb-2">
                    {it.role}
                  </p>
                  <h3 className="text-xl font-bold text-blue-950 mb-2">
                    {it.name}
                  </h3>
                  {it.description && (
                    <p className="text-sm text-blue-950/70 line-clamp-3 leading-relaxed">
                      {it.description}
                    </p>
                  )}
                  {it.link && (
                    <a
                      href={it.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-700 font-medium inline-flex items-center gap-1 mt-4 hover:gap-2 transition-all"
                    >
                      Visit <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── OTHER VIDEOS ─── */}
      {otherVideos.length > 0 && (
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="section-eyebrow">More to watch</span>
                <h2 className="section-title">Animation & on stage.</h2>
              </div>
              <Link
                href="/media"
                className="text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                All media <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {otherVideos.slice(0, 2).map((v) => {
                const id = extractYouTubeId(v.youtubeUrl!);
                if (!id) return null;
                return (
                  <FeaturedVideo
                    key={v.id}
                    youtubeId={id}
                    title={v.title}
                    description={v.description}
                    eyebrow={v.type}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="section-container text-center max-w-3xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Building a path so other girls can{" "}
            <span className="text-sky-300">walk it too.</span>
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            From Afghanistan to Canada, from classrooms to stages — every step
            is part of a bigger story.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-950 font-semibold hover:bg-sky-100 transition"
            >
              Read my vision <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

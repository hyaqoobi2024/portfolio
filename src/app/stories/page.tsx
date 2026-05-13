import { prisma } from "@/lib/db";
import { formatDate, readingTime } from "@/lib/utils";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const accentByIndex = [
  "from-purple-500 to-blue-500",
  "from-blue-500 to-sky-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-blue-500",
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
];

export default async function StoriesPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 left-1/3 w-[44rem] h-[44rem] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(192,132,252,0.5), transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <p className="handwriting text-2xl md:text-3xl text-purple-500 mb-3">
              thoughts &amp; reflections ✨
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black gradient-text leading-[0.92] mb-6">
              Stories.
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl">
              Writings, reflections, and the moments worth putting on the page.
            </p>
          </div>
          <div className="hidden lg:flex justify-end">
            <span className="text-[10rem] xl:text-[14rem] leading-none">📖</span>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <div className="glass-card p-12 text-center max-w-lg mx-auto bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-2">Coming soon</h3>
              <p className="text-gray-600">
                Stories are on their way. Check back for the first posts. ✨
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => {
                const accent = accentByIndex[i % accentByIndex.length];
                return (
                  <Link key={post.id} href={`/stories/${post.slug}`}>
                    <article className="group relative rounded-3xl bg-white p-7 border border-purple-100 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${accent}`}
                      />
                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="rounded-2xl mb-5 w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${accent} text-white text-[10px] uppercase tracking-[0.15em] font-bold`}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400 inline-flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />{" "}
                          {readingTime(post.content)}
                        </span>
                      </div>
                      <h3 className="text-xl font-black mb-2 leading-tight group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 font-mono">
                          {formatDate(post.createdAt)}
                        </p>
                        <span className="text-sm font-bold text-purple-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

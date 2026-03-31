import { prisma } from "@/lib/db";
import { formatDate, readingTime } from "@/lib/utils";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="handwriting text-2xl mb-3">thoughts & reflections</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">
            Stories
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            My writings, reflections, and the stories that shape my journey.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-lg mx-auto bg-purple-50/50 border-purple-100">
            <BookOpen className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-500">
              Stories are on their way! Check back soon for my first posts. ✨
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/stories/${post.slug}`}>
                <article className="glass-card p-6 h-full hover:border-purple-300 transition-all group">
                  {post.coverImage && (
                    <div className="h-48 rounded-lg mb-4 overflow-hidden bg-gray-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="sticker-badge text-xs">{post.category}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {readingTime(post.content)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {formatDate(post.createdAt)}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

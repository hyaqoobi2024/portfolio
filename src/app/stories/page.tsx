import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50/40 border-b border-blue-100">
        <div className="section-container py-20 text-center">
          <span className="section-eyebrow">Words</span>
          <h1 className="section-title">Stories</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No stories published yet.
            </p>
          ) : (
            <ul className="space-y-6">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="border-b border-blue-100 pb-6 last:border-0"
                >
                  <Link href={`/stories/${p.slug}`} className="group">
                    <p className="text-sm text-blue-600 font-medium mb-1">
                      {formatDate(p.createdAt)}
                    </p>
                    <h2 className="text-2xl font-bold text-blue-950 group-hover:text-blue-700 transition">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="text-gray-700 mt-2">{p.excerpt}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

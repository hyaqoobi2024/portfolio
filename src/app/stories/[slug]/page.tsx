import { prisma } from "@/lib/db";
import { formatDate, readingTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, Share2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <section className="py-20">
      <div className="section-container max-w-3xl">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Stories
        </Link>

        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="sticker-badge text-xs">{post.category}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {readingTime(post.content)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">{formatDate(post.createdAt)}</p>

          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg prose-purple max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex items-center justify-between">
            <Link
              href="/stories"
              className="text-sm text-gray-500 hover:text-purple-600"
            >
              ← More Stories
            </Link>
            <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

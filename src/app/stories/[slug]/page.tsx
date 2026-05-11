import { prisma } from "@/lib/db";
import { formatDate, readingTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  return (
    <article className="min-h-screen bg-white">
      <div className="section-container max-w-3xl py-20">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All stories
        </Link>
        <p className="text-sm text-blue-600 font-medium mb-2">
          {formatDate(post.createdAt)} · {readingTime(post.content)}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg text-gray-700 italic mb-8">{post.excerpt}</p>
        )}
        <div className="prose prose-lg max-w-none prose-headings:text-blue-950 prose-a:text-blue-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

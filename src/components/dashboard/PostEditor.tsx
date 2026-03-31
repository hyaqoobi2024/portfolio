"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";

interface PostEditorProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string | null;
    category: string;
    published: boolean;
  };
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [category, setCategory] = useState(post?.category || "STORY");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!post) setSlug(slugify(val));
  };

  const handleSave = async (publish: boolean) => {
    setLoading(true);
    const body = { title, slug, content, excerpt, coverImage, category, published: publish };

    try {
      if (post) {
        await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      router.push("/dashboard/posts");
      router.refresh();
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard/posts"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Posts
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={loading || !title}
            className="btn-outline text-sm py-2 px-4 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={loading || !title}
            className="btn-primary text-sm py-2 px-4 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Amazing Story..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-lg font-medium"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-semibold mb-2">
              Content (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story here... You can use **bold**, *italic*, # headings, and more!"
              rows={20}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm bg-white"
              >
                <option value="STORY">Story</option>
                <option value="ARTICLE">Article</option>
                <option value="INTERVIEW">Interview</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

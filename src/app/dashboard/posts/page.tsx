import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import DeletePostButton from "@/components/dashboard/DeletePostButton";
import TogglePublishButton from "@/components/dashboard/TogglePublishButton";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-gray-500 text-sm">Manage your stories and articles</p>
        </div>
        <Link href="/dashboard/posts/new" className="btn-primary text-sm py-2.5 px-5">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 mb-4">No posts yet. Write your first story! ✨</p>
          <Link href="/dashboard/posts/new" className="btn-primary text-sm">
            <Plus className="w-4 h-4" /> Create Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-6 py-3 font-medium hidden md:table-cell">Status</th>
                <th className="px-6 py-3 font-medium hidden md:table-cell">Date</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {post.published ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Eye className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <EyeOff className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <TogglePublishButton id={post.id} published={post.published} />
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

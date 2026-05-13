import { prisma } from "@/lib/db";
import Link from "next/link";
import { FileText, Video, PenTool, Eye, Plus } from "lucide-react";

export default async function DashboardPage() {
  const [totalPosts, publishedPosts, draftPosts, totalInterviews] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { published: false } }),
      prisma.interview.count(),
    ]);

  const stats = [
    {
      icon: FileText,
      label: "Total Posts",
      value: totalPosts,
      color: "text-purple-500 bg-purple-50",
    },
    {
      icon: Eye,
      label: "Published",
      value: publishedPosts,
      color: "text-green-500 bg-green-50",
    },
    {
      icon: PenTool,
      label: "Drafts",
      value: draftPosts,
      color: "text-amber-500 bg-amber-50",
    },
    {
      icon: Video,
      label: "Interviews",
      value: totalInterviews,
      color: "text-blue-500 bg-blue-50",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hey Sahar! 👋</h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your site.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/dashboard/posts/new"
          className="btn-primary text-sm py-2.5 px-5"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
        <Link
          href="/dashboard/interviews"
          className="btn-outline text-sm py-2.5 px-5"
        >
          <Plus className="w-4 h-4" /> New Interview
        </Link>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import PostEditor from "@/components/dashboard/PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post ✏️</h1>
      <PostEditor post={post} />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

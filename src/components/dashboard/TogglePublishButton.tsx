"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function TogglePublishButton({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const router = useRouter();

  const handleToggle = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-1.5 rounded-lg hover:bg-gray-100 ${
        published ? "text-green-500" : "text-gray-400"
      }`}
      title={published ? "Unpublish" : "Publish"}
    >
      {published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
  );
}

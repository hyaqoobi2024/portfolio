import { prisma } from "@/lib/db";
import MediaClient from "./MediaClient";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const media = await prisma.media.findMany({ orderBy: { order: "asc" } });
  return (
    <MediaClient
      items={media.map((m) => ({
        id: m.id,
        title: m.title,
        type: m.type,
        youtubeUrl: m.youtubeUrl,
        image: m.image,
        description: m.description,
      }))}
    />
  );
}

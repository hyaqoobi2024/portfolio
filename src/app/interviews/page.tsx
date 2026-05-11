import { prisma } from "@/lib/db";
import InterviewsClient from "./InterviewsClient";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const interviews = await prisma.interview.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <InterviewsClient
      items={interviews.map((i) => ({
        id: i.id,
        title: i.title,
        outlet: i.outlet,
        date: i.date.toISOString(),
        articleUrl: i.articleUrl,
        videoUrl: i.videoUrl,
        description: i.description,
        upcoming: i.upcoming,
        coverImage: i.coverImage,
      }))}
    />
  );
}

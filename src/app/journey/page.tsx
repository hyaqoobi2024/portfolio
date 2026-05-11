import { prisma } from "@/lib/db";
import JourneyClient from "./JourneyClient";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const [milestones, education, clubs, profile] = await Promise.all([
    prisma.journeyMilestone.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.club.findMany({ orderBy: { order: "asc" } }),
    prisma.profile.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <JourneyClient
      milestones={milestones.map((m) => ({
        id: m.id,
        title: m.title,
        date: m.date ? m.date.toISOString() : null,
        description: m.description,
        image: m.image,
      }))}
      education={education.map((e) => ({
        id: e.id,
        institution: e.institution,
        program: e.program,
        startDate: e.startDate ? e.startDate.toISOString() : null,
        endDate: e.endDate ? e.endDate.toISOString() : null,
        current: e.current,
        description: e.description,
      }))}
      clubs={clubs.map((c) => ({
        id: c.id,
        name: c.name,
        role: c.role,
        description: c.description,
      }))}
      bio={profile?.bio ?? ""}
    />
  );
}

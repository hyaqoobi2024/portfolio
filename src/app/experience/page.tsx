import { prisma } from "@/lib/db";
import ExperienceClient from "./ExperienceClient";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const [experiences, volunteering, profile] = await Promise.all([
    prisma.experience.findMany({
      orderBy: [{ current: "desc" }, { startDate: "desc" }],
    }),
    prisma.volunteering.findMany({ orderBy: { order: "asc" } }),
    prisma.profile.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <ExperienceClient
      experiences={experiences.map((e) => ({
        id: e.id,
        title: e.title,
        organization: e.organization,
        type: e.type,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate ? e.endDate.toISOString() : null,
        current: e.current,
        description: e.description,
      }))}
      volunteering={volunteering.map((v) => ({
        id: v.id,
        organization: v.organization,
        role: v.role,
        hours: v.hours,
        description: v.description,
      }))}
      totalHours={profile?.totalServiceHours ?? 0}
    />
  );
}

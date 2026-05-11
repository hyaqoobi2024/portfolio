import { prisma } from "@/lib/db";
import InitiativesClient from "./InitiativesClient";

export const dynamic = "force-dynamic";

export default async function InitiativesPage() {
  const initiatives = await prisma.initiative.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <InitiativesClient
      items={initiatives.map((i) => ({
        id: i.id,
        name: i.name,
        role: i.role,
        description: i.description,
        image: i.image,
        link: i.link,
      }))}
    />
  );
}

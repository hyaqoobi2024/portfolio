import { prisma } from "@/lib/db";
import VisionClient from "./VisionClient";

export const dynamic = "force-dynamic";

export default async function VisionPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
  });
  return <VisionClient text={profile?.visionStatement ?? ""} />;
}

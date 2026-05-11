import { prisma } from "@/lib/db";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
  });

  return (
    <ContactClient
      email={profile?.contactEmail ?? ""}
      alphaSeekersEmail={profile?.alphaSeekersEmail ?? ""}
      linkedinUrl={profile?.linkedinUrl ?? ""}
      instagramUrl={profile?.instagramUrl ?? ""}
    />
  );
}

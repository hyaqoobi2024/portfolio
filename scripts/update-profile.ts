import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {
      contactEmail: "saharnikzad187@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/sahar-nikzad-095ba9337/",
      instagramUrl: "https://www.instagram.com/official_sahar_nikzad_",
    },
    create: {
      id: "singleton",
      contactEmail: "saharnikzad187@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/sahar-nikzad-095ba9337/",
      instagramUrl: "https://www.instagram.com/official_sahar_nikzad_",
    },
  });
  console.log("Email:    ", updated.contactEmail);
  console.log("LinkedIn: ", updated.linkedinUrl);
  console.log("Instagram:", updated.instagramUrl);
}

main().finally(() => prisma.$disconnect());

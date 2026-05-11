import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const seedPassword = process.env.SEED_PASSWORD ?? "sahar2026!";
  const hashedPassword = await bcrypt.hash(seedPassword, 10);
  await prisma.user.upsert({
    where: { email: "sahar@alphaseekers.org" },
    update: {},
    create: {
      email: "sahar@alphaseekers.org",
      hashedPassword,
      name: "Sahar Nikzad",
    },
  });

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "Sahar Nikzad",
      tagline:
        "IB student. Co-founder of AlphaSeekers. Storyteller, animator, and advocate for girls' education.",
      bio: "",
      visionStatement: "",
      nameMeaning: "Sahar means dawn — the first light at the edge of night.",
      profileImage: "/images/sahar.jpg",
      totalServiceHours: 1000,
      contactEmail: "saharnikzad187@gmail.com",
      alphaSeekersEmail: "",
      linkedinUrl:
        "https://www.linkedin.com/in/sahar-nikzad-095ba9337",
      instagramUrl:
        "https://www.instagram.com/official_sahar_nikzad_",
    },
  });

  const greetings = [
    { text: "Hello", language: "English", order: 0 },
    { text: "Salam", language: "Dari", order: 1 },
    { text: "Bunjo", language: "", order: 2 },
    { text: "Ola", language: "Portuguese", order: 3 },
    { text: "Merhaba", language: "Turkish", order: 4 },
    { text: "Namaste", language: "Hindi", order: 5 },
  ];
  await prisma.greeting.deleteMany();
  for (const g of greetings) await prisma.greeting.create({ data: g });

  const skills = [
    { name: "Writing", category: "Creative", order: 0 },
    { name: "Drawing", category: "Creative", order: 1 },
    { name: "Animation", category: "Creative", order: 2 },
    { name: "Public speaking", category: "Creative", order: 3 },
    { name: "Leadership", category: "Leadership", order: 0 },
    { name: "Soccer", category: "Sports", order: 0 },
  ];
  await prisma.skill.deleteMany();
  for (const s of skills) await prisma.skill.create({ data: s });

  const experiences = [
    {
      title: "Math teacher",
      organization: "",
      type: "Teaching",
      startDate: new Date("2023-01-01"),
      current: false,
      order: 0,
    },
    {
      title: "English teacher",
      organization: "",
      type: "Teaching",
      startDate: new Date("2023-01-01"),
      current: false,
      order: 1,
    },
    {
      title: "Co-founder & manager",
      organization: "Hamdeli Association",
      type: "Founding",
      startDate: new Date("2022-01-01"),
      current: true,
      order: 2,
    },
    {
      title: "Co-founder",
      organization: "AlphaSeekers",
      type: "Founding",
      startDate: new Date("2024-01-01"),
      current: true,
      order: 3,
    },
  ];
  await prisma.experience.deleteMany();
  for (const e of experiences) await prisma.experience.create({ data: e });

  const initiatives = [
    {
      name: "AlphaSeekers",
      role: "Co-founder",
      description: "",
      link: "",
      image: null,
      order: 0,
    },
    {
      name: "Solh team",
      role: "Team member",
      description: "",
      image: null,
      order: 1,
    },
    {
      name: "Hamdeli Association",
      role: "Co-founder & manager",
      description: "",
      image: null,
      order: 2,
    },
  ];
  await prisma.initiative.deleteMany();
  for (const i of initiatives) await prisma.initiative.create({ data: i });

  const education = [
    {
      institution: "GNS",
      program: "IB",
      current: true,
      description: "",
      order: 0,
    },
  ];
  await prisma.education.deleteMany();
  for (const e of education) await prisma.education.create({ data: e });

  const clubs = [
    { name: "Math Club", role: "Member", description: "", order: 0 },
    {
      name: "Round Square",
      role: "Member",
      description:
        "Let's Afghan Girls Learn — campaign event.",
      order: 1,
    },
    { name: "GMUN", role: "Delegate", description: "", order: 2 },
  ];
  await prisma.club.deleteMany();
  for (const c of clubs) await prisma.club.create({ data: c });

  const volunteering = [
    {
      organization: "WLOT",
      role: "Volunteer",
      hours: 0,
      description: "",
      order: 0,
    },
  ];
  await prisma.volunteering.deleteMany();
  for (const v of volunteering) await prisma.volunteering.create({ data: v });

  const media = [
    {
      title: "Assembly speech",
      type: "Video",
      youtubeUrl: "https://youtu.be/mHI0sHsBbPU",
      description:
        "Advocating for girls' education — speaking, AlphaSeekers, service, and art.",
      order: 0,
    },
    {
      title: "Animation",
      type: "Video",
      youtubeUrl: "https://youtu.be/P3fLffVB0YA",
      description: "",
      order: 1,
    },
    {
      title: "Animation poster",
      type: "Poster",
      image: null,
      description: "",
      order: 2,
    },
    {
      title: "Theatre",
      type: "Photo",
      image: null,
      description: "",
      order: 3,
    },
  ];
  await prisma.media.deleteMany();
  for (const m of media) await prisma.media.create({ data: m });

  const interviews = [
    {
      title:
        "Victoria student from Afghanistan makes waves for project on women's repression, education",
      outlet: "Check News",
      date: new Date("2024-01-01"),
      articleUrl:
        "https://cheknews.ca/victoria-student-from-afghanistan-makes-waves-for-project-on-womens-repression-education-1323261/",
      description: "",
    },
    {
      title: "CBC Radio interview",
      outlet: "CBC",
      date: new Date("2024-01-01"),
      articleUrl: "https://www.cbc.ca/player/play/audio/9.7171253",
      description: "",
    },
  ];
  await prisma.interview.deleteMany();
  for (const it of interviews) await prisma.interview.create({ data: it });

  const journey = [
    { title: "Afghanistan", description: "", order: 0 },
    { title: "Journey to Canada", description: "", order: 1 },
    { title: "WLOT scholarship", description: "", order: 2 },
  ];
  await prisma.journeyMilestone.deleteMany();
  for (const j of journey) await prisma.journeyMilestone.create({ data: j });

  console.log("✅ Database seeded.");
  console.log("📧 Login: sahar@alphaseekers.org");
  console.log(
    process.env.SEED_PASSWORD
      ? "🔑 Password: (from SEED_PASSWORD env var)"
      : "🔑 Password: sahar2026!  (override via SEED_PASSWORD env var)"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

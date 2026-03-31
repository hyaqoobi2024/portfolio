import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("sahar2026!", 10);
  await prisma.user.upsert({
    where: { email: "sahar@alphaseekers.org" },
    update: {},
    create: {
      email: "sahar@alphaseekers.org",
      hashedPassword,
      name: "Sahar Nikzad",
    },
  });

  // Create profile
  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "Sahar Nikzad",
      tagline: "IB Student · WLOT Scholar · Founder · Dreamer · Builder",
      bio: "From Afghanistan to Canada on a WLOT scholarship, I'm an IB student at GNS School with a big dream: to understand the human brain and build the future of AI. I founded Alpha Seekers Network to help students like me reach their potential.",
      visionStatement:
        "I want to understand the brain and build the future. Using neuroscience and artificial intelligence, I aim to solve real-world problems and empower communities — starting with my own.",
    },
  });

  // Create sample blog post
  await prisma.post.upsert({
    where: { slug: "a-new-chapter-begins" },
    update: {},
    create: {
      title: "A New Chapter Begins",
      slug: "a-new-chapter-begins",
      category: "STORY",
      published: true,
      excerpt:
        "Reflecting on my journey from Afghanistan to Canada, and what it means to start a new chapter in my life.",
      content: `# A New Chapter Begins

When I first received the news about my WLOT scholarship, I couldn't believe it. A door had opened that I had only ever dreamed about.

## From Afghanistan to Canada

Growing up in Afghanistan, I always knew that education was my way forward. But the opportunities felt so far away — like stars you could see but never reach.

The WLOT scholarship changed everything. Suddenly, I wasn't just dreaming about studying at a world-class school — I was actually going to do it.

## Arriving at GNS

My first day at Glenlyon Norfolk School was overwhelming in the best way. The IB program challenges me every single day. I'm learning not just facts, but how to **think critically**, how to **question assumptions**, and how to **see the world from different perspectives**.

## What's Next

This is just the beginning. I have my sights set high — on neuroscience, on AI, on MIT. But more than that, I want to use what I learn to make a real difference.

Every journey starts with a single step. This is mine.

*— Sahar* ✨`,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("📧 Login: sahar@alphaseekers.org");
  console.log("🔑 Password: sahar2026!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

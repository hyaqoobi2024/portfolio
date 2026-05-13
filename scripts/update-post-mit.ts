import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.findUnique({
    where: { slug: "a-new-chapter-begins" },
  });
  if (!post) {
    console.log("No post 'a-new-chapter-begins' — nothing to update.");
    return;
  }
  const before = post.content;
  const after = before.replace(
    "This is just the beginning. I have my sights set high — on neuroscience, on AI, on MIT. But more than that, I want to use what I learn to make a real difference.",
    "This is just the beginning. I'm building, speaking, animating, and learning — and I'm not slowing down.",
  );
  if (after === before) {
    console.log("Post content didn't contain the MIT line. Nothing changed.");
    return;
  }
  await prisma.post.update({
    where: { slug: "a-new-chapter-begins" },
    data: { content: after },
  });
  console.log("✓ Removed MIT/neuroscience/AI line from 'a-new-chapter-begins' post.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

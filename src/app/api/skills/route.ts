import { prisma } from "@/lib/db";
import { createHandler, listHandler, toInt, toStr } from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  name: toStr(b.name),
  category: toStr(b.category, "Creative"),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.skill, [
  { category: "asc" },
  { order: "asc" },
]);
export const POST = createHandler(prisma.skill, coerce);

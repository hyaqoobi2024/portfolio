import { prisma } from "@/lib/db";
import { createHandler, listHandler, toInt, toStr } from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  name: toStr(b.name),
  role: toStr(b.role),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.club, { order: "asc" });
export const POST = createHandler(prisma.club, coerce);

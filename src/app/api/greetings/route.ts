import { prisma } from "@/lib/db";
import { createHandler, listHandler, toInt, toStr } from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  language: toStr(b.language),
  text: toStr(b.text),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.greeting, { order: "asc" });
export const POST = createHandler(prisma.greeting, coerce);

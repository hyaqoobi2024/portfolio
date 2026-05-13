import { prisma } from "@/lib/db";
import {
  createHandler,
  listHandler,
  nullable,
  toInt,
  toStr,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  name: toStr(b.name),
  role: toStr(b.role),
  description: toStr(b.description),
  image: nullable(b.image),
  link: nullable(b.link),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.initiative, { order: "asc" });
export const POST = createHandler(prisma.initiative, coerce);

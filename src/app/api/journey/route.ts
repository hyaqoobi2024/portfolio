import { prisma } from "@/lib/db";
import {
  createHandler,
  listHandler,
  nullable,
  toDate,
  toInt,
  toStr,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  title: toStr(b.title),
  date: toDate(b.date),
  description: toStr(b.description),
  image: nullable(b.image),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.journeyMilestone, { order: "asc" });
export const POST = createHandler(prisma.journeyMilestone, coerce);

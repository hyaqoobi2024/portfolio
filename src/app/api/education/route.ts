import { prisma } from "@/lib/db";
import {
  createHandler,
  listHandler,
  toBool,
  toDate,
  toInt,
  toStr,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  institution: toStr(b.institution),
  program: toStr(b.program),
  startDate: toDate(b.startDate),
  endDate: toDate(b.endDate),
  current: toBool(b.current),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.education, { order: "asc" });
export const POST = createHandler(prisma.education, coerce);

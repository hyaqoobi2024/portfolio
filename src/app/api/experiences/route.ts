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
  title: toStr(b.title),
  organization: toStr(b.organization),
  startDate: toDate(b.startDate) ?? new Date(),
  endDate: toDate(b.endDate),
  current: toBool(b.current),
  description: toStr(b.description),
  type: toStr(b.type, "Work"),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.experience, [
  { current: "desc" },
  { startDate: "desc" },
]);
export const POST = createHandler(prisma.experience, coerce);

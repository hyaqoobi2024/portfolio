import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  toBool,
  toDate,
  toInt,
  toStr,
  updateHandler,
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

export const GET = getByIdHandler(prisma.experience);
export const PUT = updateHandler(prisma.experience, coerce);
export const DELETE = deleteHandler(prisma.experience);

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
  institution: toStr(b.institution),
  program: toStr(b.program),
  startDate: toDate(b.startDate),
  endDate: toDate(b.endDate),
  current: toBool(b.current),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.education);
export const PUT = updateHandler(prisma.education, coerce);
export const DELETE = deleteHandler(prisma.education);

import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  nullable,
  toDate,
  toInt,
  toStr,
  updateHandler,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  title: toStr(b.title),
  date: toDate(b.date),
  description: toStr(b.description),
  image: nullable(b.image),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.journeyMilestone);
export const PUT = updateHandler(prisma.journeyMilestone, coerce);
export const DELETE = deleteHandler(prisma.journeyMilestone);

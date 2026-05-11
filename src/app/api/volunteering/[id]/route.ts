import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  toInt,
  toStr,
  updateHandler,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  organization: toStr(b.organization),
  role: toStr(b.role),
  hours: toInt(b.hours, 0),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.volunteering);
export const PUT = updateHandler(prisma.volunteering, coerce);
export const DELETE = deleteHandler(prisma.volunteering);

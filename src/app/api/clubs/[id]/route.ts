import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  toInt,
  toStr,
  updateHandler,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  name: toStr(b.name),
  role: toStr(b.role),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.club);
export const PUT = updateHandler(prisma.club, coerce);
export const DELETE = deleteHandler(prisma.club);

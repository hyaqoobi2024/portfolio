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
  category: toStr(b.category, "Creative"),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.skill);
export const PUT = updateHandler(prisma.skill, coerce);
export const DELETE = deleteHandler(prisma.skill);

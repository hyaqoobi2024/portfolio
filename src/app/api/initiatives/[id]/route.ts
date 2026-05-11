import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  nullable,
  toInt,
  toStr,
  updateHandler,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  name: toStr(b.name),
  role: toStr(b.role),
  description: toStr(b.description),
  image: nullable(b.image),
  link: nullable(b.link),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.initiative);
export const PUT = updateHandler(prisma.initiative, coerce);
export const DELETE = deleteHandler(prisma.initiative);

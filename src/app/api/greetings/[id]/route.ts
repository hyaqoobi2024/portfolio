import { prisma } from "@/lib/db";
import {
  deleteHandler,
  getByIdHandler,
  toInt,
  toStr,
  updateHandler,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  language: toStr(b.language),
  text: toStr(b.text),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.greeting);
export const PUT = updateHandler(prisma.greeting, coerce);
export const DELETE = deleteHandler(prisma.greeting);

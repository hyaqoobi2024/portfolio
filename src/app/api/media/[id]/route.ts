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
  title: toStr(b.title),
  type: toStr(b.type, "Video"),
  youtubeUrl: nullable(b.youtubeUrl),
  image: nullable(b.image),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = getByIdHandler(prisma.media);
export const PUT = updateHandler(prisma.media, coerce);
export const DELETE = deleteHandler(prisma.media);

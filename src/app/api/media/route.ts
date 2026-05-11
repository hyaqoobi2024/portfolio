import { prisma } from "@/lib/db";
import {
  createHandler,
  listHandler,
  nullable,
  toInt,
  toStr,
} from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  title: toStr(b.title),
  type: toStr(b.type, "Video"),
  youtubeUrl: nullable(b.youtubeUrl),
  image: nullable(b.image),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.media, { order: "asc" });
export const POST = createHandler(prisma.media, coerce);

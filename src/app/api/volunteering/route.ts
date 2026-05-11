import { prisma } from "@/lib/db";
import { createHandler, listHandler, toInt, toStr } from "@/lib/crud";

const coerce = (b: Record<string, unknown>) => ({
  organization: toStr(b.organization),
  role: toStr(b.role),
  hours: toInt(b.hours, 0),
  description: toStr(b.description),
  order: toInt(b.order, 0),
});

export const GET = listHandler(prisma.volunteering, { order: "asc" });
export const POST = createHandler(prisma.volunteering, coerce);

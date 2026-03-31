import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  let profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  if (!profile) {
    profile = await prisma.profile.create({ data: { id: "singleton" } });
  }
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const profile = await prisma.profile.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...body },
    update: body,
  });
  return NextResponse.json(profile);
}

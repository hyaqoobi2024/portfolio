import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const interviews = await prisma.interview.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(interviews);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const interview = await prisma.interview.create({
    data: {
      title: body.title,
      outlet: body.outlet,
      date: new Date(body.date),
      videoUrl: body.videoUrl || null,
      articleUrl: body.articleUrl || null,
      description: body.description,
      coverImage: body.coverImage || null,
      upcoming: body.upcoming || false,
    },
  });
  return NextResponse.json(interview);
}

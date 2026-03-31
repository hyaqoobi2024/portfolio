import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const interview = await prisma.interview.update({
    where: { id },
    data: {
      title: body.title,
      outlet: body.outlet,
      date: new Date(body.date),
      videoUrl: body.videoUrl,
      articleUrl: body.articleUrl,
      description: body.description,
      coverImage: body.coverImage,
      upcoming: body.upcoming,
    },
  });
  return NextResponse.json(interview);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.interview.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

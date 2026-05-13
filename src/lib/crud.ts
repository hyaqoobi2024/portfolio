import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDelegate = any;

type Coercer = (body: Record<string, unknown>) => Record<string, unknown>;

export function listHandler(
  delegate: AnyDelegate,
  orderBy: Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">> = { order: "asc" }
) {
  return async function GET() {
    try {
      const items = await delegate.findMany({ orderBy });
      return NextResponse.json(items);
    } catch (err) {
      console.error("list error:", err);
      return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
  };
}

export function createHandler(delegate: AnyDelegate, coerce: Coercer) {
  return async function POST(req: Request) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
      const body = await req.json();
      const item = await delegate.create({ data: coerce(body) });
      return NextResponse.json(item);
    } catch (err) {
      console.error("create error:", err);
      return NextResponse.json({ error: "Failed to create" }, { status: 400 });
    }
  };
}

export function getByIdHandler(delegate: AnyDelegate) {
  return async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    try {
      const item = await delegate.findUnique({ where: { id } });
      if (!item)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(item);
    } catch (err) {
      console.error("get error:", err);
      return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
  };
}

export function updateHandler(delegate: AnyDelegate, coerce: Coercer) {
  return async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    try {
      const body = await req.json();
      const item = await delegate.update({ where: { id }, data: coerce(body) });
      return NextResponse.json(item);
    } catch (err) {
      console.error("update error:", err);
      return NextResponse.json({ error: "Failed to update" }, { status: 400 });
    }
  };
}

export function deleteHandler(delegate: AnyDelegate) {
  return async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    try {
      await delegate.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("delete error:", err);
      return NextResponse.json({ error: "Failed to delete" }, { status: 400 });
    }
  };
}

export function toDate(v: unknown): Date | null {
  if (!v) return null;
  const d = new Date(v as string);
  return isNaN(d.getTime()) ? null : d;
}

export function toInt(v: unknown, fallback = 0): number {
  if (v === null || v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

export function toStr(v: unknown, fallback = ""): string {
  if (v === null || v === undefined) return fallback;
  return String(v);
}

export function toBool(v: unknown): boolean {
  return v === true || v === "true";
}

export function nullable(v: unknown): string | null {
  if (v === null || v === undefined || v === "") return null;
  return String(v);
}

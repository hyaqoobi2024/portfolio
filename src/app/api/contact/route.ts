import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // In production, send email via Resend/SendGrid/etc.
  // For now, log and acknowledge
  console.log("Contact form submission:", body);
  return NextResponse.json({ success: true });
}

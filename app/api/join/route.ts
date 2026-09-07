import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = Object.fromEntries((await request.formData()).entries());
  if (!data.firstName || !data.lastName || !data.email || !data.interest) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const result = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, source: "adtrealtyaz.com", createdAt: new Date().toISOString() }) });
    if (!result.ok) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

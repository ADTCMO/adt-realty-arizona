import { NextResponse } from "next/server";
const EMAIL = "mikedingman@adthomes.com";
export async function POST(request: Request) {
  const data = Object.fromEntries((await request.formData()).entries());
  if (!data.email || !data.leadType) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  if (data.leadType === "Seller home value" && !data.address) return NextResponse.json({ error: "Property address is required" }, { status: 400 });
  if (data.leadType === "Join ADT Realty" && (!data.name || !data.careerStage)) return NextResponse.json({ error: "Name and career stage are required" }, { status: 400 });
  if (data.leadType === "Talk to an agent" && !data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "Lead delivery is not configured" }, { status: 503 });
  const payload = { ...data, source: "adtrealtyaz.com", owner: "Mike Dingman", notificationEmail: EMAIL, createdAt: new Date().toISOString() };
  const result = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
  if (!result.ok) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}

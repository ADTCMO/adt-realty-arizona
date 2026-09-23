import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (form.get("website")) return NextResponse.json({ ok: true });

  const slug = String(form.get("slug") || "").trim();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!/^[a-z0-9-]{1,180}$/.test(slug) ||
      !name || name.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      phone.length > 40 || message.length > 2000) {
    return NextResponse.json({ error: "Check the form fields" }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "Lead delivery is unavailable" }, { status: 503 });

  const listingResponse = await fetch(
    `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  ).catch(() => null);
  if (!listingResponse?.ok) {
    return NextResponse.json({ error: "Listing unavailable" }, { status: 404 });
  }
  const listing = await listingResponse.json();
  if (!listing.agent?.email) {
    return NextResponse.json({ error: "Agent contact unavailable" }, { status: 503 });
  }

  const payload = {
    leadType: "Property showing request",
    name, email, phone, message,
    address: [listing.address, listing.city, "AZ", listing.zip].filter(Boolean).join(", "),
    propertyId: listing.id,
    pageUrl: `https://www.adtrealtyaz.com/home/${slug}`,
    source: "adtrealtyaz.com property page",
    owner: listing.agent.name || "ADT Realty",
    notificationEmail: listing.agent.email,
    createdAt: new Date().toISOString(),
  };
  const result = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}

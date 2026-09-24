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

  const listingResponse = await fetch(
    `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  ).catch(() => null);
  if (!listingResponse?.ok) {
    return NextResponse.json({ error: "Listing unavailable" }, { status: 404 });
  }
  const listing = await listingResponse.json();
  const address = [listing.address, listing.city, "AZ", listing.zip].filter(Boolean).join(", ");
  const pageUrl = `https://www.adtrealtyaz.com/home/${slug}`;
  const question = [
    "ACE MARKETING PROPERTY SHOWING REQUEST — RESPONSE NEEDED",
    `Property: ${address}`,
    `Property page: ${pageUrl}`,
    listing.id ? `Listing ID: ${listing.id}` : null,
    listing.agent?.name ? `Listing agent: ${listing.agent.name}` : null,
    listing.agent?.email ? `Listing agent email: ${listing.agent.email}` : null,
    `Requester: ${name}`,
    phone ? `Phone: ${phone}` : null,
    `Requested time / message: ${message || "Please contact the requester to arrange a showing."}`,
  ].filter(Boolean).join("\n");

  // ACE Buyer's public question endpoint creates a Lofty lead, note, and follow-up
  // task assigned to Mike. No Lofty credential is exposed to this public site.
  const result = await fetch("https://acebuyer.adtrealtyaz.com/api/question", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      firstName: name,
      email,
      phone,
      question,
      preferredResponse: phone ? "call" : "email",
      planningContext: { source: "ACE Marketing property page", property: address, pageUrl },
    }),
    cache: "no-store",
  }).catch(() => null);
  if (!result?.ok) {
    console.error("Property showing delivery failed", result?.status ?? "network error");
    return NextResponse.json({ error: "Showing request could not be sent" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

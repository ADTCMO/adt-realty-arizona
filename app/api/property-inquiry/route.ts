import { NextResponse } from "next/server";

const LOFTY_BASE = "https://api.lofty.com";
const OWNER_ID = process.env.LOFTY_ASSIGNED_USER_ID || "844769665620463";

async function lofty(path: string, key: string, init: RequestInit = {}) {
  const response = await fetch(`${LOFTY_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `token ${key}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`Lofty ${response.status} on ${path.split("?")[0]}: ${detail}`);
  }
  return response.json();
}

function leadId(data: any) {
  const first = data?.leads?.[0] ?? data?.data?.leads?.[0] ??
    (Array.isArray(data?.data) ? data.data[0] : null);
  return data?.leadId ?? data?.id ?? data?.data?.leadId ?? data?.data?.id ?? first?.id;
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (form.get("website")) return NextResponse.json({ ok: true });

  const slug = String(form.get("slug") || "").trim();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const phone = String(form.get("phone") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!/^[a-z0-9-]{1,180}$/.test(slug) ||
      !name || name.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      phone.length > 40 || message.length > 2000) {
    return NextResponse.json({ error: "Check the form fields" }, { status: 400 });
  }

  const key = process.env.LOFTY_API_KEY?.trim();
  if (!key) return NextResponse.json({ error: "Showing request delivery is not configured" }, { status: 503 });

  const listingResponse = await fetch(
    `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  ).catch(() => null);
  if (!listingResponse?.ok) return NextResponse.json({ error: "Listing unavailable" }, { status: 404 });
  const listing = await listingResponse.json();
  const address = [listing.address, listing.city, "AZ", listing.zip].filter(Boolean).join(", ");
  const pageUrl = `https://www.adtrealtyaz.com/home/${slug}`;
  const note = [
    "ACE MARKETING PROPERTY SHOWING REQUEST — RESPONSE NEEDED",
    `Property: ${address}`,
    `Property page: ${pageUrl}`,
    listing.id ? `Listing ID: ${listing.id}` : null,
    listing.agent?.name ? `Listing page agent: ${listing.agent.name}` : null,
    `Requester: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Requested time / message: ${message || "Please contact the requester to arrange a showing."}`,
  ].filter(Boolean).join("\n").slice(0, 2000);

  try {
    const [firstName, ...rest] = name.split(/\s+/);
    const created = await lofty("/v1.0/leads", key, {
      method: "POST",
      body: JSON.stringify({
        firstName, lastName: rest.join(" "), emails: [email],
        phones: phone ? [phone] : [], leadTypes: [2],
        source: "ACE Marketing property page",
        tagsAdd: ["ACE Marketing", "Showing Request"],
        content: `Showing request for ${address}`,
        assignedUserId: OWNER_ID, ownershipId: OWNER_ID,
        ownershipScope: "PERSONAL", welcomeEmail: false, leadAlert: true,
      }),
    });
    const id = leadId(created);
    if (!id) throw new Error("Lofty lead ID missing");
    await lofty("/v1.0/notes", key, {
      method: "POST", body: JSON.stringify({ leadId: id, content: note, isPin: true }),
    });
    await lofty("/v1.0/tasks", key, {
      method: "POST",
      body: JSON.stringify({
        leadId: id,
        content: `ACE MARKETING SHOWING — ${address}`,
        deadline: Date.now(), type: phone ? "Call" : "Email", assignedRole: "Agent",
      }),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ACE Marketing Lofty delivery failed", error instanceof Error ? error.message : "Unknown error", "key format", { prefixed: /^token\s+/i.test(key), quoted: /^[\"\']|[\"\']$/.test(key), jwtParts: key.split(".").length, hasWhitespace: /\s/.test(key) });
    return NextResponse.json({ error: "Showing request could not be sent" }, { status: 502 });
  }
}

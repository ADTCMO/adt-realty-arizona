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

  const loftyKey = process.env.LOFTY_API_KEY?.trim();
  if (!loftyKey) return NextResponse.json({ error: "Lead delivery is unavailable" }, { status: 503 });

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

  const owner = process.env.LOFTY_ASSIGNED_USER_ID?.trim() || "844769665620463";
  const address = [listing.address, listing.city, "AZ", listing.zip].filter(Boolean).join(", ");
  const pageUrl = `https://www.adtrealtyaz.com/home/${slug}`;
  const lofty = async (path: string, method = "GET", body?: object) => {
    const response = await fetch(`https://api.lofty.com${path}`, {
      method, cache: "no-store",
      headers: { Authorization: `token ${loftyKey}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) throw new Error(`Lofty request failed: ${response.status}`);
    return response.json();
  };
  try {
    const existing = await lofty(`/v1.0/leads?email=${encodeURIComponent(email.toLowerCase())}&preciseSearchFlag=true&limit=1`);
    const found = [existing?.leads, existing?.data?.leads, existing?.data, existing?.list, existing?.results]
      .find((value) => Array.isArray(value) && value.length)?.[0];
    let leadId = found?.leadId ?? found?.id;
    const tags = ["ADT Realty Property Page", "Showing Request"];
    if (!leadId) {
      const [firstName, ...rest] = name.split(/\s+/);
      const created = await lofty("/v1.0/leads", "POST", {
        firstName, lastName: rest.join(" "), emails: [email.toLowerCase()],
        phones: phone ? [phone] : [], leadTypes: [2],
        source: "ADT Realty Property Page", tagsAdd: tags,
        content: `Showing request for ${address}`,
        assignedUserId: owner, ownershipId: owner, ownershipScope: "PERSONAL",
        welcomeEmail: false, leadAlert: true,
      });
      leadId = created?.leadId ?? created?.id ?? created?.data?.leadId ?? created?.data?.id;
      if (!leadId) {
        const lookup = await lofty(`/v1.0/leads?email=${encodeURIComponent(email.toLowerCase())}&preciseSearchFlag=true&limit=1`);
        leadId = [lookup?.leads, lookup?.data?.leads, lookup?.data, lookup?.list, lookup?.results]
          .find((value) => Array.isArray(value) && value.length)?.[0]?.id;
      }
    } else {
      await lofty(`/v1.0/leads/${leadId}`, "PUT", { tagsAdd: tags });
    }
    if (!leadId) throw new Error("Lofty did not return a lead ID");
    await lofty("/v1.0/notes", "POST", {
      leadId, isPin: true,
      content: ["PROPERTY SHOWING REQUEST — RESPONSE NEEDED", `Property: ${address}`,
        `Page: ${pageUrl}`, `Listing agent: ${listing.agent.name || "ADT Realty"} (${listing.agent.email})`,
        `Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null,
        `Message: ${message || "Please contact me about a showing."}`].filter(Boolean).join("\n").slice(0, 2000),
    });
    await lofty("/v1.0/tasks", "POST", {
      leadId, content: `Showing request: ${address} — ${name}`.slice(0, 500),
      deadline: Date.now(), type: "Call", assignedRole: "Agent",
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Property inquiry Lofty delivery failed", error);
    return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  }
}

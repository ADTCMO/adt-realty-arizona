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
  const text = (key: string, max = 500) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim().slice(0, max) : "";
  };
  const email = text("email", 254).toLowerCase();
  const name = text("name", 120);
  const kind = text("leadType", 100);
  const phone = text("phone", 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !kind)
    return NextResponse.json({ error: "Enter a valid email and inquiry type" }, { status: 400 });
  if (kind === "Seller home value" && !text("address"))
    return NextResponse.json({ error: "Property address is required" }, { status: 400 });
  if (kind === "Join ADT Realty" && (!name || !text("careerStage")))
    return NextResponse.json({ error: "Name and career stage are required" }, { status: 400 });
  if (kind === "Talk to an agent" && !name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const key = process.env.LOFTY_API_KEY?.trim();
  if (!key) return NextResponse.json({ error: "Lead delivery is not configured" }, { status: 503 });
  const note = [
    "ADT REALTY ARIZONA — WEBSITE INQUIRY",
    "Inquiry: " + kind, "Name: " + (name || "Website visitor"), "Email: " + email,
    ...Array.from(form.entries()).filter(([k, v]) => typeof v === "string" && !["name", "email", "website"].includes(k))
      .map(([k, v]) => k.slice(0, 60) + ": " + String(v).slice(0, 1000)),
    "Source: adtrealtyaz.com",
  ].join("\n").slice(0, 2000);
  try {
    const found = await lofty("/v1.0/leads?email=" + encodeURIComponent(email) + "&preciseSearchFlag=true&limit=1", key);
    let id = leadId(found);
    if (!id) {
      const [firstName, ...rest] = (name || "Website Visitor").split(/\s+/);
      const created = await lofty("/v1.0/leads", key, { method: "POST", body: JSON.stringify({
        firstName, lastName: rest.join(" "), emails: [email], phones: phone ? [phone] : [],
        source: "adtrealtyaz.com", tagsAdd: ["ADT Arizona Website", kind],
        content: note, assignedUserId: OWNER_ID, ownershipId: OWNER_ID,
        ownershipScope: "PERSONAL", welcomeEmail: false, leadAlert: true,
      }) });
      id = leadId(created);
      if (!id) id = leadId(await lofty("/v1.0/leads?email=" + encodeURIComponent(email) + "&preciseSearchFlag=true&limit=1", key));
    } else {
      await lofty("/v1.0/leads/" + id, key, {method:"PUT", body:JSON.stringify({\n        tagsAdd:["ADT Arizona Website",kind],\n        assignedUserId:OWNER_ID,\n        ownershipId:OWNER_ID,\n        ownershipScope:"PERSONAL",\n      })});
    }
    if (!id) throw new Error("Lead ID missing");
    await lofty("/v1.0/notes", key, {method:"POST",body:JSON.stringify({leadId:id,content:note,isPin:true})});
    await lofty("/v1.0/tasks", key, {method:"POST",body:JSON.stringify({
      leadId:id,content:"ADT WEBSITE — Respond to " + kind + " inquiry.",
      deadline:Date.now(),type:phone?"Call":"Email",assignedRole:"Agent"
    })});
    return NextResponse.json({ok:true});
  } catch {
    console.error("ADT website Lofty delivery failed");
    return NextResponse.json({error:"Lead delivery failed. Please try again."},{status:502});
  }
}

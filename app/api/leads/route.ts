import { NextResponse } from "next/server";
import { agentInquiryNote, resolveAgentLeadContext, type AgentInquiryPage } from "../../../lib/agent-lead-context";
import { AgentConnectionUnavailable, assertAgentLeadOwner, resolveAgentConnection, parseLoftyJson, type ActiveAgentConnection } from "../../../lib/agent-connection";
import { agentCreatedLeadId, agentSearchLead, agentDetailLead } from "../../../lib/agent-lead-identity";
import { readAgentRequest, AgentRequestError } from "../../../lib/agent-request";
const LOFTY_BASE = "https://api.lofty.com";
const OWNER_ID = process.env.LOFTY_ASSIGNED_USER_ID || "844769665620463";
// Visitor-supplied routing/attribution fields must not masquerade as trusted CRM metadata.
const RESERVED_NOTE_FIELDS = new Set([
  "name", "email", "website", "agentSlug", "agentName", "agentPage", "agentReferrer",
  "source", "referrer", "assignedUserId", "ownershipId", "ownershipScope", "apiKey", "LOFTY_API_KEY", "destination", "agent", "agentVersion", "agentPublicationVersion", "agentInquiryPage", "x-ace-agent",
]);

class LoftyReadNotReady extends Error {}
async function activeLoftyJson(response: Response) {
  const maxBytes = 262144;
  const declared = response.headers.get('content-length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) throw new Error('Lofty response is too large');
  if (!response.body) throw new Error('Empty Lofty response');
  const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) { const {done,value} = await reader.read(); if (done) break; size += value.byteLength; if (size > maxBytes) throw new Error('Lofty response is too large'); chunks.push(value); }
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.byteLength; }
  return parseLoftyJson(new TextDecoder().decode(bytes));
}

async function lofty(path: string, key: string, init: RequestInit = {}, strict = false, timeoutMs = 10000) {
  const response = await fetch(`${LOFTY_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `token ${key}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store", redirect: "error", signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    await response.body?.cancel().catch(() => {});
    if (strict && response.status === 404 && (!init.method || init.method === "GET")) throw new LoftyReadNotReady("Lead detail is not available yet");
    throw new Error("Lofty delivery request failed");
  }
  const data: any = strict ? await activeLoftyJson(response) : await response.json();
  if (strict) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid Lofty response');
    for (const value of [data, data.data, data.lead, data.data?.lead]) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const key of ['errorCode', 'error_code']) if (key in value && ![0, '0', 200, '200'].includes(value[key])) throw new Error('Lofty application error');
        if (value.error || value.success === false) throw new Error('Lofty application error');
      }
    }
  }
  return data;
}

function leadId(data: any) {
  const first = data?.leads?.[0] ?? data?.data?.leads?.[0] ??
    (Array.isArray(data?.data) ? data.data[0] : null);
  return data?.leadId ?? data?.id ?? data?.data?.leadId ?? data?.data?.id ?? first?.id;
}

function firstLead(data: any) {
  return data?.leads?.[0] ?? data?.data?.leads?.[0] ?? (Array.isArray(data?.data) ? data.data[0] : null) ?? data?.data ?? data;
}
function safeLeadId(value: unknown) {
  return (typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value)) || (typeof value === 'number' && Number.isSafeInteger(value) && value > 0);
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
  let inquiryPage: AgentInquiryPage = 'home';
  if (form.has('agentSlug')) {
    const selectedPage = form.get('agentInquiryPage') ?? 'home';
    const kindMatches = (selectedPage === 'home' && kind === 'Talk to an agent') ||
      (selectedPage === 'join' && kind === 'Join ADT Realty') ||
      (selectedPage === 'hero' && kind === 'Community Heroes Savings');
    if (form.getAll('leadType').length !== 1 || form.getAll('agentInquiryPage').length > 1 || !kindMatches || !name) {
      return NextResponse.json({error: 'Enter a name and valid inquiry type.'}, {status: 400});
    }
    inquiryPage = selectedPage as AgentInquiryPage;
    if (inquiryPage === 'hero' && (!['Military / Veteran','Law Enforcement','Firefighter / EMS','Healthcare','Educator / School Staff','Other Community Service'].includes(text('profession')) || !['buy','sell','both'].includes(text('plan')))) {
      return NextResponse.json({error: 'Choose a valid hero category and buying or selling plan.'}, {status: 400});
    }
  }
  let requested: ReturnType<typeof readAgentRequest>;
  try { requested = readAgentRequest(request, form); }
  catch (error) { return NextResponse.json({error: error instanceof AgentRequestError ? error.message : 'Invalid agent request.', code: 'agent_context_invalid'}, {status: error instanceof AgentRequestError ? error.status : 400}); }
  const defaultKey = process.env.LOFTY_API_KEY?.trim();
  if (!requested && !defaultKey) return NextResponse.json({ error: "Lead delivery is not configured" }, { status: 503 });
  const resolution = await resolveAgentLeadContext(form, request, inquiryPage);
  if ("error" in resolution) return NextResponse.json({ error: resolution.error, ...(resolution.status === 409 ? {code: "agent_context_invalid"} : {}) }, { status: resolution.status });
  const agent = resolution.context;
  let activeConnection: ActiveAgentConnection | null = null;
  if (requested) {
    if (!agent || agent.slug !== requested.slug || agent.publicationVersion !== requested.publicationVersion) return NextResponse.json({error: 'Agent page version changed. Reload your agent’s page.',code:'agent_context_invalid'}, {status: 409});
    try {
      const resolved = await resolveAgentConnection({agentSlug: agent.slug, agentPublicationVersion: requested.publicationVersion});
      if (resolved.mode === 'agent') activeConnection = resolved;
    } catch (error) { return NextResponse.json({error: error instanceof AgentConnectionUnavailable ? error.message : 'Your agent’s connection is unavailable.'}, {status: error instanceof AgentConnectionUnavailable ? error.status : 503}); }
  }
  const key = activeConnection?.apiKey ?? defaultKey;
  if (!key) return NextResponse.json({error: 'Lead delivery is not configured.'}, {status: 503});
  const owner = activeConnection?.loftyUserId ?? OWNER_ID;
  const crm = (path: string, init: RequestInit = {}, timeoutMs = 10000) => lofty(path, key, init, !!activeConnection, timeoutMs);
  async function readCreatedLead(id: string) {
    // Lofty documents brief 404s while a new lead persists. Repeat only this
    // read, using the same ID/key, and cap the entire sequence at five seconds.
    const deadline = Date.now() + 5000;
    for (let attempt = 0; attempt < 3; attempt++) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) throw new Error('Lead verification timed out');
      let timer: ReturnType<typeof setTimeout>;
      try {
        return await Promise.race([crm('/v1.0/leads/' + encodeURIComponent(id), {}, remaining),
          new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('Lead verification timed out')), remaining); })]);
      }
      catch (error) {
        if (!(error instanceof LoftyReadNotReady) || attempt === 2) throw error;
        const delay = Math.min(attempt === 0 ? 150 : 350, Math.max(0, deadline - Date.now()));
        if (delay <= 0) throw new Error('Lead verification timed out');
        await new Promise(resolve => setTimeout(resolve, delay));
      } finally { clearTimeout(timer!); }
    }
    throw new Error('Lead verification timed out');
  }
  const source = agent ? `adtrealtyaz.com/${agent.slug}` : "adtrealtyaz.com";
  const note = agent ? agentInquiryNote(agent, { kind, name, email, phone, message: text("message", 1000), extra: inquiryPage === 'join' ? [['Career stage', text('careerStage', 120)]] : inquiryPage === 'hero' ? [
    ['Hero category', text('profession', 120)], ['Plan', text('plan', 20)], ['Calculator mode', text('calculatorMode', 20)],
    ['Estimated reward (visitor estimate)', text('estimatedReward', 40)], ['Estimated buy price', text('buyPrice', 40)], ['Estimated sell price', text('sellPrice', 40)],
  ] : [] }, activeConnection ? `${agent.name} / verified agent integration` : undefined) : [
    "ADT REALTY ARIZONA — WEBSITE INQUIRY",
    "Inquiry: " + kind, "Name: " + (name || "Website visitor"), "Email: " + email,
    ...Array.from(form.entries()).filter(([k, v]) => typeof v === "string" && !RESERVED_NOTE_FIELDS.has(k))
      .map(([k, v]) => k.slice(0, 60) + ": " + String(v).slice(0, 1000)),
    "Source: adtrealtyaz.com",
  ].join("\n").slice(0, 2000);
  let mutationAttempted = false;
  try {
    const found = await crm("/v1.0/leads?email=" + encodeURIComponent(email) + "&preciseSearchFlag=true&limit=1");
    const existing = activeConnection ? agentSearchLead(found) : firstLead(found);
    let id = activeConnection ? existing?.id : leadId(found);
    if (id && activeConnection) assertAgentLeadOwner(existing.record, activeConnection);
    if (id && !safeLeadId(id)) throw new Error("Invalid lead identity");
    if (!id) {
      const [firstName, ...rest] = (name || "Website Visitor").split(/\s+/);
      mutationAttempted = true;
      const created = await crm("/v1.0/leads", { method: "POST", body: JSON.stringify({
        firstName, lastName: rest.join(" "), emails: [email], phones: phone ? [phone] : [],
        source, tagsAdd: ["ADT Arizona Website", kind],
        content: note, assignedUserId: owner, ownershipId: owner,
        ownershipScope: "PERSONAL", welcomeEmail: false, leadAlert: true,
      }) });
      id = activeConnection ? agentCreatedLeadId(created) : leadId(created);
      if (!id) {
        const recovered = await crm("/v1.0/leads?email=" + encodeURIComponent(email) + "&preciseSearchFlag=true&limit=1");
        const recoveredLead = activeConnection ? agentSearchLead(recovered) : firstLead(recovered);
        if (activeConnection) assertAgentLeadOwner(recoveredLead?.record, activeConnection);
        id = activeConnection ? recoveredLead?.id : leadId(recovered);
      } else if (activeConnection) {
        // Lofty can deduplicate a create to an existing contact. Read the actual
        // resulting assignment before adding notes/tasks; never reassign it.
        if (!safeLeadId(id)) throw new Error('Invalid lead identity');
        const saved = await readCreatedLead(String(id));
        const savedLead = agentDetailLead(saved);
        if (savedLead.id !== String(id)) throw new Error('Returned lead identity does not match');
        assertAgentLeadOwner(savedLead.record, activeConnection);
      }
    } else {
      mutationAttempted = true;
      await crm("/v1.0/leads/" + encodeURIComponent(String(id)), {method:"PUT", body:JSON.stringify({
        tagsAdd:["ADT Arizona Website",kind],
        ...(activeConnection ? {} : {assignedUserId: owner, ownershipId: owner, ownershipScope: 'PERSONAL'}),
      })});
    }
    if (!id || !safeLeadId(id)) throw new Error("Lead ID missing");
    await crm("/v1.0/notes", {method:"POST",body:JSON.stringify({leadId:id,content:note,isPin:true})});
    await crm("/v1.0/tasks", {method:"POST",body:JSON.stringify({
      leadId:id,content:"ADT WEBSITE — Respond to " + kind + " inquiry.",
      deadline:Date.now(),type:phone?"Call":"Email",assignedRole:"Agent"
    })});
    return NextResponse.json(agent ? {ok:true,recipientName:activeConnection ? agent.name : "Mike Dingman"} : {ok:true});
  } catch (error) {
    if (activeConnection) {
      if (error instanceof AgentConnectionUnavailable && !mutationAttempted) return NextResponse.json({error: error.message, deliveryState: 'not_sent'}, {status: error.status});
      return NextResponse.json({error: mutationAttempted ? 'Delivery could not be confirmed. Please contact your agent before trying again.' : 'Your agent’s delivery service is unavailable. Nothing was sent.', deliveryState: mutationAttempted ? 'unknown' : 'not_sent'}, {status: 502});
    }
    console.error("ADT website Lofty delivery failed");
    return NextResponse.json({error:"Lead delivery failed. Please try again."},{status:502});
  }
}

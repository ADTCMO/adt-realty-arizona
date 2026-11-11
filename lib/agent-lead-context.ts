import { getPublishedAgent, isAgentSlug } from './published-agent';

const AGENT_SITE_ORIGIN = 'https://www.adtrealtyaz.com';
const PUBLIC_ORIGINS = new Set([AGENT_SITE_ORIGIN, 'https://adtrealtyaz.com']);

export type AgentLeadContext = { slug: string; name: string; page: string; referrer: string | null };
export type AgentLeadResolution =
  | { context: AgentLeadContext | null }
  | { error: string; status: number };

/** Single-line, bounded CRM metadata. Never use visitor input for a credential or destination. */
export function crmLine(value: string, max: number) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, ' ').trim().slice(0, max);
}

export async function resolveAgentLeadContext(form: FormData, request: Request): Promise<AgentLeadResolution> {
  if (!form.has('agentSlug')) return { context: null };
  const values = form.getAll('agentSlug');
  const slug = values[0];
  if (values.length !== 1 || typeof slug !== 'string' || !isAgentSlug(slug)) {
    return { error: 'Invalid agent page. Reload the page before sending.', status: 400 };
  }

  // Referrer may be absent because of browser privacy settings. If supplied, only
  // retain a matching public page, never query parameters, fragments or credentials.
  // An origin-only privacy referrer is accepted without asserting a page referrer.
  let referrer: string | null = null;
  const rawReferrer = request.headers.get('referer');
  if (rawReferrer) {
    try {
      const url = new URL(rawReferrer);
      if (rawReferrer.length > 2048 || !PUBLIC_ORIGINS.has(url.origin) || url.username || url.password) throw new Error('Invalid referrer');
      const originOnly = url.pathname === '/' && !url.search && !url.hash;
      if (!originOnly) {
        if (url.pathname !== `/${slug}` && url.pathname !== `/${slug}/`) throw new Error('Invalid referrer');
        referrer = `${url.origin}/${slug}`;
      }
    } catch {
      return { error: 'Agent page does not match this request. Reload the page before sending.', status: 400 };
    }
  }

  // Recheck current publication at submission time. The browser supplies only a
  // slug; agent names and canonical URLs come from the allowlisted public record.
  const agent = await getPublishedAgent(slug);
  if (!agent) return { error: 'Agent page could not be verified. Please try again.', status: 503 };
  return { context: { slug: agent.slug, name: crmLine(agent.full_name, 160), page: `${AGENT_SITE_ORIGIN}/${agent.slug}`, referrer } };
}

export function agentInquiryNote(context: AgentLeadContext, details: { kind: string; name: string; email: string; phone: string; message: string }) {
  // Validated attribution comes first so a long visitor message cannot truncate it.
  return [
    'ADT REALTY ARIZONA — AGENT WEBSITE INQUIRY',
    `Agent page: ${context.page}`,
    `Agent slug: ${context.slug}`,
    `Agent name: ${context.name}`,
    context.referrer ? `Referrer: ${context.referrer}` : 'Referrer: not available',
    'Routing: Mike Dingman / main brokerage integration (temporary)',
    `Inquiry: ${crmLine(details.kind, 100)}`,
    `Name: ${crmLine(details.name, 120)}`,
    `Email: ${crmLine(details.email, 254)}`,
    details.phone ? `Phone: ${crmLine(details.phone, 40)}` : null,
    `Message: ${crmLine(details.message, 1000)}`,
  ].filter(Boolean).join('\n').slice(0, 2000);
}

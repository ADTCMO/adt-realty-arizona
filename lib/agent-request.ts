import 'server-only';
import { isAgentSlug } from './published-agent';
const PUBLIC_ORIGINS = new Set(['https://www.adtrealtyaz.com', 'https://adtrealtyaz.com']);
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
export class AgentRequestError extends Error { constructor(public status: number, message: string) { super(message); } }
type Selection = {slug: string; publicationVersion: string};
function invalid(): never { throw new AgentRequestError(400, 'Agent page information is incomplete or changed. Reload your agent’s page.'); }
function pair(slugs: unknown[], versions: unknown[]): Selection | null {
  if (!slugs.length && !versions.length) return null;
  if (slugs.length !== 1 || versions.length !== 1 || typeof slugs[0] !== 'string' || !isAgentSlug(slugs[0]) || typeof versions[0] !== 'string' || !UUID.test(versions[0])) invalid();
  return {slug: slugs[0], publicationVersion: versions[0]};
}
/** Each body/query/header representation must be complete by itself. Never repair a partial selector using another channel. */
export function readAgentRequest(request: Request, form: FormData): Selection | null {
  const url = new URL(request.url);
  const legacy = ['agent','agent_version','agentVersion'];
  if (legacy.some(key => form.has(key) || url.searchParams.has(key))) invalid();
  const selected = pair(form.getAll('agentSlug'),form.getAll('agentPublicationVersion'));
  const query = pair(url.searchParams.getAll('agentSlug'),url.searchParams.getAll('agentPublicationVersion'));
  const header = pair(request.headers.has('x-ace-agent') ? [request.headers.get('x-ace-agent')] : [],request.headers.has('x-ace-agent-version') ? [request.headers.get('x-ace-agent-version')] : []);
  if ([query,header].some(value => value && (!selected || value.slug !== selected.slug || value.publicationVersion !== selected.publicationVersion))) invalid();
  const rawRef = request.headers.get('referer');
  if (rawRef && rawRef.length <= 2048) {
    try {
      const ref = new URL(rawRef);
      if (PUBLIC_ORIGINS.has(ref.origin)) {
        if (legacy.some(key => ref.searchParams.has(key))) invalid();
        const referring = pair(ref.searchParams.getAll('agentSlug'),ref.searchParams.getAll('agentPublicationVersion'));
        if (referring && (!selected || referring.slug !== selected.slug || referring.publicationVersion !== selected.publicationVersion)) invalid();
        const pathSlug = ref.pathname.replace(/^\//, '').replace(/\/$/, '');
        if (!selected && isAgentSlug(pathSlug)) invalid();
      }
    } catch (error) { if (error instanceof AgentRequestError) throw error; }
  }
  return selected;
}

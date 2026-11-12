import 'server-only';

const MARKETING = 'https://lklgtilyptasjdxqfsij.supabase.co';
const BROKER = `${MARKETING}/functions/v1/agent-connections`;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const SLUG = /^[a-z0-9]{3,50}$/;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NO_STORE = { 'Cache-Control': 'no-store, max-age=0', Pragma: 'no-cache' };
export type AgentContext = Readonly<{agentSlug: string; agentPublicationVersion: string}>;
export type ActiveAgentConnection = Readonly<{
  mode: 'agent'; ownerId: string; slug: string; publicationVersion: string; connectionVersion: string;
  apiKey: string; loftyUserId: string; loftyEmail: string;
}>;
export type AgentConnection = {mode: 'brokerage'} | ActiveAgentConnection;
export type PublicAgentRouting = {slug: string; publicationVersion: string; mode: 'brokerage' | 'agent' | 'unavailable'};
type Dependencies = {fetch?: typeof fetch; getToken?: () => string | Promise<string>};
export class AgentConnectionUnavailable extends Error {
  constructor(public status = 503, message = 'Your agent’s connection could not be verified. Nothing was sent.') { super(message); }
}
function record(value: unknown): value is Record<string, unknown> { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function validId(value: unknown): string | null {
  if (typeof value === 'number' && (!Number.isSafeInteger(value) || value <= 0)) return null;
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  return /^[1-9]\d{0,29}$/.test(String(value)) ? String(value) : null;
}
/** Preserve exact numeric lexemes so identity validation never accepts a rounded ID. All other JSON syntax remains JSON.parse's responsibility. */
export function parseLoftyJson(raw: string): unknown {
  if (raw.length > 262144) throw new Error("Lofty response is too large");
  // Validate the original syntax first: quoting an invalid numeric object key must not repair it.
  JSON.parse(raw);
  let output = "";
  for (let i = 0; i < raw.length;) {
    const start = i;
    if (raw[i] === '"') {
      for (i++; i < raw.length; i++) {
        if (raw[i] === "\\") i++;
        else if (raw[i] === '"') { i++; break; }
      }
      output += raw.slice(start, i);
    } else if (raw[i] === "-" || /[0-9]/.test(raw[i])) {
      const match = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(raw.slice(i));
      if (!match) { output += raw[i++]; continue; }
      const token = match[0];
      output += /[.eE]/.test(token) || !Number.isSafeInteger(Number(token)) ? JSON.stringify(token) : token;
      i += token.length;
    } else output += raw[i++];
  }
  return JSON.parse(output);
}
function contextValid(value: AgentContext) { return SLUG.test(value.agentSlug) && UUID.test(value.agentPublicationVersion); }
function publicKey() {
  const value = process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';
  if (!value || value.length > 4096 || /[\r\n]/.test(value) || value.startsWith('sb_secret_')) throw new AgentConnectionUnavailable();
  if (value.split('.').length === 3) {
    try { if (JSON.parse(Buffer.from(value.split('.')[1], 'base64url').toString('utf8')).role !== 'anon') throw new Error(); }
    catch { throw new AgentConnectionUnavailable(); }
  }
  return value;
}
async function boundedJson(response: Response | Request, maxBytes = 8192, timeoutMs = 7000, preserveIntegers = false): Promise<unknown> {
  const length = response.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) throw new AgentConnectionUnavailable();
  if (!response.body) throw new AgentConnectionUnavailable();
  const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  let timer: ReturnType<typeof setTimeout>;
  const deadline = new Promise<never>((_, reject) => {timer = setTimeout(() => reject(new AgentConnectionUnavailable()), timeoutMs);});
  try {
    while (true) { const {done,value} = await Promise.race([reader.read(),deadline]); if (done) break; size += value.byteLength; if (size > maxBytes) throw new AgentConnectionUnavailable(); chunks.push(value); }
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  finally {clearTimeout(timer!);reader.releaseLock();}
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) {bytes.set(chunk,offset);offset+=chunk.byteLength;}
  const raw = new TextDecoder().decode(bytes);
  return preserveIntegers ? parseLoftyJson(raw) : JSON.parse(raw);
}
async function broker(body: Record<string, unknown>, dependencies: Dependencies, token?: string) {
  const key = publicKey();
  try {
    const response = await (dependencies.fetch ?? fetch)(BROKER, {
      method: 'POST', headers: {'Content-Type':'application/json', apikey:key, ...(token ? {Authorization:`Bearer ${token}`} : {})},
      body: JSON.stringify(body), cache:'no-store', redirect:'error', signal:AbortSignal.timeout(30000),
    });
    if (!response.ok) { await response.body?.cancel().catch(() => {}); throw new AgentConnectionUnavailable(response.status === 404 ? 404 : response.status === 409 ? 409 : 503); }
    const data = await boundedJson(response);
    if (!record(data) || data.schemaVersion !== 1 || data.error !== undefined) throw new AgentConnectionUnavailable();
    return data;
  } catch (error) { if (error instanceof AgentConnectionUnavailable) throw error; throw new AgentConnectionUnavailable(); }
}
async function workloadToken() {
  // Read the runtime's short-lived workload identity inside the request. Never
  // persist it or replace it with a shared secret or administrator session.
  const {getVercelOidcToken} = await import('@vercel/oidc');
  return getVercelOidcToken({ audience: BROKER });
}
async function productionWorkloadToken(dependencies: Dependencies) {
  if (process.env.VERCEL_ENV !== 'production') throw new AgentConnectionUnavailable();
  let token: string;
  try { token = await (dependencies.getToken ?? workloadToken)(); } catch { throw new AgentConnectionUnavailable(); }
  if (typeof token !== 'string' || token.length > 16384 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) throw new AgentConnectionUnavailable();
  return token;
}
export async function resolveAgentConnection(context: AgentContext, dependencies: Dependencies = {}): Promise<AgentConnection> {
  if (!contextValid(context)) throw new AgentConnectionUnavailable(400, 'Agent page information is incomplete. Reload your agent’s page.');
  const token = await productionWorkloadToken(dependencies);
  const data = await broker({op:'server.resolve',slug:context.agentSlug,publicationVersion:context.agentPublicationVersion},dependencies,token);
  if (data.slug !== context.agentSlug || data.publicationVersion !== context.agentPublicationVersion) throw new AgentConnectionUnavailable();
  if (data.mode === 'brokerage') {
    if (Object.keys(data).some(key => !['schemaVersion','slug','publicationVersion','mode'].includes(key))) throw new AgentConnectionUnavailable();
    return Object.freeze({mode:'brokerage'});
  }
  if (data.mode !== 'agent' || typeof data.ownerId !== 'string' || !UUID.test(data.ownerId) || typeof data.connectionVersion !== 'string' || !UUID.test(data.connectionVersion) ||
      typeof data.apiKey !== 'string' || !data.apiKey || data.apiKey.length > 4096 || /[\u0000-\u001f\u007f]/.test(data.apiKey) ||
      typeof data.loftyUserId !== 'string' || !validId(data.loftyUserId) || typeof data.loftyEmail !== 'string' || data.loftyEmail.length > 254 || !EMAIL.test(data.loftyEmail) ||
      Object.keys(data).some(key => !['schemaVersion','slug','publicationVersion','mode','ownerId','connectionVersion','apiKey','loftyUserId','loftyEmail'].includes(key))) throw new AgentConnectionUnavailable();
  return Object.freeze({mode:'agent',ownerId:data.ownerId,slug:context.agentSlug,publicationVersion:context.agentPublicationVersion,
    connectionVersion:data.connectionVersion,apiKey:data.apiKey,loftyUserId:data.loftyUserId,loftyEmail:data.loftyEmail.toLowerCase()});
}
export function assertAgentLeadOwner(lead: unknown, connection: ActiveAgentConnection) {
  if (!record(lead)) throw new AgentConnectionUnavailable(409, 'This contact’s assignment needs review. Nothing was reassigned.');
  const nested = record(lead.agent) ? lead.agent.id : undefined;
  const signals = [lead.assignedUserId,nested,lead.ownershipId].filter(value => value !== undefined && value !== null);
  if (validId(lead.assignedUserId) !== connection.loftyUserId || !signals.length || signals.some(value => validId(value) !== connection.loftyUserId) || (lead.ownershipScope !== undefined && lead.ownershipScope !== 'PERSONAL')) {
    throw new AgentConnectionUnavailable(409, 'This contact’s assignment needs review. Nothing was reassigned.');
  }
}
export async function getPublicAgentRouting(context: {agentSlug: string; agentPublicationVersion?: string}, dependencies: Dependencies = {}): Promise<PublicAgentRouting> {
  if (!SLUG.test(context.agentSlug) || (context.agentPublicationVersion !== undefined && !UUID.test(context.agentPublicationVersion))) throw new AgentConnectionUnavailable(400, 'Invalid agent page.');
  const data = await broker({op:'public.status',slug:context.agentSlug,...(context.agentPublicationVersion ? {publicationVersion:context.agentPublicationVersion} : {})},dependencies);
  if (data.slug !== context.agentSlug || typeof data.publicationVersion !== 'string' || !UUID.test(data.publicationVersion) ||
      (context.agentPublicationVersion && data.publicationVersion !== context.agentPublicationVersion) || !['brokerage','agent','unavailable'].includes(String(data.mode)) ||
      Object.keys(data).some(key => !['schemaVersion','slug','publicationVersion','mode'].includes(key))) throw new AgentConnectionUnavailable();
  return {slug:context.agentSlug,publicationVersion:data.publicationVersion,mode:data.mode as PublicAgentRouting['mode']};
}
export async function handlePublicAgentRouting(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  try {
    if (request.method !== 'GET' || params.getAll('slug').length !== 1 || params.getAll('publicationVersion').length > 1 || [...params.keys()].some(key => !['slug','publicationVersion'].includes(key))) throw new AgentConnectionUnavailable(400,'Invalid agent page.');
    return Response.json(await getPublicAgentRouting({agentSlug:params.get('slug')!,...(params.has('publicationVersion') ? {agentPublicationVersion:params.get('publicationVersion')!} : {})}),{headers:NO_STORE});
  } catch (error) {
    return Response.json({error:'Agent connection status is unavailable.'},{status:error instanceof AgentConnectionUnavailable ? error.status : 503,headers:NO_STORE});
  }
}


async function verifyMarketingAdmin(request: Request, dependencies: Dependencies) {
  const authorization = request.headers.get('authorization') ?? '';
  if (authorization.length > 8192 || !/^Bearer [A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(authorization)) throw new AgentConnectionUnavailable(401);
  const key = publicKey();
  async function read(url: string, method: 'GET' | 'POST') {
    const response = await (dependencies.fetch ?? fetch)(url, {
      method, headers:{apikey:key, Authorization:authorization,...(method === 'POST' ? {'Content-Type':'application/json'} : {})},
      ...(method === 'POST' ? {body:'{}'} : {}), cache:'no-store', redirect:'error', signal:AbortSignal.timeout(7000),
    });
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      throw new AgentConnectionUnavailable(response.status === 401 ? 401 : response.status === 403 ? 403 : 503);
    }
    const data = await boundedJson(response,32768);
    if (record(data) && (data.error !== undefined || data.success === false || ['errorCode','error_code'].some(field => field in data && ![0,'0',200,'200'].includes(data[field] as string | number)))) throw new AgentConnectionUnavailable(503);
    return data;
  }
  const user = await read(`${MARKETING}/auth/v1/user`,'GET');
  if (!record(user) || typeof user.id !== 'string' || !UUID.test(user.id) || user.role !== 'authenticated' || user.is_anonymous !== false ||
      typeof user.email !== 'string' || user.email.length > 254 || !EMAIL.test(user.email) || typeof user.email_confirmed_at !== 'string' ||
      !Number.isFinite(Date.parse(user.email_confirmed_at))) throw new AgentConnectionUnavailable(401);
  const profile = await read(`${MARKETING}/rest/v1/rpc/ace_agent_website_profile`,'POST');
  if (!record(profile) || profile.is_admin !== true || profile.error !== undefined) throw new AgentConnectionUnavailable(403);
}

/** Readiness proves this backend's current workload identity only. No agent, key, Vault record or Lofty endpoint is requested. */
export async function handleAgentConnectionReadiness(request: Request, dependencies: Dependencies = {}): Promise<Response> {
  const headers = {...NO_STORE,Vary:'Authorization'};
  try {
    if (request.method !== 'POST') return Response.json({error:'Method not allowed.'},{status:405,headers});
    if (new URL(request.url).search || request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new AgentConnectionUnavailable(400);
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) throw new AgentConnectionUnavailable(403);
    let input: unknown;
    try { input = await boundedJson(request,128,2000); } catch { throw new AgentConnectionUnavailable(400); }
    if (!record(input) || Object.keys(input).length !== 0) throw new AgentConnectionUnavailable(400);
    await verifyMarketingAdmin(request,dependencies);
    const token = await productionWorkloadToken(dependencies);
    const data = await broker({op:'server.probe'},dependencies,token);
    if (data.authorized !== true || typeof data.projectId !== 'string' || !/^prj_[A-Za-z0-9]{10,80}$/.test(data.projectId) || data.environment !== 'production' ||
        Object.keys(data).some(key => !['schemaVersion','authorized','projectId','environment'].includes(key))) throw new AgentConnectionUnavailable();
    return Response.json({schemaVersion:1,authorized:true,projectId:data.projectId,environment:'production'},{headers});
  } catch (error) {
    return Response.json({error:'Backend readiness could not be verified.'},{status:error instanceof AgentConnectionUnavailable ? error.status : 503,headers});
  }
}

/** Diagnostic only: inspect the existing brokerage account without exposing its key or issuing any write. */
export async function handleBrokerageIdentity(request: Request, configuredOwner: string, dependencies: Dependencies = {}): Promise<Response> {
  const headers = {...NO_STORE,Vary:'Authorization'};
  try {
    if (request.method !== 'POST') return Response.json({error:'Method not allowed.'},{status:405,headers});
    if (process.env.VERCEL_ENV !== 'production') throw new AgentConnectionUnavailable();
    if (new URL(request.url).search || request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new AgentConnectionUnavailable(400);
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) throw new AgentConnectionUnavailable(403);
    let input: unknown;
    try { input = await boundedJson(request,128,2000); } catch { throw new AgentConnectionUnavailable(400); }
    if (!record(input) || Object.keys(input).length !== 0) throw new AgentConnectionUnavailable(400);
    await verifyMarketingAdmin(request,dependencies);
    const owner = validId(configuredOwner);
    const key = process.env.LOFTY_API_KEY?.trim() ?? '';
    if (!owner || !key || key.length > 4096 || /[\u0000-\u001f\u007f]/.test(key)) throw new AgentConnectionUnavailable();
    const response = await (dependencies.fetch ?? fetch)('https://api.lofty.com/v1.0/me', {
      headers:{Authorization:`token ${key}`}, cache:'no-store', redirect:'error', signal:AbortSignal.timeout(7000),
    });
    if (!response.ok) { await response.body?.cancel().catch(() => {}); throw new AgentConnectionUnavailable(); }
    const data = await boundedJson(response,32768,7000,true);
    if (!record(data) || data.error !== undefined || data.success === false || ['errorCode','error_code'].some(field => field in data && ![0,'0',200,'200'].includes(data[field] as string | number))) throw new AgentConnectionUnavailable();
    // /me.id identifies the team-member record. Assignment requires memberUserId.
    const id = validId(data.memberUserId);
    if (!id || ('userId' in data && validId(data.userId) !== id)) throw new AgentConnectionUnavailable();
    return Response.json({schemaVersion:1,loftyUserId:id,matchesConfiguredOwner:id===owner},{headers});
  } catch (error) {
    return Response.json({error:'Brokerage identity could not be verified.'},{status:error instanceof AgentConnectionUnavailable ? error.status : 503,headers});
  }
}

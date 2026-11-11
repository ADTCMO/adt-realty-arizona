/** Minimal public publication projection only. Never query auth, admin, or preview APIs. */
export const RESERVED_AGENT_SLUGS = new Set([
  'hero','mike-dingman','phoenix','west-valley','home','east-valley','moving-to-arizona',
  'greg','leo','chandler','city-guides','join','leaders','api','components','gilbert',
  'queen-creek','san-tan-valley','mesa','scottsdale','tempe','fountain-hills',
  'agent','agents','_next','admin','login','signup','settings','account','auth','profile','preview',
  'robots.txt','sitemap.xml','favicon.ico',
]);
export type PublishedAgent = {
  slug: string; full_name: string; email: string; phone: string;
  profile_photo_url: string | null; publication_version: string;
};
export function isAgentSlug(slug: string) {
  return /^[a-z0-9]{3,50}$/.test(slug) && !RESERVED_AGENT_SLUGS.has(slug);
}
export function parsePublishedAgent(value: unknown, slug: string): PublishedAgent | null {
  if (!isAgentSlug(slug) || !value || typeof value !== 'object' || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (v.slug !== slug || typeof v.full_name !== 'string' || !v.full_name.trim() || v.full_name.length > 160 ||
      typeof v.email !== 'string' || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v.email) || v.email.length > 254 ||
      typeof v.phone !== 'string' || !/^[+()\d .-]{7,30}$/.test(v.phone) || v.phone.replace(/\D/g, '').length < 7 || v.phone.replace(/\D/g, '').length > 15 ||
      typeof v.publication_version !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v.publication_version)) return null;
  let photo: string | null = null;
  if (typeof v.profile_photo_url === 'string') {
    try {
      const url = new URL(v.profile_photo_url);
      if (url.origin === 'https://lklgtilyptasjdxqfsij.supabase.co' && !url.username && !url.password &&
          url.pathname.startsWith('/storage/v1/object/public/agent-profile/') && !url.search && !url.hash) photo = url.href;
    } catch { /* An invalid optional photo must not hide valid contact information. */ }
  }
  // Construct an allowlisted projection, never forward surplus upstream properties.
  return {slug, full_name:v.full_name.trim(),email:v.email,phone:v.phone,profile_photo_url:photo,publication_version:v.publication_version};
}
export async function getPublishedAgent(slug: string): Promise<PublishedAgent | null> {
  if (!isAgentSlug(slug)) return null;
  const anonKey = process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return null;
  try {
    const response = await fetch('https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_public_site', {
      method:'POST', headers:{'Content-Type':'application/json',apikey:anonKey,Authorization:`Bearer ${anonKey}`},
      body:JSON.stringify({p_slug:slug}), cache:'no-store', redirect:'error', signal:AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    return parsePublishedAgent(await response.json(),slug);
  } catch { return null; }
}

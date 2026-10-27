// @ts-nocheck
// Mirrored from ACE app/collection; keep presentation and media contract in sync.
/** Typed media from saved URLs only. Never interpret agent-supplied embed HTML. */
export function safeMediaUrl(value) {
  if (typeof value !== 'string' || /[\x00-\x1f\x7f\\<>]/.test(value) || /%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(value)) return '';
  const raw = value.trim();
  if (!raw) return '';
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' && url.hostname && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

function videoEmbed(url) {
  if (url.port) return '';
  const host = url.hostname;
  if (['player.mux.com', 'stream.mux.com'].includes(host)) {
    const id = url.pathname.match(/^\/([A-Za-z0-9]+)(?:\.m3u8)?$/)?.[1];
    return id ? `https://player.mux.com/${id}` : '';
  }
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be'].includes(host)) {
    const id = host === 'youtu.be' ? url.pathname.slice(1) : url.pathname.match(/^\/(?:embed|shorts)\/([A-Za-z0-9_-]+)$/)?.[1] || (url.pathname === '/watch' ? url.searchParams.get('v') : '');
    return /^[A-Za-z0-9_-]{1,100}$/.test(id || '') ? `https://www.youtube-nocookie.com/embed/${id}` : '';
  }
  if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(host)) {
    const id = url.pathname.match(host === 'player.vimeo.com' ? /^\/video\/(\d+)$/ : /^\/(\d+)\/?$/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : '';
  }
  return '';
}

export function normalizeVideo(value, posterValue = '') {
  const safe = safeMediaUrl(value);
  if (!safe) return null;
  const url = new URL(safe);
  const embed = videoEmbed(url);
  const poster = safeMediaUrl(posterValue);
  return { kind: embed ? 'embed' : /\.(mp4|webm)$/i.test(url.pathname) ? 'video' : 'link', url: embed || safe, poster };
}

export function normalizeTour(value) {
  const safe = safeMediaUrl(value);
  if (!safe) return null;
  const url = new URL(safe);
  if (!url.port && (url.hostname === 'zillow.com' || url.hostname.endsWith('.zillow.com')) && /^\/view-imx\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return { kind: 'embed', url: safe };
  const model = url.searchParams.get('m');
  if (!url.port && url.hostname === 'my.matterport.com' && /^\/show\/?$/.test(url.pathname) && /^[A-Za-z0-9_-]{1,100}$/.test(model || '')) return {kind:'embed',url:`https://my.matterport.com/show/?m=${model}`};
  return { kind: 'link', url: safe };
}

export function normalizeFloorPlan(value) {
  const safe = safeMediaUrl(value);
  if (!safe) return null;
  return { kind: /\.(png|jpe?g|webp)$/i.test(new URL(safe).pathname) ? 'image' : 'link', url: safe };
}

/** Export sanitizer accepts only exact validated/canonical iframe sources. */
export function validateMediaEmbed(value) {
  const safe = safeMediaUrl(value);
  if (!safe || safe !== value) return false;
  const video = normalizeVideo(safe);
  if (video?.kind === 'embed' && video.url === safe) return true;
  const tour = normalizeTour(safe);
  return tour?.kind === 'embed' && tour.url === safe;
}

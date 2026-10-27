// @ts-nocheck
// Pure ACE normalizer mirrored for preview/public parity; no owner-data loader.
import { normalizeVideo, normalizeTour, normalizeFloorPlan } from './media';

/** Read-only collection contract. Saved profile/property fields are the only content source. */
export const COLLECTION_DIMENSIONS = Object.freeze({
  facebook: Object.freeze({ width: 1080, height: 1350 }),
  instagram: Object.freeze({ width: 1080, height: 1350 }),
  flyer: Object.freeze({ width: 816, height: 1056 }),
  website: Object.freeze({ responsive: true }),
});

const text = (value) => typeof value === "string" ? value.trim() : "";
const unsafeCharacters = /[\x00-\x1f\x7f\\]/;
function safeImage(value) {
  const raw = text(value);
  if (!raw || unsafeCharacters.test(raw) || /%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(raw)) return "";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const url = new URL(raw);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : "";
  } catch { return ""; }
}

/** Whitelisted, bounded JSON contract. Absent settings preserve legacy defaults. */
export function normalizeMarketingSettings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== 1 || !value.pieces || typeof value.pieces !== 'object' || Array.isArray(value.pieces)) return {};
  const pieces = {};
  for (const format of ['flyer', 'facebook', 'instagram', 'website']) {
    const source = value.pieces[format];
    if (!source || typeof source !== 'object' || Array.isArray(source)) continue;
    const piece = {};
    if (typeof source.showAgentPhoto === 'boolean') piece.showAgentPhoto = source.showAgentPhoto;
    if (format === 'flyer' && typeof source.description === 'string' && source.description.length <= 650 && !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(source.description)) piece.description = source.description;
    if (Object.keys(piece).length) pieces[format] = piece;
  }
  return { version: 1, pieces };
}

export function normalizeCollection(propertyRow, agentRow, landingRow = {}) {
  const property = propertyRow && typeof propertyRow === "object" ? propertyRow : {};
  const profile = agentRow && typeof agentRow === "object" ? agentRow : {};
  const landing = landingRow && typeof landingRow === "object" ? landingRow : {};
  const warnings = [], blockingErrors = [];
  const address = text(property.address);
  const name = text(profile.full_name);
  if (!address) blockingErrors.push("Add a property address.");
  if (!name) blockingErrors.push("Add an agent name to your profile.");
  function warnLength(value, limit, label) {
    if (value.length > limit) warnings.push(`${label} is long; review all layouts for fit.`);
  }
  warnLength(address, 60, "Property address");
  warnLength(name, 36, "Agent name");
  function numeric(key, label, integer = false) {
    const raw = property[key];
    if (raw === undefined || raw === null || (typeof raw === "string" && !raw.trim())) return null;
    const validType = typeof raw === "number" || (typeof raw === "string" && /^\d+(?:\.\d+)?$/.test(raw.trim()));
    const value = validType ? Number(raw) : NaN;
    if (!Number.isFinite(value) || value < 0 || (integer && !Number.isInteger(value))) {
      blockingErrors.push(`${label} must be a valid non-negative ${integer ? "whole number" : "number"}.`);
      return null;
    }
    return value;
  }
  const price = numeric("price", "Price");
  const facts = [["beds", "Beds", true], ["baths", "Baths", false], ["sqft", "Sq ft", true], ["garage", "Garage", true]]
    .flatMap(([key, label, integer]) => {
      const value = numeric(key, label, integer);
      return value === null ? [] : [{ key, label, value: new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(value) }];
    });
  const photoRows = Array.isArray(property.property_photos) ? property.property_photos : [];
  // sort_order is the existing persisted role contract: primary, two featured,
  // then gallery. Never use response/upload array order to determine roles.
  const orderedPhotos = photoRows.filter(row => row && typeof row === "object")
    .map(row => ({ id: text(row.id), url: safeImage(row.photo_url), sortOrder: Number.isInteger(Number(row.sort_order)) && row.sort_order != null && String(row.sort_order).trim() !== "" && Number(row.sort_order) >= 0 ? Number(row.sort_order) : null }))
    .filter(row => row.url)
    .sort((a, b) => ((a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)) || a.url.localeCompare(b.url) || a.id.localeCompare(b.id));
  const photos = orderedPhotos.map(row => row.url);
  const seenUrls = new Set(), seenIds = new Set();
  const photoOptions = orderedPhotos.filter(row => { if (seenUrls.has(row.url)) return false; seenUrls.add(row.url); return true; }).map(row => {
    const candidate = row.id || `url:${row.url}`;
    const id = seenIds.has(candidate) ? `url:${row.url}` : candidate;
    seenIds.add(id);
    return { id, url: row.url, sortOrder: row.sortOrder };
  });
  const photoRoles = { primaryId: photoOptions[0]?.id || '', featuredIds: photoOptions.slice(0, 3).map(row => row.id) };
  const primaryPhoto = photoOptions[0]?.url || '';
  const featuredPhotos = photoOptions.slice(0, 3).map(row => row.url);
  if (orderedPhotos.some(row => row.sortOrder === null) || new Set(orderedPhotos.map(row => row.sortOrder)).size !== orderedPhotos.length) warnings.push("Some photo ordering is missing or duplicated. Confirm Primary and Featured selections before using the collection.");
  if (photos.length < photoRows.length) warnings.push("Some property images have invalid URLs and were omitted.");
  if (!photos.length) blockingErrors.push("Add at least one valid property photo.");
  const photo = safeImage(profile.profile_photo_url);
  if (text(profile.profile_photo_url) && !photo) warnings.push("Agent photo URL is invalid and was omitted.");
  const rawPhone = text(profile.phone);
  const validPhone = /^\+?[()\d\s.\-]+$/.test(rawPhone) && !unsafeCharacters.test(rawPhone) && (rawPhone.match(/\d/g) || []).length >= 7 && (rawPhone.match(/\d/g) || []).length <= 15 ? rawPhone : "";
  const phone = /^\d{10}$/.test(validPhone) ? `${validPhone.slice(0,3)}.${validPhone.slice(3,6)}.${validPhone.slice(6)}` : validPhone;
  const emailRaw = text(profile.email);
  const email = /^[^\s@<>"(),;:\\]+@[^\s@<>"(),;:\\]+\.[^\s@<>"(),;:\\]+$/.test(emailRaw) && !unsafeCharacters.test(emailRaw) && !/[?&#%]/.test(emailRaw) ? emailRaw : "";
  if (!phone && !email) blockingErrors.push("Add a valid phone number or email to your agent profile.");
  if (rawPhone && !phone) warnings.push("Invalid agent phone was omitted.");
  if (emailRaw && !email) warnings.push("Invalid agent email was omitted.");
  const headline = text(landing.headline) || address;
  const description = text(property.description);
  warnLength(headline, 75, "Headline");
  warnLength(description, 600, "Description");
  const rawFeatures = Array.isArray(landing.amenities) ? landing.amenities : text(landing.amenities).split(/\r?\n/);
  const features = [...new Set(rawFeatures.map(text).filter(Boolean))];
  if (features.some(feature => feature.length > 60)) warnings.push("Some features are long; review layouts for fit.");
  const video = normalizeVideo(landing.video_url, landing.video_poster_url);
  const tour = normalizeTour(landing.tour_url);
  const floorPlan = normalizeFloorPlan(landing.floor_plan_url);
  for (const [value, normalized, label] of [[landing.video_url, video, "Video"], [landing.tour_url, tour, "Tour"], [landing.floor_plan_url, floorPlan, "Floor plan"]]) {
    if (text(value) && !normalized) warnings.push(`${label} URL is invalid and was omitted.`);
  }
  if (video && text(landing.video_poster_url) && !video.poster) warnings.push("Video poster URL is invalid and was omitted.");
  const details = [["Property type", text(landing.property_type)], ["Year built", Number.isInteger(landing.year_built) && landing.year_built > 0 && landing.year_built <= 9999 ? String(landing.year_built) : ""], ["Lot size", text(landing.lot_size)], ["MLS number", text(landing.mls_number)]]
    .filter(([, value]) => value).map(([label, value]) => ({ label, value }));
  const openHouse = text(landing.open_house_details);
  const marketingSettings = normalizeMarketingSettings(landing.marketing_settings);
  const slug = text(landing.slug);
  const publicUrl = landing.published === true ? canonicalPublicListingUrl({ id: text(property.id), slug }) : "";
  if (landing.published === true && !publicUrl) warnings.push("Published page has an invalid slug; public link omitted.");
  return {
    id: text(property.id), address,
    location: [text(property.city).replace(/\S+/g, word => word[0].toLocaleUpperCase()+word.slice(1)), text(property.zip)].filter(Boolean).join(" "),
    priceLabel: price === null ? "" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price),
    status: text(property.status), headline, description, flyerDescription: description, features, photos,
    photoOptions, photoRoles, primaryPhoto, featuredPhotos, showAgentPhoto: true,
    agent: { name, phone, email, photo, phoneHref: phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "", emailHref: email ? `mailto:${email}` : "" },
    facts, publicUrl, publicUrlVerified: false, marketingSettings, published: landing.published === true, pageStyle: text(landing.page_style), slug, video, tour, floorPlan, details, openHouse, warnings, blockingErrors,
  };
}

/** Per-piece presentation choices only; never writes or changes the saved profile.
 * Primary is always included in featuredPhotos (maximum three total).
 * IDs must belong to this model. Foreign/stale IDs fail closed to saved roles.
 */
export function applyCollectionOptions(model, options = {}) {
  if (!model || typeof model !== 'object') return model;
  const choices = options && typeof options === 'object' ? options : {};
  const available = Array.isArray(model.photoOptions) ? model.photoOptions : [];
  const byId = new Map(available.map(photo => [photo.id, photo]));
  const savedPrimary = byId.has(model.photoRoles?.primaryId) ? model.photoRoles.primaryId : available[0]?.id || '';
  const primaryId = typeof choices.primaryPhotoId === 'string' && byId.has(choices.primaryPhotoId) ? choices.primaryPhotoId : savedPrimary;
  const requested = Array.isArray(choices.featuredPhotoIds) ? choices.featuredPhotoIds : model.photoRoles?.featuredIds || [];
  const featuredIds = [...new Set([primaryId, ...requested].filter(id => typeof id === 'string' && byId.has(id)))].slice(0, 3);
  return {
    ...model,
    primaryPhoto: byId.get(primaryId)?.url || '',
    featuredPhotos: featuredIds.map(id => byId.get(id).url),
    photoRoles: { primaryId, featuredIds },
    showAgentPhoto: typeof choices.showAgentPhoto === 'boolean' ? choices.showAgentPhoto : model.showAgentPhoto !== false,
    // Explicit copy is preserved in full, including an intentionally empty value.
    // Layout validation, not silent truncation, decides if it fits the flyer.
    flyerDescription: typeof choices.flyerDescription === 'string' ? choices.flyerDescription.trim() : model.flyerDescription ?? model.description ?? '',
  };
}

/** The existing permanent Peninsula alias is keyed by property identity, not address text. */
export function canonicalPublicListingUrl({ id, slug } = {}) {
  if (typeof slug !== 'string' || !/^[a-z0-9-]{1,180}$/.test(slug)) return '';
  const canonical = id === '5346fe33-3787-4ab1-bcf1-3a986bf569d6' || ['2094-w-peninsula-cir', '2094-w-peninsula-cir-chandler-85248-5346fe33'].includes(slug) ? '2094-w-peninsula-cir' : slug;
  return `https://www.adtrealtyaz.com/home/${canonical}`;
}

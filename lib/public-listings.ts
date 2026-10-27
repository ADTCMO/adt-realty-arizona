/** Published slugs are durable identities. Never rebuild them from an edited address. */
const publicOrigin = "https://www.adtrealtyaz.com";
const peninsulaSlug = "2094-w-peninsula-cir-chandler-85248-5346fe33";
const peninsulaAlias = "2094-w-peninsula-cir";
const peninsulaId = "5346fe33-3787-4ab1-bcf1-3a986bf569d6";

export function validListingSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9-]{1,180}$/.test(value);
}

export function resolveListingSlug(value: unknown): string | null {
  if (!validListingSlug(value)) return null;
  return value === peninsulaAlias ? peninsulaSlug : value;
}

export function canonicalListingSlug(value: unknown, propertyId?: unknown): string | null {
  if (!validListingSlug(value)) return null;
  return value === peninsulaSlug || value === peninsulaAlias || propertyId === peninsulaId
    ? peninsulaAlias : value;
}

export function publicListingUrl(value: unknown, propertyId?: unknown): string {
  const slug = canonicalListingSlug(value, propertyId);
  return slug ? `${publicOrigin}/home/${slug}` : "";
}

/** Read-only layout QA is confined to Vercel preview deployments. */
export function isCollectionPreview(requested: unknown, environment = process.env.VERCEL_ENV): boolean {
  return environment === "preview" && requested === "collection";
}

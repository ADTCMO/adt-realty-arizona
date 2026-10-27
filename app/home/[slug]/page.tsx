import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingClient from "./ListingClient";
import { canonicalListingSlug, resolveListingSlug, isCollectionPreview } from "../../../lib/public-listings";

type RouteProps = { params: Promise<{ slug: string }>; searchParams?: Promise<{ preview?: string }> };

async function getListing(slug: string) {
  const savedSlug = resolveListingSlug(slug);
  if (!savedSlug) return null;
  try {
    const response = await fetch(
      `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(savedSlug)}`,
      { cache: "no-store" }
    );
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) {
    return { title: "Listing unavailable", robots: { index: false, follow: false } };
  }
  const title = `${listing.address}, ${listing.city} AZ`;
  const description = listing.description?.slice(0, 155)
    || `Explore ${listing.address} in ${listing.city}, Arizona.`;
  const canonical = `/home/${canonicalListingSlug(slug, listing.id)}`;
  const preview = isCollectionPreview((await searchParams)?.preview);
  return {
    title,
    description,
    alternates: { canonical },
    ...(preview ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      images: listing.photos?.[0] ? [{ url: listing.photos[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: listing.photos?.[0] ? [listing.photos[0]] : [],
    },
  };
}

export default async function PropertyLandingPage({ params, searchParams }: RouteProps) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();
  const preview = isCollectionPreview((await searchParams)?.preview);
  return <ListingClient listing={listing} slug={resolveListingSlug(slug)} style={preview ? "collection" : listing.page_style} preview={preview} />;
}

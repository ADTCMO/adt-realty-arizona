import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingClient from "./ListingClient";

type RouteProps = { params: Promise<{ slug: string }> };

const shortListingSlugs: Record<string, string> = {
  "2094-w-peninsula-cir": "2094-w-peninsula-cir-chandler-85248-5346fe33",
};

async function getListing(slug: string) {
  if (!/^[a-z0-9-]{1,180}$/.test(slug)) return null;
  try {
    const response = await fetch(
      `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(shortListingSlugs[slug] || slug)}`,
      { cache: "no-store" }
    );
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) {
    return { title: "Listing unavailable", robots: { index: false, follow: false } };
  }
  const title = `${listing.address}, ${listing.city} AZ`;
  const description = listing.description?.slice(0, 155)
    || `Explore ${listing.address} in ${listing.city}, Arizona.`;
  return {
    title,
    description,
    alternates: { canonical: `/home/${slug}` },
    openGraph: {
      title,
      description,
      url: `/home/${slug}`,
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

export default async function PropertyLandingPage({ params }: RouteProps) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();
  return <ListingClient listing={listing} slug={shortListingSlugs[slug] || slug} />;
}

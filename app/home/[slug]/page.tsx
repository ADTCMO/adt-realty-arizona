import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingClient from "./ListingClient";

type RouteProps = { params: Promise<{ slug: string }> };

async function getListing(slug: string) {
  if (!/^[a-z0-9-]{1,180}$/.test(slug)) return null;
  try {
    const response = await fetch(
      `https://marketing.adtrealtyaz.com/api/public-listings/${encodeURIComponent(slug)}`,
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
  return <ListingClient listing={listing} />;
}

import type { Metadata } from "next";
import RegionGuide from "../moving-to-arizona/RegionGuide";

export const metadata: Metadata = {
  title: { absolute: "East Valley Relocation Guide: Cities, Prices & Living | ADT Realty" },
  description: "Compare eight East Valley cities and towns, home-sale prices, schools, commutes and local life. Explore photos and practical advice for moving to Arizona.",
  alternates: { canonical: "/east-valley" },
  openGraph: { title: "East Valley Relocation Guide: Cities, Prices & Living", description: "Compare eight East Valley cities and towns, home-sale prices, schools, commutes and local life. Explore photos and practical advice for moving to Arizona.", url: "/east-valley", type: "website", images: [{ url: "/images/east-valley/scottsdale.jpg", alt: "Scottsdale landmark in the East Valley" }] },
  twitter: { card: "summary_large_image", title: "East Valley Relocation Guide: Cities, Prices & Living", description: "Compare eight East Valley cities and towns, home-sale prices, schools, commutes and local life. Explore photos and practical advice for moving to Arizona.", images: ["/images/east-valley/scottsdale.jpg"] },
};

export default function Page() { return <RegionGuide region="east" />; }

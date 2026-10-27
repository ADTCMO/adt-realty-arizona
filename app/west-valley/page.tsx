import type { Metadata } from "next";
import RegionGuide from "../moving-to-arizona/RegionGuide";

export const metadata: Metadata = {
  title: { absolute: "West Valley Relocation Guide: Cities, Prices & Living | ADT Realty" },
  description: "Compare twelve West Valley and western Maricopa County communities, with home-sale prices, photos, schools, commute questions and local relocation advice.",
  alternates: { canonical: "/west-valley" },
  openGraph: { title: "West Valley Relocation Guide: Cities, Prices & Living", description: "Compare twelve West Valley and western Maricopa County communities, with home-sale prices, photos, schools, commute questions and local relocation advice.", url: "/west-valley", type: "website", images: [{ url: "/images/maricopa/goodyear.jpg", alt: "Goodyear community landmark in the West Valley" }] },
  twitter: { card: "summary_large_image", title: "West Valley Relocation Guide: Cities, Prices & Living", description: "Compare twelve West Valley and western Maricopa County communities, with home-sale prices, photos, schools, commute questions and local relocation advice.", images: ["/images/maricopa/goodyear.jpg"] },
};

export default function Page() { return <RegionGuide region="west" />; }

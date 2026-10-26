import type { Metadata } from "next";
import RegionGuide from "../moving-to-arizona/RegionGuide";

export const metadata: Metadata = {
  title: { absolute: "Phoenix & North Valley Relocation Guide | ADT Realty" },
  description: "Compare Phoenix, Paradise Valley, Carefree and Cave Creek, plus Arcadia, Ahwatukee and other Phoenix areas. Explore photos, home-sale prices and local tradeoffs.",
  alternates: { canonical: "/phoenix" },
  openGraph: { title: "Phoenix & North Valley Relocation Guide", description: "Compare Phoenix, Paradise Valley, Carefree and Cave Creek, plus Arcadia, Ahwatukee and other Phoenix areas. Explore photos, home-sale prices and local tradeoffs.", url: "/phoenix", type: "website", images: [{ url: "/images/phoenix/downtown-midtown.jpg", alt: "Downtown Phoenix in Maricopa County, Arizona" }] },
  twitter: { card: "summary_large_image", title: "Phoenix & North Valley Relocation Guide", description: "Compare Phoenix, Paradise Valley, Carefree and Cave Creek, plus Arcadia, Ahwatukee and other Phoenix areas. Explore photos, home-sale prices and local tradeoffs.", images: ["/images/phoenix/downtown-midtown.jpg"] },
};

export default function Page() { return <RegionGuide region="phoenix" />; }

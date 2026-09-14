import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Heroes Real Estate Savings in Arizona",
  description:
    "Arizona military members, veterans, first responders, healthcare workers, educators and school staff may save when buying or selling with ADT Realty Community Heroes.",
  alternates: { canonical: "/hero" },
  keywords: [
    "Arizona hero home buying program",
    "veteran real estate savings Arizona",
    "first responder home buying savings Arizona",
    "teacher home buying program Arizona",
    "healthcare worker home buying Arizona",
  ],
  openGraph: {
    type: "website",
    url: "/hero",
    title: "ADT Realty Community Heroes | Arizona Real Estate Savings",
    description:
      "See estimated real estate savings for Arizona military, veterans, first responders, healthcare workers and educators.",
    images: [{ url: "/community-heroes-bg.png", alt: "ADT Realty Community Heroes in Arizona" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADT Realty Community Heroes",
    description: "Real estate savings for the people who serve Arizona communities.",
    images: ["/community-heroes-bg.png"],
  },
};

export default function HeroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ADT Realty Community Heroes",
    url: "https://www.adtrealtyaz.com/hero",
    description:
      "A real estate savings program for qualifying Arizona military members, veterans, first responders, healthcare workers, educators and school staff.",
    provider: {
      "@type": "RealEstateAgent",
      name: "ADT Realty Arizona",
      url: "https://www.adtrealtyaz.com/",
    },
    areaServed: { "@type": "State", name: "Arizona" },
    audience: [
      "Military members and veterans",
      "Law enforcement",
      "Firefighters and EMS",
      "Healthcare workers",
      "Educators and school staff",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

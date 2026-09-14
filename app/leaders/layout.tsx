import type { Metadata } from "next";
import "./leaders.css";

export const metadata: Metadata = {
  title: "Join ADT Realty | Leadership, Training & Agent Opportunity",
  description:
    "Meet the leaders building ADT Realty and explore training, technology, support and leadership opportunities for real estate agents.",
  alternates: { canonical: "/leaders" },
  keywords: [
    "join ADT Realty",
    "real estate brokerage careers",
    "real estate agent training",
    "real estate leadership opportunities",
    "brokerage for producing agents",
  ],
  openGraph: {
    type: "website",
    url: "/leaders",
    title: "Join ADT Realty | Built to Develop Successful Agents and Leaders",
    description:
      "Meet ADT Realty leaders and explore the systems, training and support designed to help agents build stronger businesses.",
    images: [{ url: "https://leaders.adtrealtyaz.com/leaders/mick-mcmaken.png", alt: "ADT Realty leadership" }],
  },
};

export default function LeadersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ADT Realty",
    url: "https://www.adtrealtyaz.com/leaders",
    logo: "https://leaders.adtrealtyaz.com/brand/adt-realty-logo.png",
    slogan: "Do the right thing. Every time.",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      {children}
    </>
  );
}

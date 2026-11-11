import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityGuide from "../city-guides/CityGuide";
import { cityGuides, cityGuideSlugs } from "../city-guides/data";
import "../chandler/chandler.css";
import Homepage from "../Homepage";
import { getPublishedAgent } from "../../lib/published-agent";

// Named-agent publications are uncached, including slugs absent at build time.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return cityGuideSlugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = Object.prototype.hasOwnProperty.call(cityGuides, slug) ? cityGuides[slug] : undefined;
  if (!city) {
    const agent = await getPublishedAgent(slug);
    if (!agent) return { robots: { index: false, follow: false } };
    return { title: `${agent.full_name} | ADT Realty`, alternates: { canonical: `https://www.adtrealtyaz.com/${agent.slug}` },
      openGraph: { url: `https://www.adtrealtyaz.com/${agent.slug}`, title: `${agent.full_name} | ADT Realty`, type: "website" } };
  }
  return {
    title: `Living in ${city.name} AZ | Neighborhood & Relocation Guide`,
    description: `Explore living in ${city.name}, Arizona: neighborhoods, housing, schools, commutes, employers, recreation and honest tradeoffs before buying a home.`,
    alternates: { canonical: `/${city.slug}` },
    keywords: [`living in ${city.name} AZ`, `moving to ${city.name} Arizona`, `${city.name} Arizona neighborhoods`, `buy a home in ${city.name} AZ`, `${city.name} relocation guide`],
    openGraph: { type:"article", url:`/${city.slug}`, title:`Living in ${city.name}, Arizona | A Local Homebuyer Guide`, description:city.heroText, images:[{url:`/images/east-valley/${city.slug}.jpg`,alt:`${city.name}, Arizona`}] }
  };
}

export default async function LocalCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = Object.prototype.hasOwnProperty.call(cityGuides, slug) ? cityGuides[slug] : undefined;
  if (!city) {
    const agent = await getPublishedAgent(slug);
    if (!agent) notFound();
    return <Homepage agent={agent} />;
  }
  const schema = {
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"Article",headline:`Living in ${city.name}, Arizona: Neighborhood and Relocation Guide`,description:city.heroText,mainEntityOfPage:`https://www.adtrealtyaz.com/${city.slug}`,image:`https://www.adtrealtyaz.com/images/east-valley/${city.slug}.jpg`,author:{"@type":"Organization",name:"ADT Realty Arizona"},publisher:{"@type":"Organization",name:"ADT Realty Arizona"}},
      {"@type":"Place",name:city.name,address:{"@type":"PostalAddress",addressLocality:city.name,addressRegion:"AZ",addressCountry:"US"},containedInPlace:{"@type":"State",name:"Arizona"}},
      {"@type":"FAQPage",mainEntity:city.faqs.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))}
    ]
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><CityGuide city={city}/></>;
}

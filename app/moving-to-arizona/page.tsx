import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "../components/LeadForm";
import { countyCities } from "./data";
import RelocationPlanning from "./RelocationPlanning";
import GuideAnchors from "./GuideAnchors";
import RegionNavigation from "./RegionNavigation";
import "../east-valley/east-valley.css";
import "../phoenix/phoenix.css";
import "./relocation.css";

const title = "Phoenix Area & Maricopa County Relocation Guide";
const description = "Moving to the Phoenix area? Compare East Valley, West Valley and Phoenix communities, dated home-sale prices, photos, commutes and a practical moving checklist.";
const url = "https://www.adtrealtyaz.com/moving-to-arizona";
const regionLinks = [
  { name: "East Valley", href: "/east-valley", imageCity: "scottsdale", count: "8 cities & towns", intro: "Scottsdale, Tempe, Mesa, Chandler, Gilbert and the eastern Valley." },
  { name: "West Valley", href: "/west-valley", imageCity: "goodyear", count: "12 communities", intro: "Glendale, Peoria, Goodyear, Surprise and the county’s western communities." },
  { name: "Phoenix", href: "/phoenix", imageCity: "phoenix", count: "City, neighborhoods & North Valley", intro: "Phoenix neighborhoods, plus Paradise Valley, Carefree and Cave Creek." },
];
export const metadata: Metadata = {
  title: { absolute: `${title} | ADT Realty` }, description,
  alternates: { canonical: "/moving-to-arizona" },
  openGraph: { title, description, url, type: "website", images: [{ url: "/images/phoenix/downtown-midtown.jpg", width: 1200, height: 820, alt: "Downtown Phoenix skyline at night" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/phoenix/downtown-midtown.jpg"] },
};

export default function MovingToArizonaGuide() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${url}#webpage`, name: title, description, url, inLanguage: "en-US", dateModified: "2026-10-27", publisher: { "@type": "Organization", name: "ADT Realty Arizona", url: "https://www.adtrealtyaz.com/" }, image: "https://www.adtrealtyaz.com/images/phoenix/downtown-midtown.jpg", spatialCoverage: { "@type": "AdministrativeArea", name: "Maricopa County, Arizona" }, hasPart: regionLinks.map(region => ({ "@type": "CollectionPage", name: `${region.name} Relocation Guide`, url: `https://www.adtrealtyaz.com${region.href}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ADT Realty Arizona", item: "https://www.adtrealtyaz.com/" }, { "@type": "ListItem", position: 2, name: "Moving to Arizona", item: url }] },
  ] };
  return <main className="evPage phxPage relPage">
    <GuideAnchors />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <a className="relSkip" href="#regions">Skip to regions</a>
    <header className="evHeader"><Link href="/" className="evBrand" aria-label="ADT Realty Arizona home"><Image src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" width={96} height={96} /></Link><nav aria-label="Moving guide navigation"><a href="#regions">Choose a region</a><a href="#checklist">Moving checklist</a></nav><a className="evHeaderCta" href="#ask-agent">Ask a local expert</a></header>
    <section className="relHero"><Image src="/images/phoenix/downtown-midtown.jpg" alt="Downtown Phoenix skyline illuminated at night" fill sizes="100vw" priority className="relHeroImage" /><div className="relHeroShade" /><div className="relHeroCopy"><p className="evEyebrow">Moving to Arizona · Maricopa County</p><h1>Find your place<br />in Arizona.</h1><p>Start with a region. Explore the communities. Plan a move that fits your everyday life.</p><div className="relHeroActions"><a className="evButton red" href="#regions">Choose your region <span aria-hidden="true">↓</span></a><a href="#checklist">Get the moving checklist →</a></div><span className="relHeroCredit">Downtown Phoenix · Photo by Alan Stark, <a href="/images/phoenix/ATTRIBUTION.md">CC BY-SA 2.0 & full credits</a></span></div></section>
    <nav className="relChapterNav" aria-label="On this page"><a href="#regions">Regions</a><a href="#planning">Commutes</a><a href="#house-hunting-visit">Visiting</a><a href="#costs">Real costs</a><a href="#weather">Weather</a><a href="#schools">Schools</a><a href="#checklist">Checklist</a><a href="#questions">Questions</a></nav>
    <section className="relSection relRegionChooser" id="regions"><p className="evEyebrow dark">Three ways to explore</p><h2>Choose a region.<br />Go deeper when you want.</h2><p className="relLead">Each region opens its own guide. Tap a city for photos, home-sale prices and the local details—without loading every community onto your phone at once.</p><div className="relRegionCards">{regionLinks.map(region => { const photo = countyCities.find(city => city.slug === region.imageCity)?.photo; return <Link className="relRegionCard" href={region.href} key={region.href}>{photo && <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />}<span className="relRegionCardShade" /><span className="relRegionCardCopy"><small>{region.count}</small><strong>{region.name}</strong><span>{region.intro}</span><b>Explore this region →</b></span></Link>; })}</div><details className="relLocatorDisclosure"><summary>Where are these regions? Open the map ↓</summary><RegionNavigation /></details><p className="relScopeNote">Current coverage: 24 selected cities and towns wholly or partly in Maricopa County—not a complete municipality directory. Phoenix also includes neighborhood-level detail. Regions are convenient browsing groups, not official boundaries. Tucson, Prescott and the rest of Arizona are not covered in this edition. <a href="https://www.maricopa.gov/5312/Cities-Towns">County places directory →</a></p></section>
    <section className="relPlanningIntro"><p className="evEyebrow dark">Information without obligation</p><h2>The practical side of your move.</h2><p>Open only the topics you need. No form required.</p></section>
    <RelocationPlanning />
    <section className="phxContact" id="ask-agent"><div><p className="evEyebrow dark">A local perspective</p><h2>Your shortlist.<br />Your next step.</h2><p>Ask a local expert. Share the regions or communities you are considering, your everyday destinations and what matters most. Visiting from out of state? Include your travel dates so tours can be planned ahead.</p><p><a className="relTextLink" href="https://acebuyer.adtrealtyaz.com">Explore your buying power →</a></p><p>Also selling? <a className="relTextLink" href="https://aceseller.adtrealtyaz.com">Get a free home valuation →</a></p></div><LeadForm type="contact" market="Maricopa County relocation" /></section>
    <section className="relSourceNote"><p>Editorial review: October 27, 2026. This guide is orientation, not a substitute for property-specific inspections, provider confirmations or professional advice. Regional pages identify each market snapshot’s source, period and coverage. Verify current conditions at the address.</p><details><summary>Coverage & photo credits</summary><p>East Valley, West Valley and Phoenix & North Valley are editorial groupings. Towns outside Phoenix city limits remain distinct municipalities. Some included cities extend into neighboring counties. Unincorporated Sun City and Sun City West are not included in this selected-community guide. San Tan Valley is in Pinal County and is linked separately from the East Valley guide.</p><p><a href="https://www.arcgis.com/home/item.html?id=22e3fbbfd551408785666533106c58e4">Maricopa County’s incorporated-city inventory</a> · <a href="/images/maricopa/ATTRIBUTION.md">Maricopa photo attribution</a> · <a href="/images/phoenix/ATTRIBUTION.md">Phoenix photo attribution</a>. Existing East Valley photography is retained from the original site. Regional photos illustrate identified local places, not homes for sale.</p></details></section>
    <footer className="evFooter"><Image src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" width={84} height={84} /><p>Local guidance. Your Arizona move.</p><Link href="/">ADT Realty Arizona home →</Link><span>© 2026 ADT Realty · Equal Housing Opportunity</span></footer>
  </main>;
}

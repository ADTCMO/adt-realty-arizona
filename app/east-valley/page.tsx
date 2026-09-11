import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./east-valley.css";

export const metadata: Metadata = {
  title: "Phoenix East Valley Relocation Guide",
  description:
    "Compare Scottsdale, Tempe, Mesa, Chandler, Gilbert, Queen Creek, San Tan Valley and Fountain Hills before choosing where to live in Phoenix's East Valley.",
  alternates: { canonical: "/east-valley" },
};

const cities = [
  {
    slug: "scottsdale",
    name: "Scottsdale",
    kicker: "Desert polish with room to play",
    fit: "Resort living, dining, golf, nightlife and premium desert neighborhoods",
    feel: "Scottsdale stretches from the energy of Old Town to quiet, low-density communities near the McDowell Sonoran Preserve. Housing ranges from lock-and-leave condos to established ranch homes, gated golf communities and luxury desert estates.",
    schools: "Scottsdale Unified serves much of the city. Northern addresses may fall in Cave Creek Unified, while some southern areas are served by districts shared with Phoenix or Tempe.",
    anchors: ["Old Town & Arts District", "McDowell Sonoran Preserve", "Loop 101 access"],
    consider: "Prices generally run higher than elsewhere in the East Valley, and north-south drives can be longer than the map suggests.",
  },
  {
    slug: "tempe",
    name: "Tempe",
    kicker: "Connected, energetic and close to everything",
    fit: "Urban convenience, ASU access, shorter commutes and an active lifestyle",
    feel: "Tempe is the East Valley's most urban community, shaped by Arizona State University, Tempe Town Lake, light rail and a compact location near Phoenix and Sky Harbor. Expect condos, townhomes, mid-century neighborhoods and pockets of newer infill.",
    schools: "Tempe Elementary and Tempe Union High School District serve much of the city. Southern Tempe also includes areas served by Kyrene Elementary.",
    anchors: ["ASU & Mill Avenue", "Tempe Town Lake", "Light rail & Loop 202"],
    consider: "University activity, aircraft routes and nightlife can make some pockets busier and noisier than others.",
  },
  {
    slug: "mesa",
    name: "Mesa",
    kicker: "More variety than any one label can capture",
    fit: "Housing choice, value, established neighborhoods and access to outdoor recreation",
    feel: "Mesa is the East Valley's largest city and offers everything from historic homes and downtown apartments to golf communities, horse property and new construction near the southeast edge. Each part of Mesa feels different, so location matters.",
    schools: "Mesa Public Schools serves most of the city. Some southeast Mesa neighborhoods are served by Gilbert Public Schools or Queen Creek Unified.",
    anchors: ["Downtown Mesa", "Usery Mountain access", "US 60 & Loops 101/202"],
    consider: "Because Mesa is so large, commute time, school boundaries and neighborhood character vary widely by address.",
  },
  {
    slug: "chandler",
    name: "Chandler",
    kicker: "Established neighborhoods meet a major tech corridor",
    fit: "Professional households, mature amenities, strong freeway access and waterfront options",
    feel: "Chandler combines a lively downtown with established subdivisions, newer south-Chandler communities and the Price Road technology corridor. Housing includes starter neighborhoods, master-planned communities, golf properties and distinctive lake communities.",
    schools: "Chandler Unified serves most of Chandler and extends into neighboring communities. Parts of west Chandler are served by Kyrene Elementary and Tempe Union High School District.",
    anchors: ["Downtown Chandler", "Price Road tech corridor", "Loops 101 & 202"],
    consider: "Older and newer sections differ substantially, and premium south-Chandler or waterfront neighborhoods command higher prices.",
  },
  {
    slug: "gilbert",
    name: "Gilbert",
    kicker: "Modern suburbia with agricultural roots",
    fit: "Master-planned living, parks, dining districts and newer family-sized homes",
    feel: "Gilbert grew from a farming town into one of Arizona's best-known suburban communities. The Heritage District, extensive parks and newer neighborhoods create a polished but approachable feel, with homes ranging from 1980s subdivisions to large newer builds.",
    schools: "Gilbert Public Schools and Higley Unified serve most of Gilbert. Some western and southern addresses fall within Chandler Unified boundaries.",
    anchors: ["Heritage District", "Riparian Preserve", "Loop 202 access"],
    consider: "Most trips require a car, and the newest communities can sit farther from central Phoenix employment centers.",
  },
  {
    slug: "queen-creek",
    name: "Queen Creek",
    kicker: "New homes, open space and a growing town center",
    fit: "New construction, larger homes, equestrian interests and a quieter suburban pace",
    feel: "Queen Creek blends rapid residential growth with farms, desert views and an equestrian tradition. New master-planned communities dominate many areas, while acreage and custom homes remain part of the town's character.",
    schools: "Queen Creek Unified serves much of the area, with some neighborhoods in Chandler Unified. Always verify the district and assigned schools for a specific property.",
    anchors: ["Queen Creek Marketplace", "San Tan Mountain views", "SR 24 & Gateway Airport"],
    consider: "Rapid growth brings construction and traffic, and commuting to Scottsdale, Tempe or central Phoenix can be significant.",
  },
  {
    slug: "san-tan-valley",
    name: "San Tan Valley",
    kicker: "More home and desert at the Valley's edge",
    fit: "Newer homes, attainable space and buyers comfortable with a farther-out location",
    feel: "San Tan Valley sits southeast of Queen Creek in Pinal County. It is known for newer subdivisions, mountain views and relatively more house for the money than closer-in East Valley communities.",
    schools: "Florence Unified and J.O. Combs Unified serve much of San Tan Valley. Boundaries can change quickly in growth areas, so address-level verification is essential.",
    anchors: ["San Tan Mountains", "Newer subdivisions", "Pinal County setting"],
    consider: "Commutes are longer, major-road options are more limited and some services are still catching up with growth.",
  },
  {
    slug: "fountain-hills",
    name: "Fountain Hills",
    kicker: "Quiet hillsides and wide-open views",
    fit: "Scenery, golf, lower-density living and a small-town desert atmosphere",
    feel: "Fountain Hills is tucked against the McDowell Mountains northeast of Scottsdale. Hillside homes, golf communities and desert views define the market, with a quieter center built around the town's landmark fountain.",
    schools: "Fountain Hills Unified is the primary public school district. Nearby charter and private options vary by grade level and location.",
    anchors: ["Fountain Park", "McDowell Mountain views", "Four Peaks scenery"],
    consider: "There is no freeway through town, inventory is smaller and hillside lots can bring unique maintenance considerations.",
  },
];

const fitLinks = [
  ["Walkable & connected", "tempe"],
  ["Dining, golf & luxury", "scottsdale"],
  ["Established & job-centered", "chandler"],
  ["Polished suburban living", "gilbert"],
  ["New homes & more space", "queen-creek"],
  ["Maximum variety", "mesa"],
];

export default function EastValleyGuide() {
  return (
    <main className="evPage">
      <header className="evHeader">
        <Link href="/" aria-label="ADT Realty Arizona home" className="evBrand">
          <Image src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" width={96} height={96} priority />
        </Link>
        <nav aria-label="East Valley guide navigation">
          <a href="#compare">Compare</a>
          <a href="#cities">Cities</a>
          <a href="#schools">Schools</a>
        </nav>
        <a className="evHeaderCta" href="#talk">Ask Mike</a>
      </header>

      <section className="evHero">
        <div className="evHeroImage" role="img" aria-label="A sweeping view of the Phoenix East Valley" />
        <div className="evHeroShade" />
        <div className="evHeroCopy">
          <p className="evEyebrow">Phoenix East Valley Relocation Guide</p>
          <h1>Eight communities.<br />One place to compare them.</h1>
          <p>Get the honest differences in lifestyle, housing, schools and commute before choosing where to call home.</p>
          <a className="evButton" href="#compare">Find my best fit <span>↓</span></a>
        </div>
        <div className="evCityRail" aria-label="Cities included">
          {cities.map((city) => <a key={city.slug} href={`#${city.slug}`}>{city.name}</a>)}
        </div>
      </section>

      <section className="evIntro" id="compare">
        <div>
          <p className="evEyebrow dark">Start with the life you want</p>
          <h2>There is no single “best” East Valley city.</h2>
        </div>
        <p>The right choice depends on how you live, where you work and what you value most. Use these quick paths, then read the full city profiles below.</p>
      </section>

      <section className="evFitGrid" aria-label="Find a city by lifestyle">
        {fitLinks.map(([label, slug]) => (
          <a href={`#${slug}`} key={slug}><span>{label}</span><strong>{cities.find((city) => city.slug === slug)?.name}</strong><b>→</b></a>
        ))}
      </section>

      <section className="evPhotoBreak evPhotoTwo">
        <div><p className="evEyebrow">One Valley, very different rhythms</p><h2>Urban mornings. Desert sunsets. Room to choose.</h2></div>
      </section>

      <section className="evCities" id="cities">
        <div className="evSectionHead">
          <p className="evEyebrow dark">City-by-city</p>
          <h2>Know the character before you study the listings.</h2>
          <p>These profiles are starting points. Every city contains neighborhoods that break the stereotype—which is why the address matters as much as the city name.</p>
        </div>

        <div className="evCityList">
          {cities.map((city, index) => (
            <article className="evCity" id={city.slug} key={city.slug}>
              <div className="evCityNumber">{String(index + 1).padStart(2, "0")}</div>
              <div className="evCityMain">
                <p className="evKicker">{city.kicker}</p>
                <h3>{city.name}</h3>
                <p className="evFit"><strong>Best fit:</strong> {city.fit}</p>
                <p>{city.feel}</p>
                <div className="evAnchors">{city.anchors.map((anchor) => <span key={anchor}>{anchor}</span>)}</div>
              </div>
              <aside>
                <h4>Public schools</h4>
                <p>{city.schools}</p>
                <h4>Keep in mind</h4>
                <p>{city.consider}</p>
              </aside>
            </article>
          ))}
        </div>
      </section>

      <section className="evPhotoBreak evPhotoThree">
        <div><p className="evEyebrow">Farther southeast</p><h2>New neighborhoods meet the open Sonoran Desert.</h2></div>
      </section>

      <section className="evSchools" id="schools">
        <div>
          <p className="evEyebrow dark">About Arizona schools</p>
          <h2>Choose the address—not just the district name.</h2>
        </div>
        <div className="evSchoolCopy">
          <p>School attendance boundaries do not always follow city limits. A Chandler address can be served by Kyrene, a Gilbert address can be in Chandler Unified, and fast-growing southeast communities may have several possible districts.</p>
          <p>Before making a housing decision, verify the assigned schools directly with the district and review the latest state report card. Ratings and boundaries can change, and online portals are not always current.</p>
          <div className="evSchoolLinks">
            <a href="https://azreportcards.azed.gov/" target="_blank" rel="noreferrer">Arizona School Report Cards ↗</a>
            <a href="https://www.azed.gov/" target="_blank" rel="noreferrer">Arizona Department of Education ↗</a>
          </div>
        </div>
      </section>

      <section className="evTalk" id="talk">
        <div>
          <p className="evEyebrow">A local answer beats another search</p>
          <h2>Tell Mike how you want to live.</h2>
          <p>Share your commute, budget and priorities. Mike will help you narrow the East Valley to the communities—and neighborhoods—that genuinely fit.</p>
        </div>
        <div className="evTalkActions">
          <a className="evButton red" href="mailto:mikedingman@adthomes.com?subject=Help me compare East Valley communities">Ask Mike about the East Valley <span>→</span></a>
          <a className="evTextLink" href="https://acebuyer.adtrealtyaz.com">Ready to buy? See my buying power →</a>
        </div>
      </section>

      <footer className="evFooter">
        <Image src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" width={84} height={84} />
        <p>Local guidance across Phoenix's East Valley.</p>
        <p className="evCredits">
          Photos: Alan Stark / <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">CC BY-SA 2.0</a>; Eustress / Public Domain; Beyond My Ken / <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>. Cropped for layout.
        </p>
        <span>© 2026 ADT Realty · Equal Housing Opportunity</span>
      </footer>
    </main>
  );
}

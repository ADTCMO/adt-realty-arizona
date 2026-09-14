import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "../components/LeadForm";
import "./chandler.css";

export const metadata: Metadata = {
  title: "Living in Chandler AZ | Neighborhood & Relocation Guide",
  description:
    "Explore living in Chandler, Arizona: neighborhoods, housing styles, schools, commutes, downtown, golf, parks and the honest tradeoffs to consider before buying a home.",
  alternates: { canonical: "/chandler" },
  keywords: [
    "living in Chandler AZ",
    "moving to Chandler Arizona",
    "Chandler Arizona neighborhoods",
    "buy a home in Chandler AZ",
    "Chandler vs Gilbert",
    "Chandler relocation guide",
  ],
  openGraph: {
    type: "article",
    url: "/chandler",
    title: "Living in Chandler, Arizona | A Local Homebuyer Guide",
    description:
      "Compare Chandler neighborhoods, housing, commutes and lifestyle before deciding where to buy.",
    images: [{ url: "/images/east-valley/chandler.jpg", alt: "Welcome to Chandler, Arizona" }],
  },
};

const areas = [
  {
    name: "Downtown Chandler",
    fit: "Dining, events and a more walkable center",
    detail:
      "Historic storefronts, restaurants, breweries, public art and the Chandler Center for the Arts give the city a genuine gathering place. Nearby housing includes established neighborhoods, townhomes and newer infill.",
  },
  {
    name: "Ocotillo & South Chandler",
    fit: "Waterfront, golf and polished suburban living",
    detail:
      "Ocotillo is known for lakes, golf, greenbelts and larger homes. South Chandler also offers newer communities and convenient access to the Price Road employment corridor, usually at a premium over older areas.",
  },
  {
    name: "North & Central Chandler",
    fit: "Established homes and practical freeway access",
    detail:
      "These areas offer mature landscaping, varied architecture and quicker connections to Loop 101, Loop 202 and neighboring Tempe. Neighborhood character can change quickly, making property-level research important.",
  },
  {
    name: "West Chandler",
    fit: "Employment access and connections across the Valley",
    detail:
      "West Chandler places residents close to major technology employers, I-10, Loop 202 and the Ahwatukee side of Phoenix. Housing ranges from condos and townhomes to established single-family communities.",
  },
];

const employers = [
  ["Intel", "Semiconductor manufacturing and engineering"],
  ["Microchip Technology", "Global semiconductor headquarters"],
  ["NXP Semiconductors", "Semiconductor manufacturing and technology"],
  ["Northrop Grumman", "Aerospace and defense"],
  ["Wells Fargo", "Financial services and operations"],
  ["Bank of America", "Financial services"],
  ["PayPal", "Digital payments and technology"],
  ["Chandler Regional Medical Center", "Healthcare"],
];

const faqs = [
  { question: "What is Chandler, Arizona known for?", answer: "Chandler is known for its semiconductor and technology employers, the Price Corridor, Downtown Chandler, golf and waterfront communities, established neighborhoods and access to major East Valley freeways." },
  { question: "Is Chandler or Gilbert better for homebuyers?", answer: "Neither city is universally better. Chandler generally offers stronger access to established employment corridors and a wider mix of neighborhood ages. Gilbert often appeals to buyers seeking newer master-planned communities. The better fit depends on budget, commute and preferred lifestyle." },
  { question: "How far is Chandler from Phoenix Sky Harbor Airport?", answer: "Many Chandler locations are roughly 20 to 30 minutes from Phoenix Sky Harbor in normal traffic, but travel time varies considerably by neighborhood, time of day and freeway conditions." },
  { question: "Which school districts serve Chandler?", answer: "Chandler Unified serves much of the city. Some western Chandler addresses are served by Kyrene Elementary and Tempe Union High School District. Buyers should verify school assignments for the exact property." },
  { question: "Does Chandler have waterfront homes?", answer: "Yes. Chandler includes lake communities and waterfront properties, especially around Ocotillo and Andersen Springs. Waterfront location, views, lot orientation and community amenities can create meaningful price differences." },
  { question: "What should buyers know about Chandler summers?", answer: "Summer heat makes HVAC condition, shade, covered parking, pool access and expected electric costs important property-level considerations." },
];

const comparisons = [
  ["Gilbert", "Newer suburban feel, popular dining and more master-planned communities"],
  ["Tempe", "More urban energy, ASU, light rail and shorter airport access"],
  ["Mesa", "Wider housing variety and often more choices by price point"],
  ["Queen Creek", "More new construction, larger lots and longer central commutes"],
];

export default function ChandlerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Living in Chandler, Arizona: Neighborhood and Relocation Guide",
        description:
          "A local guide to Chandler neighborhoods, housing, schools, commutes and lifestyle for prospective homebuyers.",
        mainEntityOfPage: "https://www.adtrealtyaz.com/chandler",
        image: "https://www.adtrealtyaz.com/images/east-valley/chandler.jpg",
        author: { "@type": "Organization", name: "ADT Realty Arizona" },
        publisher: { "@type": "Organization", name: "ADT Realty Arizona" },
      },
      {
        "@type": "Place",
        name: "Chandler",
        address: { "@type": "PostalAddress", addressLocality: "Chandler", addressRegion: "AZ", addressCountry: "US" },
        containedInPlace: { "@type": "State", name: "Arizona" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main className="chandlerPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="chandlerHeader">
        <Link href="/" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></Link>
        <nav><a href="#areas">Areas</a><a href="#real-talk">Real talk</a><a href="#compare">Compare</a></nav>
        <a className="chandlerHeaderCta" href="#ask-agent">Ask a Local Agent</a>
      </header>

      <section className="chandlerHero">
        <div className="chandlerHeroShade" />
        <div className="chandlerHeroCopy">
          <p className="chandlerKicker">Chandler, Arizona relocation guide</p>
          <h1>Could Chandler feel like home?</h1>
          <p>Technology jobs, established neighborhoods, waterfront communities and a real downtown—without pretending every part of the city feels the same.</p>
          <div className="chandlerHeroActions">
            <a href="#areas">Explore Chandler <span>↓</span></a>
            <a className="outline" href="https://acebuyer.adtrealtyaz.com/?city=Chandler">See What I Can Afford</a>
          </div>
        </div>
        <div className="chandlerQuick">
          <span><small>Housing</small>Established to luxury</span>
          <span><small>Known for</small>Tech, downtown &amp; golf</span>
          <span><small>Airport</small>About 20–30 minutes*</span>
        </div>
      </section>

      <section className="chandlerIntro">
        <p className="chandlerKicker dark">The short version</p>
        <h2>Chandler is not one neighborhood.</h2>
        <div>
          <p>Someone who wants an Ocotillo waterfront home is making a different decision from someone prioritizing a shorter commute from West Chandler or an established neighborhood near downtown.</p>
          <p>The right question is not simply, “Is Chandler a good place to live?” It is, “Which part of Chandler fits the life and budget I am building?”</p>
        </div>
      </section>

      <section className="chandlerAreas" id="areas">
        <div className="chandlerSectionHead">
          <p className="chandlerKicker dark">Choose your version of Chandler</p>
          <h2>Four areas. Four different priorities.</h2>
        </div>
        <div className="chandlerAreaGrid">
          {areas.map((area, index) => <article key={area.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p className="fit">{area.fit}</p>
            <h3>{area.name}</h3>
            <p>{area.detail}</p>
          </article>)}
        </div>
      </section>

      <section className="chandlerCommunities">
        <div className="chandlerPhotoBreak downtown"><span>Downtown energy. Established neighborhoods. Room to choose.</span></div>
        <div className="chandlerCommunityCopy">
          <p className="chandlerKicker dark">Names buyers will hear</p>
          <h2>Neighborhoods and communities worth recognizing.</h2>
          <div className="chandlerCommunityNames">
            {["Ocotillo", "Fulton Ranch", "Andersen Springs", "Cooper Commons", "Sun Groves", "Downtown Chandler"].map((name) => <span key={name}>{name}</span>)}
          </div>
          <p>These names are useful starting points—not a ranking. HOA structure, home age, lot position, school assignment and commute can differ even within the same named community.</p>
        </div>
      </section>

      <section className="chandlerEmployers">
        <div className="chandlerEmployerIntro">
          <p className="chandlerKicker">Arizona’s technology economy</p>
          <h2>Chandler sits at the heart of the Silicon Desert.</h2>
          <p>Semiconductor investment helped shape Chandler’s growth, with the Price Corridor becoming one of Arizona’s most important employment centers. Today the city’s economy also includes aerospace, financial services and healthcare.</p>
        </div>
        <div className="chandlerEmployerGrid">
          {employers.map(([name, industry]) => <article key={name}><strong>{name}</strong><span>{industry}</span></article>)}
        </div>
        <p className="chandlerEmployerNote">Employer locations and operations can change. Buyers relocating for work should confirm the reporting location and test the drive from the exact property during their normal commute window.</p>
      </section>

      <section className="chandlerReality" id="real-talk">
        <div className="chandlerRealityTitle">
          <p className="chandlerKicker">The honest Chandler conversation</p>
          <h2>What buyers should know before falling in love with a listing.</h2>
        </div>
        <div className="chandlerRealityGrid">
          <article><h3>Commutes depend on the address</h3><p>Loop 101, Loop 202 and I-10 make Chandler well connected, but crossing the city during peak periods can change the daily experience. Test the actual commute, not the citywide estimate.</p></article>
          <article><h3>Waterfront and golf carry premiums</h3><p>Lake frontage, golf views and larger south-Chandler homes are meaningful features. Compare the premium with HOA costs, lot orientation and how much you will actually use the amenity.</p></article>
          <article><h3>Schools require address-level verification</h3><p>Chandler Unified serves much of the city, while some western areas connect with Kyrene Elementary and Tempe Union. Boundaries do not follow simple city lines.</p></article>
          <article><h3>Summer changes daily life</h3><p>Covered parking, pool access, shade, HVAC condition and electric costs matter. A home that looks similar on paper can live very differently through an Arizona summer.</p></article>
        </div>
      </section>

      <section className="chandlerLifestyle">
        <div><p className="chandlerKicker dark">Life beyond the house</p><h2>Chandler has a center of gravity.</h2></div>
        <div className="chandlerLifestyleCopy">
          <p>Downtown Chandler brings together restaurants, breweries, live events and the Chandler Center for the Arts. Elsewhere, residents use Tumbleweed Park, Veterans Oasis Park, Paseo Trail, Ocotillo golf and shopping around Chandler Fashion Center.</p>
          <p>That range is part of Chandler’s appeal: established suburban streets, active employment corridors and weekend destinations can all exist within the same city.</p>
        </div>
      </section>

      <section className="chandlerCompare" id="compare">
        <div className="chandlerSectionHead">
          <p className="chandlerKicker dark">Chandler or somewhere nearby?</p>
          <h2>Compare the tradeoffs.</h2>
        </div>
        <div className="chandlerCompareGrid">
          {comparisons.map(([name, description]) => <Link href="/east-valley" key={name}><span>Chandler vs.</span><h3>{name}</h3><p>{description}</p><b>Compare East Valley cities →</b></Link>)}
        </div>
      </section>

      <section className="chandlerFaq">
        <div className="chandlerSectionHead">
          <p className="chandlerKicker dark">Questions buyers ask</p>
          <h2>Chandler answers without the sales pitch.</h2>
        </div>
        <div className="chandlerFaqList">
          {faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </section>

      <section className="chandlerPhotoBreak ocotillo"><span>Golf, water and desert light change the way a neighborhood feels.</span></section>

      <section className="chandlerDecision">
        <div><p className="chandlerKicker">Run the numbers</p><h2>Could Chandler fit your budget?</h2><p>Price is only the beginning. Estimate how taxes, insurance, down payment, debt and ownership costs may affect your true buying power.</p></div>
        <a href="https://acebuyer.adtrealtyaz.com/?city=Chandler">Calculate My Chandler Buying Power <span>→</span></a>
      </section>

      <section className="chandlerContact" id="ask-agent">
        <div><p className="chandlerKicker">Local guidance—not a sales pitch</p><h2>Ask an Agent About Chandler</h2><p>Tell Mike what you are comparing, what matters most and what you want to understand before making a move.</p><small>Your inquiry will be identified as a Chandler request.</small></div>
        <LeadForm type="contact" market="Chandler" />
      </section>

      <footer className="chandlerFooter">
        <img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" />
        <p>Local guidance for Chandler and Phoenix’s East Valley.</p>
        <span>*Drive times vary by neighborhood and traffic. Verify schools and costs for each property.</span>
      </footer>
    </main>
  );
}

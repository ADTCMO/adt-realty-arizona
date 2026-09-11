import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CityExplorer from "./CityExplorer";
import "./east-valley.css";

export const metadata: Metadata = {
  title: "Phoenix East Valley Relocation Guide | ADT Realty",
  description:
    "Compare East Valley cities, home prices, schools, downtowns, golf, recreation, events, sports venues and Arizona weather before you move.",
  alternates: { canonical: "/east-valley" },
};

const cities = [
  {
    slug: "scottsdale",
    name: "Scottsdale",
    price: "About $900K",
    population: "About 247,000",
    income: "About $111,000",
    airport: "15–30 min",
    housing:
      "Condos, established neighborhoods, golf communities and luxury desert estates",
    schools:
      "Scottsdale Unified serves much of the city. Some northern addresses fall within Cave Creek Unified; boundaries should be verified by address.",
    highlights: [
      "Old Town Scottsdale",
      "McDowell Sonoran Preserve",
      "TPC Scottsdale & dozens of golf options",
    ],
    tradeoff:
      "The broadest luxury market in the East Valley, but generally the highest prices and long north–south drives.",
  },
  {
    slug: "tempe",
    name: "Tempe",
    price: "About $500K",
    population: "About 190,000",
    income: "About $80,000",
    airport: "10–15 min",
    housing: "Condos, townhomes, mid-century neighborhoods and newer infill",
    schools:
      "Tempe Elementary and Tempe Union High School District serve much of the city. Southern Tempe also includes Kyrene Elementary areas.",
    highlights: [
      "ASU & Mill Avenue",
      "Tempe Town Lake",
      "Light rail and quick Sky Harbor access",
    ],
    tradeoff:
      "A compact, connected location with more university activity, aircraft traffic and nightlife in certain areas.",
  },
  {
    slug: "mesa",
    name: "Mesa",
    price: "About $470K",
    population: "About 512,000",
    income: "About $78,000",
    airport: "15–35 min",
    housing:
      "Historic homes, suburban neighborhoods, golf communities, horse property and new construction",
    schools:
      "Mesa Public Schools serves most of the city. Some southeast Mesa addresses are within Gilbert Public Schools or Queen Creek Unified.",
    highlights: [
      "Downtown Mesa arts and dining",
      "Usery Mountain Regional Park",
      "Sloan Park and Hohokam Stadium",
    ],
    tradeoff:
      "Mesa offers the widest range of housing, but commute, character and schools differ substantially across this very large city.",
  },
  {
    slug: "chandler",
    name: "Chandler",
    price: "About $525K",
    population: "About 281,000",
    income: "About $105,000",
    airport: "20–30 min",
    housing:
      "Established subdivisions, lake communities, golf properties and newer homes",
    schools:
      "Chandler Unified serves most of Chandler. Parts of west Chandler are served by Kyrene Elementary and Tempe Union High School District.",
    highlights: [
      "Downtown Chandler",
      "Price Road technology corridor",
      "Tumbleweed Park and the Ostrich Festival",
    ],
    tradeoff:
      "Excellent freeway and employment access; premium waterfront and south-Chandler neighborhoods cost more.",
  },
  {
    slug: "gilbert",
    name: "Gilbert",
    price: "About $575K",
    population: "About 288,000",
    income: "About $116,000",
    airport: "25–35 min",
    housing:
      "Established subdivisions, master-planned communities and larger newer homes",
    schools:
      "Gilbert Public Schools and Higley Unified serve most of Gilbert. Some addresses fall within Chandler Unified.",
    highlights: [
      "Downtown Gilbert Heritage District",
      "Riparian Preserve",
      "Agritopia and SanTan Village",
    ],
    tradeoff:
      "A polished suburban setting with popular dining and parks, although most daily trips require a car.",
  },
  {
    slug: "queen-creek",
    name: "Queen Creek",
    price: "About $670K",
    population: "About 83,000",
    income: "About $145,000",
    airport: "35–50 min",
    housing: "New master plans, custom homes, acreage and equestrian property",
    schools:
      "Queen Creek Unified serves much of the area, with some neighborhoods in Chandler Unified. Verify every property directly with the district.",
    highlights: [
      "Queen Creek Marketplace",
      "Schnepf Farms and Queen Creek Olive Mill",
      "San Tan Mountain views",
    ],
    tradeoff:
      "More new construction and open space, balanced against rapid growth and longer drives to central employment areas.",
  },
  {
    slug: "san-tan-valley",
    name: "San Tan Valley",
    price: "About $430K",
    population: "About 113,000",
    income: "About $86,000",
    airport: "45–60+ min",
    housing: "Newer subdivisions, larger homes and desert-edge communities",
    schools:
      "Florence Unified and J.O. Combs Unified serve much of San Tan Valley. Growth makes address-level verification essential.",
    highlights: [
      "San Tan Mountain Regional Park",
      "New-home communities",
      "Pinal County setting",
    ],
    tradeoff:
      "More house for the money in many neighborhoods, with longer commutes and fewer major-road options.",
  },
  {
    slug: "fountain-hills",
    name: "Fountain Hills",
    price: "About $720K",
    population: "About 24,000",
    income: "About $105,000",
    airport: "30–40 min",
    housing:
      "Hillside homes, condos, golf communities and desert-view properties",
    schools:
      "Fountain Hills Unified is the primary public school district. Charter and private options vary by grade and location.",
    highlights: [
      "Fountain Park",
      "We-Ko-Pa Golf Club",
      "McDowell Mountain and Four Peaks views",
    ],
    tradeoff:
      "Scenery and lower-density living, but no freeway through town and a smaller housing inventory.",
  },
];

const downtowns = [
  {
    name: "Downtown Gilbert",
    text: "The Heritage District combines locally known restaurants, nightlife, the Hale Centre Theatre, farmers markets and the town's agricultural roots in a compact destination.",
  },
  {
    name: "Downtown Chandler",
    text: "Historic storefronts, restaurants, breweries, public art and the Chandler Center for the Arts give downtown a walkable core that continues to add events and new development.",
  },
  {
    name: "Old Town Scottsdale",
    text: "A larger district spanning galleries, restaurants, nightlife, museums, resorts and Scottsdale Fashion Square—with a very different rhythm by day and after dark.",
  },
  {
    name: "Downtown Mesa",
    text: "Light rail, the Mesa Arts Center, museums, restaurants and live music anchor an increasingly active downtown corridor.",
  },
  {
    name: "Tempe & Town Lake",
    text: "Mill Avenue, ASU, Tempe Beach Park and Town Lake create the East Valley's most urban mix of events, dining, recreation and transit.",
  },
];

const golf = [
  "TPC Scottsdale",
  "We-Ko-Pa Golf Club",
  "Talking Stick Golf Club",
  "Ocotillo Golf Club",
  "Whirlwind Golf Club",
  "Las Sendas Golf Club",
  "Longbow Golf Club",
  "Kierland Golf Club",
  "The Boulders",
  "San Marcos Golf Course",
];
const venues = [
  [
    "State Farm Stadium",
    "Arizona Cardinals, major concerts and national sporting events",
  ],
  ["Chase Field", "Arizona Diamondbacks and large-scale events"],
  [
    "Phoenix's downtown arena",
    "Phoenix Suns, Phoenix Mercury and arena concerts",
  ],
  ["Desert Diamond Arena", "Touring concerts, shows and special events"],
  ["Talking Stick Resort Amphitheatre", "Large outdoor concert tours"],
  ["Arizona Financial Theatre", "National touring music and comedy"],
  ["Mesa Amphitheatre", "Outdoor concerts in downtown Mesa"],
  ["Mullett Arena", "ASU sports, hockey and live events in Tempe"],
];

export default function EastValleyGuide() {
  return (
    <main className="evPage">
      <header className="evHeader">
        <Link href="/" className="evBrand" aria-label="ADT Realty Arizona home">
          <Image
            src="/adt-realty-arizona-outline.png"
            alt="ADT Realty Arizona"
            width={96}
            height={96}
            priority
          />
        </Link>
        <nav aria-label="Guide navigation">
          <a href="#compare">Compare</a>
          <a href="#cities">Cities</a>
          <a href="#life">Things to do</a>
          <a href="#weather">Weather</a>
        </nav>
        <a className="evHeaderCta" href="/#contact">
          Ask a local agent
        </a>
      </header>

      <section className="evHero">
        <div
          className="evHeroImage"
          role="img"
          aria-label="Sonoran Desert mountains and East Valley communities"
        />
        <div className="evHeroShade" />
        <div className="evHeroCopy">
          <p className="evEyebrow">Phoenix East Valley Relocation Guide</p>
          <h1>More than a place to live.</h1>
          <p>
            Compare the communities, housing costs, schools and everyday
            lifestyle before deciding where you belong in the East Valley.
          </p>
          <a className="evButton" href="#compare">
            Start comparing <span>↓</span>
          </a>
        </div>
      </section>

      <section className="evIntro" id="compare">
        <div>
          <p className="evEyebrow dark">Choose your Arizona</p>
          <h2>Eight communities. Very different ways to live.</h2>
        </div>
        <p>
          Start with the place itself—downtowns, desert views, golf, commute and
          the kind of home you want. Then open a city for the practical numbers.
        </p>
      </section>

      <CityExplorer cities={cities} />

      <section className="evPhotoBreak evPhotoTwo">
        <div>
          <p className="evEyebrow">After the moving truck leaves</p>
          <h2>What will your weekends look like?</h2>
        </div>
      </section>

      <section className="evLife" id="life">
        <div className="evSectionHead left">
          <p className="evEyebrow dark">Downtowns and districts</p>
          <h2>Five places locals actually gather.</h2>
        </div>
        <div className="evDowntownGrid">
          {downtowns.map((d, i) => (
            <article key={d.name}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{d.name}</h3>
              <p>{d.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="evSplit">
        <div className="evDarkPanel">
          <p className="evEyebrow">Golf in the Valley</p>
          <h2>You could play a different course every week.</h2>
          <p>
            Resort layouts, desert target golf, traditional parkland courses and
            municipal options are spread throughout the metro.
          </p>
          <div className="evTagCloud">
            {golf.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
        </div>
        <div className="evLightPanel">
          <p className="evEyebrow dark">Signature events</p>
          <h2>Put these on the calendar.</h2>
          <ul>
            <li>
              <strong>Chandler Ostrich Festival</strong>
              <span>Tumbleweed Park</span>
            </li>
            <li>
              <strong>Cactus League Spring Training</strong>
              <span>Stadiums throughout the Valley</span>
            </li>
            <li>
              <strong>WM Phoenix Open</strong>
              <span>TPC Scottsdale</span>
            </li>
            <li>
              <strong>Barrett-Jackson</strong>
              <span>WestWorld of Scottsdale</span>
            </li>
            <li>
              <strong>Scottsdale Arabian Horse Show</strong>
              <span>WestWorld of Scottsdale</span>
            </li>
            <li>
              <strong>Tempe Festival of the Arts</strong>
              <span>Downtown Tempe</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="evVenues">
        <div className="evSectionHead left">
          <p className="evEyebrow dark">Sports and concerts</p>
          <h2>The entire Phoenix metro is part of the lifestyle.</h2>
          <p>
            The Valley has hosted multiple Super Bowls, college football
            national championships and NCAA basketball championships, along with
            major bowl games, NASCAR weekends and the Cactus League. Some of the
            largest venues sit west of the East Valley, so event-day drive time
            matters when comparing locations.
          </p>
        </div>
        <div
          className="evSportsPhoto"
          role="img"
          aria-label="State Farm Stadium, home of major Arizona sporting events"
        />
        <div className="evVenueGrid">
          {venues.map(([name, text]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="evSpring">
          <strong>Spring-training favorites near the East Valley</strong>
          <span>
            Sloan Park · Scottsdale Stadium · Salt River Fields · Hohokam
            Stadium · Tempe Diablo Stadium
          </span>
        </div>
      </section>

      <section className="evPhotoBreak evPhotoThree">
        <div>
          <p className="evEyebrow">Outside is a big reason people move here</p>
          <h2>Mountains, desert trails and water are closer than they look.</h2>
        </div>
      </section>

      <section className="evActivities">
        <div>
          <p className="evEyebrow dark">Beyond the city limits</p>
          <h2>A short list for your first year.</h2>
        </div>
        <div className="evActivityGrid">
          <article>
            <h3>Desert and trails</h3>
            <p>
              McDowell Sonoran Preserve, San Tan Mountain Regional Park, Usery
              Mountain and South Mountain offer hiking, running, biking and
              trail riding.
            </p>
          </article>
          <article>
            <h3>Lakes and rivers</h3>
            <p>
              Saguaro Lake, Canyon Lake and the Lower Salt River open the door
              to boating, paddling, fishing and seasonal tubing.
            </p>
          </article>
          <article>
            <h3>Arts and culture</h3>
            <p>
              Mesa Arts Center, Scottsdale Arts, Chandler Center for the Arts,
              museums and ASU performances bring year-round programming.
            </p>
          </article>
          <article>
            <h3>Day trips</h3>
            <p>
              Sedona, Prescott, Payson and Tucson make practical weekend escapes
              when you want a change in scenery or temperature.
            </p>
          </article>
        </div>
      </section>

      <section className="evAirportNote">
        <div>
          <p className="evEyebrow dark">A second airport worth knowing</p>
          <h2>Phoenix-Mesa Gateway can save a long drive.</h2>
        </div>
        <p>
          For Mesa, Gilbert, Queen Creek and San Tan Valley, Gateway Airport can
          be considerably more convenient. It serves fewer destinations than Sky
          Harbor, but southeastern East Valley residents should check both
          airports before booking.
        </p>
      </section>

      <section className="evSchools">
        <div>
          <p className="evEyebrow dark">About Arizona schools</p>
          <h2>Verify the address, not just the city.</h2>
        </div>
        <div className="evSchoolCopy">
          <p>
            School boundaries do not always follow city limits, and fast-growing
            areas may include several districts. Verify the assigned schools
            directly with the district before making a housing decision.
          </p>
          <div className="evSchoolLinks">
            <a
              href="https://azreportcards.azed.gov/"
              target="_blank"
              rel="noreferrer"
            >
              Arizona School Report Cards ↗
            </a>
            <a href="https://www.azed.gov/" target="_blank" rel="noreferrer">
              Department of Education ↗
            </a>
          </div>
        </div>
      </section>

      <section className="evHeat" id="weather">
        <div className="evHeatQuestion">
          <p className="evEyebrow">The question everyone asks</p>
          <h2>Is it hot?</h2>
          <strong>Yes. The summers are hot.</strong>
        </div>
        <div>
          <p>
            From roughly June through September, daytime temperatures regularly
            exceed 100°F, and the hottest stretches can reach 110°F or more.
            Outdoor life shifts to early mornings, evenings, pools and
            air-conditioned spaces.
          </p>
          <ul>
            <li>Mild winters and abundant sunshine</li>
            <li>Golf, patios and hiking through much of the year</li>
            <li>Higher summer electric bills</li>
            <li>Covered parking and pool access become meaningful</li>
            <li>Hydration, pets and hot pavement must be taken seriously</li>
          </ul>
        </div>
      </section>

      <section className="evCalculator">
        <div>
          <p className="evEyebrow">The practical next step</p>
          <h2>What can you afford in the East Valley?</h2>
          <p>
            Median prices only tell part of the story. Your rate, down payment,
            taxes, insurance, HOA fees and other costs determine your true
            buying power.
          </p>
        </div>
        <a className="evButton red" href="https://acebuyer.adtrealtyaz.com">
          See my true buying power <span>→</span>
        </a>
      </section>

      <footer className="evFooter">
        <Image
          src="/adt-realty-arizona-outline.png"
          alt="ADT Realty Arizona"
          width={84}
          height={84}
        />
        <p>Local guidance across Phoenix's East Valley.</p>
        <details className="evCredits">
          <summary>Photo credits</summary>
          <p>
            East Valley imagery includes work by Designism, Dru Bloomfield, Alan
            Stark, Cygnusloop99, Beyond My Ken, BowenLarsen and other credited
            Creative Commons contributors. Chandler sign photo:
            taniasmile.smirnova / Wallpapers.com. Images cropped for layout.
          </p>
        </details>
        <span>© 2026 ADT Realty · Equal Housing Opportunity</span>
      </footer>
    </main>
  );
}

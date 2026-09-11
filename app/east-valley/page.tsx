import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./east-valley.css";

export const metadata: Metadata = {
  title: "Phoenix East Valley Relocation Guide | ADT Realty",
  description:
    "Explore East Valley cities, downtowns, schools, golf, outdoor recreation, major events, home prices, airports and Arizona weather.",
  alternates: { canonical: "/east-valley" },
};

const cities = [
  {
    slug: "scottsdale",
    name: "Scottsdale",
    tagline: "Desert style, dining and endless ways to get outside",
    image: "scottsdale.jpg",
    body: "Scottsdale stretches from the energy of Old Town to quiet desert communities beside the McDowell Sonoran Preserve. The housing range is just as broad: lock-and-leave condos, established ranch homes, golf communities and luxury estates.",
    schools:
      "Scottsdale Unified serves much of the city; some northern addresses fall within Cave Creek Unified.",
    discover:
      "Old Town's galleries, restaurants and nightlife · McDowell Sonoran Preserve · TPC Scottsdale · spring training at Scottsdale Stadium",
    airport: "About 15–30 minutes",
  },
  {
    slug: "tempe",
    name: "Tempe",
    tagline: "The East Valley's most connected urban address",
    image: "tempe.jpg",
    body: "ASU, Mill Avenue, light rail and Tempe Town Lake give this compact city an energy unlike anywhere else in the East Valley. Housing includes condos, townhomes, mid-century neighborhoods and newer infill close to major employment centers.",
    schools:
      "Tempe Elementary and Tempe Union serve much of the city; southern Tempe also includes Kyrene Elementary areas.",
    discover:
      "Mill Avenue · Tempe Town Lake · ASU arts and athletics · Tempe Festival of the Arts",
    airport: "About 10–15 minutes",
  },
  {
    slug: "mesa",
    name: "Mesa",
    tagline: "More variety than any one description can capture",
    image: "mesa.jpg",
    body: "Mesa is enormous, and each part feels different. Downtown offers light rail, museums and the Mesa Arts Center; northeast Mesa reaches toward Usery Mountain; southeast Mesa includes golf, master-planned neighborhoods and newer construction.",
    schools:
      "Mesa Public Schools serves most addresses; some southeast neighborhoods are within Gilbert Public Schools or Queen Creek Unified.",
    discover:
      "Downtown Mesa · Usery Mountain · Sloan Park · Hohokam Stadium · Mesa Amphitheatre",
    airport: "About 15–35 minutes",
  },
  {
    slug: "chandler",
    name: "Chandler",
    tagline:
      "A real downtown, established neighborhoods and a major tech corridor",
    image: "chandler.jpg",
    body: "Chandler combines a lively historic center with waterfront communities, mature neighborhoods and newer development farther south. The Price Road corridor is one of the Valley's largest employment centers, while Loops 101 and 202 connect the city across the metro.",
    schools:
      "Chandler Unified serves most of the city; west Chandler also includes Kyrene Elementary and Tempe Union areas.",
    discover:
      "Downtown Chandler · Ocotillo · Tumbleweed Park · Chandler Ostrich Festival",
    airport: "About 20–30 minutes",
  },
  {
    slug: "gilbert",
    name: "Gilbert",
    tagline: "Agricultural roots with a modern suburban rhythm",
    image: "gilbert.jpg",
    body: "Gilbert grew from a farming town into one of Arizona's most recognizable suburban communities. The Heritage District, Riparian Preserve, Agritopia, SanTan Village and extensive park system give residents plenty to do without leaving town.",
    schools:
      "Gilbert Public Schools and Higley Unified serve most of Gilbert; some addresses are within Chandler Unified.",
    discover:
      "Heritage District · Gilbert Water Tower · Riparian Preserve · Agritopia · SanTan Village",
    airport: "About 25–35 minutes",
  },
  {
    slug: "queen-creek",
    name: "Queen Creek",
    tagline: "New neighborhoods, farms and room at the Valley's southeast edge",
    image: "queen-creek.jpg",
    body: "Queen Creek mixes fast-growing master-planned communities with farms, custom homes, equestrian property and San Tan Mountain views. New shopping and dining continue to arrive, but the town still keeps visible ties to its agricultural past.",
    schools:
      "Queen Creek Unified serves much of town, with some neighborhoods in Chandler Unified.",
    discover:
      "Schnepf Farms · Queen Creek Olive Mill · Horseshoe Park · San Tan Mountain trails",
    airport: "About 35–50 minutes",
  },
  {
    slug: "san-tan-valley",
    name: "San Tan Valley",
    tagline: "Newer homes with the desert close by",
    image: "san-tan-valley.jpg",
    body: "San Tan Valley sits in Pinal County just southeast of Queen Creek. Buyers often find newer homes and more space for the money here, with the San Tan Mountains forming a dramatic backdrop to many neighborhoods.",
    schools:
      "Florence Unified and J.O. Combs Unified serve much of the area; growth makes address-level verification essential.",
    discover:
      "San Tan Mountain Regional Park · desert trails · newer communities · open mountain views",
    airport: "About 45–60+ minutes",
  },
  {
    slug: "fountain-hills",
    name: "Fountain Hills",
    tagline: "Hillside homes, golf and some of the Valley's widest views",
    image: "fountain-hills.jpg",
    body: "Tucked against the McDowell Mountains northeast of Scottsdale, Fountain Hills has a quieter center built around its landmark fountain. Hillside homes, condos, golf communities and dramatic desert views define the market.",
    schools: "Fountain Hills Unified is the primary public school district.",
    discover:
      "Fountain Park · We-Ko-Pa Golf Club · McDowell Mountain trails · Four Peaks views",
    airport: "About 30–40 minutes",
  },
];

const prices = [
  ["Scottsdale", "$900K"],
  ["Fountain Hills", "$720K"],
  ["Queen Creek", "$670K"],
  ["Gilbert", "$575K"],
  ["Chandler", "$525K"],
  ["Tempe", "$500K"],
  ["Mesa", "$470K"],
  ["San Tan Valley", "$430K"],
];

export default function EastValleyGuide() {
  return (
    <main className="evPage">
      <header className="evHeader">
        <Link href="/" className="evBrand">
          <Image
            src="/adt-realty-arizona-outline.png"
            alt="ADT Realty Arizona"
            width={92}
            height={92}
          />
        </Link>
        <nav>
          <a href="#cities">Cities</a>
          <a href="#play">Things to do</a>
          <a href="#market">Home prices</a>
          <a href="#weather">Weather</a>
        </nav>
        <a className="evHeaderCta" href="/#contact">
          Ask a local agent
        </a>
      </header>
      <section className="evHero">
        <div className="evHeroImage" />
        <div className="evHeroShade" />
        <div className="evHeroCopy">
          <p className="evEyebrow">The Phoenix East Valley</p>
          <h1>Find your corner of the desert.</h1>
          <p>
            Eight communities, countless ways to spend a Saturday—and a lot more
            to consider than the price of a house.
          </p>
          <a className="evButton" href="#cities">
            Explore the cities <span>↓</span>
          </a>
        </div>
        <div className="evCityRail">
          {cities.map((c) => (
            <a key={c.slug} href={`#${c.slug}`}>
              {c.name}
            </a>
          ))}
        </div>
      </section>

      <section className="evWelcome">
        <p className="evEyebrow dark">Welcome to the East Valley</p>
        <h2>City life, desert trails and everything in between.</h2>
        <p>
          Morning on a golf course. Dinner in Downtown Gilbert. A
          spring-training game in Mesa. A concert in Phoenix. The East Valley
          gives you room to choose how close—or how far—you want to be from it
          all.
        </p>
      </section>

      <section className="evCityStories" id="cities">
        {cities.map((c, i) => (
          <article
            className={`evStory ${i % 2 ? "reverse" : ""}`}
            id={c.slug}
            key={c.slug}
          >
            <div
              className="evStoryImage"
              style={{
                backgroundImage: `url('/images/east-valley/${c.image}')`,
              }}
              role="img"
              aria-label={`${c.name}, Arizona`}
            />
            <div className="evStoryCopy">
              <p className="evEyebrow dark">{c.name}, Arizona</p>
              <h2>{c.tagline}</h2>
              <p>{c.body}</p>
              <div className="evStoryFacts">
                <div>
                  <strong>Explore</strong>
                  <span>{c.discover}</span>
                </div>
                <div>
                  <strong>Public schools</strong>
                  <span>
                    {c.schools} Verify boundaries by property address.
                  </span>
                </div>
                <div>
                  <strong>Sky Harbor</strong>
                  <span>
                    {c.airport} in normal traffic; location and time of day
                    matter.
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="evGolf" id="play">
        <div className="evGolfImage" />
        <div className="evGolfShade" />
        <div className="evGolfCopy">
          <p className="evEyebrow">Golf in the Valley</p>
          <h2>A different course for every kind of round.</h2>
          <p>
            From desert target golf to traditional parkland layouts, the metro
            includes renowned resorts, public courses and private clubs. TPC
            Scottsdale, We-Ko-Pa, Talking Stick, Ocotillo, Whirlwind, Las
            Sendas, Longbow, Kierland, The Boulders and San Marcos are only the
            beginning.
          </p>
        </div>
      </section>

      <section className="evDowntowns">
        <div className="evSectionLead">
          <p className="evEyebrow dark">Go out without going far</p>
          <h2>Five districts worth knowing.</h2>
        </div>
        <div className="evDowntownCards">
          <article>
            <h3>Downtown Gilbert</h3>
            <p>
              Restaurants, nightlife, Hale Centre Theatre and farmers markets
              surrounding the landmark water tower.
            </p>
          </article>
          <article>
            <h3>Downtown Chandler</h3>
            <p>
              Historic storefronts, breweries, public art, festivals and the
              Chandler Center for the Arts.
            </p>
          </article>
          <article>
            <h3>Old Town Scottsdale</h3>
            <p>
              Galleries, museums, restaurants, nightlife, resorts and Scottsdale
              Fashion Square.
            </p>
          </article>
          <article>
            <h3>Downtown Mesa</h3>
            <p>
              Light rail, Mesa Arts Center, museums, live music and an evolving
              restaurant scene.
            </p>
          </article>
          <article>
            <h3>Tempe & Town Lake</h3>
            <p>
              Mill Avenue, ASU, Tempe Beach Park, waterfront recreation and
              major community events.
            </p>
          </article>
        </div>
      </section>

      <section className="evSports">
        <div className="evSportsImage" />
        <div className="evSportsCopy">
          <p className="evEyebrow">A major-event city</p>
          <h2>Phoenix plays on the national stage.</h2>
          <p>
            The Valley has hosted multiple Super Bowls, college football
            national championship games, NCAA men's and women's basketball
            championships, major bowl games, NASCAR weekends and baseball's
            Cactus League.
          </p>
          <div className="evVenueList">
            <span>State Farm Stadium</span>
            <span>Chase Field</span>
            <span>Phoenix's downtown arena</span>
            <span>Desert Diamond Arena</span>
            <span>Arizona Financial Theatre</span>
            <span>Talking Stick Resort Amphitheatre</span>
            <span>Mesa Amphitheatre</span>
            <span>Mullett Arena</span>
          </div>
        </div>
      </section>

      <section className="evOutdoors">
        <div className="evSectionLead">
          <p className="evEyebrow dark">Your first-year list</p>
          <h2>Get outside. Then keep going.</h2>
        </div>
        <div className="evOutdoorGrid">
          <article>
            <h3>Trails</h3>
            <p>
              McDowell Sonoran Preserve, Usery Mountain, San Tan Mountain and
              South Mountain offer hiking, running, biking and trail riding.
            </p>
          </article>
          <article>
            <h3>Water</h3>
            <p>
              Saguaro Lake, Canyon Lake and the Lower Salt River offer boating,
              paddling, fishing and seasonal tubing.
            </p>
          </article>
          <article>
            <h3>Signature events</h3>
            <p>
              Chandler Ostrich Festival, WM Phoenix Open, Barrett-Jackson,
              Scottsdale Arabian Horse Show and Tempe Festival of the Arts.
            </p>
          </article>
          <article>
            <h3>Spring training</h3>
            <p>
              Sloan Park, Scottsdale Stadium, Salt River Fields, Hohokam Stadium
              and Tempe Diablo Stadium are all near the East Valley.
            </p>
          </article>
        </div>
      </section>

      <section className="evAirports">
        <div>
          <p className="evEyebrow dark">Getting there</p>
          <h2>Sky Harbor is closer than many newcomers expect.</h2>
          <p>
            Tempe is typically the quickest East Valley trip. Scottsdale, Mesa,
            Chandler and Gilbert remain practical for regular travelers, while
            Queen Creek and San Tan Valley trade airport proximity for newer
            development and more space.
          </p>
        </div>
        <aside>
          <h3>Phoenix-Mesa Gateway Airport</h3>
          <p>
            For Mesa, Gilbert, Queen Creek and San Tan Valley, Gateway can be
            considerably more convenient. It serves fewer destinations than Sky
            Harbor, but it is worth checking before every trip.
          </p>
        </aside>
      </section>

      <section className="evMarket" id="market">
        <div className="evMarketIntro">
          <p className="evEyebrow">Housing snapshot</p>
          <h2>Now, about the numbers.</h2>
          <p>
            These rounded 2026 citywide medians are a starting point—not a
            prediction. Neighborhood, property type, lot, age and condition can
            change the picture quickly.
          </p>
        </div>
        <div className="evPriceList">
          {prices.map(([city, price]) => (
            <div key={city}>
              <span>{city}</span>
              <strong>About {price}</strong>
            </div>
          ))}
        </div>
        <p className="evDataNote">
          Market data changes monthly. Verify current city and neighborhood
          sales before making a housing decision.
        </p>
      </section>

      <section className="evSchools">
        <div>
          <p className="evEyebrow dark">About Arizona schools</p>
          <h2>Verify the address, not just the city.</h2>
        </div>
        <div className="evSchoolCopy">
          <p>
            School attendance boundaries do not always follow city limits, and
            several East Valley communities contain more than one district.
            Confirm assigned schools directly with the district.
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
        <div>
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

      <section className="evNext">
        <div>
          <p className="evEyebrow">Ready for the practical part?</p>
          <h2>See what fits your budget.</h2>
          <p>
            Interest rate, down payment, taxes, insurance and HOA costs
            determine your true buying power—not the citywide median.
          </p>
        </div>
        <div>
          <a className="evButton red" href="https://acebuyer.adtrealtyaz.com">
            See my true buying power <span>→</span>
          </a>
          <a className="evAgentLink" href="/#contact">
            Ask a local agent
          </a>
        </div>
      </section>
      <footer className="evFooter">
        <Image
          src="/adt-realty-arizona-outline.png"
          alt="ADT Realty Arizona"
          width={82}
          height={82}
        />
        <p>Local guidance across Phoenix's East Valley.</p>
        <details>
          <summary>Photo credits</summary>
          <p>Wikimedia Commons: Designism (CC0); Bobak Ha’Eri and Ixnayonthetimmay (CC BY 3.0); Alan Stark (CC BY-SA 2.0); Cygnusloop99 and Ixnayonthetimmay (CC BY-SA 3.0); Beyond My Ken, BowenLarsen and Hunter Trick (CC BY-SA 4.0); SecretName101 (CC BY 4.0). Images cropped for layout.</p>
        </details>
        <span>© 2026 ADT Realty · Equal Housing Opportunity</span>
      </footer>
    </main>
  );
}

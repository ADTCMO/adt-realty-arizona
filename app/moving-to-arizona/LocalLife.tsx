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


export default function LocalLife() { return <>
<p className="relLifestyleNote">Check current schedules, public access, reservations and trail conditions directly before visiting.</p>
      <section className="evPhotoBreak evPhotoTwo">
        <div>
          <p className="evEyebrow">After the moving truck leaves</p>
          <h2>What will your weekends look like?</h2>
        </div>
      </section>

      <section className="evLife" id="downtowns">
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
              <strong><a href="https://ostrichfestival.com/location-information/">Chandler Ostrich Festival</a></strong>
              <span>Rawhide Western Town &amp; Event Center</span>
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
          <h2>Mesa Gateway can save a long drive.</h2>
        </div>
        <p>
          For Mesa, Gilbert, Queen Creek and San Tan Valley, Mesa Gateway Airport (formerly Phoenix-Mesa Gateway) can
          be considerably more convenient. It serves fewer destinations than Sky
          Harbor, but southeastern East Valley residents should check both
          airports before booking.
        </p>
      </section>


</>; }

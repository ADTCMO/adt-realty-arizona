import type { PhoenixArea, Source, AreaHighlight } from "./types";

export const phoenixAreas: PhoenixArea[] = [
  {
    "id": "paradise-valley-town",
    "name": "Town of Paradise Valley",
    "jurisdiction": "Town of Paradise Valley · separate municipality",
    "intro": "Resort grounds, desert landmarks and a predominantly residential setting distinguish the Town of Paradise Valley from the surrounding city neighborhoods.",
    "housing": "Predominantly single-family residential zoning, with many larger lots. The town’s resident guide describes one-acre zoning across much of town, with smaller-lot exceptions; verify each parcel.",
    "schools": "Scottsdale Unified serves much of the town, with other district boundaries affecting some addresses. Use the school locator and confirm the property directly with the district.",
    "highlights": [
      {
        "name": "Barry Goldwater Memorial",
        "detail": "A landscaped memorial and pedestrian path at Tatum Boulevard and Lincoln Drive.",
        "url": "https://www.paradisevalleyaz.gov/457/Attractions"
      },
      {
        "name": "Resort dining and spas",
        "detail": "The town directory includes Hermosa Inn, Mountain Shadows and Sanctuary Camelback Mountain; check reservations and day-use policies.",
        "url": "https://www.paradisevalleyaz.gov/352/Resort-Spas"
      }
    ],
    "golf": [
      {
        "name": "Camelback Golf Club & Mountain Shadows",
        "detail": "Two options in the town’s official golf directory. Check tee times, fees and access directly with the operator.",
        "url": "https://www.paradisevalleyaz.gov/348/Golf"
      }
    ],
    "tradeoff": "A town address is not the same as Phoenix’s Paradise Valley Village. For larger-lot or hillside properties, investigate maintenance, access and property-specific development rules before committing.",
    "airport": "Check Sky Harbor directions from the exact town address; routes vary across residential and resort locations.",
    "schoolLinks": [
      {
        "name": "Scottsdale Unified school locator",
        "url": "https://www.susd.org/our-district/our-schools"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "Town is not a Phoenix neighborhood or the Phoenix Paradise Valley urban village.",
      "Town housing description is planning context, not an inventory or price forecast."
    ],
    "sources": [
      {
        "title": "Town of Paradise Valley — Resident Guide",
        "url": "https://paradisevalleyaz.gov/DocumentView.aspx?DID=197"
      },
      {
        "title": "Town of Paradise Valley — Attractions",
        "url": "https://www.paradisevalleyaz.gov/457/Attractions"
      },
      {
        "title": "Town of Paradise Valley — Resorts & Spas",
        "url": "https://www.paradisevalleyaz.gov/352/Resort-Spas"
      },
      {
        "title": "Town of Paradise Valley — Golf",
        "url": "https://www.paradisevalleyaz.gov/348/Golf"
      },
      {
        "title": "Town of Paradise Valley — 2022 General Plan",
        "url": "https://paradisevalleyaz.gov/DocumentCenter/View/9608/2022-General-Plan"
      },
      {
        "title": "Scottsdale Unified — Schools and school locator",
        "url": "https://www.susd.org/our-district/our-schools"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://paradisevalleyaz.gov/DocumentView.aspx?DID=197",
      "https://www.paradisevalleyaz.gov/457/Attractions",
      "https://www.paradisevalleyaz.gov/352/Resort-Spas",
      "https://www.paradisevalleyaz.gov/348/Golf",
      "https://paradisevalleyaz.gov/DocumentCenter/View/9608/2022-General-Plan",
      "https://www.susd.org/our-district/our-schools",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 4497858,
      "period": "Three months ending September 2026",
      "coverage": "Paradise Valley town market · all home types",
      "sourceUrl": "https://www.redfin.com/city/13625/AZ/Paradise-Valley/housing-market",
      "note": "Redfin’s Paradise Valley town market, not Phoenix’s Paradise Valley Village. Sold-home mix affects the median; this is not an estimate for an individual property."
    },
    "image": {
      "src": "/images/phoenix/paradise-valley-town.jpg",
      "alt": "Camelback Mountain and resort pool in Paradise Valley, Arizona",
      "caption": "Camelback Mountain from the Town of Paradise Valley.",
      "credit": "Gage Skidmore · Paradise Valley, Arizona (52069353266) · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Paradise_Valley,_Arizona_(52069353266).jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  {
    "id": "ahwatukee",
    "name": "Ahwatukee Foothills",
    "jurisdiction": "City of Phoenix · official urban village",
    "intro": "South Mountain shapes this Phoenix village, where desert recreation, neighborhood parks and golf sit alongside a largely low-rise residential landscape.",
    "housing": "Master-planned, single-family neighborhoods are a defining feature of the village’s predominantly low-rise setting.",
    "schools": "Kyrene serves the area at elementary and middle-school levels, and Tempe Union serves the high-school area. Verify current attendance boundaries for the address and enrollment year.",
    "highlights": [
      {
        "name": "South Mountain trails",
        "detail": "Explore the preserve’s designated hiking and biking routes; choose the right trailhead and check current closures.",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
      },
      {
        "name": "Neighborhood parks and outdoor space",
        "detail": "The city’s village guide highlights parks, playgrounds, walking and cycling as part of the local setting.",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/ahwatukee-foothills.html"
      }
    ],
    "golf": [
      {
        "name": "Ahwatukee Golf Club",
        "detail": "A public golf option on South 48th Street, with tee-time information and indoor simulators on its official site.",
        "url": "https://www.ahwatukeegolf.com/"
      }
    ],
    "tradeoff": "It is part of Phoenix, not a separate city. Compare the exact route to work and services rather than assuming every foothills address has the same access.",
    "airport": "I-10 is a major local connection. Check the property-to-terminal route rather than a fixed travel time.",
    "schoolLinks": [
      {
        "name": "Kyrene boundary maps",
        "url": "https://www.kyrene.org/schools/schools/maps-locations-boundaries"
      },
      {
        "name": "Tempe Union attendance boundaries",
        "url": "https://www.tempeunion.org/about-tuhsd/enrollment/attendance-boundaries"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "District boundaries and school assignments can change; use the map for the intended enrollment year."
    ],
    "sources": [
      {
        "title": "City of Phoenix — Ahwatukee Foothills",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/ahwatukee-foothills.html"
      },
      {
        "title": "City of Phoenix — South Mountain Park/Preserve",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
      },
      {
        "title": "Ahwatukee Golf Club — Official course website",
        "url": "https://www.ahwatukeegolf.com/"
      },
      {
        "title": "Kyrene School District — Communities served",
        "url": "https://www.kyrene.org/about-kyrene/about-kyrene-schools"
      },
      {
        "title": "Kyrene School District — Boundary maps",
        "url": "https://www.kyrene.org/schools/schools/maps-locations-boundaries"
      },
      {
        "title": "Tempe Union High School District — Attendance boundaries",
        "url": "https://www.tempeunion.org/about-tuhsd/enrollment/attendance-boundaries"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/ahwatukee-foothills.html",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html",
      "https://www.ahwatukeegolf.com/",
      "https://www.kyrene.org/about-kyrene/about-kyrene-schools",
      "https://www.kyrene.org/schools/schools/maps-locations-boundaries",
      "https://www.tempeunion.org/about-tuhsd/enrollment/attendance-boundaries",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 519854,
      "period": "Three months ending September 2026",
      "coverage": "Redfin Ahwatukee Foothills area · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/103631/AZ/Phoenix/Ahwatukee-Foothills/housing-market",
      "note": "Uses Redfin’s Ahwatukee Foothills market boundary. Neighborhood-level prices and home types vary within the area."
    },
    "image": {
      "src": "/images/phoenix/ahwatukee.jpg",
      "alt": "Aerial view of Ahwatukee neighborhoods beside South Mountain",
      "caption": "Ahwatukee neighborhoods alongside South Mountain.",
      "credit": "Hunter Trick (TrickHunter) · 231209-2 Ahwatukee and South Mountain · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:231209-2_Ahwatukee_and_South_Mountain.jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "id": "arcadia",
    "name": "Arcadia",
    "jurisdiction": "Neighborhood / market area · Phoenix–Scottsdale context",
    "intro": "Arcadia’s citrus-growing history, ranch-home character, local restaurants and Arizona Canal recreation give it a distinct identity around the Camelback area.",
    "housing": "Midcentury ranch homes are part of Arcadia’s established character. Compare the individual lot, renovation history and exact neighborhood label rather than treating all Arcadia listings as interchangeable.",
    "schools": "Start with the property’s jurisdiction and school-district map, then check the Scottsdale Unified locator where applicable. An Arcadia marketing label does not establish an assigned school.",
    "highlights": [
      {
        "name": "Arizona Canal & Arizona Falls",
        "detail": "Canal-side walking and cycling routes connect with the Arizona Falls public-art and water feature.",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/"
      },
      {
        "name": "Neighborhood dining",
        "detail": "Explore the Camelback and Indian School corridors for independent cafés, patios and restaurants.",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/"
      }
    ],
    "golf": [],
    "tradeoff": "Arcadia is not a municipality with one universally used boundary. Broader Arcadia and Arcadia Lite labels can describe different locations; verify the actual parcel and nearby destinations.",
    "airport": "Map the actual address to Sky Harbor; the broad Arcadia label does not establish a drive time.",
    "schoolLinks": [
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Scottsdale Unified school locator",
        "url": "https://www.susd.org/our-district/our-schools"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "No hard Arcadia boundary is asserted. Phoenix and Scottsdale use different planning frameworks, while listing labels may be broader.",
      "Nearby attractions need not lie inside a single defined Arcadia boundary."
    ],
    "sources": [
      {
        "title": "Visit Phoenix — Arcadia neighborhood guide",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/"
      },
      {
        "title": "City of Phoenix — Camelback East Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/camelback-east.html"
      },
      {
        "title": "City of Scottsdale — Southern Scottsdale Character Area Plan, Executive Summary",
        "url": "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/long-range-planning/character-area-plans/southern-scottdale/southern-scottsdale-character-area-plan---executive-summary.pdf?sfvrsn=1055bd5c_1"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Scottsdale Unified — Schools and school locator",
        "url": "https://www.susd.org/our-district/our-schools"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/",
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/camelback-east.html",
      "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/long-range-planning/character-area-plans/southern-scottdale/southern-scottsdale-character-area-plan---executive-summary.pdf?sfvrsn=1055bd5c_1",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.susd.org/our-district/our-schools",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 1254648,
      "period": "Three months ending September 2026",
      "coverage": "Redfin Arcadia area · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/351070/AZ/Phoenix/Arcadia/housing-market",
      "note": "Uses Redfin’s Arcadia boundary; not a combined Arcadia/Arcadia Lite figure. Listing labels can cover different areas."
    },
    "image": {
      "src": "/images/phoenix/arcadia.jpg",
      "alt": "Water falling at the Arizona Falls canal landmark in Phoenix",
      "caption": "Arizona Falls on the Arizona Canal in Arcadia.",
      "credit": "Patrick Finnegan · Arizona Falls, Phoenix, AZ · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Arizona_Falls,_Phoenix,_AZ.jpg",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    }
  },
  {
    "id": "downtown-midtown",
    "name": "Downtown & Midtown",
    "jurisdiction": "City of Phoenix · central districts",
    "intro": "Downtown’s galleries, dining and event venues connect with Midtown’s museum and Central Avenue corridor for a more urban side of Phoenix.",
    "housing": "High-rise residential development along Central Avenue contrasts with older neighborhoods and designated historic districts around the downtown core.",
    "schools": "Central Phoenix spans multiple school attendance areas. Check both elementary and high-school district maps and confirm the exact address with the district.",
    "highlights": [
      {
        "name": "Roosevelt Row",
        "detail": "Galleries, murals, restaurants and boutiques make this a natural starting point for exploring the arts district.",
        "url": "https://www.visitphoenix.com/things-to-do/roosevelt-row/"
      },
      {
        "name": "Museum corridor",
        "detail": "Phoenix Art Museum and the Heard Museum anchor cultural outings along the central corridor.",
        "url": "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/"
      },
      {
        "name": "Downtown venues",
        "detail": "Look beyond a single attraction: downtown’s theaters, music venues and sports destinations offer different evening plans.",
        "url": "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/"
      }
    ],
    "golf": [
      {
        "name": "Phoenix municipal golf",
        "detail": "The city’s golf network provides additional recreation beyond the central arts and dining districts; check course locations and booking policies.",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/phoenix-golf-courses.html"
      }
    ],
    "tradeoff": "A high-rise, a historic house and an arts-district apartment offer very different daily experiences. Evaluate parking, building fees, sound exposure and the actual walk to your destinations.",
    "airport": "Compare driving with Valley Metro Rail and the PHX Sky Train connection at 44th Street and Washington.",
    "schoolLinks": [
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "Downtown and Midtown are grouped for this comparison; they are not one official village or school zone.",
      "Practical tradeoffs are due-diligence prompts rather than measured noise or walkability scores."
    ],
    "sources": [
      {
        "title": "City of Phoenix — Central City Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/central-city-village.html"
      },
      {
        "title": "City of Phoenix — Encanto Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/encanto.html"
      },
      {
        "title": "Visit Phoenix — Roosevelt Row",
        "url": "https://www.visitphoenix.com/things-to-do/roosevelt-row/"
      },
      {
        "title": "Visit Phoenix — Things to do in Downtown Phoenix",
        "url": "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/"
      },
      {
        "title": "City of Phoenix — Municipal golf",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/phoenix-golf-courses.html"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Public transportation",
        "url": "https://www.skyharbor.com/ground-transportation/public-transportation/"
      },
      {
        "title": "Phoenix Sky Harbor — PHX Sky Train",
        "url": "https://www.skyharbor.com/ground-transportation/phx-sky-train/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/central-city-village.html",
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/encanto.html",
      "https://www.visitphoenix.com/things-to-do/roosevelt-row/",
      "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/phoenix-golf-courses.html",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/ground-transportation/public-transportation/",
      "https://www.skyharbor.com/ground-transportation/phx-sky-train/"
    ],
    "market": {
      "medianSalePrice": 427380,
      "period": "Three months ending September 2026",
      "coverage": "Downtown Phoenix only · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/100404/AZ/Phoenix/Downtown-Phoenix/housing-market",
      "note": "This snapshot covers Redfin’s Downtown Phoenix area only, not Midtown or the combined central corridor. A small sales sample and condo mix can move the median sharply."
    },
    "image": {
      "src": "/images/phoenix/downtown-midtown.jpg",
      "alt": "Illuminated buildings of the Downtown Phoenix skyline at night",
      "caption": "Downtown Phoenix at night, viewed from the Summit at Copper Square.",
      "credit": "Alan Stark · Downtown Phoenix Skyline Lights · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Downtown_Phoenix_Skyline_Lights.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  {
    "id": "biltmore",
    "name": "Biltmore",
    "jurisdiction": "City of Phoenix · Camelback East area",
    "intro": "The Arizona Biltmore resort, golf, Biltmore Fashion Park and the Camelback corridor create a recognizable mix of residential, retail and resort activity.",
    "housing": "Established residential enclaves around the resort include villa, condominium and other neighborhood settings. Compare the particular community rather than assuming one Biltmore housing type.",
    "schools": "Madison’s published boundaries cover part of this central-east area. Use its maps and the city’s separate high-school district map to verify the property; the Biltmore label alone is not an assignment.",
    "highlights": [
      {
        "name": "Biltmore Fashion Park & Esplanade",
        "detail": "Shopping and dining around Camelback Road, including a pedestrian connection between the two destinations.",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
      },
      {
        "name": "Arizona Biltmore",
        "detail": "A landmark resort setting for dining and a staycation; confirm reservations and access to individual amenities.",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
      }
    ],
    "golf": [
      {
        "name": "Arizona Biltmore Golf Club",
        "detail": "Two courses are highlighted by Visit Phoenix. Check current tee times and course information directly before planning a round.",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
      }
    ],
    "tradeoff": "Distinguish the resort grounds, residential enclaves and busy commercial corridor. Check community rules, ownership costs and the route to the places you expect to use.",
    "airport": "Check the exact address-to-terminal route rather than relying on one Biltmore-wide airport estimate.",
    "schoolLinks": [
      {
        "name": "Madison district and school boundaries",
        "url": "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries"
      },
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "Planning documents and a city condominium record establish housing examples, not a current inventory count.",
      "Biltmore is not a separate municipality."
    ],
    "sources": [
      {
        "title": "Visit Phoenix — Biltmore neighborhood guide",
        "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
      },
      {
        "title": "City of Phoenix — Arizona Biltmore Resort planning context",
        "url": "https://www.phoenix.gov/pddsite/Documents/PZ/z-71-08v1.pdf"
      },
      {
        "title": "City of Phoenix — Biltmore Courts condominium parcel example",
        "url": "https://shapephx.phoenix.gov/s/parcel/a078y000000whTEAAY/16469859"
      },
      {
        "title": "City of Phoenix — Camelback East Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/camelback-east.html"
      },
      {
        "title": "Madison School District — District and school boundaries",
        "url": "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//",
      "https://www.phoenix.gov/pddsite/Documents/PZ/z-71-08v1.pdf",
      "https://shapephx.phoenix.gov/s/parcel/a078y000000whTEAAY/16469859",
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/camelback-east.html",
      "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 1062952,
      "period": "Three months ending September 2026",
      "coverage": "Redfin Biltmore area · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/351068/AZ/Phoenix/Biltmore/housing-market",
      "note": "Uses Redfin’s Biltmore boundary, not all of ZIP 85016 or Camelback East. Condos, townhomes and detached homes can have very different prices."
    },
    "image": {
      "src": "/images/phoenix/biltmore.jpg",
      "alt": "Historic Arizona Biltmore hotel exterior and landscaped lawn",
      "caption": "The Arizona Biltmore resort, a landmark of the Biltmore area.",
      "credit": "w_lemay · Arizona Biltmore Hotel, Missouri Ave, Biltmore Area, Phoenix, AZ · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Arizona_Biltmore_Hotel,_Missouri_Ave,_Biltmore_Area,_Phoenix,_AZ.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  {
    "id": "north-central",
    "name": "North Central",
    "jurisdiction": "City of Phoenix · Central Avenue area",
    "intro": "The North Central Avenue corridor is known for its established streetscape, historic properties and the Murphy Bridle Path—an alternative to both downtown towers and outer-valley subdivisions.",
    "housing": "The city’s North Central Avenue plan emphasizes larger-lot single-family character, while also documenting patio-home and condominium examples. Surrounding streets and parcels vary.",
    "schools": "Madison’s district and attendance maps are a useful starting point for many addresses along this part of central Phoenix. Confirm elementary and high-school assignments separately.",
    "highlights": [
      {
        "name": "Murphy Bridle Path",
        "detail": "A gravel recreational path along North Central Avenue, with a long history in the area.",
        "url": "https://www.phoenix.gov/villagessite/Documents/pdd_pz_pdf_00005.pdf"
      },
      {
        "name": "Historic streetscape",
        "detail": "Explore the corridor’s tree-lined setting and historic architectural character from public streets and paths.",
        "url": "https://www.phoenix.gov/villagessite/Documents/pdd_pz_pdf_00005.pdf"
      }
    ],
    "golf": [],
    "tradeoff": "North Central is a broad neighborhood label; the city’s special planning district covers a more specific corridor. Check property condition, landscaping needs and any applicable historic or planning requirements.",
    "airport": "Include neighborhood-street access when comparing the property’s route to Sky Harbor.",
    "schoolLinks": [
      {
        "name": "Madison district and school boundaries",
        "url": "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries"
      },
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "The 2004 character plan supports historical and streetscape context only; it is not a current inventory or legal-zoning determination.",
      "The broader North Central label is not given a hard boundary."
    ],
    "sources": [
      {
        "title": "City of Phoenix — North Central Avenue Special Planning District (2004 character plan)",
        "url": "https://www.phoenix.gov/villagessite/Documents/pdd_pz_pdf_00005.pdf"
      },
      {
        "title": "Madison School District — District and school boundaries",
        "url": "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/villagessite/Documents/pdd_pz_pdf_00005.pdf",
      "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 878000,
      "period": "Three months ending March 2026",
      "coverage": "North Central Corridor · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/351122/AZ/Phoenix/North-Central-Corridor/housing-market",
      "note": "Older snapshot: March 2026 is the period shown in Redfin’s data panel when checked October 26, 2026. Covers Redfin’s North Central Corridor, not every area marketed as North Central."
    },
    "image": {
      "src": "/images/phoenix/north-central.jpg",
      "alt": "Tree-shaded Murphy Bridle Path beside Central Avenue in Phoenix",
      "caption": "Murphy Bridle Path along North Central Avenue.",
      "credit": "Mark S. Süever · Murphy's Bridle Path, Central Avenue, Phoenix - panoramio · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Murphy%27s_Bridle_Path,_Central_Avenue,_Phoenix_-_panoramio.jpg",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    }
  },
  {
    "id": "desert-ridge",
    "name": "Desert Ridge & North Phoenix",
    "jurisdiction": "City of Phoenix · Desert View area",
    "intro": "Desert Ridge combines shopping, dining, the Musical Instrument Museum and resort golf near the northern part of Phoenix, with desert recreation adding another dimension.",
    "housing": "Near Desert Ridge and Loop 101, the city describes condominiums and master-planned communities. Farther north in Desert View, large-lot and equestrian properties create a different setting.",
    "schools": "Use Paradise Valley Unified’s enrollment map where applicable, then confirm the district for the exact parcel. North Phoenix is broader than any one school district.",
    "highlights": [
      {
        "name": "Desert Ridge Marketplace",
        "detail": "An open-air shopping and dining destination with gathering spaces and a changing events calendar.",
        "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
      },
      {
        "name": "Musical Instrument Museum",
        "detail": "Explore instruments and musical traditions, then check the separate concert calendar for evening performances.",
        "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
      },
      {
        "name": "Reach 11",
        "detail": "A nearby option for multiuse trails and open-desert recreation; check permitted uses and current conditions.",
        "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
      }
    ],
    "golf": [
      {
        "name": "Wildfire Golf Club",
        "detail": "The JW Marriott Desert Ridge resort’s Palmer and Faldo courses offer two local golf options.",
        "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
      }
    ],
    "tradeoff": "Desert Ridge is not synonymous with all of North Phoenix. A property near the shopping core can have a very different setting and daily route from a farther-north large-lot home.",
    "airport": "Loop 101 serves the Desert Ridge core; check current routing from the property to Sky Harbor.",
    "schoolLinks": [
      {
        "name": "Paradise Valley Unified enrollment map",
        "url": "https://www.pvschools.net/enroll"
      },
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "North Phoenix is a broad descriptive region; this card focuses on Desert Ridge and the Desert View context.",
      "Amenities may require separate reservations, tickets or fees."
    ],
    "sources": [
      {
        "title": "City of Phoenix — Desert View Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/desert-view.html"
      },
      {
        "title": "Visit Phoenix — Desert Ridge neighborhood guide",
        "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
      },
      {
        "title": "Paradise Valley Unified — Enrollment and boundary map",
        "url": "https://www.pvschools.net/enroll"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/desert-view.html",
      "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/",
      "https://www.pvschools.net/enroll",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 660000,
      "period": "Three months ending March 2026",
      "coverage": "Desert Ridge only · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/104445/AZ/Phoenix/Desert-Ridge/housing-market",
      "note": "Older snapshot: March 2026 is the period shown in Redfin’s data panel when checked October 26, 2026. Covers Desert Ridge only, not all of North Phoenix."
    },
    "image": {
      "src": "/images/phoenix/desert-ridge.jpg",
      "alt": "Desert landscaping along the entrance of the Musical Instrument Museum",
      "caption": "Musical Instrument Museum on Mayo Boulevard, near Desert Ridge.",
      "credit": "PamMcP · Musical Instrument Museum, Phoenix AZ · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Musical_Instrument_Museum,_Phoenix_AZ.JPG",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "id": "south-mountain",
    "name": "South Mountain",
    "jurisdiction": "City of Phoenix · official urban village",
    "intro": "South Mountain Village brings together varied residential settings and access to the mountain preserve, with city life and desert scenery close to one another.",
    "housing": "The city describes a broad mix that includes historic and custom homes, urban residential settings and larger-lot horse properties. Compare specific streets rather than one area-wide housing profile.",
    "schools": "South Mountain spans multiple attendance areas. Use Phoenix’s elementary and high-school district maps, then verify the assigned schools directly for the address.",
    "highlights": [
      {
        "name": "South Mountain Park/Preserve",
        "detail": "Designated hiking, mountain-biking and equestrian routes span the preserve; check the chosen route’s permitted uses.",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
      },
      {
        "name": "Dobbins Lookout",
        "detail": "A panoramic viewpoint reached by trails or Summit Road when open. Review road restrictions and closures before setting out.",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
      }
    ],
    "golf": [],
    "tradeoff": "The village and the park are not the same boundary, and this is not Ahwatukee on the mountain’s other side. Check the specific street, commute and trailhead you plan to use.",
    "airport": "Check the property-to-terminal route; the South Mountain label alone does not establish airport convenience.",
    "schoolLinks": [
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "Do not describe every South Mountain property as trail-adjacent.",
      "Trail and roadway access may change because of heat, maintenance or events."
    ],
    "sources": [
      {
        "title": "City of Phoenix — South Mountain Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/south-mountain.html"
      },
      {
        "title": "City of Phoenix — South Mountain Park/Preserve",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/south-mountain.html",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 386822,
      "period": "Three months ending September 2026",
      "coverage": "Redfin South Mountain area · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/105591/AZ/Phoenix/South-Mountain/housing-market",
      "note": "Uses Redfin’s South Mountain housing-market boundary, not the park itself or all of South Phoenix."
    },
    "image": {
      "src": "/images/phoenix/south-mountain.jpg",
      "alt": "Stone Dobbins Lookout shelter above the Phoenix valley at sunset",
      "caption": "Dobbins Lookout in South Mountain Park/Preserve.",
      "credit": "Gage Skidmore · Dobbins Lookout by Gage Skidmore · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dobbins_Lookout_by_Gage_Skidmore.jpg",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "id": "paradise-valley-village",
    "name": "Paradise Valley Village",
    "jurisdiction": "City of Phoenix · official urban village",
    "intro": "This northeast Phoenix village combines established residential neighborhoods, shopping areas and access to the Phoenix Mountains and Indian Bend Wash recreation corridors.",
    "housing": "Established residential neighborhoods are a key part of the village, alongside mixed housing, shopping and employment areas. Compare the exact subdivision and property type.",
    "schools": "Paradise Valley Unified provides an enrollment and boundary-map tool. Verify whether the property falls within that district and which attendance zone applies rather than relying on the shared name.",
    "highlights": [
      {
        "name": "Phoenix Mountains access",
        "detail": "The village’s surrounding mountain-preserve areas offer designated hiking, biking and equestrian recreation.",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/paradise-valley.html"
      },
      {
        "name": "Indian Bend Wash greenbelt",
        "detail": "The city identifies this flood-control greenbelt and associated trails as part of the village’s outdoor setting.",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/paradise-valley.html"
      }
    ],
    "golf": [],
    "tradeoff": "This is Phoenix, not the separately incorporated Town of Paradise Valley. The shared name is an easy source of confusion in home searches; confirm jurisdiction and location first.",
    "airport": "Map the Phoenix address, not the Town of Paradise Valley, when checking airport access.",
    "schoolLinks": [
      {
        "name": "Paradise Valley Unified enrollment map",
        "url": "https://www.pvschools.net/enroll"
      },
      {
        "name": "Phoenix school district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "name": "Arizona School Report Cards",
        "url": "https://azreportcards.azed.gov/"
      }
    ],
    "caveats": [
      "The city overview still uses the historic Paradise Valley Mall name; this guide deliberately does not repeat that as a current retail name.",
      "Village, town and school-district boundaries are different."
    ],
    "sources": [
      {
        "title": "City of Phoenix — Paradise Valley Village",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/paradise-valley.html"
      },
      {
        "title": "City of Phoenix — Urban villages",
        "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages.html"
      },
      {
        "title": "Paradise Valley Unified — Enrollment and boundary map",
        "url": "https://www.pvschools.net/enroll"
      },
      {
        "title": "City of Phoenix — School district maps",
        "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
      },
      {
        "title": "Phoenix Sky Harbor — Maps and driving directions",
        "url": "https://www.skyharbor.com/maps-directions/"
      }
    ],
    "sourceUrls": [
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/paradise-valley.html",
      "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages.html",
      "https://www.pvschools.net/enroll",
      "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html",
      "https://www.skyharbor.com/maps-directions/"
    ],
    "market": {
      "medianSalePrice": 626824,
      "period": "Three months ending September 2026",
      "coverage": "Paradise Valley Village · all home types",
      "sourceUrl": "https://www.redfin.com/neighborhood/100034/AZ/Phoenix/Paradise-Valley-Village/housing-market",
      "note": "Covers Redfin’s Paradise Valley Village market within Phoenix, not the separate Town of Paradise Valley. Confirm the exact property’s jurisdiction."
    },
    "image": {
      "src": "/images/phoenix/paradise-valley-village.jpg",
      "alt": "View south from Shadow Mountain across north Phoenix toward Piestewa Peak",
      "caption": "Looking south from Shadow Mountain toward Piestewa Peak and Dreamy Draw. Nearby Phoenix Mountains setting.",
      "credit": "Chris English · 2014, View S from Shadow Mountain, Piestewa Peak and Dreamy Draw in the Middle Distance, South Mountain on the Horizon - panoramio · resized/compressed; display crop",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:2014,_View_S_from_Shadow_Mountain,_Piestewa_Peak_and_Dreamy_Draw_in_the_Middle_Distance,_South_Mountain_on_the_Horizon_-_panoramio.jpg",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  }
];

export const guideSources: Source[] = [
  {
    "title": "City of Phoenix — Urban villages",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages.html"
  },
  {
    "title": "City of Phoenix — Ahwatukee Foothills",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/ahwatukee-foothills.html"
  },
  {
    "title": "City of Phoenix — Paradise Valley Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/paradise-valley.html"
  },
  {
    "title": "City of Phoenix — South Mountain Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/south-mountain.html"
  },
  {
    "title": "City of Phoenix — Desert View Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/desert-view.html"
  },
  {
    "title": "City of Phoenix — Encanto Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/encanto.html"
  },
  {
    "title": "City of Phoenix — Central City Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/central-city-village.html"
  },
  {
    "title": "City of Phoenix — Camelback East Village",
    "url": "https://www.phoenix.gov/administration/departments/pdd/planning-zoning/villages/camelback-east.html"
  },
  {
    "title": "City of Phoenix — North Central Avenue Special Planning District (2004 character plan)",
    "url": "https://www.phoenix.gov/villagessite/Documents/pdd_pz_pdf_00005.pdf"
  },
  {
    "title": "Town of Paradise Valley — Resident Guide",
    "url": "https://paradisevalleyaz.gov/DocumentView.aspx?DID=197"
  },
  {
    "title": "Town of Paradise Valley — Attractions",
    "url": "https://www.paradisevalleyaz.gov/457/Attractions"
  },
  {
    "title": "Town of Paradise Valley — Resorts & Spas",
    "url": "https://www.paradisevalleyaz.gov/352/Resort-Spas"
  },
  {
    "title": "Town of Paradise Valley — Golf",
    "url": "https://www.paradisevalleyaz.gov/348/Golf"
  },
  {
    "title": "Town of Paradise Valley — 2022 General Plan",
    "url": "https://paradisevalleyaz.gov/DocumentCenter/View/9608/2022-General-Plan"
  },
  {
    "title": "Visit Phoenix — Arcadia neighborhood guide",
    "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/"
  },
  {
    "title": "City of Scottsdale — Southern Scottsdale Character Area Plan, Executive Summary",
    "url": "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/long-range-planning/character-area-plans/southern-scottdale/southern-scottsdale-character-area-plan---executive-summary.pdf?sfvrsn=1055bd5c_1"
  },
  {
    "title": "Visit Phoenix — Biltmore neighborhood guide",
    "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
  },
  {
    "title": "City of Phoenix — Arizona Biltmore Resort planning context",
    "url": "https://www.phoenix.gov/pddsite/Documents/PZ/z-71-08v1.pdf"
  },
  {
    "title": "City of Phoenix — Biltmore Courts condominium parcel example",
    "url": "https://shapephx.phoenix.gov/s/parcel/a078y000000whTEAAY/16469859"
  },
  {
    "title": "Visit Phoenix — Desert Ridge neighborhood guide",
    "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
  },
  {
    "title": "Visit Phoenix — Roosevelt Row",
    "url": "https://www.visitphoenix.com/things-to-do/roosevelt-row/"
  },
  {
    "title": "Visit Phoenix — Things to do in Downtown Phoenix",
    "url": "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/"
  },
  {
    "title": "City of Phoenix — South Mountain Park/Preserve",
    "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
  },
  {
    "title": "City of Phoenix — Municipal golf",
    "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/phoenix-golf-courses.html"
  },
  {
    "title": "Ahwatukee Golf Club — Official course website",
    "url": "https://www.ahwatukeegolf.com/"
  },
  {
    "title": "City of Phoenix — School district maps",
    "url": "https://www.phoenix.gov/administration/departments/education/resources-families-students/school-districts.html"
  },
  {
    "title": "Arizona Department of Education — School Report Cards",
    "url": "https://azreportcards.azed.gov/"
  },
  {
    "title": "Kyrene School District — Boundary maps",
    "url": "https://www.kyrene.org/schools/schools/maps-locations-boundaries"
  },
  {
    "title": "Kyrene School District — Communities served",
    "url": "https://www.kyrene.org/about-kyrene/about-kyrene-schools"
  },
  {
    "title": "Tempe Union High School District — Attendance boundaries",
    "url": "https://www.tempeunion.org/about-tuhsd/enrollment/attendance-boundaries"
  },
  {
    "title": "Scottsdale Unified — Schools and school locator",
    "url": "https://www.susd.org/our-district/our-schools"
  },
  {
    "title": "Madison School District — District and school boundaries",
    "url": "https://www.madisonaz.org/enrollment/enroll-in-madison/district-school-boundaries"
  },
  {
    "title": "Paradise Valley Unified — Enrollment and boundary map",
    "url": "https://www.pvschools.net/enroll"
  },
  {
    "title": "Phoenix Sky Harbor — Maps and driving directions",
    "url": "https://www.skyharbor.com/maps-directions/"
  },
  {
    "title": "Phoenix Sky Harbor — Public transportation",
    "url": "https://www.skyharbor.com/ground-transportation/public-transportation/"
  },
  {
    "title": "Phoenix Sky Harbor — PHX Sky Train",
    "url": "https://www.skyharbor.com/ground-transportation/phx-sky-train/"
  }
];

export const thingsToDo: AreaHighlight[] = [
  {
    "name": "Arts, murals and museums",
    "detail": "Pair Roosevelt Row’s galleries and street art with museums along the central corridor.",
    "url": "https://www.visitphoenix.com/stories/post/things-downtown-phoenix/"
  },
  {
    "name": "Canal paths and neighborhood dining",
    "detail": "Arcadia offers Arizona Canal recreation and a concentration of local dining stops.",
    "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenix-arcadia-neighborhood/"
  },
  {
    "name": "Resort days and golf",
    "detail": "Explore Paradise Valley’s resort directory and verify dining, spa, pool and golf access separately.",
    "url": "https://www.paradisevalleyaz.gov/352/Resort-Spas"
  },
  {
    "name": "Music and a northern gathering place",
    "detail": "Combine MIM’s galleries or concerts with shopping and dining at Desert Ridge Marketplace.",
    "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
  },
  {
    "name": "Desert trails and viewpoints",
    "detail": "South Mountain offers designated trails and Dobbins Lookout, subject to conditions and access restrictions.",
    "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html"
  }
];

export const golfOptions: AreaHighlight[] = [
  {
    "name": "Arizona Biltmore Golf Club",
    "detail": "Biltmore-area golf; confirm course and tee-time details.",
    "url": "https://www.visitphoenix.com/stories/post/guide-to-phoenixs-biltmore-neighborhood//"
  },
  {
    "name": "Camelback Golf Club & Mountain Shadows",
    "detail": "Town of Paradise Valley options listed in the official visitor directory.",
    "url": "https://www.paradisevalleyaz.gov/348/Golf"
  },
  {
    "name": "Wildfire Golf Club",
    "detail": "Palmer and Faldo courses at JW Marriott Desert Ridge.",
    "url": "https://www.visitphoenix.com/stories/post/desert-ridge-neighborhood/"
  },
  {
    "name": "Ahwatukee Golf Club",
    "detail": "Public golf and indoor simulator options in Ahwatukee.",
    "url": "https://www.ahwatukeegolf.com/"
  },
  {
    "name": "Phoenix municipal golf",
    "detail": "Use the city directory to choose a course and check booking rules and maintenance.",
    "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/phoenix-golf-courses.html"
  }
];

"use client";

import { useState } from "react";

export type City = {
  slug: string;
  name: string;
  price: string;
  population: string;
  income: string;
  airport: string;
  housing: string;
  schools: string;
  highlights: string[];
  tradeoff: string;
};

export default function CityExplorer({ cities }: { cities: City[] }) {
  const [selectedSlug, setSelectedSlug] = useState(cities[0].slug);
  const city = cities.find((item) => item.slug === selectedSlug) ?? cities[0];

  return (
    <section className="evCityExplorer" id="cities">
      <div className="evSectionHead left">
        <p className="evEyebrow dark">Choose a city</p>
        <h2>Find the East Valley that feels like you.</h2>
        <p>
          Pick a city to see its housing, local character and useful numbers.
        </p>
      </div>

      <div
        className="evCityPicker"
        role="tablist"
        aria-label="East Valley cities"
      >
        {cities.map((item) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={item.slug === city.slug}
            aria-controls="selected-city"
            className={item.slug === city.slug ? "isActive" : ""}
            onClick={() => setSelectedSlug(item.slug)}
          >
            <span
              className="evCityPickerImage"
              style={{
                backgroundImage: `url('/images/east-valley/${item.slug}.jpg')`,
              }}
            />
            <span className="evCityPickerShade" />
            <strong>{item.name}</strong>
            <span className="evCityPickerAction">
              Explore <b aria-hidden="true">→</b>
            </span>
          </button>
        ))}
      </div>

      <article className="evSelectedCity" id="selected-city" role="tabpanel">
        <div
          className="evSelectedCityPhoto"
          style={{
            backgroundImage: `url('/images/east-valley/${city.slug}.jpg')`,
          }}
          role="img"
          aria-label={`${city.name}, Arizona`}
        />
        <div className="evSelectedCityContent">
          <p className="evKicker">Selected city</p>
          <h3>{city.name}</h3>
          <p className="evCityHousing">
            <strong>Housing:</strong> {city.housing}.
          </p>

          <div className="evCityStats" aria-label={`${city.name} statistics`}>
            <div>
              <span>Population</span>
              <strong>{city.population}</strong>
            </div>
            <div>
              <span>Median home price</span>
              <strong>{city.price}</strong>
            </div>
            <div>
              <span>Median household income</span>
              <strong>{city.income}</strong>
            </div>
            <div>
              <span>To Sky Harbor</span>
              <strong>{city.airport}</strong>
            </div>
          </div>

          <div className="evSelectedCityInfo">
            <div>
              <h4>What locals know</h4>
              <ul>
                {city.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Public schools</h4>
              <p>{city.schools}</p>
            </div>
            <div>
              <h4>Keep in mind</h4>
              <p>{city.tradeoff}</p>
            </div>
          </div>

          <p className="evCitySource">
            Population and household income: recent U.S. Census estimates.
            Housing snapshot updated September 2026. Airport time is approximate
            in normal traffic and varies by neighborhood.
          </p>
        </div>
      </article>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { CountyCity } from "./types";
import "./county-map.css";

import { countyPath, fullView, project } from "./mapGeometry";

// Leader lines separate neighboring municipality markers without moving their mapped locations.
const pinOffsets: Record<string, [number, number]> = { "el-mirage": [-12, -9], youngtown: [13, 9], tempe: [9, -8], carefree: [7, 4], "cave-creek": [-7, -4] };

export default function CountyExplorer({ cities, title = "Find your place on the map.", intro = "Click a numbered city or town for its local guide. Prefer a list? Search below and open the same details—no map skills required." }: { cities: CountyCity[]; title?: string; intro?: string }) {
  const [isReady, setIsReady] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [listExpanded, setListExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [view, setView] = useState(fullView);
  const [hovered, setHovered] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | SVGElement | null>(null);
  const priorHash = useRef("#cities");
  const dragRef = useRef<{ x: number; y: number; view: typeof fullView } | null>(null);
  const selected = cities.find((city) => city.slug === selectedSlug);
  const regions = useMemo(() => [...new Set(cities.map((city) => city.region))], [cities]);
  const filtered = cities.filter((city) => (region === "all" || city.region === region) && `${city.name} ${city.region}`.toLowerCase().includes(query.trim().toLowerCase()));

  function closeCity() {
    setSelectedSlug(null);
    if (window.location.hash.startsWith("#city-")) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${priorHash.current}`);
    }
  }

  function openCity(city: CountyCity, trigger?: HTMLElement | SVGElement | null) {
    triggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement || document.activeElement instanceof SVGElement ? document.activeElement : null);
    if (!window.location.hash.startsWith("#city-")) priorHash.current = window.location.hash || "#cities";
    window.history.pushState(null, "", `#city-${city.slug}`);
    setSelectedSlug(city.slug);
  }

  useEffect(() => {
    function readHash() {
      const slug = window.location.hash.replace(/^#city-/, "");
      const city = cities.find((item) => item.slug === slug);
      setSelectedSlug(city?.slug ?? null);
    }
    readHash();
    setIsReady(true);
    setMapOpen(window.matchMedia("(min-width: 701px)").matches);
    if (regions.length === 1) focusRegion(regions[0]);
    const requested = new URLSearchParams(window.location.search).get("region");
    if (requested) {
      const match = regions.find((item) => item.toLowerCase().startsWith(requested.toLowerCase()));
      if (match) setRegion(match);
    }
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => { window.removeEventListener("hashchange", readHash); window.removeEventListener("popstate", readHash); };
  }, [cities, regions]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!selected) { if (dialog.open) dialog.close(); return; }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    const closeButton = dialog.querySelector<HTMLButtonElement>(".countyDialogClose");
    closeButton?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function focusRegion(value: string) {
    setRegion(value);
    if (value === "all") { setView(fullView); return; }
    const points = cities.filter((city) => city.region === value).map((city) => project(city.lon, city.lat));
    const minX = Math.min(...points.map((point) => point.x));
    const maxX = Math.max(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxY = Math.max(...points.map((point) => point.y));
    const width = Math.max(270, maxX - minX + 130, (maxY - minY + 130) * 9 / 7);
    const height = width * 7 / 9;
    setView({ x: (minX + maxX - width) / 2, y: (minY + maxY - height) / 2, width, height });
  }

  function zoom(factor: number) {
    setView((old) => {
      const width = Math.min(1200, Math.max(200, old.width * factor));
      const height = width * 7 / 9;
      return { x: old.x + (old.width - width) / 2, y: old.y + (old.height - height) / 2, width, height };
    });
  }

  function startPan(event: PointerEvent<SVGSVGElement>) {
    if ((event.target as Element).closest("[data-city-pin]")) return;
    dragRef.current = { x: event.clientX, y: event.clientY, view };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function movePan(event: PointerEvent<SVGSVGElement>) {
    if (!dragRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const start = dragRef.current;
    setView({ ...start.view, x: start.view.x - (event.clientX - start.x) / box.width * start.view.width, y: start.view.y - (event.clientY - start.y) / box.height * start.view.height });
  }

  function followGuide(href: string) {
    if (!href.startsWith("#")) return;
    setSelectedSlug(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${href}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.setTimeout(() => {
      const target = document.getElementById(href.slice(1));
      let element: HTMLElement | null = target;
      while (element) { if (element instanceof HTMLDetailsElement) element.open = true; element = element.parentElement; }
      target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }, 0);
  }

  return (
    <section className={`countyExplorer ${isReady ? "isReady" : ""}`} id="cities" aria-labelledby="county-explorer-title">
      <div className="countyExplorerHeading">
        <p className="countyEyebrow">One county. Many ways to live.</p>
        <h2 id="county-explorer-title">{title}</h2>
        <p>{intro}</p>
      </div>
      <div className={`countyExplorerTools ${regions.length === 1 ? "singleRegion" : ""}`}>
        <div><label htmlFor="county-city-search">Find a city or town</label><input id="county-city-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${cities[0]?.region ?? "cities and towns"}`} /></div>
        {regions.length > 1 && <div><label htmlFor="county-region">Explore a region</label><select id="county-region" value={region} onChange={(event) => focusRegion(event.target.value)}><option value="all">All Maricopa County</option>{regions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>}
      </div>
      <div className="countyExplorerLayout">
        <details className="countyMapPanel" open={mapOpen} onToggle={(event) => setMapOpen(event.currentTarget.open)}><summary className="countyMapToggle"><span>Explore the map</span><small>Tap a place to open its guide</small></summary><div className="countyMapContent">
          <div className="countyMapControls" aria-label="Map controls"><button type="button" onClick={() => zoom(0.7)} aria-label="Zoom in">+</button><button type="button" onClick={() => zoom(1.4)} aria-label="Zoom out">−</button><button type="button" onClick={() => focusRegion(region)}>Reset view</button></div>
          <svg className="countyMap" viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`} aria-labelledby="county-map-title county-map-description" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }}>
            <title id="county-map-title">Maricopa County city and town locator</title>
            <desc id="county-map-description">Numbered links open community guides. Pins use representative geographic locations; the outline shows the generalized county boundary, not city boundaries. Use the adjacent searchable list as an alternative.</desc>
            <defs><pattern id="county-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M 35 0 L 0 0 0 35" fill="none" stroke="#dbe1e6" strokeWidth="0.7" /></pattern></defs>
            <rect x="-2000" y="-2000" width="5000" height="5000" fill="#edf2f4" />
            <rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#county-grid)" />
            <path d={countyPath} className="countyBoundary" />
            <text x="130" y="325" className="countyMapAreaLabel">MARICOPA</text><text x="130" y="349" className="countyMapAreaLabel">COUNTY</text>
            <g className="countyCompass" transform="translate(90,75)" aria-hidden="true"><path d="M0 30 L0 0 M-7 10 L0 0 L7 10" /><text y="-12" textAnchor="middle">N</text></g>
            {cities.map((city, index) => {
              const location = project(city.lon, city.lat);
              const offset = pinOffsets[city.slug] ?? [0, 0];
              const x = location.x + offset[0];
              const y = location.y + offset[1];
              const matches = filtered.some((item) => item.slug === city.slug);
              const active = hovered === city.slug || selectedSlug === city.slug;
              return <a key={city.slug} href={`#guide-${city.slug}`} data-city-pin="true" className={`countyMapPin ${matches ? "" : "isDimmed"} ${active ? "isHighlighted" : ""}`} aria-label={`Open ${city.name} guide`} aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); openCity(city, event.currentTarget); }} onFocus={() => setHovered(city.slug)} onBlur={() => setHovered(null)} onMouseEnter={() => setHovered(city.slug)} onMouseLeave={() => setHovered(null)}>
                <title>{`${city.name} — ${city.region}`}</title>{pinOffsets[city.slug] && <g className="countyPinLeader"><line x1={location.x} y1={location.y} x2={x} y2={y} /><circle cx={location.x} cy={location.y} r="2" /></g>}<circle cx={x} cy={y} r="19" className="countyPinHit" /><circle cx={x} cy={y} r="11" className="countyPinDot" /><text x={x} y={y + 3.5} textAnchor="middle" className="countyPinNumber">{index + 1}</text>
                {active && <g className="countyPinLabel"><rect x={x - Math.max(50, city.name.length * 3.8)} y={y - 41} width={Math.max(100, city.name.length * 7.6)} height="25" rx="6" /><text x={x} y={y - 24} textAnchor="middle">{city.name}</text></g>}
              </a>;
            })}
          </svg>
          <p className="countyMapInstructions">Numbers match the list. Zoom with +/−; drag the map to pan. Pins mark approximate representative locations, not downtowns or municipal boundaries. Leader lines separate close neighbors.</p>
          <p className="countyMapCredit">County outline: <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html" target="_blank" rel="noreferrer">U.S. Census Bureau</a> (2017), generalized via <a href="https://github.com/topojson/us-atlas" target="_blank" rel="noreferrer">U.S. Atlas</a>. Place points: <a href="https://tigerweb.geo.census.gov/tigerwebmain/Files/acs26/tigerweb_acs26_incplace_2025_acs25_az.html" target="_blank" rel="noreferrer">Census incorporated-place internal points</a>. Some municipalities cross county lines.</p>
        </div></details>
        <div className="countyListPanel">
          <p className="countyListCount" role="status" aria-live="polite">{filtered.length} of {cities.length} communities</p>
          {filtered.length === 0 && <div className="countyNoResults"><p>No city or town matches that search.</p><button type="button" onClick={() => { setQuery(""); focusRegion("all"); }}>Show all communities</button></div>}
          <ul className={`countyCityList ${listExpanded || query || (regions.length > 1 && region !== "all") ? "isExpanded" : ""}`}>{filtered.map((city) => <li key={city.slug}><a href={`#guide-${city.slug}`} aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); openCity(city, event.currentTarget); }} onMouseEnter={() => setHovered(city.slug)} onMouseLeave={() => setHovered(null)}><span className="countyListNumber">{cities.findIndex((item) => item.slug === city.slug) + 1}</span><span><strong>{city.name}</strong><small>{city.region}</small></span><span className="countyListArrow" aria-hidden="true">↗</span></a></li>)}</ul>{!query && (region === "all" || regions.length === 1) && cities.length > 6 && <button type="button" className="countyShowCities" onClick={() => setListExpanded(!listExpanded)}>{listExpanded ? "Show fewer communities" : `Show all ${cities.length} communities`} <span aria-hidden="true">{listExpanded ? "−" : "+"}</span></button>}
        </div>
      </div>
      <dialog ref={dialogRef} className="countyDialog" aria-labelledby="county-dialog-title" onCancel={(event) => { event.preventDefault(); closeCity(); }} onClick={(event) => { if (event.target === event.currentTarget) closeCity(); }}>
        {selected && <div className="countyDialogInner">
          <button type="button" className="countyDialogClose" aria-label={`Close ${selected.name} guide`} onClick={closeCity}>Close <span aria-hidden="true">×</span></button>
          {selected.photo && <div className="countyDialogPhoto"><Image src={selected.photo.src} alt={selected.photo.alt} fill sizes="(max-width: 760px) 100vw, 900px" /><div className="countyDialogPhotoShade" /></div>}
          <div className={`countyDialogTitle ${selected.photo ? "hasPhoto" : ""}`}><p className="countyEyebrow">{selected.region} · Maricopa County guide</p><h2 id="county-dialog-title">{selected.name}</h2><p>{selected.summary}</p></div>
          <div className="countyDialogBody">
            {selected.photo && <p className="countyPhotoCredit">Photo: {selected.photo.creditUrl ? <a href={selected.photo.creditUrl} target="_blank" rel="noreferrer">{selected.photo.credit}</a> : selected.photo.credit}{selected.photo.license && <> · {selected.photo.licenseUrl ? <a href={selected.photo.licenseUrl} target="_blank" rel="noreferrer">{selected.photo.license}</a> : selected.photo.license}</>}</p>}
            <div className="countyDialogStats"><div><span>{selected.price?.label ?? "Local housing prices"}</span><strong>{selected.price?.value ?? "Check current local sales"}</strong>{selected.price ? <small>{selected.price.period} · <a href={selected.price.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a></small> : <small>A current, consistently defined median is not yet verified for this guide. Ask for recent comparable sales.</small>}</div></div>
            <div className="countyDialogTopics"><details><summary>Housing & everyday connections</summary><div><h3>Housing character</h3><p>{selected.housing}</p><h3>Commute & access</h3><p>{selected.commute}</p></div></details><details><summary>Schools: check the address</summary><div><p>{selected.schools}</p><a href="https://azreportcards.azed.gov/" target="_blank" rel="noreferrer">Arizona School Report Cards ↗</a></div></details><details><summary>Places to know & local tradeoffs</summary><div><h3>Places to know</h3><ul>{selected.highlights.map((item) => <li key={item}>{item}</li>)}</ul><h3>Before you choose</h3><ul>{selected.considerations.map((item) => <li key={item}>{item}</li>)}</ul></div></details></div>
            {selected.guideHref && <a className="countyDetailLink" href={selected.guideHref} onClick={(event) => { if (selected.guideHref?.startsWith("#")) { event.preventDefault(); followGuide(selected.guideHref); } }}>Explore more of {selected.name} <span aria-hidden="true">→</span></a>}
            {selected.sources?.length ? <details className="countyCitySources"><summary>Local sources & useful links</summary><ul>{selected.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul></details> : null}
            <div className="countyDialogCta"><div><h3>Could {selected.name} fit your move?</h3><p>Explore your budget, then ask a local expert for address-specific guidance. Information without obligation.</p></div><div><a href={`https://acebuyer.adtrealtyaz.com/?city=${encodeURIComponent(selected.name)}`}>Try the buying-power calculator →</a><a className="countySecondaryCta" href="/#contact">Ask a local expert</a></div></div>
          </div>
        </div>}
      </dialog>
    </section>
  );
}

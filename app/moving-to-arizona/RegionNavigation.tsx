import { countyCities } from "./data";
import { metroRoads, metroPlaces, metroRoadSource } from "./valleyGeography";
import "./county-map.css";

// A closer metro extent, not a county or municipal-boundary map.
const project = (lon: number, lat: number) => ({ x: 35 + (lon + 112.83) / 1.45 * 1030, y: 30 + (33.91 - lat) / .76 * 540 });
const regions = [
  { name: "West Valley", href: "/west-valley", className: "west", x: 155, y: 105 },
  { name: "Phoenix & North Valley", href: "/phoenix", className: "central", x: 550, y: 32 },
  { name: "East Valley", href: "/east-valley", className: "east", x: 935, y: 320 },
];
const labelOffsets: Record<string, [number, number, "start" | "end"]> = {
  "el-mirage": [-12,-17,"end"], youngtown:[-12,20,"end"], "litchfield-park":[-12,-13,"end"],
  avondale:[-12,23,"end"], goodyear:[-12,-15,"end"], tolleson:[12,24,"start"],
  "cave-creek":[-12,-15,"end"], carefree:[12,17,"start"], "paradise-valley":[12,-10,"start"],
  tempe:[12,20,"start"], mesa:[12,-12,"start"], gilbert:[12,22,"start"], chandler:[-12,24,"end"],
};
const guide = (region: string) => region === "East Valley" ? "/east-valley" : region === "West Valley" ? "/west-valley" : "/phoenix";
const path = (points: number[][]) => points.map(([lon,lat],i) => {const p=project(lon,lat);return `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;}).join(" ");

export default function RegionNavigation() {
  const towns = countyCities.filter(city => { const p = metroPlaces[city.slug]; return p && p.lat >= 33.15 && p.lat <= 33.91 && p.lon >= -112.83 && p.lon <= -111.38; });
  return <figure className="regionLocator">
    <div className="valleyMapHeading"><div><span>THE GREATER PHOENIX AREA</span><h3>Get your bearings.</h3></div><p>Follow the main highways.<br/>Then explore a region.</p></div>
    <div className="valleyMapScroll" role="region" aria-label="Valley map; scroll horizontally on small screens" tabIndex={0}>
    <svg viewBox="0 0 1100 600" aria-labelledby="region-locator-title region-locator-description">
      <title id="region-locator-title">Phoenix Valley cities, major highways and three regional guides</title>
      <desc id="region-locator-description">A close view of the populated Valley, with west on the left and north up. City names link to their regional guide details. Tinted region labels are informal browsing groups, not boundaries. Wickenburg and Gila Bend lie outside this closer view and have links below.</desc>
      <defs><pattern id="valleyMapGrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#e4e8e6" strokeWidth="1"/></pattern></defs>
      <rect width="1100" height="600" fill="#f4f5ee"/><rect width="1100" height="600" fill="url(#valleyMapGrid)"/>
      <g className="valleyRegionWash" aria-hidden="true"><ellipse cx="315" cy="320" rx="250" ry="210" fill="#dce9df"/><ellipse cx="610" cy="250" rx="145" ry="220" fill="#e5e6ee"/><ellipse cx="865" cy="430" rx="205" ry="155" fill="#f3e6d5"/></g>
      <g className="valleyFreeways" aria-hidden="true">{metroRoads.map(road=><g key={road.name}><title>{road.name}</title>{road.paths.map((line,i)=><path key={i} d={path(line)} />)}</g>)}</g>
      {metroRoads.map(road => { const p=project(...road.label as [number,number]);return <g className="valleyRouteShield" key={road.name} transform={`translate(${p.x} ${p.y})`} aria-hidden="true"><rect x="-21" y="-11" width="42" height="22" rx="5"/><text textAnchor="middle" y="4">{road.name}</text></g>;})}
      {towns.map(city=>{const point=metroPlaces[city.slug];const p=project(point.lon,point.lat);const [dx,dy,anchor]=labelOffsets[city.slug]??[12,-10,"start"];return <a className="valleyCityLink" key={city.slug} href={`${guide(city.region)}#city-${city.slug}`} aria-label={`Explore ${city.name}`}><circle cx={p.x} cy={p.y} r="17" className="valleyCityHit"/><circle cx={p.x} cy={p.y} r="4"/><text x={p.x+dx} y={p.y+dy} textAnchor={anchor}>{city.name}</text></a>;})}
      {regions.map(region=><a href={region.href} key={region.href} className={`valleyRegionLink ${region.className}`} aria-label={`Explore ${region.name}`}><g transform={`translate(${region.x} ${region.y})`}><rect x={region.name.length>15?-135:-93} y="-20" width={region.name.length>15?270:186} height="43" rx="22"/><text textAnchor="middle" y="7">{region.name} →</text></g></a>)}
      <g className="valleyNorth" transform="translate(1050 48)" aria-hidden="true"><path d="M0 25V0m-5 7 5-7 5 7"/><text x="0" y="-10" textAnchor="middle">N</text></g>
    </svg>
    </div>
    <nav className="valleyRegionLinks" aria-label="Explore regional guides">{regions.map(region=><a key={region.href} className={region.className} href={region.href}>{region.name}<span aria-hidden="true">→</span></a>)}</nav>
    <figcaption><p><strong>Beyond this closer view:</strong> <a href="/west-valley#city-wickenburg">Wickenburg</a> to the northwest · <a href="/west-valley#city-gila-bend">Gila Bend</a> to the southwest. <span className="valleySwipeHint">Swipe the map sideways for more detail, or use the region links above.</span></p><p>Orientation only—not turn-by-turn directions. Shading suggests regional groupings, not municipal or legal boundaries. Selected highway geometry (US 60 includes surface-road Grand Avenue): <a href={metroRoadSource.url} target="_blank" rel="noreferrer">{metroRoadSource.title}</a>, simplified for display. City labels use <a href="https://carto.nationalmap.gov/arcgis/rest/services/geonames/MapServer/3" target="_blank" rel="noreferrer">USGS GNIS populated-place reference points</a>, not municipal boundaries.</p></figcaption>
  </figure>;
}

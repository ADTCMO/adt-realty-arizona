import { countyPath, project } from "./mapGeometry";
import "./county-map.css";

const regions = [
  { name: "West Valley", href: "/west-valley", lon: -112.5, lat: 33.52, labelX: 185, labelY: 285 },
  { name: "Phoenix area", href: "/phoenix", lon: -112.08, lat: 33.6, labelX: 405, labelY: 145 },
  { name: "East Valley", href: "/east-valley", lon: -111.75, lat: 33.4, labelX: 600, labelY: 345 },
];

/** Regional orientation only. These informal regions do not have legal boundaries. */
export default function RegionNavigation() {
  return <figure className="regionLocator">
    <svg viewBox="0 0 900 700" aria-labelledby="region-locator-title region-locator-description">
      <title id="region-locator-title">Choose a Maricopa County region</title>
      <desc id="region-locator-description">West Valley lies west of central Phoenix; East Valley lies east and southeast. Select a regional label to open its city guide. Region labels are approximate, not legal boundaries.</desc>
      <rect width="900" height="700" fill="#edf2f4" />
      <path d={countyPath} fill="#fffdf7" stroke="#94a1a5" strokeWidth="2" />
      <text x="125" y="470" className="regionCountyLabel">MARICOPA COUNTY</text>
      <g transform="translate(105 90)" className="regionNorth" aria-hidden="true"><path d="M0 35V0M-8 11L0 0l8 11" /><text y="-15" textAnchor="middle">N</text></g>
      {regions.map(region => { const point = project(region.lon, region.lat); return <a href={region.href} key={region.href} className="regionMapLink" aria-label={`Explore the ${region.name} relocation guide`}>
        <line x1={point.x} y1={point.y} x2={region.labelX + 105} y2={region.labelY + 29} />
        <circle cx={point.x} cy={point.y} r="9" />
        <rect x={region.labelX} y={region.labelY} width="210" height="58" rx="10" />
        <text x={region.labelX + 105} y={region.labelY + 36} textAnchor="middle">{region.name} ↗</text>
      </a>; })}
    </svg>
    <figcaption>Choose a region to explore its cities and towns. Regional labels are approximate—not municipal or legal boundaries. County outline: U.S. Census Bureau (2017), generalized via <a href="https://github.com/topojson/us-atlas" target="_blank" rel="noreferrer">U.S. Atlas</a>.</figcaption>
  </figure>;
}

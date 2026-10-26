"use client";
import Image from "next/image";
import { useState } from "react";
import { measureOpenAIEvent } from "../OpenAIAdsPixel";
import type { PhoenixArea } from "./types";

export default function AreaExplorer({ areas }: { areas: PhoenixArea[] }) {
  const [selected, setSelected] = useState(areas[0].id);
  return <section className="phxExplore" id="areas">
    <div className="evSectionHead left"><p className="evEyebrow dark">Choose an area</p><h2>Find your version of Phoenix.</h2><p>Explore the places you have heard about, then compare what the specific address means for everyday life.</p></div>
    <div className="phxAreaButtons" role="group" aria-label="Explore Phoenix areas">{areas.map((area,index) => <button type="button" key={area.id} aria-pressed={selected === area.id} aria-controls={`area-${area.id}`} onClick={() => setSelected(area.id)}>{area.image && <span className="phxPickerImage"><Image src={area.image.src} alt="" fill sizes="(max-width: 900px) 50vw, 33vw" /></span>}<small>{String(index+1).padStart(2,"0")}</small><span>{area.name}</span><b aria-hidden="true">→</b></button>)}</div>
    {areas.map(area => <article className="phxAreaDetail" id={`area-${area.id}`} key={area.id} hidden={selected !== area.id} aria-labelledby={`title-${area.id}`}>
      {area.image && <figure className="phxAreaPhoto"><div><Image src={area.image.src} alt={area.image.alt} fill sizes="(max-width: 900px) 100vw, 85vw" /></div><figcaption>{area.image.caption} <a href={area.image.sourceUrl} target="_blank" rel="noopener noreferrer">Photo: {area.image.credit}</a> · <a href={area.image.licenseUrl} target="_blank" rel="noopener noreferrer">{area.image.license}</a></figcaption></figure>}
      <div className="phxAreaTitle"><p className="evKicker">{area.jurisdiction}</p><h3 id={`title-${area.id}`}>{area.name}</h3><p>{area.intro}</p></div>
      {area.market && <div className="phxMarket" aria-label={`${area.name} housing market snapshot`}><div><span>Median home sale price</span><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(area.market.medianSalePrice)}</strong><p>{area.market.period} · {area.market.coverage}</p></div><div><p>{area.market.note}</p><a href={area.market.sourceUrl} target="_blank" rel="noopener noreferrer">Redfin market data & boundaries →</a></div></div>}
      <div className="phxAreaFacts"><div><span>Housing & home search</span><p>{area.housing}</p></div><div><span>Airport & access</span><p>{area.airport}</p></div></div>
      <div className="phxAreaColumns"><div><h4>Places to know</h4><ul>{area.highlights.map(item => <li key={item.name}><strong>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name} →</a> : item.name}</strong><p>{item.detail}</p></li>)}</ul></div><div><h4>Public schools</h4><p>{area.schools}</p><div className="phxSchoolLinks">{area.schoolLinks?.map(link => <a className="phxInlineLink" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.name} →</a>)}</div><h4>Keep in mind</h4><p>{area.tradeoff}</p>{!!area.golf?.length && <><h4>Golf nearby</h4><ul>{area.golf.map(item => <li key={item.name}><strong>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name} →</a> : item.name}</strong><p>{item.detail}</p></li>)}</ul></>}</div></div>
      <div className="evCityCalculatorCta"><div><h4>Could this area fit your plans?</h4><p>Explore payment, cash needed and buying power, then compare the actual homes.</p></div><a href={`https://acebuyer.adtrealtyaz.com/?city=${encodeURIComponent(area.name)}`} onClick={() => measureOpenAIEvent("custom", {type:"custom"}, {custom_event_name:"calculator_opened"})}>Explore buying power <span aria-hidden="true">→</span></a></div>
      <details className="phxAreaSources"><summary>Sources for {area.name}</summary><ul>{area.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} →</a></li>)}</ul></details>
    </article>)}
  </section>;
}

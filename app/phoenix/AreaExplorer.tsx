"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { measureOpenAIEvent } from "../OpenAIAdsPixel";
import type { PhoenixArea } from "./types";
import "../moving-to-arizona/county-map.css";

function AreaBody({ area, headingId }: { area: PhoenixArea; headingId: string }) { return <>
      {area.image && <figure className="phxAreaPhoto"><div><Image src={area.image.src} alt={area.image.alt} fill sizes="(max-width: 900px) 100vw, 85vw" /></div><figcaption>{area.image.caption} <a href={area.image.sourceUrl} target="_blank" rel="noopener noreferrer">Photo: {area.image.credit}</a> · <a href={area.image.licenseUrl} target="_blank" rel="noopener noreferrer">{area.image.license}</a></figcaption></figure>}
      <div className="phxAreaTitle"><p className="evKicker">{area.jurisdiction}</p><h3 id={headingId}>{area.name}</h3><p>{area.intro}</p></div>
      {area.market && <div className="phxMarket" aria-label={`${area.name} housing market snapshot`}><div><span>Median home sale price</span><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(area.market.medianSalePrice)}</strong><p>{area.market.period} · {area.market.coverage}</p></div><div><p>{area.market.note}</p><a href={area.market.sourceUrl} target="_blank" rel="noopener noreferrer">Redfin market data & boundaries →</a></div></div>}
      <div className="phxAreaFacts"><div><span>Housing & home search</span><p>{area.housing}</p></div><div><span>Airport & access</span><p>{area.airport}</p></div></div>
      <div className="phxAreaColumns"><div><h4>Places to know</h4><ul>{area.highlights.map(item => <li key={item.name}><strong>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name} →</a> : item.name}</strong><p>{item.detail}</p></li>)}</ul></div><div><h4>Public schools</h4><p>{area.schools}</p><div className="phxSchoolLinks">{area.schoolLinks?.map(link => <a className="phxInlineLink" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.name} →</a>)}</div><h4>Keep in mind</h4><p>{area.tradeoff}</p>{!!area.golf?.length && <><h4>Golf nearby</h4><ul>{area.golf.map(item => <li key={item.name}><strong>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name} →</a> : item.name}</strong><p>{item.detail}</p></li>)}</ul></>}</div></div>
      <div className="evCityCalculatorCta"><div><h4>Could this area fit your plans?</h4><p>Explore payment, cash needed and buying power, then compare the actual homes.</p></div><a href={`https://acebuyer.adtrealtyaz.com/?city=${encodeURIComponent(area.name)}`} onClick={() => measureOpenAIEvent("custom", {type:"custom"}, {custom_event_name:"calculator_opened"})}>Explore buying power <span aria-hidden="true">→</span></a></div>
      <details className="phxAreaSources"><summary>Sources for {area.name}</summary><ul>{area.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} →</a></li>)}</ul></details>

</>; }

export default function AreaExplorer({ areas }: { areas: PhoenixArea[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const selected = areas.find(area => area.id === selectedId);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const priorHash = useRef("#phoenix-neighborhoods");

  function closeArea() {
    setSelectedId(null);
    if (window.location.hash.startsWith("#area-")) history.replaceState(history.state, "", priorHash.current);
  }
  function openArea(area: PhoenixArea, trigger: HTMLElement) {
    triggerRef.current = trigger;
    if (!window.location.hash.startsWith("#area-")) priorHash.current = window.location.hash || "#phoenix-neighborhoods";
    history.pushState(history.state, "", `#area-${area.id}`);
    setSelectedId(area.id);
  }
  useEffect(() => {
    function readHash() {
      const id = window.location.hash.replace(/^#area-/, "");
      setSelectedId(areas.some(area => area.id === id) ? id : null);
    }
    readHash(); setReady(true);
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => { window.removeEventListener("hashchange", readHash); window.removeEventListener("popstate", readHash); };
  }, [areas]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector<HTMLButtonElement>("button")?.focus();
    return () => { document.body.style.overflow = oldOverflow; if (dialog.open) dialog.close(); triggerRef.current?.focus({ preventScroll: true }); };
  }, [selected]);

  return <section className={`phxExplore ${ready ? "phxReady" : ""}`} id="areas">
    <div className="evSectionHead left"><p className="evEyebrow dark">Choose an area</p><h2>Find your version of Phoenix.</h2><p>Tap an area to open its guide, with photos, dated home-sale prices and local details.</p></div>
    <div className={`phxAreaButtons ${expanded ? "phxExpanded" : ""}`} aria-label="Explore Phoenix areas">{areas.map((area,index) => <a className="phxAreaCard" href={`#area-${area.id}`} key={area.id} aria-haspopup="dialog" onClick={event => { event.preventDefault(); openArea(area, event.currentTarget); }}>{area.image && <span className="phxPickerImage"><Image src={area.image.src} alt="" fill sizes="(max-width: 900px) 50vw, 33vw" /></span>}<small>{String(index+1).padStart(2,"0")}</small><span>{area.name}</span><b aria-hidden="true">→</b></a>)}</div>
    <button type="button" className="phxShowAreas" onClick={() => setExpanded(!expanded)}>{expanded ? "Show fewer areas" : `Show all ${areas.length} areas`} <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    <details className="phxFallback"><summary>Read Phoenix-area profiles without the pop-ups</summary>{areas.map(area => <details className="phxFallbackArea" id={`area-${area.id}`} key={area.id}><summary>{area.name}</summary><article className="phxAreaDetail" aria-labelledby={`title-${area.id}`}><AreaBody area={area} headingId={`title-${area.id}`} /></article></details>)}</details>
    <dialog ref={dialogRef} className="countyDialog phxAreaDialog" aria-labelledby="phoenix-dialog-title" onCancel={event => { event.preventDefault(); closeArea(); }} onClick={event => { if (event.target === event.currentTarget) closeArea(); }}>{selected && <div className="countyDialogInner"><button type="button" className="countyDialogClose" aria-label={`Close ${selected.name} guide`} onClick={closeArea}>Close <span aria-hidden="true">×</span></button><article className="phxAreaDetail"><AreaBody area={selected} headingId="phoenix-dialog-title" /></article></div>}</dialog>
  </section>;
}

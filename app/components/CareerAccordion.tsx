"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Stage = { slug: string; title: string; image: string; description: string; cta: string };

export function CareerAccordion({ stages }: { stages: Stage[] }) {
  const [open, setOpen] = useState(0);
  return <div className="careerAccordion">
    {stages.map((stage, index) => <section className={`careerItem ${open === index ? "open" : ""}`} key={stage.slug}>
      <button className="careerTrigger" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} aria-controls={`career-panel-${index}`}>
        <span className="careerIndex">0{index + 1}</span><strong>{stage.title}</strong><span className="careerPlus" aria-hidden="true">{open === index ? "−" : "+"}</span>
      </button>
      <div className="careerPanel" id={`career-panel-${index}`} hidden={open !== index}>
        <div className="careerArt"><Image src={stage.image} alt={`${stage.title} guide artwork`} fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
        <div className="careerCopy"><h3>{stage.title}</h3><p>{stage.description}</p><Link className="textLink" href={`/join/${stage.slug}`}>{stage.cta} <span>›</span></Link></div>
      </div>
    </section>)}
  </div>;
}

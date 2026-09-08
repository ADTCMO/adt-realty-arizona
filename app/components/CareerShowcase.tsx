"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Stage = { slug: string; title: string; image: string; description: string; cta: string };

export function CareerShowcase({ stages }: { stages: Stage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStart = useRef(0);
  const active = stages[activeIndex];
  const stack = Array.from({ length: stages.length }, (_, offset) => stages[(activeIndex + offset) % stages.length]);
  const cycle = (direction: number) => setActiveIndex((activeIndex + direction + stages.length) % stages.length);
  return <div className="careerShowcase">
    <div className="careerStackColumn">
      <div className="careerCardStack" onTouchStart={event => { swipeStart.current = event.touches[0].clientX; }} onTouchEnd={event => { const distance = event.changedTouches[0].clientX - swipeStart.current; if (Math.abs(distance) > 45) cycle(distance < 0 ? 1 : -1); }}>
        {[...stack].reverse().map((stage, reverseIndex) => { const depth = stack.length - 1 - reverseIndex; return <button key={`${stage.slug}-${depth}`} className={`careerStackCard depth-${depth}`} style={{ "--depth": depth } as React.CSSProperties} onClick={() => depth === 0 ? cycle(1) : setActiveIndex(stages.findIndex(item => item.slug === stage.slug))} aria-label={depth === 0 ? `Next career stage after ${stage.title}` : `View ${stage.title}`}>
          <Image src={stage.image} alt="" fill sizes="(max-width: 900px) 82vw, 390px" />
        </button>; })}
      </div>
      <div className="careerControls"><button onClick={() => cycle(-1)} aria-label="Previous career stage">←</button><span>{activeIndex + 1} / {stages.length}</span><button onClick={() => cycle(1)} aria-label="Next career stage">→</button></div>
    </div>
    <article className="careerPerspective">
      <p className="eyebrow">Stage 0{activeIndex + 1}</p><h3>{active.title}</h3><p>{active.description}</p>
      <Link className="button red" href={`/join/${active.slug}`}>{active.cta} <span>›</span></Link>
      <div className="careerTabs">{stages.map((stage, index) => <button className={index === activeIndex ? "active" : ""} onClick={() => setActiveIndex(index)} key={stage.slug}>{stage.title}</button>)}</div>
    </article>
  </div>;
}

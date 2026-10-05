"use client";

import { useRef, useState, type CSSProperties } from "react";
import { leaders } from "./join-leaders";

export default function JoinLeaders() {
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const active = leaders[index];
  const cycle = (step: number) => setIndex(current => (current + step + leaders.length) % leaders.length);
  const stack = Array.from({ length: 3 }, (_, depth) => ({ leader: leaders[(index + depth) % leaders.length], depth }));
  return <div className="joinLeaderExperience" role="region" aria-label="Meet our leaders" aria-roledescription="carousel"
    onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); cycle(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="joinLeaderVisual">
      <div className="joinLeaderStack"
        onTouchStart={event => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; swiped.current = false; }}
        onTouchEnd={event => { if (!start.current) return; const dx = event.changedTouches[0].clientX - start.current.x; const dy = event.changedTouches[0].clientY - start.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { swiped.current = true; cycle(dx < 0 ? 1 : -1); } start.current = null; }}>
        {stack.reverse().map(({ leader, depth }) => <button key={depth} type="button" className="joinLeaderCard" style={{ "--depth": depth } as CSSProperties}
          aria-label={depth === 0 ? `${leader.name}. Show next leader` : `Meet ${leader.name}`}
          onClick={() => { if (swiped.current) { swiped.current = false; return; } cycle(depth || 1); }}>
          <img src={leader.headshot} alt="" loading="lazy" draggable={false}/>
          <span><strong>{leader.name}</strong>{leader.titles.map(title => <small key={title}>{title}</small>)}</span>
        </button>)}
      </div>
      <div className="joinLeaderControls"><button type="button" aria-label="Previous leader" onClick={() => cycle(-1)}>←</button><span aria-live="polite">{index + 1} / {leaders.length}</span><button type="button" aria-label="Next leader" onClick={() => cycle(1)}>→</button></div>
      <p className="joinLeaderHint">Tap a portrait or swipe to meet another leader.</p>
    </div>
    <article className="joinLeaderStory" key={active.id} aria-label={`${active.name} in their own words`}>
      <p className="eyebrow">In their own words</p><h3>{active.name}</h3>
      {active.quote && <blockquote>“{active.quote}”</blockquote>}
      {active.answers.length ? <div className="joinLeaderAnswers">{active.answers.map((item, answerIndex) => <details key={item.question} open={answerIndex === 0}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div> : <p>More from {active.name} coming soon.</p>}
    </article>
  </div>;
}

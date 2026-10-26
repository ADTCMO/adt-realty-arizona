"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const slides = [
  {
    id: "growth",
    label: "Nationwide Growth",
    src: "/join-future-nationwide-growth.webp",
    alt: "Nationwide growth and leadership opportunities. ADT Realty map showing currently operating states, coming-soon states and state leadership opportunities. Multiple opportunities for area and team leaders nationwide.",
  },
  {
    id: "revenue",
    label: "New Revenue Streams",
    src: "/join-future-revenue-streams.webp",
    alt: "Additional streams of revenue, coming soon: ADT Title, ADT Lending and ADT Insurance. Expanding opportunities for agents to better serve clients and grow their business.",
  },
  {
    id: "stock",
    label: "Stock Opportunities",
    src: "/join-future-stock-opportunities.webp",
    alt: "Own a piece of the future. ADT Realty stock opportunities, coming soon.",
  },
] as const;

export default function FutureOfADT() {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[active];

  useEffect(() => {
    const element = dialog.current;
    if (!enlarged || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [enlarged]);

  function move(direction: number) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % slides.length; break;
      case "ArrowLeft": next = (index - 1 + slides.length) % slides.length; break;
      case "Home": next = 0; break;
      case "End": next = slides.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="future" className="joinFuture" aria-labelledby="join-future-heading" aria-roledescription="carousel">
      <div className="joinFutureInner">
        <div className="joinFutureIntro">
          <p className="eyebrow">What’s next</p>
          <h2 id="join-future-heading">The Future of ADT Realty</h2>
        </div>

        <div
          className="joinFutureStage"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          }}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <button className="joinFutureArrow joinFuturePrevious" type="button" onClick={() => move(-1)} aria-label="Previous future opportunity">‹</button>
          <div className="joinFutureArtwork">
            {slides.map((item, index) => (
              <div key={item.id} id={`future-panel-${item.id}`} role="tabpanel" aria-labelledby={`future-tab-${item.id}`} hidden={active !== index}>
                <button className="joinFutureImageButton" type="button" onClick={() => setEnlarged(true)} aria-label={`Enlarge ${item.label} artwork`} aria-haspopup="dialog">
                  <img src={item.src} alt={item.alt} width="1672" height="941" loading="lazy" decoding="async" draggable={false} />
                  <span className="joinFutureEnlarge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" /></svg>Tap to enlarge</span>
                </button>
              </div>
            ))}
          </div>
          <button className="joinFutureArrow joinFutureNext" type="button" onClick={() => move(1)} aria-label="Next future opportunity">›</button>
        </div>

        <div className="joinFutureTabs" role="tablist" aria-label="Explore the future of ADT Realty">
          {slides.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => { tabs.current[index] = element; }}
              id={`future-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`future-panel-${item.id}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              <span aria-hidden="true" />{item.label}
            </button>
          ))}
        </div>
        <p className="joinFutureStatus" aria-live="polite" aria-atomic="true">{active + 1} / {slides.length} · {slide.label}</p>
      </div>

      <dialog
        ref={dialog}
        className="joinFutureDialog"
        aria-labelledby="future-expanded-heading"
        onCancel={(event) => { event.preventDefault(); setEnlarged(false); }}
        onClose={() => setEnlarged(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setEnlarged(false); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="joinFutureDialogTop">
          <h3 id="future-expanded-heading">{slide.label}</h3>
          <button type="button" onClick={() => setEnlarged(false)} aria-label="Close enlarged artwork" autoFocus>×</button>
        </div>
        <img className="joinFutureExpandedImage" src={slide.src} alt={slide.alt} width="1672" height="941" />
        <div className="joinFutureDialogControls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous enlarged opportunity">‹</button>
          <p aria-live="polite" aria-atomic="true">{active + 1} / {slides.length}</p>
          <button type="button" onClick={() => move(1)} aria-label="Next enlarged opportunity">›</button>
        </div>
      </dialog>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GuideViewerProps = {
  title: string;
  slideFolder: string;
  pageCount: number;
  pdfUrl: string;
};

export default function GuideViewer({ title, slideFolder, pageCount, pdfUrl }: GuideViewerProps) {
  const [page, setPage] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [fullscreenError, setFullscreenError] = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);
  const digits = pageCount >= 10 ? 2 : 1;
  const slideUrl = `${slideFolder}/slide-${String(page).padStart(digits, "0")}.jpg`;

  const previous = useCallback(() => setPage((current) => Math.max(1, current - 1)), []);
  const next = useCallback(() => setPage((current) => Math.min(pageCount, current + 1)), [pageCount]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!viewerRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
      if (event.key === "ArrowRight") { event.preventDefault(); next(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, previous]);

  const toggleFullscreen = async () => {
    setFullscreenError("");
    try {
      if (!document.fullscreenElement) {
        if (!viewerRef.current?.requestFullscreen) throw new Error("Fullscreen unavailable");
        await viewerRef.current.requestFullscreen();
      } else await document.exitFullscreen();
    } catch {
      setFullscreenError("Full screen isn’t available in this browser. Open the PDF to zoom in.");
    }
  };

  return (
    <div
      ref={viewerRef}
      className="slideViewer"
      role="region"
      aria-label={`${title} slides`}
      tabIndex={0}
      onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) previous();
          else next();
        }
        touchStart.current = null;
      }}
    >
      <div className="slideStage">
        <img src={slideUrl} alt={`${title} guide, slide ${page} of ${pageCount}`} />
        {page === pageCount && (
          <a className="slideCta" href="/leaders" aria-label="Start the conversation with ADT Realty" />
        )}
        <button className="slideArrow slideArrowLeft" onClick={previous} disabled={page === 1} aria-label="Previous slide">‹</button>
        <button className="slideArrow slideArrowRight" onClick={next} disabled={page === pageCount} aria-label="Next slide">›</button>
      </div>
      <div className="slideControls">
        <button onClick={previous} disabled={page === 1}>Previous</button>
        <span aria-live="polite">{page} / {pageCount}</span>
        <button onClick={next} disabled={page === pageCount}>Next</button>
        <button onClick={toggleFullscreen}>Full screen</button>
        <a href={pdfUrl} target="_blank" rel="noreferrer">PDF</a>
      </div>
      <p className="slideHint">Swipe or use Previous and Next to explore the guide.</p>
      {fullscreenError && <p className="slideHint" role="status">{fullscreenError}</p>}
    </div>
  );
}

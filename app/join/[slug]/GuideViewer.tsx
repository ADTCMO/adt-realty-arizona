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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const digits = pageCount >= 10 ? 2 : 1;
  const slideUrl = `${slideFolder}/slide-${String(page).padStart(digits, "0")}.jpg`;

  const previous = useCallback(() => setPage((current) => Math.max(1, current - 1)), []);
  const next = useCallback(() => setPage((current) => Math.min(pageCount, current + 1)), [pageCount]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, previous]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await viewerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <div
      ref={viewerRef}
      className="slideViewer"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (distance > 45) previous();
        if (distance < -45) next();
        setTouchStart(null);
      }}
    >
      <div className="slideStage">
        <img src={slideUrl} alt={`${title} guide, slide ${page} of ${pageCount}`} />
        <button className="slideArrow slideArrowLeft" onClick={previous} disabled={page === 1} aria-label="Previous slide">‹</button>
        <button className="slideArrow slideArrowRight" onClick={next} disabled={page === pageCount} aria-label="Next slide">›</button>
      </div>
      <div className="slideControls">
        <button onClick={previous} disabled={page === 1}>Previous</button>
        <span>{page} / {pageCount}</span>
        <button onClick={next} disabled={page === pageCount}>Next</button>
        <button onClick={toggleFullscreen}>Full screen</button>
        <a href={pdfUrl} target="_blank" rel="noreferrer">PDF</a>
      </div>
    </div>
  );
}

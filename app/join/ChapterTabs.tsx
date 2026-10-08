"use client";

import { useEffect, useState } from "react";

export function ChapterTabs({ chapters }: { chapters: readonly (readonly [string, string])[] }) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = 110;
      let reached = 1;
      chapters.forEach(([id], index) => {
        const anchor = document.getElementById(id);
        if (anchor && anchor.getBoundingClientRect().top <= threshold) reached = index + 1;
      });
      setVisibleCount(reached);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [chapters]);

  return <nav className="chapterTabs" aria-label="Explore ADT Realty agent benefits">
    {chapters.slice(0, visibleCount).map(([id, label], index) =>
      <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b></a>
    )}
  </nav>;
}

"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function RecruitingFolder({ label, index, id, count, children }: {
  label: string; index: number; id: string; count: number; children: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = section.current;
    if (!element) return;
    let frame = 0;
    const updateClip = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(element).getPropertyValue("--folder-top")) || 0;
      element.style.setProperty("--folder-clip", `${Math.max(0, top - element.getBoundingClientRect().top)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateClip); };
    const measure = () => {
      element.style.setProperty("--folder-height", `${element.getBoundingClientRect().height}px`);
      onScroll();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <><div id={id} className="folderAnchor" />
    <section ref={section} aria-label={label} className={`recruitFolder folderTone${index % 3}`}
      style={{ "--folder-index": index, "--folder-count": count } as CSSProperties}>
      <a className="folderTab" href={`#${id}`} title={label}>
        <span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b>
      </a>
      <div className="folderBody">{children}</div>
    </section>
  </>;
}

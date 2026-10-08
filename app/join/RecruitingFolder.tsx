"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function RecruitingFolder({ label, index, id, count, natural = false, children }: {
  label: string; index: number; id: string; count: number; natural?: boolean; children: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = section.current;
    if (!element) return;
    const measure = () => {
      element.style.setProperty("--folder-height", `${element.getBoundingClientRect().height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const folderStyle = { "--folder-index": index, "--folder-count": count } as CSSProperties;
  return <><div id={id} className="folderAnchor" />
    <div className={`folderTabTrack folderTone${index % 3}${id === "community-heroes" ? " heroesTabTrack" : ""}${natural ? " naturalTabTrack" : ""}`} style={folderStyle}>
      <a className="folderTab" href={`#${id}`} title={label} aria-label={label}>
        <span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b>
      </a>
    </div>
    <section ref={section} aria-label={label} className={`recruitFolder folderTone${index % 3}${natural ? " naturalSection" : ""}`} style={folderStyle}>
      <div className="folderBody">{children}</div>
    </section>
  </>;
}

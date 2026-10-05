"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function RecruitingFolder({ label, index, id, count, children }: {
  label: string; index: number; id: string; count: number; children: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = section.current;
    if (!element) return;
    const measure = () => element.style.setProperty("--folder-height", `${element.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
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

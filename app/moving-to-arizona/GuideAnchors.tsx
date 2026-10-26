"use client";
import { useEffect } from "react";

/** Reveal semantic accordions for direct links and ordinary anchor navigation. */
export default function GuideAnchors() {
  useEffect(() => {
    function revealTarget() {
      let id = "";
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      let ancestor: HTMLElement | null = target;
      while (ancestor) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
        ancestor = ancestor.parentElement;
      }
      requestAnimationFrame(() => target.scrollIntoView());
    }
    function handleAnchor(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (link && !event.defaultPrevented) requestAnimationFrame(revealTarget);
    }
    revealTarget();
    window.addEventListener("hashchange", revealTarget);
    document.addEventListener("click", handleAnchor);
    return () => {
      window.removeEventListener("hashchange", revealTarget);
      document.removeEventListener("click", handleAnchor);
    };
  }, []);
  return null;
}

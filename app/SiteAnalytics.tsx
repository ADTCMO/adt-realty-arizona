"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Public measurement ID, not a credential. This stream is exclusively for the public ADT website.
const MEASUREMENT_ID = "G-VHVQY9LW1P";
const CHOICE_KEY = "adtSiteAnalyticsChoiceV1";
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; adtSiteGaReady?: boolean; adtSiteGaPath?: string; navigator: Navigator & { globalPrivacyControl?: boolean } };

function privacyBlocked() {
  const w = window as AnalyticsWindow;
  return w.navigator.globalPrivacyControl === true || w.navigator.doNotTrack === "1";
}
function eligible() {
  return location.protocol === "https:" && ["www.adtrealtyaz.com", "adtrealtyaz.com"].includes(location.hostname);
}
function optedOut() {
  try { return localStorage.getItem(CHOICE_KEY) === "off"; } catch { return false; }
}
function safeReferrer() {
  try { return new URL(document.referrer).origin + "/"; } catch { return ""; }
}
function campaign() {
  const fields: Record<string, string> = {};
  const query = new URLSearchParams(location.search);
  for (const [key, target] of Object.entries({utm_source:"campaign_source",utm_medium:"campaign_medium",utm_campaign:"campaign_name",utm_id:"campaign_id",utm_content:"campaign_content"})) {
    const value = query.get(key);
    if (query.getAll(key).length === 1 && value && /^[A-Za-z][A-Za-z0-9_. -]{0,79}$/.test(value) && !/\d{7}/.test(value)) fields[target] = value;
  }
  return fields;
}
function page(path: string) {
  const w = window as AnalyticsWindow;
  if (!eligible() || privacyBlocked() || optedOut()) return;
  if (!w.adtSiteGaReady) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", {analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    w.gtag("js", new Date());
    w.gtag("config", MEASUREMENT_ID, {send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin + path,page_referrer:safeReferrer(),...campaign()});
    const script = document.createElement("script");
    script.async = true; script.referrerPolicy = "no-referrer";
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    script.dataset.adtSiteAnalytics = "true"; document.head.appendChild(script);
    w.adtSiteGaReady = true;
  }
  if (w.adtSiteGaPath === path) return;
  w.gtag!("set", {page_location:location.origin + path,page_referrer:safeReferrer(),page_title:document.title});
  w.gtag!("event", "page_view", {send_to:MEASUREMENT_ID,page_location:location.origin + path,page_path:path,page_title:document.title,page_referrer:safeReferrer()});
  w.adtSiteGaPath = path;
}

export default function SiteAnalytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    setBlocked(privacyBlocked());
    setEnabled(eligible() && !privacyBlocked() && !optedOut());
    if (pathname) page(pathname);
  }, [pathname]);
  function choose(value: boolean) {
    try { localStorage.setItem(CHOICE_KEY, value ? "on" : "off"); } catch { /* Choice still applies to this page. */ }
    const w = window as AnalyticsWindow;
    const active = value && !privacyBlocked();
    setEnabled(active);
    // Vendor opt-out flag stops future collection including automatic engagement.
    (w as unknown as Record<string, unknown>)["ga-disable-" + MEASUREMENT_ID] = !active;
    if (active && pathname) { w.adtSiteGaPath = undefined; page(pathname); }
  }
  return <details style={{padding:"12px 24px",fontSize:12,color:"#475569",background:"#f8fafc"}}>
    <summary style={{cursor:"pointer"}}>Website analytics privacy</summary>
    <p>We use Google Analytics to understand which public pages visitors use and how long they engage. We do not send contact details or form answers through this tracking. Browser privacy signals are respected. This control applies to this website’s Google Analytics, not other services.</p>
    <button type="button" disabled={blocked} onClick={() => choose(!enabled)} style={{textDecoration:"underline",padding:"8px 0"}}>{blocked ? "Analytics off: browser privacy signal" : enabled ? "Turn off website analytics" : "Enable website analytics"}</button>
  </details>;
}

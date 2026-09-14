"use client";

import Script from "next/script";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = "CkFr92Yu4a6r1KoBdYYRij";

export function measureOpenAIEvent(
  eventName: string,
  data: Record<string, unknown>,
  options?: Record<string, unknown>,
) {
  window.oaiq?.("measure", eventName, data, ...(options ? [options] : []));
}

export default function OpenAIAdsPixel() {
  return (
    <Script id="openai-ads-pixel" strategy="afterInteractive">
      {`(function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var js=d.createElement(s);js.async=true;js.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(js,f)})(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init",{pixelId:"${PIXEL_ID}",debug:true});
oaiq("measure","page_viewed",{type:"contents",contents:[{id:window.location.pathname,name:document.title,content_type:"page"}]});`}
    </Script>
  );
}

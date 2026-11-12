"use client";
import { FormEvent, useRef, useState } from "react";

export function LeadForm({ type, stage, market, agentSlug, agentRouting, agentName, agentEmail, agentPublicationVersion, agentInquiryPage = "home" }: { type: "seller" | "contact" | "career"; stage?: string; market?: string; agentSlug?: string; agentRouting?: boolean; agentName?: string; agentEmail?: string; agentPublicationVersion?: string; agentInquiryPage?: "home" | "join" | "hero" }) {
  const [status, setStatus] = useState("");
  const sending = useRef(false);
  const [isSending, setIsSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setIsSending(true);
    setStatus("Sending…");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/leads", { method: "POST", body: new FormData(form) });
      if (!response.ok) {
        if (agentRouting) {
          const detail = await response.json().catch(() => null);
          setStatus(detail?.code === 'agent_context_invalid' ? 'Please reload your agent’s page before sending your request.' : detail?.deliveryState === 'unknown'
            ? `Delivery could not be confirmed. Please contact ${agentName || 'your agent'} before trying again.`
            : `We couldn’t send your request. Please contact ${agentName || 'your agent'}${agentEmail ? ` at ${agentEmail}` : ''}.`);
          return;
        }
        throw new Error("Request failed");
      }
      const receipt = agentRouting ? await response.json().catch(() => null) : null;
      form.reset();
      setStatus(agentRouting ? `Thank you. ${typeof receipt?.recipientName === "string" ? receipt.recipientName : "An ADT Realty professional"} will be in touch shortly.` : "Thank you. Mike will be in touch shortly.");
    } catch {
      setStatus(agentRouting ? `Delivery could not be confirmed. Please contact ${agentName || "your agent"} before trying again.` : "We couldn’t send your request. Please try again or email mikedingman@adthomes.com.");
    } finally {
      sending.current = false;
      setIsSending(false);
    }
  }
  if (type === "seller") return <form className="compactForm" action="https://aceseller.adtrealtyaz.com" method="get">{agentRouting && agentSlug && <><input type="hidden" name="agentSlug" value={agentSlug}/>{agentPublicationVersion && <input type="hidden" name="agentPublicationVersion" value={agentPublicationVersion}/>}</>}<>{agentSlug && <><input type="hidden" name="utm_source" value={`adt-agent-${agentSlug}`}/><input type="hidden" name="utm_medium" value="referral"/><input type="hidden" name="utm_campaign" value="adt-agent-page"/></>}</><label className="addressField">Property Address<input name="address" autoComplete="street-address" placeholder="Street address, city, AZ ZIP" minLength={5} required/></label><button className="button red" type="submit">Get My Estimate <span>›</span></button><small>Free automated estimate. No name or email required.</small></form>;
  return <form className="leadForm" onSubmit={submit} aria-busy={isSending}>{agentRouting && agentPublicationVersion && <input type="hidden" name="agentPublicationVersion" value={agentPublicationVersion}/>}<>{agentSlug && <><input type="hidden" name="agentSlug" value={agentSlug}/>{agentInquiryPage !== "home" && <input type="hidden" name="agentInquiryPage" value={agentInquiryPage}/>}</>}</><input type="hidden" name="leadType" value={type === "career" ? "Join ADT Realty" : market ? `Talk to an agent — ${market}` : "Talk to an agent"}/>{market && <input type="hidden" name="market" value={market}/>}<label>Name<input name="name" autoComplete="name" required/></label><label>Email Address<input name="email" type="email" autoComplete="email" required/></label>{type === "career" ? <label>Career Stage<select name="careerStage" defaultValue={stage || ""} required><option value="" disabled>Select your stage</option><option>Newly Licensed Agent</option><option>Developing Agent</option><option>Productive Agent</option><option>Leadership</option></select></label> : <label>How Can We Help?<textarea name="message" rows={4}/></label>}<button className="button red" type="submit" disabled={isSending}>{isSending ? "Sending…" : "Start the Conversation"} <span>›</span></button><p className="formStatus" role="status">{status}</p></form>;
}

"use client";
import { FormEvent, useState } from "react";

export function LeadForm({ type, stage, market }: { type: "seller" | "contact" | "career"; stage?: string; market?: string }) {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("Sending…"); const form = event.currentTarget;
    const response = await fetch("/api/leads", { method: "POST", body: new FormData(form) });
    if (response.ok) { form.reset(); setStatus("Thank you. Mike will be in touch shortly."); }
    else setStatus("We couldn’t send your request. Please try again or email mikedingman@adthomes.com.");
  }
  if (type === "seller") return <form className="compactForm" action="https://aceseller.adtrealtyaz.com" method="get"><label className="addressField">Property Address<input name="address" autoComplete="street-address" placeholder="Street address, city, AZ ZIP" minLength={5} required/></label><button className="button red" type="submit">Get My Estimate <span>›</span></button><small>Free automated estimate. No name or email required.</small></form>;
  return <form className="leadForm" onSubmit={submit}><input type="hidden" name="leadType" value={type === "career" ? "Join ADT Realty" : market ? `Talk to an agent — ${market}` : "Talk to an agent"}/>{market && <input type="hidden" name="market" value={market}/>}<label>Name<input name="name" autoComplete="name" required/></label><label>Email Address<input name="email" type="email" autoComplete="email" required/></label>{type === "career" ? <label>Career Stage<select name="careerStage" defaultValue={stage || ""} required><option value="" disabled>Select your stage</option><option>Newly Licensed Agent</option><option>Developing Agent</option><option>Productive Agent</option><option>Leadership</option></select></label> : <label>How Can We Help?<textarea name="message" rows={4}/></label>}<button className="button red" type="submit">Start the Conversation <span>›</span></button><p className="formStatus" role="status">{status}</p></form>;
}

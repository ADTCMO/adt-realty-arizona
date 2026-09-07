"use client";

import { FormEvent, useState } from "react";

const guides = [
  { stage: "01", title: "Newly Licensed Agent", copy: "Turn your license into a career with the right foundation, training and daily plan.", href: "https://www.canva.com/d/kBw7rrA0VshiAdt" },
  { stage: "02", title: "Developing Agent", copy: "Build consistency, strengthen your skills and create dependable production.", href: "https://www.canva.com/d/TpqX8x9EPfdWv9k" },
  { stage: "03", title: "Productive Agent", copy: "Scale your business with modern marketing, leverage and meaningful support.", href: "https://www.canva.com/d/ggyF5J1gTgLIF80" },
  { stage: "04", title: "Leadership", copy: "Build your market, mentor others and create a lasting real estate legacy.", href: "https://www.canva.com/d/1TJ9wvclvHuwMIf" },
];

export default function Home() {
  const [status, setStatus] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("Sending…");
    const form = e.currentTarget;
    const response = await fetch("/api/join", { method: "POST", body: new FormData(form) });
    if (response.ok) { form.reset(); setStatus("Thank you. Mike will be in touch shortly."); }
    else setStatus("Something went wrong. Please try again.");
  }

  return <>
    <header className="nav">
      <a className="brand" href="#top" aria-label="ADT Realty Arizona home"><span>ADT</span> REALTY <small>ARIZONA</small></a>
      <nav><a href="#buyers">Buy</a><a href="#sellers">Sell</a><a href="#agents">Join ADT</a></nav>
      <a className="navCta" href="#connect">Connect With Us</a>
    </header>

    <main id="top">
      <section className="hero">
        <div className="heroImage" aria-hidden="true" />
        <div className="heroShade" />
        <div className="heroCopy">
          <p className="eyebrow">ADT REALTY ARIZONA</p>
          <h1>Real estate should move your life forward.</h1>
          <p>Whether you’re buying, selling or building a real estate career, start with clear answers and a trusted Arizona professional beside you.</p>
          <div className="actions"><a className="button red" href="#buyers">I’m Buying</a><a className="button ghost" href="#sellers">I’m Selling</a></div>
        </div>
        <div className="promise"><span>Arizona expertise</span><span>Education first</span><span>Real human support</span></div>
      </section>

      <section id="buyers" className="split light">
        <div className="number">01</div><div>
          <p className="eyebrow blue">FOR BUYERS</p><h2>Know what’s possible before you start searching.</h2>
          <p>Estimate affordability, understand cash to close, follow your personal homebuying roadmap and get answers from an Arizona buyer specialist.</p>
          <ul><li>Affordability and payment planning</li><li>Cash-to-close estimates</li><li>A clear path from questions to keys</li></ul>
          <a className="textLink" href="https://acebuyer.adtrealtyaz.com">Build my free homebuying plan <span>→</span></a>
        </div>
        <div className="featurePanel"><p>YOUR HOME PATH</p><strong>Numbers first.<br/>Confidence next.</strong><span>Understand your buying power before the pressure begins.</span></div>
      </section>

      <section id="sellers" className="split navy">
        <div className="number">02</div><div>
          <p className="eyebrow">FOR SELLERS</p><h2>Your home deserves more than an instant estimate.</h2>
          <p>Start with a strategy built around your property, your market and the move you want to make next.</p>
          <ul><li>Local market positioning</li><li>Likely proceeds and selling costs</li><li>Preparation and launch priorities</li></ul>
          <a className="textLink white" href="#connect">Start my selling plan <span>→</span></a>
        </div>
        <div className="quotePanel"><span>“</span><p>The right price gets attention. The right strategy gets results.</p></div>
      </section>

      <section id="agents" className="agents">
        <div className="sectionIntro"><p className="eyebrow blue">JOIN ADT REALTY</p><h2>Where are you in your real estate career?</h2><p>ADT Realty provides the tools, technology, training and support to help agents move forward—at every stage.</p></div>
        <div className="guideGrid">{guides.map((g)=><a className="guide" href={g.href} target="_blank" rel="noreferrer" key={g.stage}><span>{g.stage}</span><h3>{g.title}</h3><p>{g.copy}</p><b>View the presentation →</b></a>)}</div>
        <div className="center"><a className="button red" href="#join-form">Let’s Talk About Your Next Step</a></div>
      </section>

      <section id="connect" className="connect">
        <div><p className="eyebrow">CONNECT WITH ADT REALTY</p><h2>Let’s make your next step clear.</h2><p>Tell us what you’re working toward. You’ll hear directly from an experienced Arizona real estate professional—no pressure and no runaround.</p></div>
        <form id="join-form" onSubmit={submit}>
          <div className="two"><label>First name<input name="firstName" required /></label><label>Last name<input name="lastName" required /></label></div>
          <label>Email<input name="email" type="email" required /></label>
          <label>Phone<input name="phone" type="tel" /></label>
          <label>I’m interested in<select name="interest" required defaultValue=""><option value="" disabled>Select one</option><option>Buying a home</option><option>Selling a home</option><option>Joining ADT Realty</option><option>Finding an Arizona agent</option></select></label>
          <label>How can we help?<textarea name="message" rows={4}/></label>
          <button className="button red" type="submit">Start the Conversation</button><p className="status" role="status">{status}</p>
        </form>
      </section>
    </main>
    <footer><div className="brand inverse"><span>ADT</span> REALTY <small>ARIZONA</small></div><p>Do the right thing. Every time.</p><p>© 2026 ADT Realty · Equal Housing Opportunity</p></footer>
  </>;
}

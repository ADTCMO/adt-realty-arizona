import Image from "next/image";
import { LeadForm } from "./components/LeadForm";
import { CareerAccordion } from "./components/CareerAccordion";

const stages = [
  { slug: "newly-licensed", title: "Newly Licensed Agent", image: "/career-newly-licensed.jpg", description: "Start your career with a clear plan. Learn how to find leads, build relationships, choose the right mentorship, and establish strong business habits.", cta: "View the Newly Licensed Agent Guide" },
  { slug: "developing-agent", title: "Developing Agent", image: "/career-developing.jpg", description: "Turn activity into consistent production. Build repeatable systems for lead generation, follow-up, database management, marketing, and time management.", cta: "View the Developing Agent Guide" },
  { slug: "productive-agent", title: "Productive Agent", image: "/career-productive.jpg", description: "Build on your success without doing everything yourself. Explore better systems, technology, and support to increase production, protect your time, and improve profitability.", cta: "View the Productive Agent Guide" },
  { slug: "leadership", title: "Leadership", image: "/career-leadership.jpg", description: "Create opportunity beyond your own production. Build a market, mentor agents, develop future leaders, and earn additional income by helping others succeed.", cta: "View the Leadership Guide" },
];

export default function Home() {
  return <>
    <header className="siteHeader">
      <a className="brand" href="#home" aria-label="ADT Realty Arizona home"><Image src="/adt-realty-arizona-logo.png" alt="ADT Realty Arizona" width={118} height={118} priority /></a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#buyers">Buy</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a></nav>
      <a className="button red headerButton" href="#contact">Talk to an Agent <span>›</span></a>
      <details className="mobileMenu"><summary aria-label="Open navigation"><span/><span/><span/></summary><div><a href="#home">Home</a><a href="#buyers">Buy</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a><a href="#contact">Talk to an Agent</a></div></details>
    </header>

    <main>
      <section id="home" className="hero"><div className="heroContent"><h1>ADT REALTY — ARIZONA</h1><p>Local expertise. Modern tools. Relationships that matter.</p><div className="actions"><a className="button red" href="#buyers">Buy a Home <span>›</span></a><a className="button outline" href="#sellers">Sell a Home <span>›</span></a></div></div></section>
      <section className="values" aria-label="Our values"><p>Helping Others</p><p>Do the Right Thing Every Time</p><p>Build Relationships</p></section>

      <section id="buyers" className="split buyer"><div className="splitImage buyerImage" role="img" aria-label="A couple walking toward their new Arizona home" /><div className="splitCopy"><div className="redRule"/><p className="eyebrow">Buying in Arizona</p><h2>Your Path to Homeownership Starts Here</h2><p>Buying a home is exciting. We’ll help you understand your options, prepare for each step, and move forward with confidence.</p><a className="button red" href="https://acebuyer.adtrealtyaz.com">Start My Homebuying Plan <span>›</span></a><small>Powered by the ADT Realty ACE Buyer process.</small></div></section>

      <section id="sellers" className="seller"><div className="sellerForm"><div className="redRule"/><p className="eyebrow light">Selling in Arizona</p><h2>What’s My Home Worth?</h2><p>Get a personalized look at your home’s potential value in today’s Arizona market.</p><LeadForm type="seller" /></div></section>

      <section id="join" className="join"><div className="sectionIntro"><div className="redRule"/><p className="eyebrow">Join ADT Realty</p><h2>Built for Every Stage of Your Real Estate Career</h2><p>ADT Realty combines practical training, modern technology, proven systems, and real support to help you move forward—wherever you are today.</p></div><CareerAccordion stages={stages}/>
        <div className="leadersCallout"><div><p className="eyebrow light">Leadership at ADT Realty</p><h2>Want to hear what our leaders say?</h2><p>Meet the people building ADT Realty and hear why they chose to lead here.</p></div><a className="button outline" href="https://adtrealtyaz.com/leaders">Meet Our Leaders <span>›</span></a></div>
      </section>

      <section id="contact" className="contact"><div><div className="redRule"/><p className="eyebrow light">Connect with ADT Realty</p><h2>Let’s Make Your Next Step Clear.</h2><p>Tell us where you are and what you’re working toward. Your inquiry will go directly to Mike Dingman.</p></div><LeadForm type="contact" /></section>
    </main>

    <footer><Image src="/adt-realty-arizona-logo.png" alt="ADT Realty Arizona" width={96} height={96}/><div className="footerValues"><span>Helping Others</span><span>Do the Right Thing Every Time</span><span>Build Relationships</span></div><p>© 2026 ADT Realty · Equal Housing Opportunity</p></footer>
  </>;
}

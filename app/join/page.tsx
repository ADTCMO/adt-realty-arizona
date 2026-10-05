import type { Metadata } from "next";
import { LeadForm } from "../components/LeadForm";
import "./join.css";

export const metadata: Metadata = {
  title: "Join ADT Realty Arizona | Real Estate Careers Phoenix",
  description: "Build your Arizona real estate career with practical leadership, leads, training, modern marketing tools and support from ADT Realty Arizona.",
  alternates: { canonical: "https://www.adtrealtyaz.com/join" },
};

const stages = [
  ["newly-licensed", "Newly Licensed", "/career-newly-licensed.jpg", "Start with a clear plan, practical mentorship and the habits that create a lasting business."],
  ["developing-agent", "Developing Agent", "/career-developing.jpg", "Turn activity into consistent production with better follow-up, marketing and daily systems."],
  ["productive-agent", "Productive Agent", "/career-productive.jpg", "Protect your time, improve profitability and grow without doing everything yourself."],
  ["leadership", "Leadership", "/career-leadership.jpg", "Build a market, mentor agents and create opportunity beyond your own production."],
];
const benefits = [
  ["Leads with a plan", "Arizona-generated opportunities supported by systems that help you follow up and convert."],
  ["Marketing that gets used", "Personal websites, listing pages, presentations, social content and lead-capture tools."],
  ["Training for real production", "Practical coaching for prospecting, follow-up, appointments, conversion and business planning."],
  ["Technology with a purpose", "Modern tools designed to save time, strengthen your presentation and keep your business organized."],
  ["Local, accountable support", "Arizona leadership that knows the market, answers questions and helps you take the next step."],
  ["A path beyond production", "Leadership development for agents who want to mentor others, build a market and create additional income."],
];

export default function JoinPage() {
  return <div className="joinPage">
    <header className="joinTop">
      <a href="/" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></a>
      <nav aria-label="Join page navigation"><a href="#career-path">Career Paths</a><a href="#what-you-get">What You Get</a><a href="/leaders">Meet Our Leaders</a></nav>
      <a className="joinButton" href="#conversation">Start a Conversation</a>
    </header>
    <main>
      <section className="joinHero"><div className="joinWrap">
        <p className="joinKicker">Join ADT Realty Arizona</p>
        <h1>Build a better real estate business—and a better life.</h1>
        <p>ADT Realty Arizona gives agents practical leadership, modern marketing, training, lead opportunities and the support to build a business they can be proud of.</p>
        <div className="joinActions"><a className="joinButton" href="#conversation">Let’s Talk About Your Next Step</a><a className="joinButton joinOutline" href="#career-path">Find My Career Path</a></div>
      </div></section>
      <section className="joinProof"><div className="joinProofGrid"><div>Arizona Leadership</div><div>Lead Opportunities</div><div>Modern Agent Tools</div><div>Training That Produces</div></div></section>
      <section id="career-path" className="joinSection"><div className="joinHeading"><span/><p className="joinKicker">Built for where you are</p><h2>Your next step should fit your career.</h2><p>You do not need the same thing from a brokerage at every stage. Choose the path that sounds most like you and see how ADT Realty can help you move forward.</p></div>
        <div className="joinStageGrid">{stages.map(([slug,title,image,copy])=><a className="joinStage" href={`/join/${slug}`} key={slug}><img src={image} alt=""/><div><h3>{title}</h3><p>{copy}</p><b>Explore this path →</b></div></a>)}</div>
      </section>
      <section id="what-you-get" className="joinValue"><div className="joinSection"><div className="joinHeading"><span/><p className="joinKicker">What ADT Realty provides</p><h2>A brokerage should help you build—not just hold your license.</h2><p>We are building a practical Arizona platform around the things agents use every day: opportunity, skills, marketing, follow-up and leadership.</p></div>
        <div className="joinBenefits">{benefits.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>
      <section className="joinLeader"><div><p className="joinKicker">Leadership at ADT Realty</p><h2>We’re not building downlines. We’re building leaders.</h2><p>Agents who want more than their own production can develop people, build a market and help shape what ADT Realty becomes in Arizona.</p></div><a className="joinButton" href="/leaders">Meet Our Leaders</a></section>
      <section id="conversation" className="joinConversation"><div className="joinConversationInner"><div className="joinHeading"><span/><p className="joinKicker">A confidential conversation</p><h2>Ready to build what’s next?</h2><p>Tell us where you are in your career and what you want to build. Your message goes directly to Mike Dingman, Arizona State Leader and Designated Broker.</p><p>No pressure. Just a straightforward conversation about whether ADT Realty Arizona is the right fit.</p></div><LeadForm type="career" /></div></section>
    </main>
    <footer className="joinFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><p>Do the right thing. Every time. · © 2026 ADT Realty</p></footer>
  </div>;
}

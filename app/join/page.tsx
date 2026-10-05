import type { Metadata } from "next";
import { LeadForm } from "../components/LeadForm";
import "./join.css";

export const metadata: Metadata = {
  title: "Join ADT Realty Arizona | Build Your Real Estate Career",
  description: "Explore ADT Realty Arizona training, systems, marketing, seller lead opportunities and career paths for Arizona real estate agents.",
  alternates: { canonical: "https://www.adtrealtyaz.com/join" },
};

const business=[
 ["Training & coaching","Practical guidance built around the work agents do every day."],
 ["Business systems","Connected tools for leads, contacts, follow-up and transactions."],
 ["Marketing support","Resources that help agents stay visible and start conversations."],
 ["Leadership growth","Opportunities to mentor agents, build markets and create additional income."],
 ["Revenue share","A path to earn beyond your own production as the company grows."],
 ["Cloud-based brokerage","Professional support without the limits of a traditional office model."],
];
const training=["Lead generation","Database development","Follow-up and conversion","Buyer and seller consultations","Contracts and transactions","Business planning","Personal branding","Leadership development"];
const systems=["CRM and lead management","Contact and database organization","Follow-up systems","Transaction resources","Business planning tools","Lead routing and accountability","ACE Buyer resources","ACE Seller resources"];
const marketing=["Personal agent website","Automated marketing campaigns","Buyer tools and education","Seller tools and market knowledge","Property marketing pages","Social media content","Listing presentations","Buyer presentations"];
const stages=[
 ["newly-licensed","Newly Licensed","/career-newly-licensed.jpg","Build a strong foundation with practical guidance, skills and habits."],
 ["developing-agent","Developing Agent","/career-developing.jpg","Create consistency with better systems, follow-up and daily execution."],
 ["productive-agent","Productive Agent","/career-productive.jpg","Increase profitability, protect your time and grow with leverage."],
 ["leadership","Leadership","/career-leadership.jpg","Mentor agents, build a market and create opportunity beyond production."],
];
const leaders=[
 ["Sarah Atchison","Chief Growth Officer & Texas State Leader","Leadership isn’t about control; it’s about stewardship—serving, protecting and empowering others."],
 ["Lisa Johnson","Senior Vice President of Success & Washington State Leader","When individuals grow, the entire organization becomes stronger."],
 ["Laura Phelps","New Mexico State Leader","Helping others first, learning more in order to give more."],
 ["Brandi Ott","Georgia State Leader","ADT Realty and Mick truly want to see you win. You will receive excellent training if you show up and use it."],
];

export default function JoinPage(){return <div className="joinPage">
<header className="joinTop"><a href="/" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/></a><nav><a href="#model">Our Model</a><a href="#career-paths">Career Paths</a><a href="#leaders">Our Leaders</a></nav><a className="joinButton" href="#conversation">Start the Conversation</a></header>
<main>
<section className="joinHero joinHeroFlag">
  <div className="joinHeroCopy">
    <h1 className="flagHeadline" aria-label="Join ADT Realty">
      <video className="flagHeadlineVideo" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/flag-wave.mp4" type="video/mp4"/>
      </video>
      <svg className="flagHeadlineOutline" viewBox="0 0 900 365" aria-hidden="true" preserveAspectRatio="xMinYMid meet">
        <g fill="none">
          <text x="10" y="218" textLength="880" lengthAdjust="spacingAndGlyphs" className="flagJoinSvg">JOIN</text>
          <text x="10" y="350" textLength="880" lengthAdjust="spacingAndGlyphs" className="flagAdtSvg">ADT REALTY</text>
        </g>
      </svg>
    </h1>
    <p className="heroPromise">Build a Business for Life</p>
    <p className="heroSupport">Practical training, proven systems, modern marketing and people committed to helping you succeed.</p>
  </div>
</section>
<section id="values" className="values"><div><b>Helping Others</b><span>Put people first and create opportunity.</span></div><div><b>Do the Right Thing. Every Time.</b><span>Lead with integrity in every decision.</span></div><div><b>Build Relationships</b><span>Connect, collaborate and grow together.</span></div></section>
<section className="mission"><p>Our Mission</p><h2>Help more than <strong>5,000 people</strong> live a better life through real estate.</h2><span>We encourage innovation, collaboration and integrity in our daily practices.</span></section>
<section className="agentStatement"><p>We work for our agents</p><h2>We don’t hire agents to work for us. Agents join ADT Realty so we can work for them.</h2><span>Our role is to provide the training, systems, marketing, technology and support agents need to create opportunities, serve their clients and build successful businesses.</span></section>
<section id="model" className="joinSection"><div className="sectionIntro"><p className="eyebrow">The ADT Advantage</p><h2>A business model built around agent growth.</h2><p>ADT Realty combines an agent-focused compensation model with the practical resources needed to build a stronger business.</p></div><div className="businessGrid">{business.map(([t,c])=><article key={t}><h3>{t}</h3><p>{c}</p></article>)}</div><div className="numbers"><div><b>80/20</b><span>Agent-focused split</span></div><div><b>$15K</b><span>Company-dollar cap</span></div><div><b>$85</b><span>Monthly technology fee</span></div><div><b>$495</b><span>Transaction fee</span></div></div></section>
<section className="sellerLeads"><div><p className="eyebrow">An Arizona advantage</p><h2>More listings. More signs. More conversations.</h2><p>ADT Realty Arizona offers seller-lead opportunities designed to help agents win more listings and build greater visibility in their communities.</p><p>A listing can create buyer inquiries, neighborhood conversations, future sellers, referrals and long-term relationships. We pair those opportunities with the training, systems and marketing needed to turn momentum into a sustainable business.</p></div><div className="signArt"><span>ADT REALTY</span><b>FOR SALE</b><small>More signs create more conversations.</small></div></section>
<section className="training"><div className="joinSection"><div className="sectionIntro"><p className="eyebrow">Training that builds businesses</p><h2>Training should lead to action—and action should lead to growth.</h2><p>Our training focuses on the skills and activities that help agents create opportunities, serve clients and produce measurable results.</p></div><div className="pillGrid">{training.map(x=><span key={x}>{x}</span>)}</div></div></section>
<section className="systems joinSection"><div className="sectionIntro"><p className="eyebrow">Systems that support production</p><h2>Connected resources for the work behind every transaction.</h2><p>We bring essential systems together so agents can organize opportunities, strengthen follow-up and spend more time building relationships.</p></div><div className="systemGrid">{systems.map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></section>
<section className="marketing"><div className="joinSection"><div className="sectionIntro"><p className="eyebrow">Marketing that builds relationships</p><h2>Tools and knowledge designed to start conversations.</h2><p>Real estate businesses grow through relationships. ADT Realty gives agents useful tools, relevant knowledge and professional marketing resources they can share with buyers, sellers and their communities.</p></div><div className="marketingSplit"><div className="websiteMock"><div className="mockBar"><i/><i/><i/></div><h3>Your personal real estate resource</h3><p>Not simply an online business card. Your website gives buyers and sellers useful tools and practical knowledge while creating natural opportunities to begin a conversation with you.</p><button>Start a Conversation</button></div><ul>{marketing.map(x=><li key={x}>{x}</li>)}</ul></div></div></section>
<section id="career-paths" className="joinSection"><div className="sectionIntro"><p className="eyebrow">Build at every stage</p><h2>Your next step should fit your career.</h2><p>Choose the career guide that reflects where you are today and what you want to build next.</p></div><div className="stageGrid">{stages.map(([slug,title,img,copy])=><a href={`/join/${slug}`} className="stageCard" key={slug}><img src={img} alt=""/><div><h3>{title}</h3><p>{copy}</p><b>View the career guide</b></div></a>)}</div></section>
<section id="leaders" className="leaders"><div className="joinSection"><div className="sectionIntro"><p className="eyebrow">Real people. Real growth.</p><h2>Hear from some of our leaders.</h2><p>Learn why they chose ADT Realty, what surprised them and how their businesses and roles have grown.</p></div><div className="leaderGrid">{leaders.map(([n,r,q])=><article key={n}><blockquote>“{q}”</blockquote><h3>{n}</h3><p>{r}</p></article>)}</div><div className="growthCallout"><h3>There are plenty of opportunities to grow at ADT Realty.</h3><p>Growth can mean increasing production, building a stronger business, mentoring agents, becoming an area leader or helping develop an entire market.</p></div></div></section>
<section className="wanted"><div className="wantedPaper"><p className="wantedTop">Wanted</p><h2>Arizona Area Leaders<br/>and Real Estate Agents</h2><small>By order of ADT Realty</small><h3>Turn Your License Into a Legacy</h3><p>Whether you are ready to grow your production, strengthen your business or help build an Arizona market, ADT Realty offers an opportunity to create something bigger.</p><b>We’re not building downlines.<br/>We’re building leaders.</b><a className="wantedButton" href="#conversation">Start the Conversation</a></div></section>
<section id="conversation" className="conversation"><div className="conversationInner"><div><p className="eyebrow">No pressure. No obligation.</p><h2>Start a confidential conversation.</h2><p>Tell us where you are in your career and what you want to build. We’ll help you determine whether ADT Realty Arizona is the right fit.</p></div><LeadForm type="career"/></div></section>
</main><footer className="joinFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><p>Helping Others · Do the Right Thing Every Time · Build Relationships</p></footer></div>}

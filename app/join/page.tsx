import type { Metadata } from "next";
import type { ReactNode, CSSProperties } from "react";
import { LeadForm } from "../components/LeadForm";
import "./join.css";

export const metadata: Metadata = {
  title: "Join ADT Realty Arizona | Build Your Real Estate Career",
  description: "Explore ADT Realty Arizona training, systems, marketing, seller lead opportunities and career paths for Arizona real estate agents.",
  alternates: { canonical: "https://www.adtrealtyaz.com/join" },
};

const chapters = [
  ["values", "ADT Realty"], ["model", "Business Model"],
  ["training", "Training"], ["systems", "Tools & Systems"],
  ["marketing", "Marketing"], ["ace", "ACE System"],
  ["community-heroes", "Community Heroes"],
  ["career-paths", "Career Paths"], ["leaders", "Leadership"],
];
function Folder({label,index,id,children}: {label:string;index:number;id?:string;children:ReactNode}) {
  return <><div id={id ?? chapters[index][0]} className="folderAnchor" />
  <section aria-label={label} className={`recruitFolder folderTone${index%3}`} style={{"--folder-index":index,"--folder-count":chapters.length} as CSSProperties}>
    <a className="folderTab" href={`#${id ?? chapters[index][0]}`} title={label}><span>{String(index+1).padStart(2,"0")}</span><b>{label}</b></a>
    <div className="folderBody">{children}</div>
  </section></>;
}
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
  <video className="joinFlagVideo" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
    <source src="/flag-wave.mp4" type="video/mp4" />
  </video>
  <div className="joinHeroWash" aria-hidden="true" />
  <img className="joinHeroMap" src="/join-adt-map.webp" alt="" aria-hidden="true" />
  <h1 className="joinMapTitle"><span>Join</span><strong>ADT Realty-Arizona</strong></h1>
  <div className="joinMapSupport"><h2>Build a Business for Life</h2><p>Practical training, proven systems, modern marketing and people<br className="joinSupportBreak" /> committed to helping you succeed.</p></div>
</section>

<div className="folderStack">
<Folder label="ADT Realty" index={0} id="values">
 <div className="folderIntro"><p className="eyebrow">American Dream Team</p><h2>Build a business.<br/><em>Build a better life.</em></h2><p>ADT Realty is a rapidly growing national real estate brokerage built around helping agents build successful, lasting businesses. Growth-focused training, practical systems, modern marketing and personal support help you strengthen your skills, serve your clients and create more opportunity.</p></div>
 <div className="folderValues"><article><span>01</span><h3>Helping Others</h3><p>We put people first and serve with purpose.</p></article><article><span>02</span><h3>Do the Right Thing.<br/>Every Time.</h3><p>Integrity guides our actions and decisions.</p></article><article><span>03</span><h3>Build Relationships</h3><p>We connect, collaborate and create lasting relationships.</p></article></div>
 <div className="folderMission"><h3>Our Mission</h3><p>Help people live a better life through real estate by encouraging innovation, collaboration and integrity in our daily practices.</p></div>
</Folder>
<Folder label="Business Model" index={1} id="model">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">The ADT Advantage</p><h2>We work<br/><em>for our agents.</em></h2><p>We don’t hire agents to work for us. Agents join ADT Realty so we can work for them.</p><p>Every system, training resource and leadership initiative is designed with one goal: helping agents build successful businesses and better lives through real estate.</p></div><div className="agentPhoto" role="img" aria-label="ADT agents collaborating at a desk" /></div>
 <div className="advantageBenefits">{[
 ["Cloud-based brokerage","Professional support without the limits of office walls."],
 ["Training & coaching","Practical guidance to turn knowledge into production."],
 ["Revenue share","Opportunity to earn beyond your own transactions."],
 ["Leadership opportunities","Help others grow while building your own future."],
 ["Additional income streams","Explore opportunities to grow beyond personal production."]
 ].map(([title,copy],i)=><article key={title}><span className={`advantageIcon advantageIcon${i}`} aria-hidden="true"/><h3>{title}</h3><p>{copy}</p></article>)}</div>
</Folder>
<Folder label="Training" index={2}>
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Real training. Real coaching.</p><h2>Training that<br/><em>builds businesses.</em></h2><p>Develop the knowledge, skills and confidence to build a successful real estate business—and the life you want.</p><p>From your first consultation to your next stage of leadership, our focus is practical: learn it, use it and grow.</p></div><div className="trainingStudio" role="img" aria-label="Illustration of ADT training topics on a laptop"><div className="trainingScreen"><div className="trainingScreenTop"><span>ADT TRAINING</span><i>LEARN · APPLY · GROW</i></div><div className="trainingLesson"><span className="playMark">▶</span><div><small>BUILD YOUR BUSINESS</small><strong>Your next chapter<br/>starts with learning.</strong></div></div><div className="trainingModules">{["Business planning","Lead generation","Client conversations","Leadership"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div></div><div className="trainingBase"/><div className="trainingNote">Practical skills.<br/><b>Lasting confidence.</b></div></div></div>
 <div className="trainingTopics">{["Live training","Learning resources","Coaching & support","Lead generation","Business planning","Leadership development"].map(x=><span key={x}>{x}</span>)}</div>
</Folder>
<Folder label="Tools & Systems" index={3}>
 <div className="folderIntro"><p className="eyebrow">Connected resources</p><h2>Technology that<br/><em>powers your business.</em></h2><p>Organize leads, strengthen follow-up and manage the work behind each transaction—with systems that help you spend more time building relationships.</p></div>
 <div className="systemsShowcase"><div className="systemCrop fubCrop" role="img" aria-label="Follow Up Boss lead management and CRM artwork"/><div className="systemCrop dotloopCrop" role="img" aria-label="Dotloop transaction management artwork"/></div>
 <div className="toolCaptions"><p><b>Follow Up Boss · Lead management & CRM</b>Lead tracking, follow-up, campaigns and pipeline organization.</p><p><b>Dotloop · Transaction resources</b>Contracts, signatures, document storage and transaction tracking.</p></div>
</Folder>
<Folder label="Marketing" index={4}>
 <div className="folderIntro"><p className="eyebrow">Your brand. Our support.</p><h2>Marketing that<br/><em>helps you stand out.</em></h2><p>Build your brand with professional marketing materials, ready-to-use content and a team that supports your business. From your next listing to your next client conversation, put your best foot forward.</p></div>
 <div className="marketingShowcase"><div className="marketingLaptop" role="img" aria-label="Laptop showing ADT branded marketing"/><div className="marketingSamples" role="img" aria-label="Examples of Just Listed, market update, ACE Chronicles, FSBO and recruiting marketing materials"/></div>
 <div className="trainingTopics">{["Social media marketing","Professional branding","Monthly mailers","Recruiting & growth materials","Marketing team support"].map(x=><span key={x}>{x}</span>)}</div>
</Folder>
<Folder label="ACE System" index={5} id="ace">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Built for your Arizona business</p><h2>More than a website.<br/><em>A system for growth.</em></h2><p>The ACE system brings company-provided leads, a personal website and automated marketing together to help you attract buyers and sellers—and turn opportunities into relationships.</p><p>Your website gives people a reason to visit and engage: useful calculators, buyer and seller planning tools, and resources that help them take their next step.</p></div><div className="aceVisual"><div className="aceBrand">ACE<span>YOUR BUSINESS. CONNECTED.</span></div><div className="aceJourney"><span>Attract</span><b>→</b><span>Connect</span><b>→</b><span>Grow</span></div><div className="aceResources"><a href="https://acebuyer.adtrealtyaz.com">Buyer tools<span>Payments · Affordability · Savings ↗</span></a><a href="/">Seller resources<span>Home value · Planning · Next steps ↗</span></a></div></div></div>
 <div className="aceBenefits"><article><b>Company-provided leads</b><p>More opportunities to start conversations with buyers and sellers.</p></article><article><b>Your personal website</b><p>A useful destination designed to attract and engage potential clients.</p></article><article><b>Automated marketing</b><p>Stay visible and keep your business in front of potential clients.</p></article></div>
</Folder>
<Folder label="Community Heroes" index={6} id="community-heroes">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">ADT Realty Community Heroes</p><h2>A chance<br/><em>to give back.</em></h2><p>Serve the people who serve our communities. Community Heroes gives our agents a meaningful way to thank military members, veterans, first responders, healthcare professionals and educators.</p><p>Build relationships rooted in gratitude, help heroes take their next step in real estate, and make a difference close to home.</p><a className="joinButton" href="/hero">Explore Community Heroes</a></div><img className="heroesArt" src="/community-heroes-service-bg.png" alt="Military, emergency service, healthcare and education professionals together in an Arizona community" loading="lazy"/></div>
</Folder>
<Folder label="Career Paths" index={7} id="career-paths">
 <div className="folderIntro"><p className="eyebrow">Build at every stage</p><h2>Your next step.<br/><em>Your kind of growth.</em></h2><p>Choose the career guide that reflects where you are today and what you want to build next.</p></div>
 <div className="stageGrid">{stages.map(([slug,title,img,copy])=><a href={`/join/${slug}`} className="stageCard" key={slug}><img src={img} alt="" loading="lazy"/><div><h3>{title}</h3><p>{copy}</p><b>View the career guide</b></div></a>)}</div>
</Folder>
<Folder label="Leadership" index={8} id="leaders">
 <div className="folderIntro"><p className="eyebrow">Real people. Real growth.</p><h2>Hear from<br/><em>our leaders.</em></h2><p>There are plenty of opportunities to grow: increase production, mentor agents, become an area leader or help develop an entire market.</p></div>
 <div className="leaderGrid">{leaders.map(([n,r,q])=><article key={n}><blockquote>“{q}”</blockquote><h3>{n}</h3><p>{r}</p></article>)}</div>
</Folder>
</div>
<section className="wanted"><div className="wantedPaper"><p className="wantedTop">Wanted</p><h2>Arizona Area Leaders<br/>and Real Estate Agents</h2><small>By order of ADT Realty</small><h3>Turn Your License Into a Legacy</h3><p>Whether you are ready to grow your production, strengthen your business or help build an Arizona market, ADT Realty offers an opportunity to create something bigger.</p><b>We’re not building downlines.<br/>We’re building leaders.</b><a className="wantedButton" href="#conversation">Start the Conversation</a></div></section>
<section id="conversation" className="conversation"><div className="conversationInner"><div><p className="eyebrow">No pressure. No obligation.</p><h2>Start a confidential conversation.</h2><p>Tell us where you are in your career and what you want to build. We’ll help you determine whether ADT Realty Arizona is the right fit.</p></div><LeadForm type="career"/></div></section>
</main><footer className="joinFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><p>Helping Others · Do the Right Thing Every Time · Build Relationships</p></footer></div>}

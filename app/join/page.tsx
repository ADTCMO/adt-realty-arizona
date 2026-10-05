import type { Metadata } from "next";
import type { ReactNode, CSSProperties } from "react";
import { LeadForm } from "../components/LeadForm";
import "./join.css";

export const metadata: Metadata = {
  title: "Join ADT Realty Arizona | Build Your Real Estate Career",
  description: "Explore ADT Realty Arizona training, systems, marketing, seller lead opportunities and career paths for Arizona real estate agents.",
  alternates: { canonical: "https://www.adtrealtyaz.com/join" },
};

function Folder({label,index,id,children}: {label:string;index:number;id?:string;children:ReactNode}) {
  return <section id={id} className={`recruitFolder folderTone${index%3}`} style={{"--folder-index":index} as CSSProperties}>
    <div className="folderTab"><span>{String(index+1).padStart(2,"0")}</span>{label}</div>
    <div className="folderBody">{children}</div>
  </section>;
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
<section className="joinHero joinHeroFlag"><div className="joinHeroCopy">
  <h1 className="flagHeadline"><span>Join</span><strong>ADT Realty-Arizona</strong></h1>
  <p className="heroPromise">Build a Business for Life</p>
  <p className="heroSupport">Practical training, proven systems, modern marketing and people committed to helping you succeed.</p>
</div></section>

<div className="folderStack">
<Folder label="ADT Realty" index={0} id="values">
 <div className="folderIntro"><p className="eyebrow">American Dream Team</p><h2>Build a business.<br/><em>Build a better life.</em></h2><p>ADT Realty is a rapidly growing national real estate brokerage built around helping agents build successful, lasting businesses. Growth-focused training, practical systems, modern marketing and personal support help you strengthen your skills, serve your clients and create more opportunity.</p></div>
 <div className="folderValues"><article><span>01</span><h3>Helping Others</h3><p>We put people first and serve with purpose.</p></article><article><span>02</span><h3>Do the Right Thing.<br/>Every Time.</h3><p>Integrity guides our actions and decisions.</p></article><article><span>03</span><h3>Build Relationships</h3><p>We connect, collaborate and create lasting relationships.</p></article></div>
 <div className="folderMission"><h3>Our Mission</h3><p>Help people live a better life through real estate by encouraging innovation, collaboration and integrity in our daily practices.</p></div>
</Folder>
<Folder label="Business Model" index={1} id="model">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">The ADT Advantage</p><h2>We work<br/><em>for our agents.</em></h2><p>We don’t hire agents to work for us. Agents join ADT Realty so we can work for them.</p><p>Every system, training resource and leadership initiative is designed with one goal: helping agents build successful businesses and better lives through real estate.</p></div><div className="modelBenefits"><article><h3>Cloud-based brokerage</h3><p>Professional support without the limits of office walls.</p></article><article><h3>Training & coaching</h3><p>Practical guidance to turn knowledge into production.</p></article><article><h3>Revenue share</h3><p>Opportunity to earn beyond your own transactions.</p></article><article><h3>Leadership opportunities</h3><p>Help others grow while building your own future.</p></article></div></div>
 <div className="numbers"><div><b>80/20</b><span>Agent-focused split</span></div><div><b>$15K</b><span>Company-dollar cap</span></div><div><b>$85</b><span>Monthly technology fee</span></div><div><b>$495</b><span>Transaction fee</span></div></div>
</Folder>
<Folder label="Training" index={2}>
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Real training. Real coaching.</p><h2>Training that<br/><em>builds businesses.</em></h2><p>Develop the knowledge, skills and confidence to build a successful real estate business—and the life you want.</p><p>From your first consultation to your next stage of leadership, our focus is practical: learn it, use it and grow.</p></div><img className="folderArt trainingArt" src="/join-training-art.webp" alt="Training platform illustrated on a laptop and phone" loading="lazy"/></div>
 <div className="trainingTopics">{["Live training","Learning resources","Coaching & support","Lead generation","Business planning","Leadership development"].map(x=><span key={x}>{x}</span>)}</div>
</Folder>
<Folder label="Tools & Systems" index={3}>
 <div className="folderIntro"><p className="eyebrow">Connected resources</p><h2>Technology that<br/><em>powers your business.</em></h2><p>Organize leads, strengthen follow-up and manage the work behind each transaction—with systems that help you spend more time building relationships.</p></div>
 <img className="folderArt systemsArt" src="/join-systems-art.webp" alt="Pitch-deck illustration of CRM and transaction-management tools" loading="lazy"/>
 <div className="toolCaptions"><p><b>Lead management & CRM</b>Lead tracking, follow-up, campaigns and pipeline organization.</p><p><b>Transaction resources</b>Contracts, signatures, document storage and transaction tracking.</p></div>
</Folder>
<Folder label="Marketing" index={4}>
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Stay visible. Start conversations.</p><h2>Your marketing.<br/><em>Working for you.</em></h2><p>Automated marketing and a personal website give buyers and sellers useful tools and knowledge—not just another online business card.</p><p>Share ACE Buyer and seller resources, property pages and professional content that create natural opportunities to begin a conversation.</p></div><div className="marketingVisual"><img className="folderArt" src="/buyer-home.jpg" alt="Arizona home" loading="lazy"/><div><span>Your personal website</span><h3>Useful tools.<br/>Stronger relationships.</h3><p>Buyer resources · Seller education · Property marketing</p></div></div></div>
 <div className="trainingTopics">{["Automated campaigns","Personal agent website","Property marketing","Social content","Buyer presentations","Listing presentations"].map(x=><span key={x}>{x}</span>)}</div>
</Folder>
<Folder label="Arizona Opportunities" index={5}>
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">An Arizona advantage</p><h2>More signs.<br/><em>More conversations.</em></h2><p>ADT Realty Arizona offers seller-lead opportunities designed to help agents win more listings and build visibility in their communities.</p><p>A listing can open the door to buyer inquiries, neighborhood conversations, future sellers and referrals. We pair those opportunities with training and marketing to help you build lasting momentum.</p></div><img className="folderArt opportunityArt" src="/adt-seller-yard.png" alt="Arizona real estate yard-sign artwork" loading="lazy"/></div>
</Folder>
<Folder label="Career Paths" index={6} id="career-paths">
 <div className="folderIntro"><p className="eyebrow">Build at every stage</p><h2>Your next step.<br/><em>Your kind of growth.</em></h2><p>Choose the career guide that reflects where you are today and what you want to build next.</p></div>
 <div className="stageGrid">{stages.map(([slug,title,img,copy])=><a href={`/join/${slug}`} className="stageCard" key={slug}><img src={img} alt="" loading="lazy"/><div><h3>{title}</h3><p>{copy}</p><b>View the career guide</b></div></a>)}</div>
</Folder>
<Folder label="Leadership" index={7} id="leaders">
 <div className="folderIntro"><p className="eyebrow">Real people. Real growth.</p><h2>Hear from<br/><em>our leaders.</em></h2><p>There are plenty of opportunities to grow: increase production, mentor agents, become an area leader or help develop an entire market.</p></div>
 <div className="leaderGrid">{leaders.map(([n,r,q])=><article key={n}><blockquote>“{q}”</blockquote><h3>{n}</h3><p>{r}</p></article>)}</div>
</Folder>
</div>
<section className="wanted"><div className="wantedPaper"><p className="wantedTop">Wanted</p><h2>Arizona Area Leaders<br/>and Real Estate Agents</h2><small>By order of ADT Realty</small><h3>Turn Your License Into a Legacy</h3><p>Whether you are ready to grow your production, strengthen your business or help build an Arizona market, ADT Realty offers an opportunity to create something bigger.</p><b>We’re not building downlines.<br/>We’re building leaders.</b><a className="wantedButton" href="#conversation">Start the Conversation</a></div></section>
<section id="conversation" className="conversation"><div className="conversationInner"><div><p className="eyebrow">No pressure. No obligation.</p><h2>Start a confidential conversation.</h2><p>Tell us where you are in your career and what you want to build. We’ll help you determine whether ADT Realty Arizona is the right fit.</p></div><LeadForm type="career"/></div></section>
</main><footer className="joinFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><p>Helping Others · Do the Right Thing Every Time · Build Relationships</p></footer></div>}

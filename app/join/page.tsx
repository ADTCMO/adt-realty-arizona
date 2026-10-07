import MarketingSamples from "./MarketingSamples";
import JoinLeaders from "./JoinLeaders";
import type { Metadata } from "next";
import { RecruitingFolder } from "./RecruitingFolder";
import type { ReactNode } from "react";
import { LeadForm } from "../components/LeadForm";
import "./join.css";

export const metadata: Metadata = {
  title: "Join ADT Realty | Build Your Real Estate Career",
  description: "Explore ADT Realty Arizona training, systems, marketing, seller lead opportunities and career paths for Arizona real estate agents.",
  alternates: { canonical: "https://www.adtrealtyaz.com/join" },
};

const chapters = [
  ["values", "ADT Realty"], ["model", "Business Model"],
  ["training", "Training"], ["systems", "Tools & Systems"],
  ["marketing", "Marketing"], ["seller-leads", "Seller Leads"],
  ["ace", "ACE Business Center"],
  ["community-heroes", "Community Heroes"],
  ["career-paths", "Career Paths"], ["leaders", "Leadership"],
];
function Folder({label,index,id,children}: {label:string;index:number;id?:string;children:ReactNode}) {
  return <RecruitingFolder label={label} index={index} id={id ?? chapters[index][0]} count={chapters.length}>{children}</RecruitingFolder>;
}
const stages=[
 ["newly-licensed","Newly Licensed","/career-newly-licensed.jpg","Build a strong foundation with practical guidance, skills and habits."],
 ["developing-agent","Developing Agent","/career-developing.jpg","Create consistency with better systems, follow-up and daily execution."],
 ["productive-agent","Productive Agent","/career-productive.jpg","Increase profitability, protect your time and grow with leverage."],
 ["leadership","Leadership","/career-leadership.jpg","Mentor agents, build a market and create opportunity beyond production."],
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

<section className="joinPromise" aria-label="Our commitment to agents"><h2>You don’t join ADT Realty to work for us.<br/><em>We go to work for you.</em></h2></section>

<div className="folderStack">
<Folder label="ADT Realty" index={0} id="values">
 <div className="folderIntro valuesIntro"><p className="eyebrow">American Dream Team</p><h2>A National Brokerage.<br/><em>A Personal Commitment.</em></h2><p>Build a lasting business with people who put your growth first. ADT Realty brings together practical training, connected systems and personal support—grounded in three shared values.</p></div>
 <img className="valuesTeamPhoto" src="/join-values-team.webp" alt="Real estate professionals collaborating outside an Arizona home" width="1440" height="480" loading="lazy" decoding="async"/>
 <div className="folderValues"><article><h3>Helping Others</h3><p>We put people first and serve with purpose.</p></article><article><h3>Do the Right Thing.<br/>Every Time.</h3><p>Integrity guides our actions and decisions.</p></article><article><h3>Build Relationships</h3><p>We connect, collaborate and create lasting relationships.</p></article></div>
 <div className="folderMission"><h3>Our Mission</h3><p>Help people live a better life through real estate by encouraging innovation, collaboration and integrity in our daily practices.</p></div>
</Folder>
<Folder label="Business Model" index={1} id="model">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">The ADT Realty Advantage</p><h2>More Ways to Grow.<br/><em>More Ways to Earn.</em></h2><p>Build your business with practical training, connected technology and leaders who help you put both to work.</p><p>As your goals grow, explore revenue share, mentorship and leadership opportunities alongside your own real estate production.</p></div><div className="agentPhoto" role="img" aria-label="Real estate agents collaborating at a desk" /></div>
 <div className="advantageBenefits">{[
 ["Cloud-based brokerage","Professional support without the limits of office walls."],
 ["Training & coaching","Practical guidance to turn knowledge into production."],
 ["Revenue share","Opportunity to earn beyond your own transactions."],
 ["Leadership opportunities","Help others grow while building your own future."],
 ["Additional income streams","Explore opportunities to grow beyond personal production."]
 ].map(([title,copy],i)=><article key={title}><span className={`advantageIcon advantageIcon${i}`} aria-hidden="true"/><h3>{title}</h3><p>{copy}</p></article>)}</div>
</Folder>
<Folder label="Training" index={2}>
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Real training. Real coaching. Real results.</p><h2>Training that<br/><em>builds businesses.</em></h2><p>Our training platform gives you the knowledge, tools and confidence to build a successful real estate business and create the life you want.</p><p>Practical skills you can put to work—from your first client conversation to your next stage of leadership.</p></div><img className="trainingDeckArt" src="/join-training-workspace.webp" alt="Illustrated ADT Realty training workspace with a laptop, notebook and Arizona view" width="1200" height="800" loading="lazy" decoding="async"/></div>
 <div className="trainingBenefits">{[
 ["Live training","Weekly sessions to sharpen your skills and put new ideas into practice."],
 ["On-demand library","Build your knowledge on your schedule, wherever you work."],
 ["Coaching & support","Personal guidance to help you move toward your goals."],
 ["Proven systems","Build habits for lead generation, conversion and business growth."],
 ["Leadership development","Grow your skills and help others succeed."]
 ].map(([title,copy],i)=><article key={title}><span className={`trainingDeckIcon trainingDeckIcon${i}`} aria-hidden="true"/><h3>{title}</h3><p>{copy}</p></article>)}</div>
 <div className="trainingAvailable"><p className="eyebrow">Available to you</p><div><h3>Buffini Certified Trainers</h3><h3>Icenhower Online Training Library</h3></div></div>
</Folder>
<Folder label="Tools & Systems" index={3}>
 <div className="folderIntro"><p className="eyebrow">Connected resources</p><h2>Technology that<br/><em>powers your business.</em></h2><p>Organize leads, strengthen follow-up and manage the work behind each transaction—with systems that help you spend more time building relationships.</p></div>
 <div className="systemsShowcase">
  <article className="systemFeature"><div className="systemLaptop"><img className="systemScreen" src="/join-fub-dashboard.webp" alt="Follow Up Boss dashboard showing activity and follow-up metrics" width="1000" height="425" loading="lazy" decoding="async"/></div><h3>Follow Up Boss</h3><p className="systemRole">Lead management & CRM</p><p>Keep your contacts, conversations and next steps together. Build a follow-up routine that keeps relationships moving.</p></article>
  <article className="systemFeature"><div className="systemLaptop"><img className="systemScreen" src="/join-dotloop-dashboard.webp" alt="Dotloop interface showing organized transaction files" width="960" height="333" loading="lazy" decoding="async"/></div><h3>Dotloop</h3><p className="systemRole">Transaction management</p><p>Bring contracts, signatures and documents into one organized workflow, from the first offer through closing.</p></article>
 </div>
 <p className="systemSampleNote">Product interface examples from Follow Up Boss and Dotloop.</p>
</Folder>
<Folder label="Marketing" index={4}>
 <div className="folderIntro"><p className="eyebrow">Your brand. Our support.</p><h2>Marketing that<br/><em>helps you stand out.</em></h2><p>Build your brand with professional marketing materials, ready-to-use content and a team that supports your business. From your next listing to your next client conversation, put your best foot forward.</p></div>
 <MarketingSamples />
 <p className="marketingExampleNote">One property. Your brand across social, print and a dedicated property website. Featured campaign: 2094 W Peninsula Circle, Chandler. Sample campaign details may change.</p>

 <div className="trainingTopics">{["Social media marketing","Professional branding","Monthly mailers","Recruiting & growth materials","Marketing team support"].map(x=><span key={x}>{x}</span>)}</div>
</Folder>
<Folder label="Seller Leads" index={5} id="seller-leads">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Company-provided opportunities</p><h2>Highly motivated<br/><em>seller leads.</em></h2><p>Get your sign in more yards. Company-provided seller leads give you more opportunities to win listings, build local visibility and promote your business.</p><p>Each listing gives you more to share: a Just Listed announcement, an open house, neighborhood conversations and new reasons for buyers and sellers to reach out.</p></div><div className="sellerLeadArt"><img src="/adt-seller-yard.webp" alt="ADT Realty For Sale sign in an Arizona front yard" loading="lazy"/><div className="sellerSocialSamples"><div className="listingPost"><strong>JUST LISTED</strong><img src="/seller-home.jpg" alt="Arizona home in a sample listing post" loading="lazy"/><span>ADT REALTY · ARIZONA</span></div><div className="listingPost openHousePost"><strong>OPEN HOUSE</strong><img src="/buyer-home.jpg" alt="Arizona home in a sample open house post" loading="lazy"/><span>COME FIND YOUR NEXT CHAPTER</span></div></div><small className="sampleCaption">Marketing examples</small></div></div>
 <div className="trainingTopics"><span>More signs in yards</span><span>More ways to promote your business</span><span>More client conversations</span></div>
</Folder>
<Folder label="ACE Business Center" index={6} id="ace">
 <div className="folderSplit"><div className="folderIntro"><p className="eyebrow">Your personal ACE System Business Center</p><h2>Your website.<br/><em>A powerful business tool.</em></h2><p>A personal website that gives buyers and sellers a reason to visit, explore and come back. Useful tools and clear guidance help attract potential clients naturally—and give you a meaningful way to start the conversation.</p><p>Your ACE Business Center brings your website, buyer and seller tools, and automated marketing together to support the business you’re building.</p></div><div className="aceLaptopArt"><div className="aceLaptopScreen"><img src="/join-website-screen.jpg" alt="Actual ADT Realty Arizona website displayed on a laptop" loading="lazy"/></div><div className="aceLaptopKeyboard"/><p>Your brand. Useful tools. More opportunity.</p></div></div>
 <div className="aceBenefits"><article><b>Your personal website</b><p>A destination built to attract buyers and sellers with resources they can use.</p></article><article><b>Buyer & seller tools</b><p>Calculators, planning resources and education that help people take their next step.</p></article><article><b>Automated marketing</b><p>Stay visible, share useful content and keep your business in front of potential clients.</p></article></div>
</Folder>
<Folder label="Community Heroes" index={7} id="community-heroes">
 <div className="joinHeroesFeature"><div className="joinHeroesCopy"><img className="joinHeroesLogo" src="/community-heroes-logo.png" alt="ADT Realty Community Heroes" loading="lazy"/><p className="eyebrow">Serve those who serve Arizona</p><h2>A chance<br/><em>to give back.</em></h2><p>They strengthen our communities every day. As an ADT Realty agent, you have an opportunity to thank them with meaningful support when they buy or sell a home.</p><p>Build relationships rooted in gratitude. Make a difference in the lives of the people who make a difference for all of us.</p><a className="joinButton" href="/hero">Explore Community Heroes</a></div></div>
 <div className="heroServiceList"><span>Military & Veterans</span><span>Law Enforcement</span><span>Firefighters & EMS</span><span>Healthcare</span><span>Educators & School Staff</span></div>
</Folder>
<Folder label="Career Paths" index={8} id="career-paths">
 <div className="folderIntro"><p className="eyebrow">Build at every stage</p><h2>Wherever You Are in Your Career,<br/><em>There’s a Path Forward.</em></h2><p>From your first transaction to leading others, ADT Realty provides the tools, training and support to help you take your next step. Explore the guide that fits where you are today.</p></div>
 <div className="stageGrid">{stages.map(([slug,title,cover,copy])=><a href={`/join/${slug}`} className="stageCard" key={slug}><img className="careerCover" src={cover} alt={`${title} career guide cover`} width="160" height="210" loading="lazy" decoding="async"/><div><h3>{title}</h3><p>{copy}</p><b>View the career guide</b></div></a>)}</div>
</Folder>
<Folder label="Leadership" index={9} id="leaders">
 <div className="folderIntro"><p className="eyebrow">Real people. Real growth.</p><h2>Hear from<br/><em>our leaders.</em></h2><p>There are plenty of opportunities to grow: increase production, mentor agents, become an area leader or help develop an entire market.</p></div>
 <JoinLeaders />
</Folder>
</div>
<section className="joinFaq" aria-labelledby="join-faq-heading"><div className="joinFaqInner"><div className="folderIntro"><p className="eyebrow">Let’s talk details</p><h2 id="join-faq-heading">Good questions.<br/><em>A clearer next step.</em></h2><p>Your next move deserves a clear conversation about costs, opportunities and the support behind you.</p></div><div className="joinFaqItems">
 <details><summary>What is the commission split?</summary><p>On self-generated business, the split is <strong>80/20</strong>, moving to <strong>100% after a $15,000 cap</strong>. Company-provided leads have a <strong>75/25 split</strong> and do not count toward the cap.</p></details>
 <details><summary>Is there a transaction fee?</summary><p>There is a <strong>$495 transaction fee</strong>, which may be paid by the client or the agent.</p></details>
 <details><summary>How much does it cost to join, and what is the monthly fee?</summary><p>It costs <strong>$100 to join</strong>, with an <strong>$85 monthly technology fee</strong>.</p></details>
 <details><summary>How does revenue share work?</summary><p>All five levels are available immediately, with no frontline requirements or locked levels. The program offers a flat <strong>10% override at each level</strong>, creating an opportunity for ongoing income as your team grows. Earnings depend on qualifying activity and program terms.</p></details>
 <details><summary>Does ADT Realty offer stock options?</summary><p>Stock options are planned for ADT Realty’s next stage of growth, with a projected rollout within the next 12 months. Joining now offers the opportunity to get involved on the ground floor and help shape a growing brokerage. Program details, eligibility and timing are still being finalized.</p></details>
 <details><summary>Are there other opportunities to grow and earn at ADT Realty?</summary><p>ADT Realty is expanding opportunities beyond real estate sales. ADT Insurance recently launched, with ADT Mortgage and ADT Lending expected to follow. These businesses are intended to create additional income opportunities for eligible agents while giving clients access to more services. Participation details and requirements will vary by program.</p></details>
 <details><summary>Is there a path for my stage of career?</summary><p>Absolutely. We’ll discuss your experience, goals and where you are today to help identify the right career path for you. Whether you’re newly licensed, building consistency or growing an established business, ADT Realty offers training and support to help you take your next step—including opportunities to mentor agents and grow into leadership roles.</p></details>
 </div></div></section>
<section id="conversation" className="conversation"><div className="conversationInner"><div><p className="eyebrow">No pressure. No obligation.</p><h2>Start a confidential conversation.</h2><p>Tell us where you are in your career and what you want to build. We’ll help you determine whether ADT Realty Arizona is the right fit.</p></div><LeadForm type="career"/></div></section>
</main><footer className="joinFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><p>Helping Others · Do the Right Thing Every Time · Build Relationships</p></footer></div>}



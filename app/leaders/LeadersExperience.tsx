"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Answer = { question: string; answer: string };
type Leader = {
  id: string;
  name: string;
  titles: string[];
  headshot: string;
  ad?: string;
  quote?: string;
  status: "complete" | "coming-soon";
  answers: Answer[];
};

const leaders: Leader[] = [
  {
    id: "mike-dingman",
    name: "Mike Dingman",
    titles: ["Chief Marketing Officer", "Arizona State Leader"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/mike-dingman.jpg",
    ad: "https://leaders.adtrealtyaz.com/ads/mike-dingman.png",
    quote: "Leadership is about helping to build something bigger than yourself.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "After 25 years in real estate, the opportunity to help build a growing brokerage from the ground up was exciting." },
      { question: "What has surprised you most about ADT Realty?", answer: "Meeting agents and leaders from across the country and learning from their different experiences, markets and perspectives." },
      { question: "What is your favorite benefit?", answer: "The opportunities for growth. ADT Realty is expanding quickly, and it still feels like we are only at the beginning." },
      { question: "How has your role grown?", answer: "I joined as Arizona State Leader and was later given the opportunity to serve nationally as Chief Marketing Officer." },
      { question: "What does leadership mean to you?", answer: "Leadership is about helping to build something bigger than yourself." },
    ],
  },
  {
    id: "brandi-ott",
    name: "Brandi Ott",
    titles: ["Georgia State Leader"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/brandi-ott.png",
    ad: "https://leaders.adtrealtyaz.com/ads/brandi-ott.png",
    quote: "Leadership means being reliable, influential and available to help every agent become successful.",
    status: "complete",
    answers: [
      { question: "What has surprised you most about ADT Realty?", answer: "The growth—and how many like-minded people are out there." },
      { question: "What is your favorite benefit?", answer: "The training and the camaraderie." },
      { question: "How has your career or role grown?", answer: "I went full-time in my third year, became a top-200 agent in UPSTAR MLS and was named Georgia State Leader after only five years in the business." },
      { question: "What does leadership mean to you?", answer: "Leadership means being reliable, influential and available to help every agent grow and become successful." },
      { question: "What would you tell an agent considering ADT Realty?", answer: "ADT Realty and Mick truly want to see you win. You will receive excellent training if you are willing to show up and use it." },
    ],
  },
  {
    id: "laura-phelps",
    name: "Laura Phelps",
    titles: ["New Mexico State Leader", "Area Leader — South Central, East and North Texas"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/laura-phelps.jpeg",
    ad: "https://leaders.adtrealtyaz.com/ads/laura-phelps.png",
    quote: "Helping others first, learning more in order to give more.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "The plan, our CEO’s determination and the company’s transparency." },
      { question: "What has surprised you most?", answer: "The culture. I have not met one person here I don’t admire. There is so much strength and compassion." },
      { question: "How has your role grown?", answer: "I have taken on more areas in Texas as an Area Leader and became the New Mexico State Leader. My own real estate business gets stronger every day." },
      { question: "What would you tell an agent considering ADT Realty?", answer: "Just do it. If you use the tools, learn new things and take action, you can succeed here." },
      { question: "What do you hope to help build?", answer: "I want to help grow our company and help real estate professionals find a place where they truly feel at home." },
    ],
  },
  {
    id: "lisa-johnson",
    name: "Lisa Johnson",
    titles: ["Senior Vice President of Success", "Washington State Leader"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/lisa-johnson.jpg",
    quote: "When individuals grow, the entire organization becomes stronger.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "I heard Mick explain ADT Realty’s values, mission and commitment to helping agents improve their businesses and their lives. I knew immediately that I wanted to help build this brokerage, so I canceled my other interviews." },
      { question: "What does leadership mean to you?", answer: "Leadership means providing guidance, support, education and accountability—with a genuine desire to help each individual grow and thrive." },
      { question: "What makes ADT Realty different?", answer: "ADT Realty combines the family-like culture of a smaller brokerage with the opportunity, technology and national reach of a large cloud-based brokerage." },
      { question: "What excites you about ADT Realty’s growth?", answer: "I look forward to seeing thousands of ADT Realty agents come together to build relationships, learn and experience the energy of the culture we’ve built." },
      { question: "What do you hope to help build?", answer: "A strong community of real estate professionals who help one another, grow together and become better leaders, business owners and versions of themselves." },
    ],
  },
  {
    id: "sarah-atchison",
    name: "Sarah Atchison",
    titles: ["Chief Growth Officer", "Texas State Leader"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/sarah-atchison.jpg",
    quote: "Leadership isn’t about control; it’s about stewardship—serving, protecting and empowering others.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "I saw a rare opportunity to help build a values-driven company from the ground up with intention and integrity. ADT Realty’s Conservative Christian foundation gave me confidence that faith, ethics and accountability would remain more important than simply chasing numbers." },
      { question: "What has surprised you most about ADT Realty?", answer: "The word ‘family’ is not just something we say—it is how we operate. People at every level support one another, celebrate wins and step in when someone faces a challenge." },
      { question: "How has your role grown?", answer: "I joined as the Texas State Broker and soon stepped into the Chief Growth Officer role. I now also serve as the Louisiana Broker and am pursuing broker licenses in Mississippi, Arkansas and Oklahoma to support ADT Realty’s continued expansion." },
      { question: "What leadership opportunities have you received?", answer: "I have helped shape growth strategies, policies, procedures and our compliance-first approach. I have also been trusted to mentor leaders and agents, influence culture and build systems supporting our long-term vision." },
      { question: "What does leadership mean to you?", answer: "Leadership means being a trusted advisor people can rely on when the waters get rough. It is not about control; it is about stewardship—serving, protecting and empowering others while making ethical decisions aligned with our values." },
    ],
  },
  {
    id: "jessica-gross",
    name: "Jessica Gross",
    titles: ["Operations Manager"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/jessica-gross.png",
    quote: "Good leadership recognizes that everyone has different goals, then provides the support and accountability they need to succeed.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "I joined because of the culture. Having worked with Mick for years, I valued the community he built—one where relationships matter and people genuinely want each other to succeed." },
      { question: "What has surprised you most?", answer: "The opportunity to grow with the company. I’ve taken on new challenges, learned different areas of the business and helped build processes instead of simply stepping into an established role." },
      { question: "How has your role grown?", answer: "I started as an assistant, moved into transaction management and now serve as Operations Manager and Zillow Preferred Manager. Each role has expanded my understanding and responsibility." },
      { question: "What does leadership mean to you?", answer: "Leadership means using empathy and the right tools to help people reach their potential. Everyone’s goals are different, so support and accountability should be personal." },
      { question: "What do you hope to help build?", answer: "I want to build stronger, data-driven systems that identify opportunities, improve agent performance and strengthen our Zillow programs as ADT Realty expands nationally." },
    ],
  },
  {
    id: "jennifer-bradford",
    name: "Jennifer Bradford",
    titles: ["Florida State Leader", "Buffini Certified Trainer"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/jennifer-bradford.png",
    status: "coming-soon",
    answers: [],
  },
  {
    id: "scott-hope",
    name: "Scott Hope",
    titles: ["Missouri State Leader", "Buffini Certified Trainer"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/scott-hope.png",
    quote: "Leadership is a chance to help someone do it better than you did.",
    status: "complete",
    answers: [
      { question: "How does ADT help agents become more successful and productive?", answer: "ADT Realty gives agents a family culture where they can ask questions, practical tools that encourage consistent activity and ongoing training from the CEO and state leadership to help them stay motivated and on track." },
      { question: "What lesson has helped you become a better leader?", answer: "Real estate is always changing, and what worked before may not work today. Staying close to other leaders, remaining willing to learn and accepting failure as part of the process have kept me informed and humble." },
      { question: "What leadership roles have you held at ADT Realty?", answer: "I have served as a broker trainer, team lead, area lead and now Missouri State Leader. ADT Realty gives people who are willing to learn and take action the opportunity to grow a phenomenal business." },
      { question: "What does leadership mean to you?", answer: "Leadership is a chance to help someone do it better than you did. Seeing people earn the success their effort deserves—and become capable of achieving the future they want—is incredibly rewarding." },
    ],
  },
  {
    id: "jim-costa",
    name: "Jim Costa",
    titles: ["California State Leader"],
    headshot: "https://leaders.adtrealtyaz.com/leaders/jim-costa.jpg",
    quote: "The best leadership starts with understanding each agent’s individual goals.",
    status: "complete",
    answers: [
      { question: "Why did you join ADT Realty?", answer: "I joined because of the person Mick is. He listens, stays calm and finds a constructive path forward—even when the answer cannot be yes." },
      { question: "How has your career or role grown?", answer: "I went from wondering whether I was cut out for real estate to becoming a State Leader and department manager while continuing to recruit and sell. The coaching, mentoring and commitment to never quit helped me achieve more than I thought possible." },
      { question: "How does ADT help agents become successful?", answer: "Coaching and mentoring are the key. Agents have live meetings, extensive training in the ADT app and access to one-on-one coaching. ADT provides the support—the agent only has to take action." },
      { question: "What makes ADT Realty different?", answer: "ADT combines strong technology, training and support with a fair commission split and an exceptional downline opportunity. Most companies offer one side of that equation; ADT brings it all together." },
      { question: "What do you hope to help build?", answer: "A coast-to-coast referral network and a brokerage where agents feel supported, challenged and equipped to succeed—without losing the personal relationships and culture that make ADT special." },
    ],
  },
];

export default function LeadersExperience() {
  const lauraIndex = leaders.findIndex((leader) => leader.id === "laura-phelps");
  const brandiIndex = leaders.findIndex((leader) => leader.id === "brandi-ott");
  const scottIndex = leaders.findIndex((leader) => leader.id === "scott-hope");
  const [heroLeader, setHeroLeader] = useState(leaders[lauraIndex]);
  const [activeIndex, setActiveIndex] = useState(brandiIndex);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const swipeStart = useRef<number | null>(null);
  const active = leaders[activeIndex];

  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("leader");
    const requestedIndex = leaders.findIndex((leader) => leader.id === requestedId && leader.status === "complete");
    if (requestedIndex >= 0) {
      setHeroLeader(leaders[requestedIndex]);
      setActiveIndex(requestedId === "brandi-ott" ? scottIndex : brandiIndex);
    }
  }, []);

  const stack = Array.from({ length: 4 }, (_, offset) => leaders[(activeIndex + offset) % leaders.length]);
  function cycle(direction: number) { setActiveIndex((current) => (current + direction + leaders.length) % leaders.length); }
  function endSwipe(x: number) { if (swipeStart.current === null) return; const delta = x - swipeStart.current; if (Math.abs(delta) > 45) cycle(delta < 0 ? 1 : -1); swipeStart.current = null; }
  async function submitPriorityLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "2e8b3ec6-99eb-4489-97f6-90731a2a868f",
          subject: `Priority Lead: Ready to Speak With ADT Realty — ${payload.name}`,
          from_name: "ADT Realty Builds Leaders",
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          state: payload.state,
          licensed: payload.licensed,
          referring_leader: params.get("leader") || "Direct Website Visit",
          source: params.get("utm_source") || "direct",
          campaign: params.get("utm_campaign") || "adt-realty-builds-leaders",
          content: params.get("utm_content") || "Not provided",
          page: window.location.href,
          consent: payload.consent,
          follow_up_note: "Please locate the existing Facebook lead in Lofty, add this request to the profile and prioritize follow-up.",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Submission failed");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }
  const identity = (leader: Leader) => <aside className="profile-identity"><img src={leader.headshot} alt={leader.name} /><div className="identity-copy"><h3>{leader.name}</h3>{leader.titles.map((title) => <p key={title}>{title}</p>)}{leader.quote && <blockquote>“{leader.quote}”</blockquote>}</div></aside>;
  const answers = (leader: Leader) => <div className="profile-answers"><p className="profile-label">In their own words</p>{leader.status === "complete" ? leader.answers.map((item) => <div className="answer" key={item.question}><h4>{item.question}</h4><p>{item.answer}</p></div>) : <div className="coming-soon"><span>Coming soon</span><h4>{leader.name}&apos;s leadership perspective is on the way.</h4><p>Continue through the carousel to meet more of the people building ADT Realty.</p></div>}</div>;

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand-link" aria-label="ADT Realty Builds Leaders home"><img src="https://leaders.adtrealtyaz.com/brand/adt-realty-logo.png" alt="ADT Realty" /></a>
        <nav aria-label="Primary navigation">
          <a href="#leaders">Our leaders</a><a href="#opportunity">Why ADT Realty</a><a href="/leaders/career-guides">Career guides</a><a href="#conversation">Start a conversation</a>
        </nav>
        <a className="header-cta" href="#conversation">Explore the opportunity</a>
      </header>

      <section className="personalized-hero" id="top">
        <div className="hero-layout">
          <div className="hero-message">
            <p className="eyebrow">Real people. Real growth. Real opportunity.</p>
            <h1><span>ADT Realty</span> Builds Leaders</h1>
            <p className="hero-lede">A brokerage should help you build more than transactions. It should help you build a business, a future and the ability to lead.</p>
            <div className="hero-actions"><a className="primary-button" href="#leaders">Meet Our Leaders</a><a className="text-link" href="#conversation">Start a Confidential Conversation <span>›</span></a></div>
            <p className="hero-context">Featuring <strong>{heroLeader.name}</strong></p>
          </div>
          <article className="hero-leader-card">
            <div className="hero-card-identity"><img src={heroLeader.headshot} alt={heroLeader.name} /><div><h2>{heroLeader.name}</h2>{heroLeader.titles.map((title) => <p key={title}>{title}</p>)}{heroLeader.quote && <blockquote>“{heroLeader.quote}”</blockquote>}</div></div>
            <div className="hero-card-answers"><p className="profile-label">In their own words</p>{heroLeader.answers.slice(0,3).map((item) => <div className="answer" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div>
          </article>
        </div>
        <a className="down-link" href="#leaders">Meet more of the people building ADT Realty <span>↓</span></a>
      </section>

      <section className="leaders-section" id="leaders">
        <div className="section-heading">
          <p className="eyebrow">Leadership starts before the title</p>
          <h2>Meet the people building ADT Realty</h2>
          <p>Scroll through our leaders and hear from them in their own words.</p>
        </div>
        <div className="stacked-experience"><div className="stack-column"><div className="card-stack" onTouchStart={(event) => { swipeStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => endSwipe(event.changedTouches[0].clientX)}>{[...stack].reverse().map((leader, reverseIndex) => { const depth = stack.length - 1 - reverseIndex; return <button key={leader.id + depth} className={"stack-card depth-" + depth} style={{ "--depth": depth } as React.CSSProperties} onClick={() => depth === 0 ? cycle(1) : setActiveIndex(leaders.findIndex((item) => item.id === leader.id))}><span className="stack-photo"><img src={leader.headshot} alt="" /></span><span className="stack-copy"><strong>{leader.name}</strong>{leader.titles.map((title) => <small key={title}>{title}</small>)}{leader.quote && <q>{leader.quote}</q>}{leader.status === "coming-soon" && <em>Perspective coming soon</em>}</span></button> })}</div><div className="stack-controls"><button aria-label="Previous leader" onClick={() => cycle(-1)}>←</button><button aria-label="Next leader" onClick={() => cycle(1)}>→</button></div></div><article className="active-perspective">{answers(active)}</article></div>
      </section>

      <section className="opportunity-section" id="opportunity"><div className="section-heading light"><h2>What could you build at ADT Realty?</h2><p>Your next brokerage could also be your next opportunity.</p></div><div className="opportunity-grid"><article><span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 51h44M14 44V32h9v12M28 44V23h9v21M42 44V14h9v30M15 25l12-9 9 4 16-12M45 8h7v7"/></svg></span><h3>Build Your Business</h3><p>Leverage tools, resources and systems that help you grow with confidence.</p></article><article><span><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="18" cy="15" r="5"/><path d="M15 23l-5 13 9 4 5-10 6 5 6-8M19 40l-2 14M21 41l9 12M33 49h20M38 39h15M44 29h9M50 19h3"/></svg></span><h3>Advance Your Career</h3><p>Expand your leadership potential and create new paths for growth.</p></article><article><span><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="23" cy="20" r="7"/><circle cx="43" cy="22" r="6"/><path d="M9 49c1-11 6-17 14-17s13 6 14 17M34 48c1-9 4-14 10-14s10 5 11 14M28 35l8-7"/></svg></span><h3>Mentor Others</h3><p>Share your experience and help the next generation of leaders succeed.</p></article><article><span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 55V9M18 11c12-7 19 7 31 0v22c-12 7-19-7-31 0M10 55h18"/></svg></span><h3>Lead What Comes Next</h3><p>Be part of shaping the future of a people-first brokerage.</p></article></div><a className="light-button" href="#conversation">Explore your opportunity ›</a></section>
      <section className="founder-section" id="ceo">
        <div className="founder-intro">
          <img src="https://leaders.adtrealtyaz.com/leaders/mick-mcmaken.png" alt="Mick McMaken, Founder and CEO of ADT Realty" />
          <div className="founder-copy">
            <p className="eyebrow">Meet our founder &amp; CEO</p>
            <h2>Mick McMaken</h2>
            <p className="founder-title">Founder &amp; Chief Executive Officer</p>
            <p>Mick McMaken founded ADT Realty with a clear vision: create a national brokerage where agents receive the training, technology, leadership and support they need to build successful businesses.</p>
            <p>Under Mick&apos;s leadership, ADT Realty continues to grow without losing the relationships, accountability and people-first culture at the heart of the company.</p>
            <blockquote>“We are building ADT Realty around people, opportunity and doing the right thing. Every time.”</blockquote>
          </div>
        </div>
      </section>
      <section className="conversation-section" id="conversation"><div className="conversation-copy"><p className="eyebrow">No pressure. No obligation.</p><h2>Speak With One of Our Leaders</h2><p>If you would like to learn more about ADT Realty, one of our leaders is ready to have a confidential, no-pressure conversation.</p><p className="priority-note">Your request will receive priority follow-up from one of our ADT Realty leaders.</p></div><form className="conversation-form" onSubmit={submitPriorityLead}><label>Full name<input required name="name" autoComplete="name" placeholder="Your full name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@domain.com" /></label><label>Mobile number<input required type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></label><label>State<input required name="state" autoComplete="address-level1" placeholder="Your state" /></label><label>Are you currently licensed?<select required name="licensed" defaultValue=""><option value="" disabled>Select an option</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pursuing license">Currently pursuing my license</option></select></label><label className="consent"><input required type="checkbox" name="consent" value="Agreed" /><span>I agree to be contacted by ADT Realty by phone, text or email regarding career and brokerage opportunities. Message and data rates may apply. Reply STOP to opt out.</span></label><button disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending…" : "Speak With One of Our Leaders ›"}</button>{formStatus === "success" && <p className="form-result success" role="status">Thank you. Your request has been received, and one of our leaders will contact you soon.</p>}{formStatus === "error" && <p className="form-result error" role="alert">We couldn&apos;t send your request. Please try again or email sheri@adthomes.com.</p>}</form></section>
      <footer className="site-footer"><div className="footer-brand"><img src="https://leaders.adtrealtyaz.com/brand/adt-realty-logo-white.png" alt="ADT Realty" /><strong>ADT Realty <span>Builds Leaders</span></strong></div><div className="core-values"><span>Helping Others</span><span>Do the Right Thing Every Time</span><span>Build Relationships</span></div></footer>
    </main>
  );
}

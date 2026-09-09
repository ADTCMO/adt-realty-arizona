import { LeadForm } from "./components/LeadForm";
import { CareerShowcase } from "./components/CareerShowcase";
import "./seller-section.css";

const stages = [
  { slug: "newly-licensed", title: "Newly Licensed Agent", image: "/career-newly-licensed.jpg", description: "Start your career with a clear plan. Learn how to find leads, build relationships, choose the right mentorship, and establish strong business habits.", cta: "View the Newly Licensed Agent Guide" },
  { slug: "developing-agent", title: "Developing Agent", image: "/career-developing.jpg", description: "Turn activity into consistent production. Build repeatable systems for lead generation, follow-up, database management, marketing, and time management.", cta: "View the Developing Agent Guide" },
  { slug: "productive-agent", title: "Productive Agent", image: "/career-productive.jpg", description: "Build on your success without doing everything yourself. Explore better systems, technology, and support to increase production, protect your time, and improve profitability.", cta: "View the Productive Agent Guide" },
  { slug: "leadership", title: "Leadership", image: "/career-leadership.jpg", description: "Create opportunity beyond your own production. Build a market, mentor agents, develop future leaders, and earn additional income by helping others succeed.", cta: "View the Leadership Guide" },
];

export default function Home() {
  return <>
    <style>{`
      #buyers{position:relative;min-height:500px;display:block;overflow:hidden;background:#fff}
      #buyers .buyerImage{position:absolute;inset:0;background-image:linear-gradient(90deg,#fff 0%,rgba(255,255,255,.98) 25%,rgba(255,255,255,.82) 39%,rgba(255,255,255,.30) 55%,rgba(255,255,255,0) 70%),url('/homebuyer-couple-mobile.png');background-size:cover;background-position:68% center}
      #buyers .splitCopy{position:relative;z-index:2;width:min(50%,650px);min-height:500px;padding:62px 30px 62px max(35px,calc((100vw - 1180px)/2));justify-content:center;background:transparent}
      #buyers .splitCopy>p:not(.eyebrow){max-width:510px}
      @media (max-width:760px){
        #buyers{min-height:535px;display:block;position:relative;background:#fff}
        #buyers .buyerImage{position:absolute;top:0;left:0;right:0;bottom:auto;height:225px;min-height:225px;margin:0;background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 48%,rgba(255,255,255,.18) 62%,rgba(255,255,255,.72) 80%,#fff 100%),url('/homebuyer-couple-mobile.png');background-size:cover;background-position:63% 46%;z-index:1}
        #buyers .splitCopy{position:relative;z-index:2;width:100%;min-height:535px;padding:185px 24px 30px;display:flex;flex-direction:column;justify-content:flex-start;background:transparent}
        #buyers .redRule{margin-bottom:7px}
        #buyers .eyebrow{margin-bottom:6px!important}
        #buyers .splitCopy h2{margin-bottom:10px}
        #buyers .splitCopy>p:not(.eyebrow){margin-top:0;margin-bottom:13px;line-height:1.48}
        #buyers .splitCopy .button{margin-top:0;width:100%}
        #buyers .splitCopy small{margin-top:8px}
        #sellers .compactForm{gap:10px;padding-top:18px;padding-bottom:18px}
        #sellers .compactForm label{margin:0}
        #sellers .compactForm input{height:44px;margin-top:4px;padding:10px 12px}
        #sellers .compactForm .button{height:48px;margin-top:2px}
        #sellers .compactForm small{margin-top:0}
        #sellers .compactForm .formStatus{min-height:0}
      }
    `}</style>
    <header className="siteHeader">
      <a className="brand" href="#home" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#buyers">Buy</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a></nav>
      <a className="button red headerButton" href="#contact">Talk to an Agent <span>›</span></a>
      <details className="mobileMenu"><summary aria-label="Open navigation"><span/><span/><span/></summary><div><a href="#home">Home</a><a href="#buyers">Buy</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a><a href="#contact">Talk to an Agent</a></div></details>
    </header>

    <main>
      <section id="home" className="hero"><div className="heroContent"><h1>ADT REALTY — ARIZONA</h1><p>Local expertise. Modern tools. Relationships that matter.</p><div className="actions"><a className="button red" href="#buyers">Buy a Home <span>›</span></a><a className="button outline" href="#sellers">Sell a Home <span>›</span></a></div></div></section>

      <section id="buyers" className="split buyer"><div className="splitImage buyerImage" role="img" aria-label="A couple outside their new Arizona home" /><div className="splitCopy"><div className="redRule"/><p className="eyebrow">Buying in Arizona</p><h2>Your Path to Homeownership Starts Here</h2><p>Buying a home is exciting. We’ll help you understand your options, prepare for each step, and move forward with confidence.</p><a className="button red" href="https://acebuyer.adtrealtyaz.com">Start My Homebuying Plan <span>›</span></a><small>Powered by the ADT Realty ACE Buyer process.</small></div></section>

      <section id="sellers" className="seller sellerSellerLayout"><div className="sellerVisual" role="img" aria-label="ADT Realty For Sale sign in an Arizona yard"/><div className="sellerForm"><div className="redRule"/><p className="eyebrow light">Selling in Arizona</p><h2>What’s My Home Worth?</h2><p>Get a personalized look at your home’s potential value in today’s Arizona market.</p><LeadForm type="seller" /></div></section>

      <section id="join" className="join"><div className="sectionIntro"><div className="redRule"/><p className="eyebrow">Join ADT Realty</p><h2>Built for Every Stage of Your Real Estate Career</h2><p>ADT Realty combines practical training, modern technology, proven systems, and real support to help you move forward—wherever you are today.</p></div><CareerShowcase stages={stages}/>
        <div className="leadersCallout"><div><p className="eyebrow">Leadership at ADT Realty</p><h2>Want to hear what our leaders say?</h2><p>Meet the people building ADT Realty and hear why they chose to lead here.</p></div><a className="textLink" href="https://leaders.adtrealtyaz.com">Meet Our Leaders <span>›</span></a></div>
      </section>

      <section id="contact" className="contact"><div><div className="redRule"/><p className="eyebrow light">Connect with ADT Realty</p><h2>Let’s Make Your Next Step Clear.</h2><p>Tell us where you are and what you’re working toward. Your inquiry will go directly to Mike Dingman.</p></div><LeadForm type="contact" /></section>
    </main>

    <footer><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><div className="footerValues"><span>Helping Others</span><span>Do the Right Thing Every Time</span><span>Build Relationships</span></div><p>© 2026 ADT Realty · Equal Housing Opportunity</p></footer>
  </>;
}

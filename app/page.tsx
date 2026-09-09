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
      #home.hero{min-height:485px;display:grid;place-items:center;background:linear-gradient(0deg,rgba(0,17,54,.46),rgba(0,17,54,.01) 70%),url('/hero-arizona-bright.png') center 52%/cover no-repeat}
      #home .heroContent{text-align:center;margin-top:70px;padding:30px;max-width:none}
      #home .heroContent h1{font-size:clamp(40px,4.5vw,68px);line-height:normal;letter-spacing:-.04em;text-shadow:0 2px 8px rgba(0,16,47,.72)}
      #home .heroContent p{max-width:none;font-size:clamp(17px,1.5vw,23px);font-weight:700;margin:10px 0 24px;text-shadow:0 2px 6px rgba(0,16,47,.65)}
      #home .actions{justify-content:center;gap:26px}
      #home .actions .button{min-width:230px}
      #home .actions .outline{border-color:#fff;background:rgba(0,19,67,.10)}
      #buyers{position:relative;min-height:430px;display:block;overflow:hidden;background:#fff}
      #buyers .buyerImage{position:absolute;top:0;right:0;bottom:0;left:38%;background-image:linear-gradient(270deg,#fff 0%,rgba(255,255,255,.18) 20%,rgba(255,255,255,0) 42%),url('/homebuyer-couple-mobile.png');background-size:cover;background-position:30% center;transform:scaleX(-1)}
      #buyers .buyerImage:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#fff 0%,rgba(255,255,255,.96) 8%,rgba(255,255,255,.68) 22%,rgba(255,255,255,.16) 40%,rgba(255,255,255,0) 56%)}
      #buyers .splitCopy{position:relative;z-index:2;width:min(52%,650px);min-height:430px;padding:48px 30px 48px clamp(35px,calc((100vw - 1180px)/2),110px);justify-content:center;background:transparent}
      #buyers .splitCopy>p:not(.eyebrow){max-width:510px}
      @media (max-width:760px){
        #home.hero{min-height:370px;height:370px;place-items:center;background:linear-gradient(0deg,rgba(0,17,54,.54),rgba(0,17,54,.04) 72%),url('/hero-arizona-mobile.png') center 58%/cover no-repeat}
        #home .heroContent{text-align:center;margin-top:18px;padding:18px 20px;max-width:none}
        #home .heroContent h1{font-size:34px;line-height:1.02}
        #home .heroContent p{font-size:15px;line-height:1.35;margin:9px 0 16px}
        #home .actions{justify-content:center;gap:8px}
        #home .actions .button{width:100%;min-width:0;min-height:44px;padding:12px 20px}
        #buyers.split.buyer{display:block!important;min-height:0!important;height:auto!important;padding:0!important;position:relative!important;overflow:hidden!important;background:#fff!important}
        #buyers .buyerImage.splitImage{display:block!important;position:relative!important;inset:auto!important;width:100%!important;height:190px!important;min-height:190px!important;margin:0!important;background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,.25) 66%,rgba(255,255,255,.78) 84%,#fff 100%),url('/homebuyer-couple-mobile.png')!important;background-size:cover!important;background-position:37% 46%!important;transform:scaleX(-1)!important;z-index:1!important}
        #buyers .buyerImage:after{display:none!important}
        #buyers .splitCopy{display:flex!important;position:relative!important;width:100%!important;height:auto!important;min-height:0!important;margin:-46px 0 0!important;padding:0 24px 30px!important;z-index:2!important;justify-content:flex-start!important;background:transparent!important}
        #buyers .redRule{margin:0 0 7px!important}
        #buyers .eyebrow{margin:0 0 6px!important}
        #buyers .splitCopy h2{margin:0 0 10px!important}
        #buyers .splitCopy>p:not(.eyebrow){margin:0 0 13px!important;line-height:1.48!important}
        #buyers .splitCopy .button{margin:0!important;width:100%!important}
        #buyers .splitCopy small{margin-top:8px!important}
        #sellers .compactForm{gap:10px;padding-top:18px;padding-bottom:18px}
        #sellers .compactForm label{margin:0}
        #sellers .compactForm input{height:44px;margin-top:4px;padding:10px 12px}
        #sellers .compactForm .button{height:48px;margin-top:2px}
        #sellers .compactForm small{margin-top:0}
        #sellers .compactForm .formStatus{min-height:0}
        #join .careerStackColumn{width:100%!important;max-width:270px!important;margin:0 auto!important}
        #join .careerCardStack{width:100%!important;height:300px!important;min-height:300px!important}
        #join .careerStackCard{width:220px!important;height:300px!important;left:50%!important;transform:translateX(-50%) translateX(calc(var(--depth) * 7px)) scale(calc(1 - var(--depth) * .025))!important;transform-origin:center center!important}
        #join .careerStackCard img{object-fit:contain!important;object-position:center center!important}
        #join .careerControls{margin-top:10px!important}
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

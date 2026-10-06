import { LeadForm } from "./components/LeadForm";
import "./seller-section.css";

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
      }

      #join.joinTeaser{padding:0 0 58px;background:#fff;overflow:hidden}
      .joinTeaserInner{max-width:none;margin:auto}
      .joinTeaserTop{position:relative;min-height:440px;display:flex;align-items:center;isolation:isolate}
      .joinTeaserCopy{position:relative;z-index:2;width:51%;padding:66px 24px 66px max(24px,calc((100vw - 1180px)/2))}
      .joinTeaserCopy h2{font-size:clamp(36px,4.2vw,58px);line-height:1.04;letter-spacing:-.045em;margin:0 0 22px;max-width:590px}
      .joinTeaserCopy h2 span{color:var(--red)}
      .joinTeaserPromise{font-size:clamp(18px,1.8vw,22px);line-height:1.55;color:#536078;max-width:510px;margin:0}
      .joinTeaserPromise strong{color:var(--navy);font-weight:700}
      .joinTeaserArt{position:absolute;inset:0 0 0 25%;z-index:0}
      .joinTeaserArt img{display:block;width:100%;height:100%;object-fit:cover;object-position:70% 38%}
      .joinTeaserArt:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#fff 0%,rgba(255,255,255,.98) 13%,rgba(255,255,255,.7) 29%,rgba(255,255,255,0) 49%),linear-gradient(0deg,#fff 0%,rgba(255,255,255,0) 19%)}
      .joinTeaserHighlights{max-width:1180px;margin-left:auto;margin-right:auto;padding-left:24px;padding-right:24px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:35px;margin-top:12px;padding-top:28px;border-top:1px solid #cfd7e3}
      .joinTeaserHighlight>span{font-size:12px;letter-spacing:.16em;font-weight:800;color:var(--red)}
      .joinTeaserHighlight h3{font-size:21px;line-height:1.2;margin:10px 0}
      .joinTeaserHighlight p{font-size:16px;line-height:1.65;color:#536078;margin:0}
      .joinTeaserAction{margin-top:30px;margin-left:max(24px,calc((100vw - 1132px)/2))}
      .joinTeaserAction:focus-visible{outline:3px solid var(--navy);outline-offset:4px}
      @media(max-width:760px){
        #join.joinTeaser{padding:0 0 42px}
        .joinTeaserTop{display:flex;flex-direction:column;min-height:0}
        .joinTeaserCopy{width:100%;padding:0 24px 12px;order:2;margin-top:-20px}
        .joinTeaserArt:after{background:linear-gradient(0deg,#fff 0%,rgba(255,255,255,.85) 9%,rgba(255,255,255,0) 30%)}
        .joinTeaserArt img{object-position:78% 27%}
        .joinTeaserCopy h2{font-size:38px;margin-bottom:16px}
        .joinTeaserArt{position:relative;inset:auto;width:100%;height:290px;order:1}
        .joinTeaserHighlights{grid-template-columns:1fr;gap:22px;margin-top:26px;padding-top:24px}
        .joinTeaserHighlight{position:relative;padding-left:34px}
        .joinTeaserHighlight>span{position:absolute;left:0;top:4px}
        .joinTeaserHighlight h3{margin:0 0 7px;font-size:20px}
        .joinTeaserAction{width:calc(100% - 48px);margin-left:24px;padding-left:16px;padding-right:16px}
      }
    `}</style>
    <header className="siteHeader">
      <a className="brand" href="#home" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#buyers">Buy</a><a href="/east-valley">East Valley</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a></nav>
      <a className="button red headerButton" href="#contact">Talk to an Agent <span>›</span></a>
      <details className="mobileMenu"><summary aria-label="Open navigation"><span/><span/><span/></summary><div><a href="#home">Home</a><a href="#buyers">Buy</a><a href="/east-valley">East Valley Guide</a><a href="#sellers">Sell</a><a href="https://adtrealtyaz.com/hero">Community Heroes</a><a href="#join">Join ADT</a><a href="#contact">Talk to an Agent</a></div></details>
    </header>

    <main>
      <section id="home" className="hero"><div className="heroContent"><h1>ADT REALTY — ARIZONA</h1><p>Local expertise. Modern tools. Relationships that matter.</p><div className="actions"><a className="button red" href="#buyers">Buy a Home <span>›</span></a><a className="button outline" href="#sellers">Sell a Home <span>›</span></a></div></div></section>

      <section id="buyers" className="split buyer"><div className="splitImage buyerImage" role="img" aria-label="A couple outside their new Arizona home" /><div className="splitCopy"><div className="redRule"/><p className="eyebrow">Buying in Arizona</p><h2>Your Path to Homeownership Starts Here</h2><p>Buying a home is exciting. We’ll help you understand your options, prepare for each step, and move forward with confidence.</p><a className="button red" href="https://acebuyer.adtrealtyaz.com">Start My Homebuying Plan <span>›</span></a><small>Powered by the ADT Realty ACE Buyer process.</small></div></section>

      <section id="sellers" className="seller sellerSellerLayout"><div className="sellerVisual" role="img" aria-label="ADT Realty For Sale sign in an Arizona yard"/><div className="sellerForm"><div className="redRule"/><p className="eyebrow light">Selling in Arizona</p><h2>What’s My Home Worth?</h2><p>Enter your address to see your automated home value estimate and explore your next steps with ACE Seller.</p><LeadForm type="seller" /></div></section>

      <section id="join" className="join joinTeaser" aria-labelledby="joinTeaserTitle">
        <div className="joinTeaserInner">
          <div className="joinTeaserTop">
            <div className="joinTeaserCopy"><div className="redRule"/><p className="eyebrow">Join ADT Realty</p><h2 id="joinTeaserTitle">A Brokerage Built <span>Around You.</span></h2><p className="joinTeaserPromise">You don’t join ADT to work for us.<br/><strong>We go to work for you.</strong></p></div>
            <div className="joinTeaserArt"><img src="/join-agent-keys.webp" alt="A real estate agent offering house keys outside an Arizona home" loading="lazy" width="1672" height="941"/></div>
          </div>
          <div className="joinTeaserHighlights">
            <div className="joinTeaserHighlight"><span aria-hidden="true">01</span><h3>More Opportunity</h3><p>Company-provided leads that create more conversations and opportunities to grow.</p></div>
            <div className="joinTeaserHighlight"><span aria-hidden="true">02</span><h3>Tools That Work for You</h3><p>Your personal website, ACE Buyer and Seller tools, and automated marketing.</p></div>
            <div className="joinTeaserHighlight"><span aria-hidden="true">03</span><h3>Support to Build Your Business</h3><p>Practical training, coaching, and accessible leadership.</p></div>
          </div>
          <a className="button red joinTeaserAction" href="/join">Discover the ADT Advantage <span aria-hidden="true">›</span></a>
        </div>
      </section>

      <section id="contact" className="contact"><div><div className="redRule"/><p className="eyebrow light">Connect with ADT Realty</p><h2>Let’s Talk About Your Next Move.</h2><p>Looking to buy a home, need to sell, or interested in joining the ADT Realty team? Reach out—we’d love to hear about your goals and help you take the next step.</p></div><LeadForm type="contact" /></section>
    </main>

    <footer><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona"/><div className="footerValues"><span>Helping Others</span><span>Do the Right Thing Every Time</span><span>Build Relationships</span></div><p>© 2026 ADT Realty · Equal Housing Opportunity</p></footer>
  </>;
}

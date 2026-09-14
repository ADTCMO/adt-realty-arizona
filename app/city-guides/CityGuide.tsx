import Link from "next/link";
import { LeadForm } from "../components/LeadForm";
import type { CityGuideData } from "./data";

export default function CityGuide({ city }: { city: CityGuideData }) {
  return (
    <main className="chandlerPage">
      <header className="chandlerHeader">
        <Link href="/" aria-label="ADT Realty Arizona home"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></Link>
        <nav><a href="#areas">Areas</a><a href="#real-talk">Real talk</a><a href="#compare">Compare</a></nav>
        <a className="chandlerHeaderCta" href="#ask-agent">Ask a Local Agent</a>
      </header>

      <section className="chandlerHero" style={{ backgroundImage: `url('/images/east-valley/${city.slug}.jpg')` }}>
        <div className="chandlerHeroShade" />
        <div className="chandlerHeroCopy">
          <p className="chandlerKicker">{city.eyebrow}</p><h1>{city.hero}</h1><p>{city.heroText}</p>
          <div className="chandlerHeroActions"><a href="#areas">Explore {city.name} <span>↓</span></a><a className="outline" href={`https://acebuyer.adtrealtyaz.com/?city=${encodeURIComponent(city.name)}`}>See What I Can Afford</a></div>
        </div>
        <div className="chandlerQuick"><span><small>Housing</small>Established to new</span><span><small>Known for</small>{city.knownFor}</span><span><small>Airport</small>{city.airport}</span></div>
      </section>

      <section className="chandlerIntro"><div><p className="chandlerKicker dark">The short version</p><h2>{city.shortTitle}</h2></div><div>{city.shortCopy.map(p=><p key={p}>{p}</p>)}</div></section>

      <section className="chandlerAreas" id="areas"><div className="chandlerSectionHead"><p className="chandlerKicker dark">Choose your version of {city.name}</p><h2>Different areas. Different priorities.</h2></div><div className="chandlerAreaGrid">{city.areas.map((area,index)=><article key={area.name}><span>{String(index+1).padStart(2,"0")}</span><p className="fit">{area.fit}</p><h3>{area.name}</h3><p>{area.detail}</p></article>)}</div></section>

      <section className="chandlerCommunities"><div className="chandlerPhotoBreak downtown" style={{ backgroundImage: `url('/images/east-valley/${city.slug}.jpg')` }}><span>{city.photoLine}</span></div><div className="chandlerCommunityCopy"><p className="chandlerKicker dark">Names buyers will hear</p><h2>Neighborhoods and communities worth recognizing.</h2><div className="chandlerCommunityNames">{city.communityNames.map(name=><span key={name}>{name}</span>)}</div><p>These names are useful starting points—not a ranking. HOA structure, home age, lot position, school assignment and commute can differ even within the same named community.</p></div></section>

      <section className="chandlerEmployers"><div className="chandlerEmployerIntro"><p className="chandlerKicker">The local economy</p><h2>{city.economyTitle}</h2><p>{city.economyCopy}</p></div><div className="chandlerEmployerGrid">{city.employers.map(([name,industry])=><article key={name}><strong>{name}</strong><span>{industry}</span></article>)}</div><p className="chandlerEmployerNote">Employer locations and operations can change. Buyers relocating for work should confirm the reporting location and test the drive from the exact property during their normal commute window.</p></section>

      <section className="chandlerReality" id="real-talk"><div className="chandlerRealityTitle"><p className="chandlerKicker">The honest {city.name} conversation</p><h2>What buyers should know before falling in love with a listing.</h2></div><div className="chandlerRealityGrid">{city.realities.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="chandlerLifestyle"><div><p className="chandlerKicker dark">Life beyond the house</p><h2>{city.lifestyleTitle}</h2></div><div className="chandlerLifestyleCopy">{city.lifestyleCopy.map(p=><p key={p}>{p}</p>)}</div></section>

      <section className="chandlerCompare" id="compare"><div className="chandlerSectionHead"><p className="chandlerKicker dark">{city.name} or somewhere nearby?</p><h2>Compare the tradeoffs.</h2></div><div className="chandlerCompareGrid">{city.comparisons.map(([name,description])=><Link href="/east-valley" key={name}><span>{city.name} vs.</span><h3>{name}</h3><p>{description}</p><b>Compare East Valley cities →</b></Link>)}</div></section>

      <section className="chandlerFaq"><div className="chandlerSectionHead"><p className="chandlerKicker dark">Questions buyers ask</p><h2>{city.name} answers without the sales pitch.</h2></div><div className="chandlerFaqList">{city.faqs.map(item=><details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="chandlerDecision"><div><p className="chandlerKicker">Run the numbers</p><h2>Could {city.name} fit your budget?</h2><p>Price is only the beginning. Estimate how taxes, insurance, down payment, debt and ownership costs may affect your true buying power.</p></div><a href={`https://acebuyer.adtrealtyaz.com/?city=${encodeURIComponent(city.name)}`}>Calculate My {city.name} Buying Power <span>→</span></a></section>

      <section className="chandlerContact" id="ask-agent"><div><p className="chandlerKicker">Local guidance—not a sales pitch</p><h2>Ask an Agent About {city.name}</h2><p>Tell Mike what you are comparing, what matters most and what you want to understand before making a move.</p><small>Your inquiry will be identified as a {city.name} request.</small></div><LeadForm type="contact" market={city.name} /></section>
      <footer className="chandlerFooter"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /><p>Local guidance for {city.name} and Phoenix’s East Valley.</p><span>*Drive times vary by neighborhood and traffic. Verify schools and costs for each property.</span></footer>
    </main>
  );
}

const guides = [
  {
    number: "01",
    title: "Newly Licensed Agent",
    image: "https://leaders.adtrealtyaz.com/guides/new-agent-guide.jpg",
    description: "Start your real estate career with a clear foundation, practical direction and the right support.",
    href: "https://canva.link/newagentguide",
    action: "Open the new agent guide",
  },
  {
    number: "02",
    title: "Developing Agent",
    image: "https://leaders.adtrealtyaz.com/guides/developing-agent-guide.jpg",
    description: "Build consistency, strengthen your skills and turn early activity into a dependable business.",
    href: "https://canva.link/developingagent",
    action: "Open the developing agent guide",
  },
  {
    number: "03",
    title: "Productive Agent",
    image: "https://leaders.adtrealtyaz.com/guides/productive-agent-guide.jpg",
    description: "Create better systems, increase production and build a business that can grow beyond you.",
    href: "https://canva.link/productive-agent",
    action: "Open the productive agent guide",
  },
  {
    number: "04",
    title: "Leadership Path",
    image: "https://leaders.adtrealtyaz.com/guides/leadership-guide.jpg",
    description: "Explore opportunities to mentor agents, build an organization and help lead what comes next.",
    href: "https://canva.link/leadershippath",
    action: "Open the leadership guide",
  },
];

export default function CareerGuidesPage() {
  return (
    <main className="guide-library">
      <header className="site-header guide-header">
        <a href="/leaders" className="brand-link" aria-label="ADT Realty Builds Leaders home">
          <img src="https://leaders.adtrealtyaz.com/brand/adt-realty-logo.png" alt="ADT Realty" />
        </a>
        <a className="guide-back-link" href="/leaders">Meet our leaders</a>
        <a className="header-cta" href="/leaders#conversation">Speak with a leader</a>
      </header>

      <section className="guide-library-intro">
        <p className="eyebrow">Your next step starts here</p>
        <h1>ADT Realty Career Guide Library</h1>
        <p>
          Every real estate career is different. Choose the guide that best reflects where you are today—and where you want to go next.
        </p>
      </section>

      <section className="guide-grid" aria-label="ADT Realty career guides">
        {guides.map((guide) => (
          <article className="guide-card" key={guide.title}>
            <a className="guide-cover-link" href={guide.href} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${guide.title} guide`}>
              <img src={guide.image} alt={`${guide.title} guide cover`} />
            </a>
            <div className="guide-card-copy">
              <span className="guide-number" aria-hidden="true">{guide.number}</span>
              <div>
                <h2>{guide.title}</h2>
                <p>{guide.description}</p>
              </div>
              <a className="guide-action" href={guide.href} target="_blank" rel="noopener noreferrer">
                {guide.action} <span aria-hidden="true">›</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="guide-library-next">
        <div>
          <p className="eyebrow">Not sure which guide fits?</p>
          <h2>Tell us what you want to build next.</h2>
          <p>One of our leaders will help you identify the path and resources that best match your goals.</p>
        </div>
        <a className="primary-button" href="/leaders#conversation">Start a confidential conversation</a>
      </section>

      <footer className="site-footer guide-footer">
        <div className="footer-brand">
          <img src="https://leaders.adtrealtyaz.com/brand/adt-realty-logo-white.png" alt="ADT Realty" />
          <strong>Do the right thing. <span>Every time.</span></strong>
        </div>
        <p>© {new Date().getFullYear()} ADT Realty</p>
      </footer>
    </main>
  );
}

import type { Metadata } from "next";
import "./mike-dingman.css";

export const metadata: Metadata = {
  title: "Mike Dingman | Arizona State Leader & Designated Broker",
  description:
    "Meet Mike Dingman, ADT Realty Arizona State Leader, Designated Broker and Chief Marketing Officer, Army veteran, mentor and Arizona real estate professional since 2001.",
  alternates: { canonical: "/mike-dingman" },
};

const questions = [
  {
    number: "01",
    question: "What would your agents say is your most overused piece of advice?",
    answer:
      "Focus on the activities you can control. Real estate has plenty of ups and downs, and we can’t control interest rates, the market, or whether someone answers the phone. We can control whether we show up, follow up, keep learning, and do the work. Do those things consistently and the results usually take care of themselves.",
  },
  {
    number: "02",
    question: "Which is harder: building a brokerage or fixing your golf swing?",
    answer:
      "Both require more time, patience, and effort than most people realize. Right now, I’m focused on building ADT Realty into something special here in Arizona. The plan is to do that well enough that I’ll eventually have the time to tackle the more frustrating challenge—fixing my golf swing.",
  },
  {
    number: "03",
    question: "What is one thing people are usually surprised to learn about you?",
    answer:
      "People sometimes expect a Designated Broker and State Leader to be overly formal or corporate. I’m actually pretty laid-back. I take the responsibility seriously, but I don’t believe I have to take myself seriously all the time.",
  },
  {
    number: "04",
    question: "What can your golden retrievers get away with that nobody else can?",
    answer:
      "Just about anything. They ignore personal space, interrupt meetings, shed everywhere, and somehow still avoid any consequences. It’s their house—I’m apparently just responsible for the mortgage.",
  },
  {
    number: "05",
    question: "What is one rule you refuse to compromise on?",
    answer:
      "Do the right thing—even when it’s inconvenient and even when nobody is watching. Real estate is built on trust, and once you lose that, no transaction or commission is worth what it costs to get it back.",
  },
];

export default function MikeDingmanPage() {
  return (
    <div className="mikePage">
      <header className="mikeHeader">
        <a className="mikeBrand" href="/" aria-label="ADT Realty Arizona home">
          <img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" />
        </a>
        <nav aria-label="Mike Dingman page navigation">
          <a href="/">Home</a>
          <a href="/#buyers">Buy</a>
          <a href="/#sellers">Sell</a>
          <a href="/hero">Community Heroes</a>
          <a href="/join">Join ADT</a>
        </nav>
        <a className="mikeHeaderCta" href="#connect">Start a Conversation <span>›</span></a>
        <details className="mikeMobileMenu">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <div>
            <a href="/">Home</a><a href="/#buyers">Buy</a><a href="/#sellers">Sell</a>
            <a href="/hero">Community Heroes</a><a href="/join">Join ADT</a><a href="#connect">Start a Conversation</a>
          </div>
        </details>
      </header>

      <main>
        <section className="mikeHero">
          <div className="mikeHeroCopy">
            <p className="mikeEyebrow">Meet Arizona’s State Leader</p>
            <h1>Mike<br />Dingman</h1>
            <p className="mikeRole">Arizona State Leader <span>·</span> Designated Broker <span>·</span> Chief Marketing Officer</p>
            <p className="mikeIntro">A broker, mentor and leader who believes real estate is still a relationship business.</p>
            <a className="mikeButton" href="#story">Get to Know Mike <span>↓</span></a>
          </div>
          <div className="mikeHeroPortrait" role="img" aria-label="Mike Dingman, Arizona State Leader and Designated Broker" />
          <div className="mikeHeroYears"><strong>25+</strong><span>Years in Arizona<br />Real Estate</span></div>
        </section>

        <section id="story" className="mikeStory">
          <div className="mikeSectionLabel"><span>01</span><p>The Journey</p></div>
          <div className="mikeStoryHeadline">
            <h2>From a small brokerage<br />to leading Arizona.</h2>
          </div>
          <div className="mikeStoryBody">
            <p>After earning his marketing degree from the University of South Florida, Mike began his real estate career at a small, independently owned Arizona brokerage. Just three and a half years later, he became the Designated Broker of that same company.</p>
            <p>Throughout his career, Mike has worked in nearly every part of the business—as an agent, broker, trainer, leader and brokerage owner. He spent almost ten years running his own brokerage before joining ADT Realty.</p>
          </div>
          <div className="mikeCareerLine" aria-label="Mike Dingman's professional experience">
            <span>Sales</span><i /><span>Broker</span><i /><span>Trainer</span><i /><span>Broker-Owner</span><i /><span>State Leader</span>
          </div>
        </section>

        <section className="mikeService">
          <div className="mikeServicePhoto">
            <img src="/mike-dingman-army-v2.webp" alt="Mike Dingman during his service in the United States Army" />
          </div>
          <div className="mikeServiceCopy">
            <div className="mikeSectionLabel light"><span>02</span><p>Service &amp; Leadership</p></div>
            <h2>Service shaped the way I lead.</h2>
            <p>Mike’s time in the U.S. Army helped shape a leadership style built on discipline, accountability, teamwork and putting people first.</p>
          </div>
        </section>

        <section className="mikeADT">
          <div className="mikeSectionLabel"><span>03</span><p>Why ADT Realty</p></div>
          <div className="mikeADTGrid">
            <div>
              <h2>The right values.<br />The right fit.</h2>
              <p>Known for his laid-back, approachable leadership style, Mike sees himself as a mentor first. He believes agents grow through honest guidance, practical support and relationships built on trust.</p>
              <p>ADT Realty’s core values closely reflect how Mike has always approached the business—and ultimately why he chose to become part of it.</p>
            </div>
            <div className="mikeValues">
              <div><span>01</span><strong>Helping Others</strong></div>
              <div><span>02</span><strong>Do the Right Thing.<br />Every Time.</strong></div>
              <div><span>03</span><strong>Build Relationships</strong></div>
            </div>
          </div>
        </section>

        <section className="mikeQuestions">
          <div className="mikeQuestionsIntro">
            <div className="mikeCasualPhoto">
              <img src="/mike-dingman-headshot.webp" alt="Mike Dingman" />
              <span>Relaxed. Approachable. Always himself.</span>
            </div>
            <div>
              <p className="mikeEyebrow">A Little Less Formal</p>
              <h2>Five Questions<br />With Mike</h2>
              <p>The title may say State Leader and Designated Broker. The person behind it is a little more laid-back.</p>
            </div>
          </div>
          <div className="mikeQuestionList">
            {questions.map((item, index) => (
              <details key={item.number} open={index === 0}>
                <summary><span>{item.number}</span><strong>{item.question}</strong><i>+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="connect" className="mikeConnect">
          <p className="mikeEyebrow">Let’s Talk</p>
          <h2>Real estate is better<br />when it feels personal.</h2>
          <p>Whether you’re buying, selling or thinking about your next step as an agent, the conversation can start right here.</p>
          <div><a className="mikeButton red" href="mailto:mikedingman@adthomes.com">Start a Conversation <span>›</span></a><a className="mikeTextLink" href="/join">Explore ADT Realty <span>›</span></a></div>
        </section>
      </main>

      <footer className="mikeFooter">
        <img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" />
        <p>© 2026 ADT Realty · Equal Housing Opportunity</p>
      </footer>
    </div>
  );
}

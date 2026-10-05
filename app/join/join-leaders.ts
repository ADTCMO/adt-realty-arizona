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

export const leaders: Leader[] = [
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

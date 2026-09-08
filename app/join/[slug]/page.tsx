import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "../../components/LeadForm";
const guides = {
  "newly-licensed": { title: "Newly Licensed Agent", embed: "https://www.canva.com/design/DAHNmITN8Hg/view?embed", publicUrl: "https://canva.link/newagentguide" },
  "developing-agent": { title: "Developing Agent", embed: "https://www.canva.com/design/DAHNn_aO8GQ/view?embed", publicUrl: "https://www.canva.com/d/TpqX8x9EPfdWv9k" },
  "productive-agent": { title: "Productive Agent", embed: "https://www.canva.com/design/DAHNoq1lq-Y/view?embed", publicUrl: "https://www.canva.com/d/ggyF5J1gTgLIF80" },
  leadership: { title: "Leadership", embed: "https://www.canva.com/design/DAHNhN5B25g/view?embed", publicUrl: "https://www.canva.com/d/1TJ9wvclvHuwMIf" },
} as const;
export function generateStaticParams() { return Object.keys(guides).map(slug => ({ slug })); }
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = guides[slug as keyof typeof guides]; if (!guide) notFound();
  return <main className="guidePage"><header className="guideHeader"><Link href="/#join">‹ Back to career stages</Link><Link href="/"><img src="/adt-realty-arizona-mark.png" alt="ADT Realty Arizona"/></Link></header><section><p className="eyebrow">ADT Realty Career Guide</p><h1>{guide.title}</h1><div className="canvaEmbed"><iframe loading="lazy" src={guide.embed} allowFullScreen title={`${guide.title} guide`} /></div><div className="guideActions"><a className="button red" href="#guide-contact">Start the Conversation <span>›</span></a><p className="embedFallback">Having trouble viewing the guide? <a href={guide.publicUrl} target="_blank" rel="noreferrer">Open it in Canva</a>.</p></div></section><section className="guideLead" id="guide-contact"><div><div className="redRule"/><p className="eyebrow light">Your next step</p><h2>Ready to Build What’s Next?</h2><p>Have a confidential, no-pressure conversation about your goals and whether ADT Realty is the right fit.</p></div><LeadForm type="career" stage={guide.title}/></section></main>;
}

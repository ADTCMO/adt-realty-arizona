import Link from "next/link";
import { notFound } from "next/navigation";

const guides = {
  "newly-licensed": { title: "Newly Licensed Agent", embed: "https://www.canva.com/design/DAHNmITN8Hg/view?embed", publicUrl: "https://canva.link/newagentguide" },
  "developing-agent": { title: "Developing Agent", embed: "https://www.canva.com/design/DAHNn_aO8GQ/view?embed", publicUrl: "https://www.canva.com/d/TpqX8x9EPfdWv9k" },
  "productive-agent": { title: "Productive Agent", embed: "https://www.canva.com/design/DAHNoq1lq-Y/view?embed", publicUrl: "https://www.canva.com/d/ggyF5J1gTgLIF80" },
  leadership: { title: "Leadership", embed: "https://www.canva.com/design/DAHNhN5B25g/view?embed", publicUrl: "https://www.canva.com/d/1TJ9wvclvHuwMIf" },
} as const;

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug as keyof typeof guides];
  if (!guide) notFound();

  return (
    <main className="guidePage">
      <header className="guideHeader">
        <Link href="/#join">‹ Back to career stages</Link>
        <Link href="/"><img src="/adt-realty-arizona-outline.png" alt="ADT Realty Arizona" /></Link>
      </header>
      <section>
        <p className="eyebrow">ADT Realty Career Guide</p>
        <h1>{guide.title}</h1>
        <div className="mobileGuideLaunch">
          <p>View the complete guide in a mobile-friendly presentation.</p>
          <a className="guideOpenButton" href={guide.publicUrl} target="_blank" rel="noreferrer">
            Open {guide.title} Guide
          </a>
        </div>
        <div className="canvaEmbed">
          <iframe loading="lazy" src={guide.embed} allowFullScreen title={guide.title + " guide"} />
        </div>
        <p className="embedFallback">
          Having trouble viewing the guide?{" "}
          <a href={guide.publicUrl} target="_blank" rel="noreferrer">Open the full guide</a>.
        </p>
      </section>
      <style>{".mobileGuideLaunch{display:none}@media(max-width:760px){.guidePage>section:first-of-type{padding:32px 18px 48px}.guidePage h1{font-size:clamp(38px,12vw,54px);line-height:1.02;margin-bottom:24px}.mobileGuideLaunch{display:block;max-width:520px;margin:0 auto;padding:28px 22px;background:#fff;border:1px solid #d8deea;border-radius:12px;box-shadow:0 16px 38px rgba(0,19,67,.14)}.mobileGuideLaunch p{margin:0 0 18px;color:#566178;font-size:17px;line-height:1.5}.guideOpenButton{display:block;padding:16px 20px;background:#b00101;color:#fff!important;border-radius:8px;font-weight:900;text-decoration:none}.canvaEmbed,.embedFallback{display:none}}"}</style>
    </main>
  );
}

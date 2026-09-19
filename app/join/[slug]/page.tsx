import Link from "next/link";
import { notFound } from "next/navigation";
import GuideViewer from "./GuideViewer";

const guides = {
  "newly-licensed": { title: "Newly Licensed Agent", pdfUrl: "/career-guides/newly-licensed-agent-guide.pdf", slideFolder: "/career-guides/newly-licensed-agent", pageCount: 9 },
  "developing-agent": { title: "Developing Agent", pdfUrl: "/career-guides/developing-agent-guide.pdf", slideFolder: "/career-guides/developing-agent", pageCount: 10 },
  "productive-agent": { title: "Productive Agent", pdfUrl: "/career-guides/productive-agent-guide.pdf", slideFolder: "/career-guides/productive-agent", pageCount: 9 },
  leadership: { title: "Leadership", pdfUrl: "/career-guides/leadership-guide.pdf", slideFolder: "/career-guides/leadership", pageCount: 10 },
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
        <GuideViewer title={guide.title} slideFolder={guide.slideFolder} pageCount={guide.pageCount} pdfUrl={guide.pdfUrl} />
      </section>
      <style>{".guidePage>section:first-of-type{padding-bottom:56px}.slideViewer{max-width:1100px;margin:0 auto;background:#061746;border-radius:18px;overflow:hidden;box-shadow:0 22px 60px rgba(0,19,67,.22)}.slideStage{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:11/8.5;background:#02091d}.slideStage img{display:block;width:100%;height:100%;object-fit:contain}.slideCta{position:absolute;left:5.4%;top:68%;width:43.2%;height:10.5%;border-radius:7px;cursor:pointer}.slideCta:focus-visible{outline:4px solid #fff;outline-offset:3px}.slideArrow{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:68px;border:0;border-radius:10px;background:rgba(0,19,67,.78);color:#fff;font-size:48px;line-height:1;cursor:pointer}.slideArrowLeft{left:14px}.slideArrowRight{right:14px}.slideArrow:disabled,.slideControls button:disabled{opacity:.28;cursor:default}.slideControls{display:flex;align-items:center;justify-content:center;gap:14px;padding:14px;background:#061746;color:#fff}.slideControls button,.slideControls a{border:1px solid rgba(255,255,255,.35);border-radius:8px;padding:9px 14px;background:transparent;color:#fff;font:inherit;font-weight:800;text-decoration:none;cursor:pointer}.slideControls span{min-width:54px;text-align:center;font-weight:800}.slideViewer:fullscreen{display:flex;flex-direction:column;justify-content:center;border-radius:0;background:#02091d}.slideViewer:fullscreen .slideStage{max-height:calc(100vh - 64px)}@media(max-width:760px){.guidePage>section:first-of-type{padding:28px 10px 40px}.guidePage h1{font-size:clamp(34px,10vw,48px);line-height:1.03;margin-bottom:20px}.slideViewer{border-radius:10px}.slideArrow{display:none}.slideControls{gap:7px;padding:10px 7px}.slideControls button,.slideControls a{padding:9px 10px;font-size:13px}.slideControls button:first-child,.slideControls button:nth-of-type(2){display:none}}"}</style>
    </main>
  );
}

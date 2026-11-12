import type { PublishedAgent } from '../../lib/published-agent';
import './public-agent.css';

export function AgentFooter({ agent, routingMode = "brokerage" }: { agent: PublishedAgent; routingMode?: "brokerage" | "agent" | "unavailable" }) {
  return <section id="agent-contact" className="agentProfileFooter" aria-labelledby="agent-profile-name"
    data-agent-site-slug={agent.slug} data-agent-publication-version={agent.publication_version} data-agent-leads={routingMode}>
    {agent.profile_photo_url && <img src={agent.profile_photo_url} alt={agent.full_name} width="112" height="112" loading="lazy" referrerPolicy="no-referrer"/>}
    <div><p className="eyebrow">Your ADT Realty Agent</p><h2 id="agent-profile-name">{agent.full_name}</h2>
      <a href={`tel:${agent.phone.replace(/[^+\d]/g,'')}`}>{agent.phone}</a>
      <a href={`mailto:${encodeURIComponent(agent.email).replace(/%40/g, "@")}`}>{agent.email}</a>
    </div>
  </section>;
}

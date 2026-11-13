import type { PublishedAgent } from '../../lib/published-agent';
import './public-agent.css';

export function agentContactLabel(agent?: Pick<PublishedAgent, "full_name"> | null) {
  const firstName = agent?.full_name.trim().split(/\s+/)[0];
  return firstName ? `Talk to ${firstName}` : "Talk to an Agent";
}

export function formatAgentPhone(phone: string) {
  // Format US/NANP numbers for display only; preserve other numbers and extensions.
  if (!/^[+\d\s().-]+$/.test(phone)) return phone;
  const digits = phone.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return national.length === 10
    ? `${national.slice(0, 3)}-${national.slice(3, 6)}-${national.slice(6)}`
    : phone;
}

export function AgentFooter({ agent, routingMode }: { agent: PublishedAgent; routingMode?: "brokerage" | "agent" | "unavailable" }) {
  return <section id="agent-contact" className="agentProfileFooter" aria-labelledby="agent-profile-name"
    data-agent-site-slug={agent.slug} data-agent-publication-version={agent.publication_version} data-agent-leads={routingMode}>
    {agent.profile_photo_url && <img src={agent.profile_photo_url} alt={agent.full_name} width="112" height="112" loading="lazy" referrerPolicy="no-referrer"/>}
    <div><p className="eyebrow">Your ADT Realty Agent</p><h2 id="agent-profile-name">{agent.full_name}</h2>
      <a href={`tel:${agent.phone.replace(/[^+\d]/g,'')}`}>{formatAgentPhone(agent.phone)}</a>
      <a href={`mailto:${encodeURIComponent(agent.email).replace(/%40/g, "@")}`}>{agent.email}</a>
    </div>
  </section>;
}

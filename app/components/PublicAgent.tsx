import type { PublishedAgent } from '../../lib/published-agent';
import './public-agent.css';

export function PendingAgentLead({ type }: { type: 'seller' | 'contact' }) {
  return <div className={type === 'seller' ? 'compactForm agentPending' : 'leadForm agentPending'} data-agent-leads="pending">
    <p><strong>{type === 'seller' ? 'Home-value requests are pending setup.' : 'Online requests are pending setup.'}</strong></p>
    <p>This agent’s buyer, seller, and contact forms are not connected yet. No information is collected or sent here.</p>
    <a className="button red" href="#agent-contact">Contact this agent directly <span>›</span></a>
  </div>;
}
export function AgentFooter({ agent }: { agent: PublishedAgent }) {
  return <section id="agent-contact" className="agentProfileFooter" aria-labelledby="agent-profile-name"
    data-agent-site-slug={agent.slug} data-agent-publication-version={agent.publication_version} data-agent-leads="pending">
    {agent.profile_photo_url && <img src={agent.profile_photo_url} alt={agent.full_name} width="112" height="112" loading="lazy" referrerPolicy="no-referrer"/>}
    <div><p className="eyebrow">Your ADT Realty Agent</p><h2 id="agent-profile-name">{agent.full_name}</h2>
      <a href={`tel:${agent.phone.replace(/[^+\d]/g,'')}`}>{agent.phone}</a>
      <a href={`mailto:${encodeURIComponent(agent.email).replace(/%40/g, "@")}`}>{agent.email}</a>
      <p className="agentProfileNote">Buyer tools and online requests are pending CRM setup. Please call or email directly. General brokerage and area-guide links leave this agent page.</p>
    </div>
  </section>;
}

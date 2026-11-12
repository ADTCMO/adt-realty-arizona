import 'server-only';
import { notFound } from 'next/navigation';
import { getPublishedAgent, isAgentSlug } from './published-agent';
export type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;
export async function pageAgent(searchParams?: PageSearchParams) {
  const params = await searchParams;
  const selected = params?.agentSlug;
  const version = params?.agentPublicationVersion;
  // Old selectors are not silently upgraded to the current publication.
  if (params?.agent !== undefined || params?.agent_version !== undefined) notFound();
  if (selected === undefined && version === undefined) return null;
  if (typeof selected !== 'string' || !isAgentSlug(selected) || typeof version !== 'string') notFound();
  const agent = await getPublishedAgent(selected);
  if (!agent || version !== agent.publication_version) notFound();
  return agent;
}

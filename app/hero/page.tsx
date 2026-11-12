import { pageAgent, type PageSearchParams } from '../../lib/agent-page-context';
import CommunityHeroes from './CommunityHeroes';
export default async function HeroesPage({ searchParams }: { searchParams?: PageSearchParams } = {}) {
  return <CommunityHeroes agent={await pageAgent(searchParams)} />;
}

import { handleAgentConnectionReadiness } from "../../../../../lib/agent-connection";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const response = await handleAgentConnectionReadiness(request);
  if (!response.ok) return response;
  return Response.json({ ...await response.json(), routingReady: false }, { status: response.status, headers: response.headers });
}

import { handleBrokerageIdentity } from "../../../../../lib/agent-connection";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return handleBrokerageIdentity(request, process.env.LOFTY_ASSIGNED_USER_ID || "844769665620463");
}

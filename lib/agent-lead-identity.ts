/** Active-agent Lofty IDs only. Brokerage parsing is intentionally unchanged. */
type LeadRecord = Record<string, unknown>;
function object(value: unknown): value is LeadRecord { return !!value && typeof value === 'object' && !Array.isArray(value); }
function id(value: unknown): string {
  if ((typeof value !== 'string' && typeof value !== 'number') || (typeof value === 'number' && (!Number.isSafeInteger(value) || value <= 0))) throw new Error('Invalid lead identity');
  const normalized = String(value);
  if (!/^[1-9]\d{0,29}$/.test(normalized)) throw new Error('Invalid lead identity');
  return normalized;
}
function recordId(value: LeadRecord): string | undefined {
  const aliases = ['leadId','id'].filter(key => Object.prototype.hasOwnProperty.call(value,key)).map(key => id(value[key]));
  if (aliases.some(value => value !== aliases[0])) throw new Error('Conflicting lead identity');
  return aliases[0];
}
/** Only known single-lead envelopes are considered; contradictory aliases cannot pick another contact. */
export function agentCreatedLeadId(value: unknown): string | undefined {
  if (!object(value)) throw new Error('Unrecognized lead response');
  const records: LeadRecord[] = [];
  function visit(current: unknown, depth: number) {
    if (!object(current) || depth > 2) throw new Error('Unrecognized lead response');
    records.push(current);
    for (const field of ['lead','data']) {
      const child = current[field];
      if (child === undefined || child === null) continue;
      if (Array.isArray(child)) {
        if (field !== 'data' || child.length > 1) throw new Error('Ambiguous lead response');
        for (const item of child) visit(item,depth+1);
      } else visit(child,depth+1);
    }
    if (current.leads !== undefined) {
      if (!Array.isArray(current.leads) || current.leads.length > 1) throw new Error('Ambiguous lead response');
      for (const item of current.leads) visit(item,depth+1);
    }
  }
  visit(value,0);
  const ids = records.map(recordId).filter((value): value is string => value !== undefined);
  if (ids.some(value => value !== ids[0])) throw new Error('Conflicting lead identity');
  return ids[0];
}
export function agentSearchLead(value: unknown): {id: string; record: LeadRecord} | null {
  if (!object(value)) throw new Error('Unrecognized lead search response');
  const data = value.data;
  const arrays = [value.leads,object(data) ? data.leads : undefined,Array.isArray(data) ? data : undefined].filter(value => value !== undefined);
  if (arrays.length !== 1 || !Array.isArray(arrays[0]) || arrays[0].length > 1) throw new Error('Unrecognized lead search response');
  const record = arrays[0][0];
  if (record === undefined) return null;
  if (!object(record)) throw new Error('Unrecognized lead search response');
  const selected = recordId(record);
  if (!selected) throw new Error('Lead identity missing');
  return {id:selected,record};
}
export function agentDetailLead(value: unknown): {id: string; record: LeadRecord} {
  if (!object(value)) throw new Error('Unrecognized lead detail response');
  const data = object(value.data) ? value.data : null;
  const record = value.lead ?? data?.lead ?? data ?? value;
  if (!object(record)) throw new Error('Unrecognized lead detail response');
  const selected = recordId(record);
  if (!selected || selected !== agentCreatedLeadId(value)) throw new Error('Conflicting lead identity');
  return {id:selected,record};
}

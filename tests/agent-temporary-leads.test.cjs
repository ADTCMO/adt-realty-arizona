const test = require('node:test');
const assert = require('node:assert/strict');
const { loader } = require('./load-ts.cjs');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');

const profile = { slug: 'testagent', full_name: 'Published Agent', email: 'agent@example.test', phone: '(480) 555-0100', profile_photo_url: null, publication_version: '12345678-1234-4321-8123-123456789abc' };
const endpoint = 'https://www.adtrealtyaz.com/api/leads';
const publicRpc = 'https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_public_site';
const originalOwner = process.env.LOFTY_ASSIGNED_USER_ID;
process.env.LOFTY_ASSIGNED_USER_ID = 'mock-mike-owner';
const route = loader()('app/api/leads/route.ts');
if (originalOwner === undefined) delete process.env.LOFTY_ASSIGNED_USER_ID; else process.env.LOFTY_ASSIGNED_USER_ID = originalOwner;

function request(fields = {}, referrer = 'https://www.adtrealtyaz.com/testagent', extras = []) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: 'Example Visitor', email: 'visitor@example.test', leadType: 'Talk to an agent', message: 'Mocked transport only', agentSlug: 'testagent', agentPublicationVersion: profile.publication_version, ...fields })) {
    if (value !== null && !(key === 'agentPublicationVersion' && fields.agentSlug === null)) form.set(key, value);
  }
  for (const [key, value] of extras) form.append(key, value);
  return new Request(endpoint, { method: 'POST', body: form, headers: referrer === null ? {} : { referer: referrer } });
}
async function mocked(callback, responses = []) {
  const before = { fetch: global.fetch, key: process.env.LOFTY_API_KEY, anon: process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY, environment: process.env.VERCEL_ENV };
  const calls = [];
  global.fetch = async (url, options) => {
    // Legacy brokerage transport assertions omit the new registry lookup, whose
    // allow/deny and credential-isolation contract is exercised in generic tests.
    if (url.endsWith('/functions/v1/agent-connections')) return Response.json({schemaVersion:1,slug:'testagent',publicationVersion:profile.publication_version,mode:'brokerage'});
    calls.push({ url, options });
    const next = responses.shift();
    if (next instanceof Error) throw next;
    if (!next) throw Error('Unmocked transport is prohibited');
    return next;
  };
  process.env.VERCEL_ENV = 'production';
  process.env.LOFTY_API_KEY = 'mock-main-key';
  process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY = 'mock-public-anon-key';
  try { return await callback(calls); }
  finally {
    global.fetch = before.fetch;
    for (const [name, value] of [['VERCEL_ENV', before.environment], ['LOFTY_API_KEY', before.key], ['AGENT_PUBLIC_SUPABASE_ANON_KEY', before.anon]]) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
}
const json = Response.json;
function freshSuccess(profileValue = profile) {
  return [json(profileValue), json({leads: []}), json({id: 'mock-new-lead'}), json({ok: true}), json({ok: true})];
}
function body(call) { return JSON.parse(call.options.body); }

test('agent contact validates publication, creates lead with main credentials/owner and canonical attribution', () => mocked(async calls => {
  const response = await route.POST(request({
    agentName: 'FAKE_AGENT', source: 'FAKE_SOURCE', referrer: 'https://evil.example/FAKE_REFERRER',
    assignedUserId: 'FAKE_OWNER', ownershipId: 'FAKE_OWNER', apiKey: 'FAKE_KEY', destination: 'https://evil.example/STEAL',
  }, 'https://www.adtrealtyaz.com/testagent?private=SECRET_QUERY#SECRET_FRAGMENT'));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {ok: true, recipientName:'Mike Dingman'});
  assert.equal(calls.length, 5);
  assert.equal(calls[0].url, publicRpc);
  assert.deepEqual(body(calls[0]), {p_slug: 'testagent'});
  assert.equal(calls[0].options.cache, 'no-store');
  assert.equal(calls[0].options.redirect, 'error');
  for (const call of calls.slice(1)) {
    assert.ok(call.url.startsWith('https://api.lofty.com/v1.0/'));
    assert.equal(call.options.headers.Authorization, 'token mock-main-key');
  }
  const created = body(calls[2]);
  assert.equal(created.assignedUserId, 'mock-mike-owner');
  assert.equal(created.ownershipId, 'mock-mike-owner');
  assert.equal(created.ownershipScope, 'PERSONAL');
  assert.equal(created.source, 'adtrealtyaz.com/testagent');
  assert.equal(created.welcomeEmail, false);
  const note = body(calls[3]);
  assert.equal(note.leadId, 'mock-new-lead');
  for (const text of ['Agent slug: testagent', 'Agent name: Published Agent', 'Agent page: https://www.adtrealtyaz.com/testagent', 'Referrer: https://www.adtrealtyaz.com/testagent', 'Routing: Mike Dingman / main brokerage integration (temporary)']) assert.ok(note.content.includes(text));
  assert.equal(note.content, created.content);
  assert.doesNotMatch(note.content, /FAKE_|SECRET_|STEAL/);
  assert.equal(body(calls[4]).leadId, 'mock-new-lead');
}, freshSuccess()));

test('existing contact is updated using main owner and receives attribution note without overwrite of original lead source', () => mocked(async calls => {
  const response = await route.POST(request({}, null));
  assert.equal(response.status, 200);
  assert.equal(calls[2].options.method, 'PUT');
  assert.equal(body(calls[2]).assignedUserId, 'mock-mike-owner');
  assert.equal(body(calls[2]).source, undefined);
  assert.ok(body(calls[3]).content.includes('Referrer: not available'));
  assert.ok(body(calls[3]).content.includes('Agent name: Published Agent'));
}, [json(profile), json({leads: [{id: 'mock-existing'}]}), json({ok: true}), json({ok: true}), json({ok: true})]));

test('alternate response envelopes and create without ID retain existing fallback lookup', () => mocked(async calls => {
  assert.equal((await route.POST(request())).status, 200);
  assert.equal(calls.length, 6);
  assert.equal(body(calls[4]).leadId, 'fallback-lead');
}, [json(profile), json({data: []}), json({ok: true}), json({data: {leads: [{id: 'fallback-lead'}]}}), json({ok: true}), json({ok: true})]));

test('malformed data, invalid slugs and honeypot fail before network', () => mocked(async calls => {
  assert.equal((await route.POST(request({website: 'bot'}))).status, 200);
  for (const fields of [{agentSlug: ''}, {agentSlug: 'not-valid'}, {agentSlug: 'api'}, {agentSlug: '../admin'}, {agentSlug: 'x'.repeat(51)}, {agentSlug: new Blob(['bad'])}, {name: ''}, {email: 'bad'}, {leadType: 'Join ADT Realty', careerStage: 'Leadership'}, {leadType: 'FAKE_TYPE'}]) {
    assert.equal((await route.POST(request(fields))).status, 400);
  }
  assert.equal((await route.POST(request({}, null, [['agentSlug', 'another']]))).status, 400);
  assert.equal((await route.POST(request({}, null, [['leadType', 'Talk to an agent']]))).status, 400);
  assert.equal((await route.POST(new Request(endpoint, {method: 'POST', body: 'not-form-data'}))).status, 400);
  assert.equal(calls.length, 0);
}));

test('mismatching, credentialed, malformed and overlong referrers cannot assert agent attribution', () => mocked(async calls => {
  for (const ref of ['not a URL', 'https://evil.example/testagent', 'http://www.adtrealtyaz.com/testagent', 'https://www.adtrealtyaz.com/another', 'https://www.adtrealtyaz.com/?private=bad', 'https://www.adtrealtyaz.com/#bad', 'https://www.adtrealtyaz.com/testagent/extra', 'https://user:pass@www.adtrealtyaz.com/testagent', 'https://www.adtrealtyaz.com/testagent?' + 'a'.repeat(2048)]) {
    assert.equal((await route.POST(request({}, ref))).status, 400, ref.slice(0,80));
  }
  assert.equal(calls.length, 0);
}));

test('root-domain referrer and trailing slash are canonicalized without query leakage', () => mocked(async calls => {
  assert.equal((await route.POST(request({}, 'https://adtrealtyaz.com/testagent/?email=SECRET'))).status, 200);
  assert.ok(body(calls[3]).content.includes('Referrer: https://adtrealtyaz.com/testagent'));
  assert.doesNotMatch(body(calls[3]).content, /SECRET/);
}, freshSuccess()));

test('trusted origin-only privacy referrers allow delivery without claiming the page referrer', async () => {
  for (const referrer of ['https://www.adtrealtyaz.com', 'https://www.adtrealtyaz.com/', 'https://adtrealtyaz.com/']) await mocked(async calls => {
    assert.equal((await route.POST(request({}, referrer))).status, 200);
    const note = body(calls[3]).content;
    assert.ok(note.includes('Referrer: not available'));
    assert.ok(note.includes('Agent slug: testagent'));
    assert.ok(note.includes('Agent page: https://www.adtrealtyaz.com/testagent'));
  }, freshSuccess());
});

test('missing keys never use fallback destinations or return false success', async () => {
  for (const name of ['LOFTY_API_KEY', 'AGENT_PUBLIC_SUPABASE_ANON_KEY']) await mocked(async calls => {
    delete process.env[name];
    assert.equal((await route.POST(request())).status, 503);
    assert.equal(calls.length, name === 'LOFTY_API_KEY' ? 1 : 0);
  }, [json(profile)]);
});

test('unpublished, mismatched, invalid or unavailable public record never reaches CRM', async () => {
  for (const response of [json(null), json({}), json({...profile, slug: 'another'}), json({...profile, full_name: 'x'.repeat(161)}), new Response('bad json'), new Response('', {status: 403}), new Error('Timeout')]) {
    await mocked(async calls => {
      assert.equal((await route.POST(request())).status, 503);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, publicRpc);
    }, [response]);
  }
});

test('CRM failure at lookup/create/note/task stages never reports success or leaks upstream details', async () => {
  for (let failure = 1; failure <= 4; failure++) {
    const responses = freshSuccess();
    responses[failure] = new Response('PRIVATE_UPSTREAM_DETAIL', {status: 503});
    await mocked(async calls => {
      const response = await route.POST(request());
      assert.equal(response.status, 502);
      assert.deepEqual(await response.json(), {error: 'Lead delivery failed. Please try again.'});
      assert.equal(calls.length, failure + 1);
    }, responses);
  }
});

test('agent note is bounded and keeps canonical attribution ahead of visitor content', () => mocked(async calls => {
  assert.equal((await route.POST(request({name: 'Visitor\nFake: name', message: 'Hello\nFake metadata\t' + 'x'.repeat(10000)}))).status, 200);
  const note = body(calls[3]).content;
  assert.ok(note.length <= 2000);
  assert.ok(note.includes('Agent slug: testagent'));
  assert.ok(note.includes('Agent name: Published Agent injected display name'));
  assert.doesNotMatch(note, /\nFake:|\nFake metadata|\nInjected/);
}, freshSuccess({...profile, full_name: 'Published Agent\ninjected display name'})));

test('ordinary homepage/career leads keep existing routing and require no publication lookup', async () => {
  for (const fields of [{}, {leadType: 'Join ADT Realty', careerStage: 'Leadership'}, {leadType: 'Talk to an agent — Chandler', market: 'Chandler'}]) await mocked(async calls => {
    assert.equal((await route.POST(request({agentSlug: null, ...fields}, null))).status, 200);
    assert.equal(calls.length, 4);
    assert.ok(calls.every(call => call.url.startsWith('https://api.lofty.com/')));
    assert.equal(body(calls[1]).source, 'adtrealtyaz.com');
    assert.equal(body(calls[1]).assignedUserId, 'mock-mike-owner');
    assert.match(body(calls[2]).content, /ADT REALTY ARIZONA — WEBSITE INQUIRY/);
    assert.doesNotMatch(body(calls[2]).content, /Agent slug:|Routing:/);
  }, [json({leads: []}), json({id: 'main-lead'}), json({ok: true}), json({ok: true})]);
});

test('untrusted routing fields cannot masquerade as attribution on an ordinary form', () => mocked(async calls => {
  assert.equal((await route.POST(request({agentSlug: null, agentName: 'FAKE_AGENT', agentPage: 'FAKE_PAGE', agentReferrer: 'FAKE_REF', source: 'FAKE_SOURCE', referrer: 'FAKE_REF', assignedUserId: 'FAKE_OWNER', ownershipId: 'FAKE_OWNER', ownershipScope: 'FAKE_SCOPE', apiKey: 'FAKE_KEY', LOFTY_API_KEY: 'FAKE_KEY', destination: 'FAKE_DEST'}, null))).status, 200);
  assert.doesNotMatch(body(calls[2]).content, /FAKE_/);
  assert.equal(body(calls[1]).source, 'adtrealtyaz.com');
  assert.equal(body(calls[1]).assignedUserId, 'mock-mike-owner');
}, [json({leads: []}), json({id: 'main-lead'}), json({ok: true}), json({ok: true})]));

function loadForm(react) {
  const file = path.resolve('app/components/LeadForm.tsx');
  const m = {exports: {}};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {fileName: file, compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(code, {module: m, exports: m.exports, FormData: class {}, fetch: (...args) => global.fetch(...args), require: n => n === 'react' ? react : require(n)});
  return m.exports.LeadForm;
}
function find(node, predicate) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) { for (const item of node) { const found = find(item, predicate); if (found) return found; } return null; }
  return predicate(node) ? node : find(node.props?.children, predicate);
}
test('client contact form locks same-tick submits, retains fields after failure, allows retry and confirms Mike after success', async () => {
  let index = 0;
  const hooks = [];
  const react = {...React, useState(value) { const i=index++; if (!(i in hooks)) hooks[i]=value; return [hooks[i], next => hooks[i]=next]; }, useRef(value) {const i=index++; if (!(i in hooks)) hooks[i]={current: value}; return hooks[i];}};
  const Form = loadForm(react);
  const tree = () => {index=0; return Form({type: 'contact', agentSlug: 'testagent'});};
  assert.equal(find(tree(), n => n.props?.name === 'agentSlug').props.value, 'testagent');
  const before = global.fetch;
  let calls = 0, finish, resets = 0;
  global.fetch = (url, options) => { calls++; assert.equal(url, '/api/leads'); assert.equal(options.method, 'POST'); return new Promise(resolve => finish=resolve); };
  const event = {preventDefault() {}, currentTarget: {reset() {resets++;}}};
  try {
    let handler = tree().props.onSubmit;
    const first = handler(event); await handler(event);
    assert.equal(calls, 1);
    assert.equal(find(tree(), n => n.type === 'button').props.disabled, true);
    finish(new Response('', {status: 503})); await first;
    assert.equal(resets, 0);
    assert.equal(find(tree(), n => n.type === 'button').props.disabled, false);
    assert.match(find(tree(), n => n.props?.role === 'status').props.children, /couldn’t send/);
    handler = tree().props.onSubmit;
    const retry = handler(event); assert.equal(calls, 2);
    finish(json({ok: true})); await retry;
    assert.equal(resets, 1);
    assert.match(find(tree(), n => n.props?.role === 'status').props.children, /Mike will be in touch/);
  } finally {global.fetch=before;}
});

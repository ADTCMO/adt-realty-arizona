const test=require('node:test'),assert=require('node:assert/strict');
const {loader}=require('./load-ts.cjs');const load=loader(),api=load('lib/agent-connection.ts'),route=load('app/api/leads/route.ts'),property=load('app/api/property-inquiry/route.ts');
const PUB='https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_public_site';
const BROKER='https://lklgtilyptasjdxqfsij.supabase.co/functions/v1/agent-connections';
const version='12345678-1234-4321-8123-123456789abc';
const profile={slug:'sampleagent',full_name:'Example Agent',email:'public@example.test',phone:'(480) 555-0100',profile_photo_url:null,publication_version:version};
const active={schemaVersion:1,mode:'agent',slug:profile.slug,publicationVersion:version,ownerId:'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',connectionVersion:'bbbbbbbb-cccc-4ddd-8eee-ffffffffffff',apiKey:'mock-agent-key',loftyUserId:'101',loftyEmail:'agent@example.test'};
const fallback={schemaVersion:1,mode:'brokerage',slug:profile.slug,publicationVersion:version};
const context={agentSlug:profile.slug,agentPublicationVersion:version};const json=Response.json;const body=call=>JSON.parse(call.options.body);
const defaults={VERCEL_ENV:'production',LOFTY_API_KEY:'mock-mike-key',AGENT_PUBLIC_SUPABASE_ANON_KEY:'mock-public-key',TEST_OIDC_TOKEN:'mock.workload.jwt'};
async function mocked(fn,responses=[],env={}){const old={fetch:global.fetch,env:Object.fromEntries(Object.keys(defaults).map(k=>[k,process.env[k]]))};const calls=[];for(const[k,v]of Object.entries({...defaults,...env}))if(v===null)delete process.env[k];else process.env[k]=v;global.fetch=async(url,options)=>{const call={url,options};calls.push(call);const next=typeof responses==='function'?await responses(call,calls):responses.shift();if(next instanceof Error)throw next;if(!next)throw Error('Unmocked transport prohibited');return next;};try{return await fn(calls);}finally{global.fetch=old.fetch;for(const[k,v]of Object.entries(old.env))if(v===undefined)delete process.env[k];else process.env[k]=v;}}
function request(fields={},ref='https://www.adtrealtyaz.com/sampleagent',url='https://www.adtrealtyaz.com/api/leads',headers={}){const form=new FormData();for(const[k,v]of Object.entries({name:'Example Visitor',email:'visitor@example.test',leadType:'Talk to an agent',message:'Mock only',...context,...fields}))if(v!==null)form.append(k,v);return new Request(url,{method:'POST',body:form,headers:{...(ref?{referer:ref}:{}),...headers}});}
function success(){return[json(profile),json(active),json({leads:[]}),json({id:'1101'}),json({id:'1101',assignedUserId:'101',ownershipId:'101',ownershipScope:'PERSONAL'}),json({ok:true}),json({ok:true})];}

test('any published agent resolves paired key/owner and reads created owner before notes/tasks',()=>mocked(async calls=>{const response=await route.POST(request());assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true,recipientName:'Example Agent'});assert.equal(calls.length,7);assert.equal(calls[1].url,BROKER);assert.deepEqual(body(calls[1]),{op:'server.resolve',slug:profile.slug,publicationVersion:version});assert.equal(calls[1].options.headers.Authorization,'Bearer mock.workload.jwt');for(const call of calls.slice(2)){assert.equal(call.options.headers.Authorization,'token mock-agent-key');assert.equal(call.options.redirect,'error');assert.equal(call.options.cache,'no-store');}assert.equal(body(calls[3]).assignedUserId,'101');assert.equal(body(calls[3]).ownershipId,'101');assert.equal(body(calls[3]).welcomeEmail,false);assert.equal(calls[4].url,'https://api.lofty.com/v1.0/leads/1101');assert.match(body(calls[5]).content,/Example Agent \/ verified agent integration/);},success()));

test('new arbitrary agent needs no constants or code edits',()=>mocked(async calls=>{const p={...profile,slug:'futureagent',full_name:'Future Agent'},a={...active,slug:p.slug,loftyUserId:'303',apiKey:'mock-future-key'};const response=await route.POST(request({agentSlug:p.slug},'https://www.adtrealtyaz.com/futureagent'));assert.equal(response.status,200);assert.equal((await response.json()).recipientName,'Future Agent');assert.equal(body(calls[3]).assignedUserId,'303');assert.ok(calls.slice(2).every(c=>c.options.headers.Authorization==='token mock-future-key'));},[json({...profile,slug:'futureagent',full_name:'Future Agent'}),json({...active,slug:'futureagent',loftyUserId:'303',apiKey:'mock-future-key'}),json({leads:[]}),json({id:'1303'}),json({id:'1303',assignedUserId:'303'}),json({ok:true}),json({ok:true})]));

test('positive brokerage response alone permits Mike fallback and truthful receipt',()=>mocked(async calls=>{const response=await route.POST(request());assert.equal(response.status,200);assert.equal((await response.json()).recipientName,'Mike Dingman');assert.ok(calls.slice(2).every(c=>c.options.headers.Authorization==='token mock-mike-key'));assert.match(body(calls[4]).content,/Mike Dingman/);},[json(profile),json(fallback),json({leads:[]}),json({id:'2201'}),json({ok:true}),json({ok:true})]));

test('broker failure, suspended status, unknown/stale page, invalid schema never fall back to Mike',async()=>{for(const value of [new Error('PRIVATE'),new Response('PRIVATE',{status:503}),new Response('',{status:404}),new Response('',{status:409}),json({...fallback,mode:'unavailable'}),json({...fallback,apiKey:'SHOULD_NOT_EXIST'}),json({...active,slug:'someoneelse'}),json({...active,publicationVersion:active.connectionVersion}),json({mode:'brokerage'}),json(null)])await mocked(async calls=>{const r=await route.POST(request());assert.ok([404,409,503].includes(r.status));assert.equal(calls.length,2);assert.doesNotMatch(await r.text(),/PRIVATE|mock-agent-key|SHOULD_NOT_EXIST/);},[json(profile),value]);});

test('partial old forms and conflicting/duplicate selectors fail reload-required before network',()=>mocked(async calls=>{const cases=[request({agentPublicationVersion:null}),request({agentSlug:null}),request({agentPublicationVersion:'bad'}),request({},null,undefined,{'x-ace-agent':'anotheragent'}),request({},null,'https://www.adtrealtyaz.com/api/leads?agentSlug=sampleagent&agentSlug=sampleagent'),request({},null,undefined,{'x-ace-agent-version':active.connectionVersion}),request({agentSlug:null,agentPublicationVersion:null},'https://www.adtrealtyaz.com/sampleagent'),request({},'https://www.adtrealtyaz.com/join?agentSlug=anotheragent')];for(const req of cases)assert.equal((await route.POST(req)).status,400);assert.equal(calls.length,0);}));

test('current publication mismatch rejects stale form before resolving registry',()=>mocked(async calls=>{assert.equal((await route.POST(request({agentPublicationVersion:active.connectionVersion}))).status,409);assert.equal(calls.length,1);},[json(profile)]));

test('unpublished or malformed profile never reaches broker or CRM',async()=>{for(const p of [null,{}, {...profile,slug:'someoneelse'}])await mocked(async calls=>{assert.equal((await route.POST(request())).status,503);assert.equal(calls.length,1);},[json(p)]);});

test('missing Mike key does not block active agent; missing OIDC/public config or nonproduction cannot borrow Mike',async()=>{await mocked(async()=>assert.equal((await route.POST(request())).status,200),success(),{LOFTY_API_KEY:null});for(const env of [{VERCEL_ENV:'preview'},{TEST_OIDC_TOKEN:'bad'},{AGENT_PUBLIC_SUPABASE_ANON_KEY:null}])await mocked(async calls=>{assert.equal((await route.POST(request())).status,503);assert.ok(calls.length<=1);},[json(profile)],env);});

test('absent/origin-only privacy referrer works; query and fragment never reach CRM',async()=>{for(const ref of [null,'https://www.adtrealtyaz.com/',`https://www.adtrealtyaz.com/sampleagent?agentSlug=sampleagent&agentPublicationVersion=${version}&private=PRIVATE#SECRET`])await mocked(async calls=>{assert.equal((await route.POST(request({},ref))).status,200);assert.doesNotMatch(body(calls[5]).content,/PRIVATE|SECRET/);},success());});

test('wrong/missing/conflicting owner or team scope never causes update, note or task',async()=>{for(const lead of [{id:'1102',assignedUserId:'202'},{id:'1102'},{id:'1102',assignedUserId:'101',ownershipId:'202'},{id:'1102',assignedUserId:'101',ownershipScope:'TEAM'}])await mocked(async calls=>{const r=await route.POST(request());assert.equal(r.status,409);assert.equal((await r.json()).deliveryState,'not_sent');assert.equal(calls.length,3);},[json(profile),json(active),json({leads:[lead]})]);});

test('same-owner contact gets tags only and never source/assignment update',()=>mocked(async calls=>{assert.equal((await route.POST(request())).status,200);assert.deepEqual(body(calls[3]),{tagsAdd:['ADT Arizona Website','Talk to an agent']});},[json(profile),json(active),json({leads:[{id:'1102',assignedUserId:'101'}]}),json({ok:true}),json({ok:true}),json({ok:true})]));

test('created/deduplicated or recovered other-owner contact stops with uncertainty',async()=>{for(const created of [{id:'1103'},{ok:true}])await mocked(async calls=>{const r=await route.POST(request());assert.equal(r.status,502);const data=await r.json();assert.equal(data.deliveryState,'unknown');assert.doesNotMatch(data.error,/Nothing was sent/);assert.equal(calls.length,5);},[json(profile),json(active),json({leads:[]}),json(created),json(created.id?{id:'1103',assignedUserId:'202'}:{leads:[{id:'1103',assignedUserId:'202'}]})]);});

test('HTTP200 application errors and invalid search envelope never create leads',async()=>{for(const v of [{errorCode:401},{error_code:'denied'},{data:{errorCode:500,leads:[]}},{error:'PRIVATE',leads:[]},{success:false,leads:[]},{},null,{data:{}},{leads:[{}]},{leads:[{id:'a'},{id:'b'}]}])await mocked(async calls=>{const r=await route.POST(request());assert.equal(r.status,502);assert.equal((await r.json()).deliveryState,'not_sent');assert.equal(calls.length,3);},[json(profile),json(active),json(v)]);});

test('all possible write failures are uncertain, including application error and mismatched returned ID',async()=>{for(const[stage,value]of [[3,new Response('PRIVATE',{status:503})],[3,json({errorCode:403})],[4,json({id:'9999',assignedUserId:'101'})],[5,json({error_code:500})],[6,json({success:false})]]){const responses=success();responses[stage]=value;await mocked(async calls=>{const r=await route.POST(request());assert.equal(r.status,502);const data=await r.json();assert.equal(data.deliveryState,'unknown');assert.doesNotMatch(JSON.stringify(data),/PRIVATE|retrySafe|not_sent/);assert.equal(calls.length,stage+1);},responses);}});

test('concurrent active, fallback and default requests never swap account credentials',()=>mocked(async calls=>{const [a,b,c]=await Promise.all([route.POST(request()),route.POST(request({email:'fallback@example.test',agentSlug:'anotheragent'},'https://www.adtrealtyaz.com/anotheragent')),route.POST(request({agentSlug:null,agentPublicationVersion:null,email:'default@example.test'},null))]);assert.equal(a.status,200);assert.equal(b.status,200);assert.equal(c.status,200);for(const call of calls.filter(c=>c.url.endsWith('/leads')&&c.options.method==='POST')){const b=body(call);assert.equal(call.options.headers.Authorization,b.emails[0]==='visitor@example.test'?'token mock-agent-key':'token mock-mike-key');assert.equal(b.assignedUserId==='101',b.emails[0]==='visitor@example.test');}},async call=>{await new Promise(r=>setTimeout(r,1));if(call.url===PUB)return json({...profile,slug:body(call).p_slug});if(call.url===BROKER)return json(body(call).slug==='sampleagent'?active:{...fallback,slug:'anotheragent'});if(call.url.includes('/leads?'))return json({leads:[]});if(call.url.endsWith('/leads')&&call.options.method==='POST')return json({id:call.options.headers.Authorization==='token mock-agent-key'?'1105':'2201'});if(call.url.endsWith('/leads/1105'))return json({id:'1105',assignedUserId:'101'});if(call.url.endsWith('/notes')||call.url.endsWith('/tasks'))return json({ok:true});throw Error('Unexpected transport');}));

test('Join and Hero kinds retain bounded canonical context and useful form details',async()=>{for(const c of [{page:'join',kind:'Join ADT Realty',fields:{careerStage:'Leadership'},match:/Career stage: Leadership/},{page:'hero',kind:'Community Heroes Savings',fields:{profession:'Healthcare',plan:'both',calculatorMode:'both',estimatedReward:'$7,500',buyPrice:'$500,000',sellPrice:'$500,000'},match:/Hero category: Healthcare/}])await mocked(async calls=>{assert.equal((await route.POST(request({leadType:c.kind,agentInquiryPage:c.page,...c.fields},`https://www.adtrealtyaz.com/${c.page}?agentSlug=sampleagent&agentPublicationVersion=${version}&private=PRIVATE`))).status,200);const note=body(calls[5]).content;assert.match(note,c.match);assert.match(note,new RegExp('Inquiry page: https://www.adtrealtyaz.com/'+c.page));assert.doesNotMatch(note,/PRIVATE/);},success());});

test('Join/Hero kind mismatch or invalid category is rejected before network',()=>mocked(async calls=>{for(const fields of [{leadType:'Join ADT Realty',careerStage:'Leadership',agentInquiryPage:'hero'},{leadType:'Community Heroes Savings',agentInquiryPage:'hero',profession:'Injected',plan:'buy'}])assert.equal((await route.POST(request(fields,null))).status,400);assert.equal(calls.length,0);}));

test('property inquiry rejects partial and complete operational context instead of silently using Mike',()=>mocked(async calls=>{assert.equal((await property.POST(request())).status,400);assert.equal((await property.POST(request({agentSlug:null,agentPublicationVersion:null},null,undefined,{'x-ace-agent-version':version}))).status,400);assert.equal(calls.length,0);}));

test('public status accepts only safe matching projection and never OIDC or key resolution',()=>mocked(async calls=>{const r=await api.handlePublicAgentRouting(new Request(`https://www.adtrealtyaz.com/api/agent-routing?slug=sampleagent&publicationVersion=${version}`));assert.equal(r.status,200);assert.deepEqual(await r.json(),{slug:profile.slug,publicationVersion:version,mode:'brokerage'});assert.equal(calls[0].options.headers.Authorization,undefined);assert.equal(body(calls[0]).op,'public.status');assert.equal(r.headers.get('cache-control'),'no-store, max-age=0');assert.equal(r.headers.get('access-control-allow-origin'),null);},[json(fallback)]));

test('public unknown/malformed/oversized/private response never becomes brokerage or leaks secrets',async()=>{for(const response of [new Response('',{status:404}),json({...fallback,apiKey:'PRIVATE'}),json({...fallback,slug:'otheragent'}),json({...fallback,publicationVersion:active.connectionVersion}),json({...fallback,x:'x'.repeat(9000)}),new Error('PRIVATE')])await mocked(async()=>{const r=await api.handlePublicAgentRouting(new Request(`https://www.adtrealtyaz.com/api/agent-routing?slug=sampleagent&publicationVersion=${version}`));assert.ok([404,503].includes(r.status));assert.doesNotMatch(await r.text(),/PRIVATE/);},[response]);});

test('active resolver validates secret/account types, exact response scope and never accepts admin/session token fallback',async()=>{for(const change of [{apiKey:'bad\nkey'},{loftyUserId:101},{loftyUserId:'-1'},{loftyEmail:'bad'},{ownerId:'bad'},{connectionVersion:'bad'},{mode:'unavailable'},{unexpected:'field'}])await mocked(async()=>{await assert.rejects(api.resolveAgentConnection(context),api.AgentConnectionUnavailable);},[json({...active,...change})]);await mocked(async calls=>{await assert.rejects(api.resolveAgentConnection(context,{getToken:()=>{throw Error('no runtime');}}),api.AgentConnectionUnavailable);assert.equal(calls.length,0);});});

test('OIDC dependency is per request, custom audience source is pinned, no agent constants or old envs remain',()=>{const fs=require('node:fs');const code=fs.readFileSync('lib/agent-connection.ts','utf8');assert.match(code,/getVercelOidcToken\(\{ audience: BROKER \}\)/);assert.doesNotMatch(code,/GREG_BINDING|LOFTY_API_KEY_GREG|resolveGregDelivery|AGENT_ROUTING_GREG/);assert.equal(JSON.parse(fs.readFileSync('package.json')).dependencies['@vercel/oidc'],'4.0.8');});


test('conflicting create/read ID aliases stop before annotating any contact',async()=>{
  for(const[stage,value]of [[3,{id:'1101',leadId:'9998'}],[4,{id:'1101',leadId:'9998',assignedUserId:'101'}]]){const responses=success();responses[stage]=json(value);await mocked(async calls=>{const r=await route.POST(request());assert.equal(r.status,502);assert.equal((await r.json()).deliveryState,'unknown');assert.equal(calls.length,stage+1);},responses);}
});


test('each selector representation must be complete; matching legacy aliases cannot repair or override it',()=>mocked(async calls=>{
  for(const req of [request({},null,'https://www.adtrealtyaz.com/api/leads?agentSlug=sampleagent'),request({},null,`https://www.adtrealtyaz.com/api/leads?agentPublicationVersion=${version}`),request({},null,undefined,{'x-ace-agent':'sampleagent'}),request({},null,undefined,{'x-ace-agent-version':version}),request({agentPublicationVersion:null},null,undefined,{'x-ace-agent':'sampleagent','x-ace-agent-version':version}),request({agent:'sampleagent'}),request({agentVersion:version}),request({},null,`https://www.adtrealtyaz.com/api/leads?agent=sampleagent&agent_version=${version}`),request({},`https://www.adtrealtyaz.com/sampleagent?agentSlug=sampleagent`)]) assert.equal((await route.POST(req)).status,400);
  assert.equal(calls.length,0);
}));

const AUTH='https://lklgtilyptasjdxqfsij.supabase.co/auth/v1/user';
const ADMIN='https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_website_profile';
const adminUser={id:'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',role:'authenticated',is_anonymous:false,email:'admin@example.test',email_confirmed_at:'2026-01-01T00:00:00Z'};
const probe={schemaVersion:1,authorized:true,projectId:'prj_ExampleMainProject123456',environment:'production'};
function readiness(bodyValue={},headers={},url='https://www.adtrealtyaz.com/api/admin/agent-connection/readiness'){return new Request(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer mock.admin.jwt',...headers},body:typeof bodyValue==='string'?bodyValue:JSON.stringify(bodyValue)});}
function probeSuccess(){return[json(adminUser),json({is_admin:true}),json(probe)];}

test('readiness independently verifies current admin, then proves local OIDC without agent/key/Lofty access',()=>mocked(async calls=>{
  const r=await api.handleAgentConnectionReadiness(readiness());assert.equal(r.status,200);assert.deepEqual(await r.json(),probe);assert.deepEqual(calls.map(c=>c.url),[AUTH,ADMIN,BROKER]);
  assert.equal(calls[0].options.headers.Authorization,'Bearer mock.admin.jwt');assert.equal(calls[1].options.headers.Authorization,'Bearer mock.admin.jwt');assert.equal(calls[2].options.headers.Authorization,'Bearer mock.workload.jwt');assert.deepEqual(body(calls[2]),{op:'server.probe'});
  assert.ok(calls.every(c=>c.options.cache==='no-store'&&c.options.redirect==='error'));assert.equal(r.headers.get('cache-control'),'no-store, max-age=0');assert.equal(r.headers.get('vary'),'Authorization');assert.equal(r.headers.get('access-control-allow-origin'),null);
  assert.doesNotMatch(calls[2].options.body,/slug|apiKey|publication|admin|jwt/);
},probeSuccess()));

test('readiness missing/anonymous/unverified/nonadmin JWT never requests workload proof',async()=>{
  await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness({}, {Authorization:''}))).status,401);assert.equal(calls.length,0);});
  for(const user of [null,{...adminUser,is_anonymous:true},{...adminUser,email_confirmed_at:null},{...adminUser,role:'anon'}])await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness())).status,401);assert.equal(calls.length,1);},[json(user)]);
  await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness())).status,403);assert.equal(calls.length,2);},[json(adminUser),json({is_admin:false})]);
});

test('readiness rejects arbitrary operation/target/slug, oversized body, query and cross-origin browser calls',()=>mocked(async calls=>{
  for(const req of [readiness({slug:profile.slug}),readiness({op:'server.resolve'}),readiness({target:'https://evil.example'}),readiness('x'.repeat(200)),readiness('{bad'),readiness({}, {'Content-Type':'text/plain'}),readiness({}, {},'https://www.adtrealtyaz.com/api/admin/agent-connection/readiness?target=evil')])assert.equal((await api.handleAgentConnectionReadiness(req)).status,400);
  assert.equal((await api.handleAgentConnectionReadiness(readiness({}, {Origin:'https://marketing.adtrealtyaz.com'}))).status,403);assert.equal(calls.length,0);
}));

test('readiness cannot substitute admin JWT for missing OIDC or operate from preview',async()=>{
  for(const env of [{VERCEL_ENV:'preview'},{TEST_OIDC_TOKEN:'malformed'}])await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness())).status,503);assert.equal(calls.length,2);},[json(adminUser),json({is_admin:true})],env);
  await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness(),{getToken:()=>{throw Error('PRIVATE_RUNTIME');}})).status,503);assert.equal(calls.length,2);},[json(adminUser),json({is_admin:true})]);
});

test('readiness rejects unexpected/private probe metadata and never forwards upstream errors',async()=>{
  for(const response of [json({...probe,apiKey:'PRIVATE_SECRET'}),json({...probe,authorized:false}),json({...probe,projectId:'9999'}),json({...probe,environment:'preview'}),json({...probe,extra:'PRIVATE_SECRET'}),new Response('PRIVATE_SECRET',{status:403}),new Error('PRIVATE_SECRET')])await mocked(async calls=>{
    const r=await api.handleAgentConnectionReadiness(readiness());assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:'Backend readiness could not be verified.'});assert.equal(calls.length,3);
  },[json(adminUser),json({is_admin:true}),response]);
});

test('readiness auth response failures and missing public config fail closed',async()=>{
  for(const responses of [[new Response('PRIVATE',{status:503})],[json({...adminUser,errorCode:401})],[json(adminUser),json({is_admin:true,error:'PRIVATE'})],[json({...adminUser,metadata:'x'.repeat(40000)})]])await mocked(async calls=>{const r=await api.handleAgentConnectionReadiness(readiness());assert.equal(r.status,503);assert.doesNotMatch(await r.text(),/PRIVATE|mock.admin.jwt/);assert.ok(calls.length<3);},responses);
  await mocked(async calls=>{assert.equal((await api.handleAgentConnectionReadiness(readiness())).status,503);assert.equal(calls.length,0);},[],{AGENT_PUBLIC_SUPABASE_ANON_KEY:null});
});

test('documented lead-search leadId selects the exact existing contact without reassigning it',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,200);assert.equal(calls[3].url,'https://api.lofty.com/v1.0/leads/4300');assert.deepEqual(body(calls[3]),{tagsAdd:['ADT Arizona Website','Talk to an agent']});assert.equal(body(calls[4]).leadId,'4300');
},[json(profile),json(active),json({leads:[{leadId:'4300',assignedUserId:'101',ownershipId:'101',ownershipScope:'PERSONAL'}]}),json({ok:true}),json({ok:true}),json({ok:true})]));

test('documented create leadId and direct or root.lead detail envelopes verify owner before notes/tasks',async()=>{
  for(const detail of [{lead:{leadId:'4400',assignedUserId:'101',ownershipId:'101',ownershipScope:'PERSONAL'}},{leadId:'4400',assignedUserId:'101'},{lead:{leadId:'4400',id:4400,assignedUserId:'101'}}])await mocked(async calls=>{
    assert.equal((await route.POST(request())).status,200);assert.equal(calls[4].url,'https://api.lofty.com/v1.0/leads/4400');assert.equal(body(calls[5]).leadId,'4400');assert.equal(body(calls[6]).leadId,'4400');
  },[json(profile),json(active),json({leads:[]}),json({leadId:'4400'}),json(detail),json({ok:true}),json({ok:true})]);
});

test('documented aliases remain strict: conflicting, missing and unsafe lead IDs never select another record',async()=>{
  for(const lead of [{leadId:'4300',id:'4301',assignedUserId:'101'},{leadId:1.5,assignedUserId:'101'},{leadId:-1,assignedUserId:'101'},{leadId:'0',assignedUserId:'101'},{leadId:'contact-name',assignedUserId:'101'},{leadId:'4300',id:null,assignedUserId:'101'}])await mocked(async calls=>{
    const response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'not_sent');assert.equal(calls.length,3);
  },[json(profile),json(active),json({leads:[lead]})]);
  await mocked(async calls=>{const response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'unknown');assert.equal(calls.length,5);},[json(profile),json(active),json({leads:[]}),json({leadId:'4400'}),json({lead:{leadId:'4400',id:'4401',assignedUserId:'101'}})]);
});

test('complete Main readiness adds routingReady true only after successful protected workload proof',()=>mocked(async()=>{
  const endpoint=load('app/api/admin/agent-connection/readiness/route.ts');
  const response=await endpoint.POST(readiness());assert.equal(response.status,200);assert.deepEqual(await response.json(),{...probe,routingReady:true});
},probeSuccess()));

test('documented post-create404 persistence is retried read-only before owner-checked delivery',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,200);assert.equal(calls.filter(c=>c.url==='https://api.lofty.com/v1.0/leads'&&c.options.method==='POST').length,1);
  const reads=calls.filter(c=>c.url==='https://api.lofty.com/v1.0/leads/4400');assert.equal(reads.length,3);assert.ok(reads.every(c=>!c.options.method&&c.options.headers.Authorization==='token mock-agent-key'));assert.equal(body(calls[7]).leadId,'4400');
},[json(profile),json(active),json({leads:[]}),json({leadId:'4400'}),new Response('',{status:404}),new Response('',{status:404}),json({lead:{leadId:'4400',assignedUserId:'101'}}),json({ok:true}),json({ok:true})]));

test('exhausted post-create404 retries are bounded, unknown and never repeat the create',()=>mocked(async calls=>{
  const started=Date.now(),response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'unknown');assert.equal(calls.length,7);assert.equal(calls.filter(c=>c.url.endsWith('/leads')&&c.options.method==='POST').length,1);assert.equal(calls.filter(c=>c.url.endsWith('/leads/4400')).length,3);assert.ok(Date.now()-started<5000);
},[json(profile),json(active),json({leads:[]}),json({leadId:'4400'}),new Response('',{status:404}),new Response('',{status:404}),new Response('',{status:404})]));

test('wrong owner after a transient404 still blocks all notes/tasks and reports uncertainty',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'unknown');assert.equal(calls.length,6);assert.ok(calls.every(c=>!c.url.endsWith('/notes')&&!c.url.endsWith('/tasks')));
},[json(profile),json(active),json({leads:[]}),json({leadId:'4400'}),new Response('',{status:404}),json({lead:{leadId:'4400',assignedUserId:'202'}})]));


test('ownership-only or nested-agent-only contacts never satisfy the documented assignedUserId guard',async()=>{
  for(const lead of [{leadId:'4300',ownershipId:'101',ownershipScope:'PERSONAL'},{leadId:'4300',agent:{id:'101'}},{leadId:'4300',assignedUserId:9007199254740992,ownershipId:'101'}])await mocked(async calls=>{const response=await route.POST(request());assert.equal(response.status,409);assert.equal((await response.json()).deliveryState,'not_sent');assert.equal(calls.length,3);},[json(profile),json(active),json({leads:[lead]})]);
});

test('raw documented int64 lead IDs retain every digit through created detail, notes and tasks',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,200);assert.equal(calls[4].url,'https://api.lofty.com/v1.0/leads/469091225008040512');assert.equal(body(calls[5]).leadId,'469091225008040512');assert.equal(body(calls[6]).leadId,'469091225008040512');
},[json(profile),json(active),json({leads:[]}),new Response('{"leadId":469091225008040512}'),new Response('{"lead":{"leadId":469091225008040512,"assignedUserId":101,"ownershipId":101,"ownershipScope":"PERSONAL"}}'),json({ok:true}),json({ok:true})]));

test('distinct raw int64 aliases cannot collapse to one rounded identity',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'not_sent');assert.equal(calls.length,3);
},[json(profile),json(active),new Response('{"leads":[{"leadId":469091225008040512,"id":469091225008040513,"assignedUserId":101}]}')]));


test('fractional and exponent lead ID lexemes cannot round into a valid assigned contact',async()=>{
  for(const token of ['1.00000000000000001','9007199254740991.1','1e0'])await mocked(async calls=>{const response=await route.POST(request());assert.equal(response.status,502);assert.equal((await response.json()).deliveryState,'not_sent');assert.equal(calls.length,3);},[json(profile),json(active),new Response('{"leads":[{"leadId":'+token+',"assignedUserId":101}]}')]);
});

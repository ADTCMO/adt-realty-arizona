const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
function loader(){const cache=new Map();function load(f){f=path.resolve(f);if(cache.has(f))return cache.get(f).exports;const m={exports:{}};cache.set(f,m);const code=ts.transpileModule(fs.readFileSync(f,'utf8'),{fileName:'source.tsx',compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;vm.runInNewContext(code,{module:m,exports:m.exports,process,URL,AbortSignal,Buffer,TextDecoder,Uint8Array,setTimeout,clearTimeout,fetch:(...a)=>global.fetch(...a),require:n=>{if(n==='server-only'||n.endsWith('.css'))return {};if(n==='next/navigation')return {notFound:()=>{throw Error('NOT_FOUND')}};if(n.startsWith('.')){let q=path.resolve(path.dirname(f),n);return load(['','.tsx','.ts'].map(e=>q+e).find(fs.existsSync));}return require(n);}});return m.exports;}return load;}
const profile={slug:'testagent',full_name:'Test Agent',email:'public@example.com',phone:'(480) 555-0100',profile_photo_url:null,publication_version:'12345678-1234-4321-8123-123456789abc'};
const load=loader(),api=load('lib/published-agent.ts');
test('slug validation reserves all static and city routes',()=>{for(const slug of ['api','join','gilbert','chandler','greg','leo','admin','Bad','a/b','test-agent','__proto__'])assert.equal(api.isAgentSlug(slug),false,slug);assert.equal(api.isAgentSlug('testagent'),true);});
test('strict projection strips private data and rejects malformed fields',()=>{const p=api.parsePublishedAgent({...profile,user_id:'SECRET',login_email:'PRIVATE'},profile.slug);assert.equal(JSON.stringify(p).includes('SECRET'),false);assert.equal(JSON.stringify(p).includes('PRIVATE'),false);for(const change of [{slug:'another'},{email:'bad\n@example.com'},{phone:'javascript:evil'},{publication_version:'auth-id'},{full_name:'a'.repeat(161)},{phone:'1'.repeat(31)},{phone:'1'.repeat(16)},{phone:'-------'}])assert.equal(api.parsePublishedAgent({...profile,...change},profile.slug),null);});
test('public fetch is uncached fail-closed and never accesses private APIs',async()=>{const old=global.fetch;process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='fixture-anon';try{global.fetch=async(url,opts)=>{assert.equal(url,'https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_public_site');assert.equal(opts.cache,'no-store');assert.equal(opts.redirect,'error');assert.equal(opts.body,JSON.stringify({p_slug:profile.slug}));return Response.json(profile)};assert.equal((await api.getPublishedAgent(profile.slug)).slug,profile.slug);global.fetch=()=>{throw Error('network')};assert.equal(await api.getPublishedAgent(profile.slug),null);global.fetch=async()=>Response.json(null);assert.equal(await api.getPublishedAgent(profile.slug),null);}finally{global.fetch=old;delete process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;}});
test('agent homepage enables existing buyer/seller tools and contact form with temporary brokerage routing',()=>{const Home=load('app/Homepage.tsx').default;const html=renderToStaticMarkup(React.createElement(Home,{agent:profile}));assert.match(html,/data-agent-site-slug="testagent"/);assert.match(html,/data-agent-publication-version="12345678-1234-4321-8123-123456789abc"/);assert.match(html,/data-agent-leads="brokerage"/);assert.match(html,/mailto:public@example.com/);assert.match(html,/href="https:\/\/acebuyer.adtrealtyaz.com\/\?view=tools&amp;utm_source=adt-agent-testagent&amp;utm_medium=referral&amp;utm_campaign=adt-agent-page&amp;agentSlug=testagent&amp;agentPublicationVersion=12345678-1234-4321-8123-123456789abc"/);assert.match(html,/<form class="compactForm" action="https:\/\/aceseller.adtrealtyaz.com" method="get"/);assert.match(html,/<input type="hidden" name="agentSlug" value="testagent"/);assert.match(html,/<input type="hidden" name="utm_source" value="adt-agent-testagent"/);assert.match(html,/<input type="hidden" name="utm_medium" value="referral"/);assert.match(html,/<input type="hidden" name="utm_campaign" value="adt-agent-page"/);assert.equal((html.match(/<form/g)||[]).length,2);assert.doesNotMatch(html,/pending setup|pending CRM|not connected|No information is collected|LOFTY|assignedUserId|apiKey/);});
test('default shared homepage rendering is byte-identical to canonical homepage',()=>{const canonical=fs.readFileSync('canonical-home.txt','utf8');fs.writeFileSync('app/.canonical-test.tsx',canonical);try{const before=load('app/.canonical-test.tsx').default,after=load('app/Homepage.tsx').default;assert.equal(renderToStaticMarkup(React.createElement(after)),renderToStaticMarkup(React.createElement(before)));}finally{fs.unlinkSync('app/.canonical-test.tsx')}});
test('unknown and unpublished route is 404; existing city wins without API fetch',async()=>{const route=load('app/[city]/page.tsx');assert.equal(route.dynamic,'force-dynamic');assert.ok(route.generateStaticParams().some(p=>p.city==='gilbert'));const old=global.fetch;global.fetch=()=>{throw Error('must not fetch')};try{for (const slug of ['unknownperson','__proto__','constructor','admin']) await assert.rejects(route.default({params:Promise.resolve({city:slug})}),/NOT_FOUND/);const city=await route.default({params:Promise.resolve({city:'gilbert'})});assert.ok(city);}finally{global.fetch=old;}});

test('published named route renders exact marker through existing dynamic route',async()=>{const old=global.fetch;process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='fixture-anon';global.fetch=async(url)=>Response.json(url.includes('/functions/v1/')?{schemaVersion:1,slug:profile.slug,publicationVersion:profile.publication_version,mode:'brokerage'}:profile);try{const route=load('app/[city]/page.tsx');const metadata=await route.generateMetadata({params:Promise.resolve({city:profile.slug})});assert.equal(metadata.alternates.canonical,'https://www.adtrealtyaz.com/testagent');assert.equal(metadata.openGraph.url,'https://www.adtrealtyaz.com/testagent');const html=renderToStaticMarkup(await route.default({params:Promise.resolve({city:profile.slug})}));assert.match(html,/https:\/\/www.adtrealtyaz.com\/testagent#webpage/);assert.match(html,/data-agent-site-slug="testagent"/);assert.match(html,/data-agent-leads="brokerage"/);assert.match(html,/<form/);}finally{global.fetch=old;delete process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;}});

test('unsafe optional photos are omitted without hiding valid profile',()=>{for(const photo of ['http://evil/photo','https://user:secret@lklgtilyptasjdxqfsij.supabase.co/storage/v1/object/public/agent-profile/a.png','https://lklgtilyptasjdxqfsij.supabase.co:8443/storage/v1/object/public/agent-profile/a.png','https://lklgtilyptasjdxqfsij.supabase.co/storage/v1/object/public/other/x','https://lklgtilyptasjdxqfsij.supabase.co/storage/v1/object/public/agent-profile/a.png?token=x','https://lklgtilyptasjdxqfsij.supabase.co/storage/v1/object/public/agent-profile/a.png#x',123]){assert.equal(api.parsePublishedAgent({...profile,profile_photo_url:photo},profile.slug).profile_photo_url,null)}});

test('standard intentionally public profile media paths remain supported',()=>{const photo='https://lklgtilyptasjdxqfsij.supabase.co/storage/v1/object/public/agent-profile/11111111-1111-4111-8111-111111111111/profile-123.png';const parsed=api.parsePublishedAgent({...profile,profile_photo_url:photo},profile.slug);assert.equal(parsed.profile_photo_url,photo);assert.deepEqual(Object.keys(parsed).sort(),['slug','full_name','email','phone','profile_photo_url','publication_version'].sort());});

test('all published agents retain complete operational selectors in every connection mode',()=>{
  const Home=load('app/Homepage.tsx').default;
  for(const mode of ['brokerage','agent','unavailable']) {
    const html=renderToStaticMarkup(React.createElement(Home,{agent:profile,routingMode:mode}));
    assert.match(html,/&amp;agentSlug=testagent&amp;agentPublicationVersion=12345678/);
    assert.match(html,new RegExp('data-agent-leads="'+mode+'"'));
    assert.equal((html.match(/name="agentSlug" value="testagent"/g)||[]).length,2);
    assert.equal((html.match(/name="agentPublicationVersion" value="12345678/g)||[]).length,2);
  }
});

test('Join, Hero and career navigation preserve verified explicit context without changing leadership CTA',async()=>{
  const before=global.fetch,anon=process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;
  const greg={...profile,slug:'sampleagent',full_name:'Example Agent',publication_version:'12345678-1234-4321-8123-123456789abc'};
  global.fetch=async(url)=>Response.json(url.includes('/functions/v1/')?{schemaVersion:1,slug:greg.slug,publicationVersion:greg.publication_version,mode:'unavailable'}:greg);process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='mock-public-key';
  const searchParams=()=>Promise.resolve({agentSlug:'sampleagent',agentPublicationVersion:greg.publication_version});
  try{
    const join=load('app/join/page.tsx').default;
    const joinHtml=renderToStaticMarkup(await join({searchParams:searchParams()}));
    assert.match(joinHtml,/href="\/hero\?agentSlug=sampleagent&amp;agentPublicationVersion=/);assert.match(joinHtml,/href="\/join\/leadership\?agentSlug=sampleagent&amp;agentPublicationVersion=/);assert.match(joinHtml,/name="agentInquiryPage" value="join"/);assert.match(joinHtml,/name="agentPublicationVersion" value="12345678/);assert.match(joinHtml,/href="\/sampleagent\?agentSlug=sampleagent&amp;agentPublicationVersion=/);
    const hero=load('app/hero/page.tsx').default;
    const heroHtml=renderToStaticMarkup(await hero({searchParams:searchParams()}));
    assert.match(heroHtml,/name="agentInquiryPage" value="hero"/);assert.match(heroHtml,/name="agentSlug" value="sampleagent"/);assert.match(heroHtml,/href="\/sampleagent\?agentSlug=sampleagent&amp;agentPublicationVersion=[^"]+#contact"/);
    const guide=load('app/join/[slug]/page.tsx').default;
    const guideHtml=renderToStaticMarkup(await guide({params:Promise.resolve({slug:'leadership'}),searchParams:searchParams()}));
    assert.match(guideHtml,/href="\/join\?agentSlug=sampleagent&amp;agentPublicationVersion=[^"]+#career-paths"/);assert.match(guideHtml,/href="\/sampleagent\?agentSlug=sampleagent&amp;agentPublicationVersion=/);
    const viewerSource=fs.readFileSync('app/join/[slug]/GuideViewer.tsx','utf8');assert.match(viewerSource,/href="\/leaders"/);
    await assert.rejects(join({searchParams:Promise.resolve({agentSlug:'sampleagent',agentPublicationVersion:'wrong'})}),/NOT_FOUND/);
    await assert.rejects(hero({searchParams:Promise.resolve({agentSlug:['sampleagent','otheragent'],agentPublicationVersion:greg.publication_version})}),/NOT_FOUND/);
  }finally{global.fetch=before;if(anon===undefined)delete process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;else process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY=anon;}
});


test('explicit return to named homepage stays operational after disabling the connection',async()=>{
  const old=global.fetch,anon=process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY,env=process.env.VERCEL_ENV,flag=process.env.AGENT_ROUTING_GREG_ENABLED;
  const greg={...profile,slug:'sampleagent',publication_version:'12345678-1234-4321-8123-123456789abc'};
  process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='mock-public-key';process.env.VERCEL_ENV='production';process.env.AGENT_ROUTING_GREG_ENABLED='false';global.fetch=async(url)=>Response.json(url.includes('/functions/v1/')?{schemaVersion:1,slug:greg.slug,publicationVersion:greg.publication_version,mode:'unavailable'}:greg);
  try{const page=load('app/[city]/page.tsx').default;const html=renderToStaticMarkup(await page({params:Promise.resolve({city:'sampleagent'}),searchParams:Promise.resolve({agentSlug:'sampleagent',agentPublicationVersion:greg.publication_version})}));assert.match(html,/data-agent-leads="unavailable"/);assert.match(html,/name="agentSlug" value="sampleagent"/);assert.match(html,/&amp;agentSlug=sampleagent/);
  await assert.rejects(page({params:Promise.resolve({city:'sampleagent'}),searchParams:Promise.resolve({agentSlug:'anotheragent',agentPublicationVersion:greg.publication_version})}),/NOT_FOUND/);
  }finally{global.fetch=old;for(const[key,value]of [['AGENT_PUBLIC_SUPABASE_ANON_KEY',anon],['VERCEL_ENV',env],['AGENT_ROUTING_GREG_ENABLED',flag]])if(value===undefined)delete process.env[key];else process.env[key]=value;}
});

const markupHash = html => require('node:crypto').createHash('sha256').update(html).digest('hex');
const personalProfiles = [
  {...profile, slug:'averymorgan', full_name:'Avery Morgan', email:'avery@example.test', phone:'(202) 555-0101'},
  {...profile, slug:'reneelane', full_name:'Renée Lane', email:'renee@example.test', phone:'(202) 555-0102'},
];

test('personal homepage uses each agent first name, singular contact label and hides both broker navigation links',()=>{
  const Home=load('app/Homepage.tsx').default;
  for(const agent of personalProfiles)for(const routingMode of ['agent','brokerage','unavailable']){
    const html=renderToStaticMarkup(React.createElement(Home,{agent,routingMode}));
    assert.equal((html.match(new RegExp('Talk to '+agent.full_name.split(' ')[0],'g'))||[]).length,2);
    assert.doesNotMatch(html,/Meet Our Arizona Broker|<a[^>]*href="\/mike-dingman"/);
    assert.match(html,/How can I help\?/);assert.doesNotMatch(html,/How Can We Help\?/);
    assert.match(html,new RegExp('data-agent-leads="'+routingMode+'"'));
    assert.match(html,/ADT REALTY — ARIZONA/);assert.match(html,/Your Move\. Our Commitment\./);
    assert.match(html,new RegExp('name="agentSlug" value="'+agent.slug+'"'));
    assert.match(html,/name="agentPublicationVersion" value="12345678-1234-4321-8123-123456789abc"/);
  }
});

test('personal CTA handles whitespace, a single name and escaped text without a hardcoded agent',()=>{
  const {agentContactLabel}=load('app/components/PublicAgent.tsx');
  for(const [full_name,label] of [['  Avery   Morgan  ','Talk to Avery'],['Renée','Talk to Renée'],['李 明','Talk to 李'],['<img> Example','Talk to <img>']])assert.equal(agentContactLabel({full_name}),label);
  assert.equal(agentContactLabel(null),'Talk to an Agent');assert.equal(agentContactLabel({full_name:'   '}),'Talk to an Agent');
  const html=renderToStaticMarkup(React.createElement(load('app/Homepage.tsx').default,{agent:{...profile,full_name:'<img> Example'}}));assert.match(html,/Talk to &lt;img&gt;/);assert.doesNotMatch(html,/Talk to <img>/);
});

test('attributed Hero and Join show verified agent CTA and footer without inventing a routing mode',async()=>{
  const old=global.fetch,anon=process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='mock-public-key';
  try{for(const agent of personalProfiles){
    const calls=[];global.fetch=async(url,options)=>{calls.push(String(url));assert.equal(url,'https://lklgtilyptasjdxqfsij.supabase.co/rest/v1/rpc/ace_agent_public_site');assert.equal(JSON.parse(options.body).p_slug,agent.slug);return Response.json(agent);};
    const searchParams=()=>Promise.resolve({agentSlug:agent.slug,agentPublicationVersion:agent.publication_version});
    for(const [file,kind] of [['app/hero/page.tsx','hero'],['app/join/page.tsx','join']]){
      const html=renderToStaticMarkup(await load(file).default({searchParams:searchParams()}));
      assert.match(html,new RegExp('Talk to '+agent.full_name.split(' ')[0]));
      assert.match(html,new RegExp('<h2 id="agent-profile-name">'+agent.full_name+'</h2>'));
      assert.ok(html.includes('href="tel:'+agent.phone.replace(/[^+\d]/g,'')+'"'));
      assert.ok(html.includes(agent.phone));assert.ok(html.includes('mailto:'+agent.email));
      assert.match(html,new RegExp('data-agent-site-slug="'+agent.slug+'"'));
      assert.match(html,/data-agent-publication-version="12345678-1234-4321-8123-123456789abc"/);
      assert.doesNotMatch(html,/data-agent-leads=/);
      assert.match(html,new RegExp('name="agentInquiryPage" value="'+kind+'"'));
      assert.match(html,new RegExp('name="agentSlug" value="'+agent.slug+'"'));
      assert.match(html,/name="agentPublicationVersion" value="12345678-1234-4321-8123-123456789abc"/);
      if(kind==='hero'){
        assert.doesNotMatch(html,/Meet Our Arizona Broker/);
        assert.ok(html.includes('/'+agent.slug+'?agentSlug='+agent.slug+'&amp;agentPublicationVersion='+agent.publication_version+'#contact'));
        assert.match(html,/ADT Realty Community Heroes Program/);assert.match(html,/Get My Exact Savings Estimate/);
      }else{
        assert.match(html,/<a class="joinButton" href="#conversation">Talk to /);
        assert.match(html,/Join ADT Realty — Arizona/);assert.match(html,/Our Leaders/);
      }
    }
    assert.equal(calls.length,2);
  }}finally{global.fetch=old;if(anon===undefined)delete process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;else process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY=anon;}
});

test('Hero and Join reject missing, duplicate, stale or unpublished context instead of showing another agent identity',async()=>{
  const old=global.fetch,anon=process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY='mock-public-key';
  try{for(const file of ['app/hero/page.tsx','app/join/page.tsx']){
    const page=load(file).default;global.fetch=async()=>Response.json(profile);
    for(const params of [{agentSlug:profile.slug},{agentPublicationVersion:profile.publication_version},{agentSlug:[profile.slug,profile.slug],agentPublicationVersion:profile.publication_version},{agentSlug:profile.slug,agentPublicationVersion:'87654321-1234-4321-8123-123456789abc'}])await assert.rejects(page({searchParams:Promise.resolve(params)}),/NOT_FOUND/);
    global.fetch=async()=>Response.json(null);await assert.rejects(page({searchParams:Promise.resolve({agentSlug:profile.slug,agentPublicationVersion:profile.publication_version})}),/NOT_FOUND/);
  }}finally{global.fetch=old;if(anon===undefined)delete process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY;else process.env.AGENT_PUBLIC_SUPABASE_ANON_KEY=anon;}
});

test('no-agent Home, Hero and Join markup stays byte-identical to the verified pre-personalization baseline',async()=>{
  const expected=[['app/Homepage.tsx','207d4e4f28160040e90fbeccf84e230b45de3376c10b5a786337ac07a5b6b50f'],['app/hero/CommunityHeroes.tsx','69934ca2e88a1c07166b11acd6cd4ed0320d2fe76b90f8ae0c44cefc79e43b68'],['app/join/page.tsx','75113aebf4c125c3d692d05f0c3301cef2b43d3eed051256726861cf6a0246a8']];
  for(const [file,hash]of expected){const component=load(file).default;const tree=file.includes('/join/')?await component():React.createElement(component);assert.equal(markupHash(renderToStaticMarkup(tree)),hash,file);}
});

test('seller address form remains byte-identical with and without complete personal attribution',()=>{
  const Form=load('app/components/LeadForm.tsx').LeadForm;
  for(const [agent,hash]of [[false,'076870d5adc60dbfeb04aa87d36b22c220bf837243bcc7f4d630fda66143ad12'],[true,'7351515eb17a1c4e3998ab5ac549c3b7e8b86c2150f9a347027fbae0f91cd45a']]){
    const props={type:'seller',...(agent?{agentSlug:'sampleagent',agentPublicationVersion:profile.publication_version,agentRouting:true}:{})};
    const html=renderToStaticMarkup(React.createElement(Form,props));assert.equal(markupHash(html),hash);assert.match(html,/action="https:\/\/aceseller.adtrealtyaz.com" method="get"/);assert.match(html,/name="address"/);
  }
  const ordinary=renderToStaticMarkup(React.createElement(Form,{type:'contact'}));assert.match(ordinary,/How Can We Help\?/);
  const incomplete=renderToStaticMarkup(React.createElement(Form,{type:'contact',agentRouting:true,agentSlug:'sampleagent'}));assert.match(incomplete,/How Can We Help\?/);
});

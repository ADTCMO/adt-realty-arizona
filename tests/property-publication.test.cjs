const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
function load(relative, replacements = {}) {
  const filename = path.resolve(__dirname, '..', relative);
  const mod = new Module(filename, module); mod.filename=filename; mod.paths=module.paths;
  const original=mod.require.bind(mod);
  mod.require=id=>Object.hasOwn(replacements,id)?replacements[id]:original(id);
  mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,filename);
  return mod.exports;
}
const urls=load('lib/public-listings.ts');
const long='2094-w-peninsula-cir-chandler-85248-5346fe33';
const short='2094-w-peninsula-cir';
const id='5346fe33-3787-4ab1-bcf1-3a986bf569d6';
const origin='https://www.adtrealtyaz.com';
test('durable canonical URL handles known alias and never recomputes unknown slugs',()=>{
  assert.equal(urls.resolveListingSlug(short),long);
  assert.equal(urls.resolveListingSlug(long),long);
  assert.equal(urls.publicListingUrl(long,id),`${origin}/home/${short}`);
  assert.equal(urls.publicListingUrl('saved-identity'),`${origin}/home/saved-identity`);
  for(const bad of ['',null,'https://bad.test','../x','slug?query','a'.repeat(181)]){
    assert.equal(urls.resolveListingSlug(bad),null); assert.equal(urls.publicListingUrl(bad),'');
  }
});
const route=load('app/api/property-inquiry/route.ts',{'../../../lib/public-listings':urls,'next/server':{NextResponse:{json:(data,options={})=>Response.json(data,options)}}});
function request(overrides={}) {
  const data=new FormData(); for(const [key,value]of Object.entries({slug:short,name:'Example Visitor',email:'visitor@example.test',phone:'',message:'Local mocked request only',...overrides})) data.set(key,value);
  return new Request('https://example.test/api/property-inquiry',{method:'POST',body:data});
}
async function mocked(callback,responses=[]) {
  const oldFetch=global.fetch, oldKey=process.env.LOFTY_API_KEY, oldError=console.error; const calls=[];
  global.fetch=async(url,options)=>{calls.push({url,options}); const next=responses.shift(); if(next instanceof Error)throw next; if(!next)throw Error('Unexpected external request prohibited'); return next;};
  process.env.LOFTY_API_KEY='local-test-not-a-real-key';console.error=()=>{};
  try{return await callback(calls);}finally{global.fetch=oldFetch;console.error=oldError;if(oldKey===undefined)delete process.env.LOFTY_API_KEY;else process.env.LOFTY_API_KEY=oldKey;}
}
const listing={id,address:'123 Mock Way',city:'Chandler',zip:'85248',agent:{name:'Test Agent'}};
test('honeypot and validation failures do not make any network request',()=>mocked(async calls=>{
  assert.equal((await route.POST(request({website:'bot'}))).status,200);
  for(const fields of [{slug:'../x'},{name:''},{email:'bad'},{message:'x'.repeat(2001)},{phone:'x'.repeat(41)}])assert.equal((await route.POST(request(fields))).status,400);
  assert.equal(calls.length,0);
}));
test('missing delivery config fails without network',()=>mocked(async calls=>{
  delete process.env.LOFTY_API_KEY;assert.equal((await route.POST(request())).status,503);assert.equal(calls.length,0);
}));
test('unpublished, invalid JSON or incomplete listing never creates a lead',async()=>{
  for(const response of [new Response('',{status:404}),new Response('not json'),Response.json({}),Response.json(null)]) await mocked(async calls=>{
    const result=await route.POST(request());assert.ok([404,502].includes(result.status));assert.equal(calls.length,1);
  },[response]);
});
test('mocked complete delivery uses saved alias and canonical page, with no welcome email',()=>mocked(async calls=>{
  const result=await route.POST(request());assert.equal(result.status,200);
  assert.equal(calls.length,4);assert.ok(calls[0].url.endsWith(long));
  const lead=JSON.parse(calls[1].options.body);assert.equal(lead.welcomeEmail,false);assert.equal(lead.leadAlert,true);assert.equal(lead.emails[0],'visitor@example.test');
  const note=JSON.parse(calls[2].options.body);assert.ok(note.content.includes(`${origin}/home/${short}`));assert.equal(note.leadId,'mock-lead');
  const task=JSON.parse(calls[3].options.body);assert.equal(task.leadId,'mock-lead');assert.equal(task.type,'Email');
},[Response.json(listing),Response.json({id:'mock-lead'}),Response.json({ok:true}),Response.json({ok:true})]));
test('upstream rejection produces retryable error with no internal detail leaked',()=>mocked(async calls=>{
  const response=await route.POST(request());assert.equal(response.status,502);assert.equal(calls.length,2);
  assert.deepEqual(await response.json(),{error:'Showing request could not be sent'});
},[Response.json(listing),new Response('private upstream detail',{status:503})]));

test('collection preview query is permitted only in the preview environment',()=>{
  assert.equal(urls.isCollectionPreview('collection','preview'),true);
  for(const environment of ['production','development','',undefined])assert.equal(urls.isCollectionPreview('collection',environment),false);
  for(const requested of ['',null,'modern',true])assert.equal(urls.isCollectionPreview(requested,'preview'),false);
});

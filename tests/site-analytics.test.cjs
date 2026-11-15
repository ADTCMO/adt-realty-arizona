const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const ts = require('typescript');
function fixture({host='www.adtrealtyaz.com',gpc=false,dnt='0',choice=null}={}) {
 const calls=[], scripts=[];
 const location={protocol:'https:',hostname:host,origin:'https://'+host,search:'?email=private@example.com&utm_source=meta&utm_campaign=join_adt',pathname:'/join'};
 const document={referrer:'https://facebook.com/feed?email=private@example.com',title:'Join ADT',head:{appendChild:s=>scripts.push(s)},createElement:()=>({dataset:{}})};
 const window={navigator:{globalPrivacyControl:gpc,doNotTrack:dnt},gtag:(...args)=>calls.push(args)};
 const context={exports:{},require:id=>id==='next/navigation'?{usePathname:()=>'/join'}:id==='react'?{useEffect:()=>{},useState:()=>[false,()=>{}]}:{jsx:()=>null,jsxs:()=>null},window,document,location,localStorage:{getItem:()=>choice},URL,URLSearchParams,Date};
 const input=fs.readFileSync('app/SiteAnalytics.tsx','utf8')+'\nexport {page};';
 vm.runInNewContext(ts.transpileModule(input,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,context);
 return {page:context.exports.page,calls,scripts};
}
test('tracks public pages once and SPA navigation, no query/contact/referrer path',()=>{
 const f=fixture();f.page('/join');f.page('/join');f.page('/leaders');
 assert.equal(f.scripts.length,1);
 assert.equal(f.calls.filter(c=>c[0]==='event'&&c[1]==='page_view').length,2);
 assert.ok(!JSON.stringify(f.calls).includes('private@example.com'));
 assert.ok(!JSON.stringify(f.calls).includes('/feed'));
 assert.ok(JSON.stringify(f.calls).includes('campaign_source'));
 assert.ok(JSON.stringify(f.calls).includes('https://www.adtrealtyaz.com/leaders'));
});
for(const [name,options] of Object.entries({preview:{host:'preview.vercel.app'},privacy:{gpc:true},dnt:{dnt:'1'},optout:{choice:'off'}}))test('does not load GA for '+name,()=>{const f=fixture(options);f.page('/join');assert.equal(f.scripts.length,0);assert.equal(f.calls.length,0);});

const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
function loader() {
 const cache=new Map();
 function load(file) {
  file=path.resolve(file); if(cache.has(file))return cache.get(file).exports;
  const mod={exports:{}};cache.set(file,mod);
  const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  vm.runInNewContext(code,{module:mod,exports:mod.exports,process,Buffer,URL,URLSearchParams,Request,Response,Headers,AbortSignal,setTimeout,clearTimeout,crypto,TextDecoder,Uint8Array,
   console:{...console,error(){}},fetch:(...a)=>global.fetch(...a),
   require:n=>n==='@vercel/oidc'?{getVercelOidcToken:()=>process.env.TEST_OIDC_TOKEN || 'mock.workload.jwt'}:n==='server-only'?{}:n==='next/server'?{NextResponse:{json:(data,options)=>Response.json(data,options)}}:n.startsWith('@/')?load(n.slice(2)+'.ts'):n.startsWith('.')?load(path.resolve(path.dirname(file),n)+'.ts'):require(n)
  },{filename:file});
  return mod.exports;
 }
 return load;
}
module.exports={loader};

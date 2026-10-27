const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const filename = path.resolve(__dirname, '../app/home/[slug]/ListingClient.tsx');
const source = fs.readFileSync(filename, 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  fileName: filename,
}).outputText;

function loadRenderer(react = React) {
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  const requireOriginal = mod.require.bind(mod);
  function compileLocal(relative, parentFile) {
    const base = path.resolve(path.dirname(parentFile), relative);
    if (base.endsWith('.css')) return {};
    const file = [base + '.tsx', base + '.ts'].find(value => fs.existsSync(value));
    if (!file) throw Error(`Unknown local import ${base}`);
    const child = new Module(file, mod); child.filename=file; child.paths=mod.paths;
    const requireChild=child.require.bind(child);
    child.require = id => id === 'react' ? react : id.startsWith('.') ? compileLocal(id, file) : requireChild(id);
    child._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},fileName:file}).outputText,file);
    return child.exports;
  }
  mod.require = (id) => id === 'react' ? react : id.startsWith('./collection/') ? compileLocal(id, filename) : requireOriginal(id);
  mod._compile(code, filename);
  return mod.exports.default;
}

const ListingClient = loadRenderer();
const styles = ['heritage', 'signature', 'modern', 'premier'];
const fixture = {
  address: '123 Test Way', city: 'Chandler', zip: '85248', price: 895000,
  status: 'Coming Soon', headline: 'A headline shared by preview and public pages',
  description: 'First paragraph.\n\nSecond paragraph.', beds: 3, baths: 2.5,
  garage: 2, sqft: 2071,
  photos: Array.from({ length: 23 }, (_, i) => `https://example.com/${i + 1}.jpg`),
  agent: { name: 'Test Agent', phone: '5550100', email: 'agent@example.com' },
};
function render(listing = fixture, style = 'modern', preview = true) {
  return renderToStaticMarkup(React.createElement(ListingClient, { listing, style, preview, slug: 'test-property' }));
}
function withoutStyles(html) { return html.replace(/<style>[\s\S]*?<\/style>/g, ''); }

for (const style of styles) {
  test(`${style} keeps headline, description, decimal facts, photos and preview gate`, () => {
    const html = render(fixture, style);
    assert.ok(html.includes(`listing--${style}`));
    assert.ok(html.includes(fixture.headline));
    assert.ok(html.includes(fixture.description));
    assert.ok(html.includes('2.5'));
    assert.ok(html.includes('2,071'));
    assert.equal((html.match(/aria-label="Show featured photo/g) || []).length, 3);
    assert.equal((html.match(/aria-label="Enlarge gallery photo/g) || []).length, 20);
    assert.match(html, /<button disabled="">Available when published<\/button>/);
    assert.match(render(fixture, style, false), /<button>Send Request<\/button>/);
  });

  test(`${style} omits blank facts but retains zero`, () => {
    for (const missing of ['', '  ', null, undefined]) {
      const html = withoutStyles(render({ ...fixture, beds: missing, baths: missing, garage: missing, sqft: missing }, style));
      assert.doesNotMatch(html, /panel-fact|> Beds|> Baths|> Car Garage|0 Sq Ft|Bedrooms|Bathrooms|Square feet/);
    }
    const zero = withoutStyles(render({ ...fixture, beds: 0, baths: 0, garage: 0, sqft: 0 }, style));
    assert.ok(style === 'premier' ? zero.includes('Bedrooms</span><strong>0') : zero.includes('0 Beds'));
    assert.ok(style === 'premier' ? zero.includes('Square feet</span><strong>0') : zero.includes('0 Sq Ft'));
  });
}

test('Premier falls back to summary and facts without photos', () => {
  const html = withoutStyles(render({ ...fixture, photos: [] }, 'premier'));
  assert.match(html, /3 Beds/);
  assert.match(html, /2\.5 Baths/);
  assert.match(html, /2,071 Sq Ft/);
  assert.match(html, /2 Car Garage/);
  assert.doesNotMatch(html, /<aside class="premier-panel"/);
});

test('MP4 and WebM use the selected poster, with or without a URL query', () => {
  for (const video_url of ['https://example.com/video.mp4', 'https://example.com/video.webm?version=2']) {
    assert.match(render({ ...fixture, video_url, video_poster_url: 'https://example.com/poster.jpg' }), /<video[^>]+poster="https:\/\/example.com\/poster.jpg"/);
    assert.doesNotMatch(render({ ...fixture, video_url }), /<video[^>]+poster=/);
  }
});

test('contact class is isolated from the main site marketing section', () => {
  assert.ok(render().includes('class="agent-contact"'));
  assert.doesNotMatch(source, /\.listing \.contact\b|className="contact"/);
});

test('retains the public-site hero and email/inquiry behaviors', () => {
  assert.match(source, /\.listing \.hero\{position:relative;display:block/);
  assert.ok(render().includes('Email Agent'));
  assert.ok(source.includes('setFallbackEmailHref'));
  assert.ok(source.includes('setInquiryError'));
});

test('modal opens, Escape cancels, cleanup restores scroll, and reopening works', () => {
  let index = 0;
  let effects = [];
  const hooks = [];
  const events = [];
  const dialog = { showModal: () => events.push('open'), close: () => events.push('close') };
  const fakeReact = {
    ...React,
    useState(initial) { const i = index++; if (!(i in hooks)) hooks[i] = initial; return [hooks[i], value => { hooks[i] = typeof value === 'function' ? value(hooks[i]) : value; }]; },
    useRef(initial) { const i = index++; if (!(i in hooks)) hooks[i] = { current: initial }; return hooks[i]; },
    useEffect(effect) { effects.push(effect); },
  };
  const Component = loadRenderer(fakeReact);
  const rerender = () => { index = 0; effects = []; return Component({ listing: fixture, preview: true }); };
  function find(node, predicate) {
    if (!node || typeof node !== 'object') return null;
    if (Array.isArray(node)) { for (const child of node) { const match = find(child, predicate); if (match) return match; } return null; }
    return predicate(node) ? node : find(node.props?.children, predicate);
  }
  const previousDocument = global.document;
  global.document = { body: { style: { overflow: 'auto' } }, activeElement: { isConnected: true, focus: () => events.push('focus') } };
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const tree = rerender();
      find(tree, node => node.props?.['aria-label'] === 'Enlarge gallery photo 1').props.onClick();
      const openTree = rerender();
      const modal = find(openTree, node => node.type === 'dialog');
      assert.ok(modal, 'uses the native modal dialog for focus containment');
      modal.props.ref.current = dialog;
      const cleanup = effects[1]();
      assert.equal(global.document.body.style.overflow, 'hidden');
      const image = {};
      modal.props.onClick({ target: image, currentTarget: {} });
      assert.ok(find(rerender(), node => node.type === 'dialog'), 'clicking an image does not dismiss the modal');
      let prevented = false;
      modal.props.onCancel({ preventDefault() { prevented = true; } });
      assert.ok(prevented);
      assert.equal(find(rerender(), node => node.type === 'dialog'), null);
      cleanup();
      assert.equal(global.document.body.style.overflow, 'auto');
    }
    assert.deepEqual(events, ['open', 'close', 'focus', 'open', 'close', 'focus']);

    let tree = rerender();
    find(tree, node => node.props?.['aria-label'] === 'Enlarge gallery photo 1').props.onClick();
    tree = rerender();
    find(tree, node => node.props?.['aria-label'] === 'Close photo').props.onClick();
    assert.equal(find(rerender(), node => node.type === 'dialog'), null, 'Close photo dismisses the modal');

    find(rerender(), node => node.props?.['aria-label'] === 'Enlarge gallery photo 1').props.onClick();
    const modal = find(rerender(), node => node.type === 'dialog');
    const backdrop = {};
    modal.props.onClick({ target: backdrop, currentTarget: backdrop });
    assert.equal(find(rerender(), node => node.type === 'dialog'), null, 'backdrop dismisses the modal');
  } finally {
    if (previousDocument === undefined) delete global.document; else global.document = previousDocument;
  }
});


test('collection is opt-in, has full gallery, three retained hero slides and the real showing form', () => {
  const html = render(fixture, 'collection', false);
  assert.ok(html.includes('pw-website'));
  assert.equal((html.match(/data-pw-slide=/g)||[]).length,3);
  assert.equal((html.match(/data-gallery-index=/g)||[]).length,23);
  assert.match(html, /aria-label="Showing request"/);
  assert.match(html, /name="slug" value="test-property"/);
  assert.ok(html.includes('Request showing'));
  assert.doesNotMatch(html,/PROPERTY WEBSITE PREVIEW|Preview only:|<fieldset disabled/);
  assert.ok(html.includes('Equal Housing Opportunity'));
  assert.ok(html.includes('Get directions'));
  assert.match(html, /id="request-showing"/);
  assert.match(html, /id="showing"/);
  assert.match(html, /href="#showing"/);
  assert.ok(render({...fixture,page_style:'collection'},null,false).includes('pw-website'));
  assert.ok(render({...fixture,page_style:'modern'},null,false).includes('listing--modern'));
});
test('collection preview stays disabled and headshot preference is scoped with safe default', () => {
  const listing = {...fixture,agent:{...fixture.agent,photo:'https://example.com/agent.jpg'}};
  assert.ok(render(listing,'collection',true).includes('PROPERTY WEBSITE PREVIEW'));
  assert.match(render(listing,'collection',true),/<fieldset disabled/);
  assert.match(render(listing,'collection',false),/class="pw-agent-photo"/);
  const settings={version:1,pieces:{website:{showAgentPhoto:false},flyer:{showAgentPhoto:true,description:'private flyer copy'}}};
  const hidden=render({...listing,marketing_settings:settings},'collection',false);
  assert.doesNotMatch(hidden,/class="pw-agent-photo"|private flyer copy/);
  assert.ok(hidden.includes('Test Agent'));
  assert.ok(hidden.includes(fixture.description));
  const legacy=render({...listing,marketing_settings:settings},'modern',false);
  assert.ok(legacy.includes('https://example.com/agent.jpg'), 'legacy page remains unchanged until opted into collection');
});

test('showing submission locks synchronously, permits retry after failure and never submits preview', async () => {
  let index=0; const hooks=[];
  const react={...React,useState(initial){const i=index++;if(!(i in hooks))hooks[i]=initial;return [hooks[i],value=>hooks[i]=typeof value==='function'?value(hooks[i]):value];},useRef(initial){const i=index++;if(!(i in hooks))hooks[i]={current:initial};return hooks[i];},useEffect(){}};
  const Component=loadRenderer(react);
  function find(node,predicate){if(!node||typeof node!=='object')return null;if(Array.isArray(node)){for(const child of node){const found=find(child,predicate);if(found)return found;}return null;}return predicate(node)?node:find(node.props?.children,predicate);}
  const renderTree=preview=>{index=0;return Component({listing:fixture,slug:'test-property',preview});};
  const originalFetch=global.fetch, OriginalFormData=global.FormData;
  let calls=0, finish;
  global.FormData=class{constructor(){this.values=new Map([['name','Example Visitor'],['email','visitor@example.test'],['message','Mock only']]);}get(key){return this.values.get(key);}set(key,value){this.values.set(key,value);}};
  global.fetch=()=>{calls++;return new Promise(resolve=>{finish=resolve;});};
  const event={preventDefault(){},currentTarget:{}};
  try{
    await find(renderTree(true),node=>node.type==='form').props.onSubmit(event);assert.equal(calls,0);
    let handler=find(renderTree(false),node=>node.type==='form').props.onSubmit;
    const sending=handler(event);await handler(event);assert.equal(calls,1,'same-tick double submit is ignored');
    finish(new Response('',{status:503}));await sending;
    handler=find(renderTree(false),node=>node.type==='form').props.onSubmit;
    const retry=handler(event);assert.equal(calls,2,'failed delivery unlocks a user retry');
    finish(Response.json({ok:true}));await retry;
    assert.equal(find(renderTree(false),node=>node.type==='form'),null,'success replaces form and prevents accidental resubmission');
  }finally{global.fetch=originalFetch;global.FormData=OriginalFormData;}
});

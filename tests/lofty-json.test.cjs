const test=require('node:test'),assert=require('node:assert/strict');const {loader}=require('./load-ts.cjs');const {parseLoftyJson}=loader()('lib/agent-connection.ts');
test('plain unsafe integers stay exact; safe boundaries, nested arrays and quoted escapes keep meaning',()=>{
 const raw=String.raw`{"n":9223372036854775807,"negative":-9223372036854775808,"array":[9007199254740990,9007199254740991,9007199254740992,-9007199254740991,-9007199254740992],"nested":{"n":9223372036854775807},"text":"9223372036854775807","escaped":"a \\\"9223372036854775807\\\" \\ ","decimal":1.25,"exponent":1e3}`;
 const data=parseLoftyJson(raw),ordinary=JSON.parse(raw);
 assert.equal(data.n,'9223372036854775807');assert.equal(data.negative,'-9223372036854775808');assert.deepEqual(JSON.parse(JSON.stringify(data.array)),[9007199254740990,9007199254740991,'9007199254740992',-9007199254740991,'-9007199254740992']);assert.equal(data.nested.n,'9223372036854775807');assert.equal(data.text,ordinary.text);assert.equal(data.escaped,ordinary.escaped);assert.equal(data.decimal,'1.25');assert.equal(data.exponent,'1e3');
 for(const token of ['1.00000000000000001','9007199254740991.1','9007199254740992.0','9.007199254740992e15','1e0']){const value=parseLoftyJson('{"id":'+token+'}').id;assert.equal(value,token);assert.doesNotMatch(value,/^[1-9][0-9]*$/);}
});
test('lexical preservation never repairs malformed JSON, unquoted large keys or leading zeroes',()=>{
 for(const raw of ['{9007199254740993:1}','{"id":09223372036854775807}','{"id":-09223372036854775807}','{"id":+9223372036854775807}','{"id":9223372036854775807,}','{"id":9223372036854775807','{"id":9223372036854775807x}','{"id":1e}','{"id":1.}','{"text":"unterminated}','[9223372036854775807 2]'])assert.throws(()=>parseLoftyJson(raw));
 assert.throws(()=>parseLoftyJson(' '.repeat(262145)),/too large/);
});

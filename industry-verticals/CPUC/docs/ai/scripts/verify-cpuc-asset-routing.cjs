const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
require('next/dist/server/node-environment-baseline');
const { unstable_doesMiddlewareMatch } = require('next/experimental/testing/server');

// Read the actual static matcher without initializing Sitecore clients.
const root = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(root, 'src/proxy.ts'), 'utf8');
const configSource = source.slice(source.indexOf('export const config ='));
const compiled = ts.transpileModule(configSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const result = { exports: {} };
new Function('exports', compiled)(result.exports);
const matches = (url) => unstable_doesMiddlewareMatch({ config: result.exports.config, url });

for (const asset of fs.readdirSync(path.join(root, 'public/cpuc'))) {
  assert.equal(matches(`/cpuc/${asset}`), false, `${asset} must bypass Sitecore page routing`);
}
for (const route of ['/', '/articles', '/articles/ride-support-for-electric-rideshare']) {
  assert.equal(matches(route), true, `${route} must retain Sitecore page routing`);
}
console.log('CPUC bundled assets bypass proxy; Sitecore page routes remain matched.');

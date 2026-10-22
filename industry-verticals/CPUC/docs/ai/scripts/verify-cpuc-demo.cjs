/* Local fixture QA with actual components, React and Sitecore SDK. No SDK mocks.
 * Run from starter: node docs/ai/scripts/verify-cpuc-demo.cjs
 * Does not verify live Sitecore delivery. Utility bar is labeled scaffolding; Header uses its disabled-search fallback.
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Module = require('node:module');
const root = path.resolve(__dirname, '../../..');
const appRequire = Module.createRequire(path.join(root, 'package.json'));
const ts = appRequire('typescript');
const React = appRequire('react');
const { renderToStaticMarkup } = appRequire('react-dom/server');
const sdk = appRequire('@sitecore-content-sdk/nextjs');
const sass = appRequire('sass');
const fixture = JSON.parse(fs.readFileSync(path.join(root, 'docs/ai/demos/cpuc/content-map.yaml'), 'utf8'));
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...args) {
  if (/^(components|lib|src)\//.test(request)) request = path.join(root, request.startsWith('src/') ? request : `src/${request}`);
  return originalResolve.call(this, request, parent, ...args);
};
const compile = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 }, fileName: filename,
}).outputText, filename);
require.extensions['.tsx'] = compile;
require.extensions['.ts'] = compile;
const { cpucImage } = require(path.join(root, 'src/lib/cpuc-image.ts'));
const cmsImage = { value: { src: '/-/media/custom.png', alt: 'Authored image' }, editable: '<img />' };
assert.equal(cpucImage(cmsImage, '/cpuc/logo.png', 'Seal'), cmsImage, 'preserve CMS image and editing metadata');
assert.equal(cpucImage({ value: {} }, '/cpuc/logo.png', 'Seal').value.src, '/cpuc/logo.png', 'empty layout image uses bundled asset');
assert.equal(cpucImage(undefined, '/cpuc/hero.jpg', 'Hero').value.alt, 'Hero', 'missing layout image retains accessible alternative');

const attrs = (xml) => Object.fromEntries([...xml.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value.replace(/&amp;/g, '&').replace(/&quot;/g, '"')]));
const field = (value) => {
  if (value.startsWith('<image ')) return { value: attrs(value) };
  if (value.startsWith('<link ')) {
    const data = attrs(value);
    return { value: { ...data, href: data.linktype === 'anchor' ? `#${data.anchor}` : data.url || '' } };
  }
  return { value };
};
const fields = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => [key, field(value)]));
const queryValues = (data) => Object.fromEntries(Object.entries(fields(data)).map(([key, value]) => [key[0].toLowerCase() + key.slice(1), { jsonValue: value }]));
const queryFields = (data, children) => ({ data: { datasource: { ...queryValues(data), children: { results: children.map((item, index) => ({ id: `fixture-${index}`, ...queryValues(item) })) } } } });
const load = (name, variant = 'Cpuc') => require(path.join(root, `src/components/${name}.tsx`))[variant];
// Exercise the Header's explicitly unavailable search state, independent of local env.
process.env.NEXT_PUBLIC_SEARCH_INDEX_ID = '';
const components = {
  header: load('navigation/Header'),
  hero: load('pagecontent/HeroBanner'), services: load('pagecontent/ThreeColumnCta'), programs: load('pagecontent/PromoCta'),
  footer: load('navigation/Footer'), contact: load('navigation/Footer', 'CpucContact'), news: load('uiim/cpuc/NewsEvents'), issues: load('uiim/cpuc/KeyIssues'),
};
function render(name, data, editing = false) {
  const page = { mode: { isEditing: editing, isPreview: false, isNormal: !editing }, layout: { sitecore: { context: { pageEditing: editing, language: 'en' }, route: { name: 'fixture', fields: {} } } } };
  const child = React.createElement(components[name], { fields: data, params: { RenderingIdentifier: `cpuc-${name}`, styles: 'fixture-render' }, rendering: { componentName: name, uid: name }, page });
  return renderToStaticMarkup(React.createElement(sdk.SitecoreProviderReactContext.Provider, { value: { page, componentMap: new Map(), loadImportMap: async () => ({}) } }, child));
}
const data = Object.fromEntries(Object.entries(fixture.parents).map(([name, value]) => [name, fields(value)]));
data.header = fields({ Title: 'Public Utilities Commission', Tagline: 'CALIFORNIA', LogoImage: '<image src="/cpuc/logo.png" width="100" height="100" alt="California state seal" />' });
data.news = queryFields(fixture.parents.news, fixture.newsChildren);
data.issues = queryFields(fixture.parents.issues, fixture.issuesChildren);
const output = Object.fromEntries(Object.keys(components).map((name) => [name, render(name, data[name])]));
for (const name of Object.keys(components)) {
  if (name !== 'header') assert.match(render(name, undefined), /is-empty-hint|content is unavailable/, `${name} fallback`);
  if (name !== 'header') assert.doesNotThrow(() => render(name, data[name], true), `${name} editing`);
}
for (const name of ['news', 'issues']) assert.doesNotThrow(() => render(name, { data: { datasource: {} } }, true), `${name} empty editing fields`);
assert.equal((output.news.match(/class="cpuc-news__date"/g) || []).length, 6);
assert.equal((output.news.match(/class="cpuc-news__column"/g) || []).length, 2);
const newsColumn = output.news.split('class="cpuc-news__column"')[1];
assert.ok(newsColumn.includes(fixture.newsChildren[0].ItemTitle));
assert.ok(!newsColumn.includes(fixture.newsChildren[3].ItemTitle));
assert.equal((output.issues.match(/class="cpuc-issues__link"/g) || []).length, 8);
assert.match(output.hero, /hero\.jpg/);
assert.match(output.hero, /href="#cpuc-news"/);
assert.match(output.programs, /consumer-programs\.jpg/);
assert.match(output.programs, /consumer-programs-and-services/);
for (const item of [...fixture.newsChildren, ...fixture.issuesChildren]) assert.ok((output.news + output.issues).includes(item.ItemTitle.replace(/&/g, '&amp;')), `title ${item.ItemTitle}`);
assert.match(output.header, /Public Utilities Commission/);
assert.match(output.header, /disabled=""/);
assert.match(output.header, /Search is unavailable in this demo/);
const css = sass.compile(path.join(root, 'src/assets/sass/_cpuc.scss'), { style: 'expanded' }).css;
const scaffold = '<!-- Utility bar validation scaffolding only; not the actual Eyebrow/placeholder render. --><div class="cpuc-utility"><div class="container">CA.gov <span style="float:right">Contact Us　 Translate　 Settings</span></div></div>';
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CPUC local component validation fixture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;800&amp;display=swap"><style>body{margin:0}*{box-sizing:border-box}${css}</style></head><body><aside style="padding:8px;background:#fff7d6;font:14px sans-serif">Local validation fixture — actual demo components; utility bar is scaffolding; real Header has disabled search. This is not the live Sitecore page.</aside>${scaffold}${output.header}<main>${output.hero}${output.services}${output.news}${output.programs}${output.issues}${output.contact}</main>${output.footer}</body></html>`;
// A static server cannot run Next's image optimizer. Only the preview artifact
// rewrites its generated image URLs to the same original local assets.
const staticHtml = html
  .replace(/\s(?:srcSet|srcset)="[^"]*"/g, '')
  .replace(/src="\/_next\/image\?url=([^&"]+)[^"]*"/g, (_, url) => `src="${decodeURIComponent(url)}"`);
fs.writeFileSync(path.join(root, 'docs/ai/demos/cpuc/preview.html'), staticHtml);
console.log('PASS: 8 actual variants; datasource fallbacks; editing; 6 grouped dates; 8 issue links; authored titles; images; CTA; Sass.');
console.log('Wrote docs/ai/demos/cpuc/preview.html. Utility bar is scaffolding; Header disabled-search state verified. Live Sitecore remains unverified.');

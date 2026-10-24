/* Actual React + Sitecore SDK rendering checks. This fixture is not live CMS delivery. */
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
const compile = (mod, filename) => mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 }, fileName: filename,
}).outputText, filename);
require.extensions['.tsx'] = compile;
require.extensions['.ts'] = compile;
const components = require(path.join(root, 'src/components/bcaa/BcaaVariants.dev.tsx'));
const quick = require(path.join(root, 'src/components/bcaa/BcaaQuickActions.tsx')).Default;
const fixture = JSON.parse(fs.readFileSync(path.join(root, 'docs/ai/demos/bcaa/content-map.yaml')));
const names = { Header: 'BcaaHeader', Carousel: 'BcaaCarousel', HeadingCta: 'BcaaHeading', ThreeColumnCta: 'BcaaThreeColumns', FourColumnCta: 'BcaaFourColumns', CtaBanner: 'BcaaBanner', Footer: 'BcaaFooter' };
function render(section, fields, editing = false) {
  const page = { mode: { isEditing: editing, isPreview: false, isNormal: !editing }, layout: { sitecore: { context: { pageEditing: editing, language: 'en' }, route: { name: 'BCAA', fields: {} } } } };
  const Component = section.componentName === 'BcaaQuickActions' ? quick : components[names[section.componentName]];
  const child = React.createElement(Component, { fields, params: section.params, rendering: { componentName: section.componentName, uid: String(section.position) }, page });
  return renderToStaticMarkup(React.createElement(sdk.SitecoreProviderReactContext.Provider, { value: { page, componentMap: new Map(), loadImportMap: async () => ({}) } }, child));
}
const output = fixture.sections.map(section => {
  assert.doesNotThrow(() => render(section, undefined), `${section.componentName}: missing datasource`);
  assert.doesNotThrow(() => render(section, {}, true), `${section.componentName}: empty editing fields`);
  assert.doesNotThrow(() => render(section, section.fields, true), `${section.componentName}: editing`);
  return render(section, section.fields);
});
assert.equal((output[1].match(/aria-roledescription="slide"/g) || []).length, 5);
assert.equal((output[1].match(/hidden=""/g) || []).length, 4);
assert.match(output[1], /aria-label="Next slide"/);
assert.match(output[0], /aria-expanded="false"/);
assert.equal((output[2].match(/<li/g) || []).length, 8);
assert.equal((output[4].match(/<article/g) || []).length, 3);
assert.equal((output[6].match(/<article/g) || []).length, 4);
assert.equal((output[9].match(/<article/g) || []).length, 3);
assert.ok(!output.join('').includes('example.com'));
assert.ok(!output.join('').includes('/sitecore/content/'));
const quickSection = fixture.sections.find(s => s.componentName === 'BcaaQuickActions');
const queryFields = { data: { datasource: { title: { jsonValue: quickSection.fields.Title }, children: { results: quickSection.fields.items.map(item => ({ id: item.id, label: { jsonValue: item.fields.Label }, link: { jsonValue: item.fields.Link } })) } } } };
assert.equal((render(quickSection, queryFields).match(/<li/g) || []).length, 8, 'GraphQL list shape resolves all quick actions');
assert.match(output[3], /<em>Forward<\/em>/, 'normal intro renders approved serif accent');
assert.ok(!render(fixture.sections[3], fixture.sections[3].fields, true).includes('<em>Forward</em>'), 'editing retains original complete title field');
const css = sass.compile(path.join(root, 'src/assets/basic/_bcaa.scss')).css;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>BCAA component preview</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"><style>body{margin:0} ${css}</style></head><body><aside style="padding:8px;background:#fff7d6;font:13px sans-serif">Local BCAA component preview — actual SDK components and source-site content. Live CMS assembly is pending.</aside>${output.join('')}</body></html>`;
fs.writeFileSync(path.join(root, 'docs/ai/demos/bcaa/preview.html'), html);
console.log('PASS: 11 sections, 5 slides, 8 actions, 3 service cards, 4 savings cards, 3 blog cards; missing/empty/editing fields; links and Sass.');

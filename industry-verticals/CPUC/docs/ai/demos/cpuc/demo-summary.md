# CPUC implementation status

**Custom code and editable content are ready; the live homepage is not assembled.**
This is a partial-build status report, not a completed-demo summary. Phase 6
remains failed in demo-progress.yaml.

## Ready

- Approved navy, teal, yellow and gold theme with responsive screenshot-based layouts.
- Cpuc variants for Eyebrow, Header, HeroBanner, ThreeColumnCta, PromoCta,
  NewsEvents, KeyIssues and Footer; CpucContact variant for the gray footer tier.
- Two new editable list components: six news/meeting entries and eight issue links.
- Ten populated CPUC datasources, original homepage photographs and seal, and three
  vector service icons. Assets are served by the app from public/cpuc, not DAM.
- Existing component variants preserved; props extracted to sidecars; component
  maps regenerated through tooling.
- Project configuration and manifest now target Financial/cpuc. The inherited
  fmc-custom-demo manifest is retained as sitecore-manifest.fmc-reference.yaml.
- Local SDK render checks, TypeScript, Sass and app lint pass. Production code
  compiles; full build needs local Sitecore delivery credentials.

## Remaining

1. Complete page placement, datasource assignments and variant selections using
   manual-tasks.md and variant-checklist.md. Sitecore's assembly API returned 500;
   the homepage layout is still the original banking demo.
2. Configure local Sitecore delivery credentials yourself, using the starter's
   environment example. Do not commit local environment files. The MCP login
   authorizes the agent; it does not supply the Next.js app's delivery credentials.
3. Configure a CPUC search index and verify the search route. No index produces
   an accessible disabled search; translation/settings integrations remain open.
4. Deploy the code, verify the actual editing host and publish only when ready.
   Update site/page/partial-design thumbnails in Channels.

## Review locally

The local browser preview at http://127.0.0.1:8037/ is an isolated validation
fixture. It renders eight real variants and labels the utility scaffolding.
Read verification.md for test details and known limitations.

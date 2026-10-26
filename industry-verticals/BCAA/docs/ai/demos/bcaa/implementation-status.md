# BCAA implementation status

Updated 2026-10-26. Theme, build plan and BCAA-specific variants approved by the user.

Implemented locally:
- Seven Bcaa variant exports: Header, Footer, Carousel, HeadingCta, ThreeColumnCta, FourColumnCta and CtaBanner.
- New BcaaQuickActions component supporting both resolved items and a GraphQL datasource/children shape.
- Scoped BCAA styling, responsive layouts, Inter font and Georgia intro accent.
- Exact source-site content mapped for 11 sections. Official source image URLs retained; no Content Hub upload or DAM IDs claimed.
- Public destinations replace BCAA production-only action-modal URLs.
- Content SDK nextjs 2.4.1 and content 2.3.1 fix browser-bundle tooling leakage. Removed unused legacy Sass importer incompatible with the current Sass API.

Saved in Sitecore:
- Seven Bcaa variant definitions. See created-variants.json for verified IDs.
- New Carousel variants container under the BCAA site only.
- Created and populated BCAA - intro (4bea1427-63f5-4abb-8cf1-4b9f51463d40), verified after saving. Carousel variant changed to Bcaa during deployment verification; the canvas still reported a missing React implementation. Save persistence must be checked after signing in again. No datasources reassigned, no content deleted, no publish action performed.

Validation:
- Actual React and Content SDK SSR checks pass for all 11 sections, five slides, eight actions, service/savings/blog card counts, empty/missing/editing fields and the GraphQL quick-actions shape.
- TypeScript and full app lint pass.
- Next webpack compilation and TypeScript pass. Final page-data collection fails with MV-007 because local delivery contextId/apiHost/apiKey is absent. Environment files were not edited.
- Desktop 1440px and mobile 390px visual fixtures inspected; no horizontal overflow. These fixtures are static SSR and do not validate hydrated carousel/menu events.

Remaining:
1. Deployment confirmed Complete for BCAA commit 9ea4099 (October 24). Resolve Carousel/Footer missing React implementations before further assembly; selecting Bcaa did not immediately resolve Carousel. User restored Pages session on October 26. Carousel Bcaa assignment persisted but still failed. Explicit component exports now replace re-exports; regenerated SDK import map includes all seven BCAA helper imports, which were previously absent. Live validation after redeployment remains required. Do not assume the deployment failed or that re-export syntax is the cause without further evidence.
2. Create QuickActions parent/child templates and rendering; register it under BCAA Available Renderings. See quick-actions-authoring.yaml.
3. Create the remaining 10 BCAA-specific datasource items and 13 list children using authoring-payloads.json.
4. Put Header navigation rich text in header-right; the Header variant preserves this placeholder. Do not modify the shared Header template to add Navigation.
5. Assemble existing Home in small saved batches; set seven Bcaa variants and appropriate bcaa-intro/bcaa-blog styles.
6. Verify live hydration, datasource queries, images, links and responsive layouts. Publishing is a separate step.

The live BCAA homepage is still the existing Prospera page until deployment and assembly are complete.

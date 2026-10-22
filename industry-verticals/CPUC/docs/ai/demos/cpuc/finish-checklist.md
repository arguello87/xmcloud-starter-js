# CPUC final checks

- [x] Five Main sections placed in screenshot order with CPUC variants.
- [x] Hero and Key Issues prepared datasources assigned.
- [x] Consumer Assistance and Consumer Programs copied into assigned local datasources.
- [x] NewsEvents datasource and six children verified.
- [x] Header assigned CPUC content; old banking logo/navigation removed.
- [x] Utility left and right populated; old switchers removed.
- [x] Both Footer instances have separate content and correct variants.
- [x] Contact footer moved above resources using Content Editor Final Layout controls; saved order verified by MCP.
- [ ] Verify seal, hero photo, service icons and Consumer Programs photo. Recent editor screenshots showed placeholders. Unauthenticated asset requests return 403, so they do not establish whether files exist.
- [x] NewsEvents supplies cpuc-news when no Rendering Identifier is authored; explicit identifiers remain supported.
- [ ] Configure a CPUC search index and test /search; search currently disabled.
- [ ] Check desktop/mobile, keyboard access and external links in the real preview.
- [ ] Publish reviewed content and partial designs when approved. No publishing has occurred.
- [ ] Update Channels thumbnails.

## Validated image repair

Sitecore layout serialization can return an empty ImageField value for the relative src-only XML used by this demo. CPUC Header, HeroBanner, PromoCta and ThreeColumnCta now use bundled public/cpuc images only when the CMS field has no src. Valid authored images and their editing metadata are preserved. The SDK fixture checks cover empty and valid image fields.

Webpack production compilation and TypeScript passed. Full build stops at page-data collection with MV-007 because local delivery credentials are absent. Remote deployment and image rendering still require verification. Search remains disabled until a CPUC index is supplied.

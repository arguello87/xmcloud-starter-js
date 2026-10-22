# CPUC demo setup review

## Verified target

- Site: `cpuc`, ID `2dc81807-b75b-4528-98f6-c6309a1ab3c0`.
- Site root: `/sitecore/content/Financial/cpuc`.
- Existing Home: `/sitecore/content/Financial/cpuc/Home`, ID `ab52cb47-003f-4f87-96fc-9faf323099da`.
- Source: https://www.cpuc.ca.gov/ and user-supplied full desktop screenshot.
- User confirmed the connected organization and tenant are correct.

## Configuration mismatch

The existing `config/project.yaml` and `manifests/sitecore-manifest.yaml` describe
`main/main-website` and the `fmc-custom-demo` library. Four structural paths for
that library returned no items. Do not use its cached GUIDs for this demo.

The connected environment instead contains:

- `/sitecore/templates/Project/click-click-launch`
- `/sitecore/layout/Renderings/Project/click-click-launch`
- `/sitecore/content/Financial/cpuc/Data`
- `/sitecore/content/Financial/cpuc/Presentation/Headless Variants`
- `/sitecore/content/Financial/cpuc/Presentation/Available Renderings`

The template library has `Components` and `Presentation` children, rather than
the folder structure assumed by the generic demo workflow. A compatible live
inventory must be resolved before creating or wiring items. Existing manifest
entries have not been overwritten.

## Existing implementation

The local app contains Hero, Carousel, ThreeColumnCta, TwoColumnCta, PromoCta,
ArticleList, DocumentsList, Header and Footer implementations. The live Home
contains eleven component instances, including nested content, with banking
demo copy and imagery. Existing content needs review and deliberate replacement.

Live Hero rendering verified at
`/sitecore/layout/Renderings/Project/click-click-launch/Banners/Hero` with datasource
template `/sitecore/templates/Project/click-click-launch/Components/Banners/Hero`.

## Current checkpoint

Theme, component plan and custom variants approved. Implementation completed; page assembly blocked by Agent API 500 errors. See implementation-status.md.
Custom code, scoped Sass, CPUC-owned content and configuration changes are recorded in the live manifest and live-items.json.
Unrelated pre-existing working-tree edits are present and must be preserved.

Next: complete the Pages assembly checklist, configure delivery credentials and verify the actual editing host.

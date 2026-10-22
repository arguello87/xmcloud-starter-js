# CPUC demo — remaining manual tasks

## Status

The code, ten populated datasources, fourteen child items, two new renderings and
nine custom variant definitions are ready. **The Sitecore page layout is not
assembled.** The Agent API failed on both component insertion attempts (500) and
on datasource assignment (`No saveItem in response (500)`). Final readback still
shows the original eleven component instances. No publishing was performed.

Latest check (2026-10-22): Home still contains the eleven original instances.
Code, assets and this checklist were committed and pushed to GitHub branch
`Verticals` in commit `a5d76fe`. Remote deployment has not yet been verified.
Page Builder login completed. On 2026-10-22 the deployed app loaded, but
browser interactions failed; after refresh Pages reported `TENANT_UNREACHABLE`
and `ERRORS.DEVICES_BREAKPOINT_API_ERROR_MESSAGE`. No layout changes were made
in this attempt. Restore environment access before continuing assembly.

## 1. Name workaround tested — API error remains

You changed Channels Name from `CPUC` to `cpuc` to match the system name.
A fresh-name insertion and datasource assignment were retried after saving. Both
still failed with HTTP 500. The name change did not resolve the error. Do not
keep changing the system name or repeating the same workaround.

Provide Sitecore support the Home page ID
`ab52cb47-003f-4f87-96fc-9faf323099da`, the insertion error `Internal Server Error
(500)`, and assignment error `No saveItem in response (500)`. The layout still
contains eleven original component instances.

### Latest assembly attempt — 2026-10-22

- Carousel placement `124106de-fb02-4b43-a521-a309fc75a5bc` was removed and its absence verified through Marketer MCP.
- Remaining deletion attempts appeared in the editor but did not persist: Pages reported "The page is currently not able to save changes. Reload the page and try again."
- Authoritative readback shows ten original component instances remain, including the nested App Promo. Do not treat the visually emptied Layers tree as saved.
- On reload, Pages reported "Cannot connect to tenant" / "The instance you are trying to open is currently not accessible. Contact your system administrator."
- No CPUC sections were inserted, and no datasource or variant assignments were made in this attempt.

## 2. Assemble Home in Pages

Open `/sitecore/content/Financial/cpuc/Home` in English.
Remove the old banking components from this page (do not delete their underlying
content items). There are ten top-level instances plus one nested instance:

| Existing component | Instance ID |
|---|---|
| Carousel | `124106de-fb02-4b43-a521-a309fc75a5bc` |
| Promo CTA | `d49a8931-f041-4988-9cc3-f2400e6422d0` |
| Five Column CTA | `b882746c-c313-4283-8f58-b9402bcf9c6a` |
| Three Column CTA | `d54d53b4-1aa4-4998-9bdf-eb934c32cfb6` |
| Promo CTA | `633506e7-54d0-4410-9051-72fb4c9fecb4` |
| Promo CTA | `1a516b9b-cc7b-49c9-a8eb-5be281a98612` |
| Two Column CTA | `0ed2d2c2-e9ef-4e40-b040-6289cb174e03` |
| Article List | `854de8ce-208f-494d-b7c8-c1162d00144f` |
| Documents List | `251b0936-4659-4127-9952-52ca5140d803` |
| App Promo | `7ebe6f29-1c6f-4138-8bf9-287acf0cd530` |
| App Promo | `70dcbc4b-026c-4084-8ecb-3275c1e71d58` |

The nested App Promo belongs to the first Promo CTA's placeholder; removing that
parent removes its placement too. Then insert these components in `headless-main`
in exactly this order. Assign the existing datasource shown; do not recreate it.

| Order | Component | Existing datasource | Datasource ID | Design variant |
|---|---|---|---|---|
| 1 | HeroBanner | `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Latest News` | `3a692945-bc17-439e-a02c-ba2af1e25ef7` | Cpuc |
| 2 | Three Column CTA | `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Consumer Assistance` | `db97ff31-8c0f-4bb2-b4eb-62d79281e08a` | Cpuc |
| 3 | NewsEvents | `/sitecore/content/Financial/cpuc/Data/CPUC Demo/News and Events/CPUC - News and Events` | `fed99adb-37ef-4125-b9b6-2cb20e03fb7c` | Cpuc |
| 4 | Promo CTA | `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Consumer Programs` | `a849bfea-0b34-4b29-b0f1-28c687f92b2d` | Cpuc |
| 5 | KeyIssues | `/sitecore/content/Financial/cpuc/Data/CPUC Demo/Key Issues/CPUC - Key Issues` | `a29a4288-8349-47f4-9d4e-30eb27343b79` | Cpuc |

For NewsEvents set Rendering Identifier to `cpuc-news` so the hero's Latest News
anchor scrolls to the updates. The two new renderings and HeroBanner have been
appended to Available Renderings; existing values were preserved.

## 3. Header partial design

Open `/sitecore/content/Financial/cpuc/Presentation/Partial Designs/Header`.

- Select the existing Header, variant **Cpuc**, datasource `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Header` (`d0c44cc2-1ca3-4728-bc89-509c01a00689`).
- The CPUC header datasource inherits the original Header template and adds editable Title, Tagline and SearchIndex fields. If the picker hides derived items, paste the datasource ID in Content Editor.
- Select the existing Eyebrow, variant **Cpuc**.
- Put a RichText component in `eyebrow-left` and assign `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Utility Left` (`06c44b9f-2b16-4e6a-bd6c-1abf8b68ee34`).
- Put a RichText component in `eyebrow-right` and assign `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Utility Right` (`2765e2da-77ff-41ce-b3b2-e3e38bb231a5`).
- Remove the old Theme Switcher / Language Switcher placements from those slots.
- Remove the old logo RichText and banking Navigation from the Header's editing
  placeholders; the Cpuc header renders its own seal/name and search.
- Translate and Settings behavior is not implemented. Add working controls only
  when their integrations are available; they are not nonfunctional links.

## 4. Footer partial design

Open `/sitecore/content/Financial/cpuc/Presentation/Partial Designs/Footer`.
Add a Footer instance before the existing Footer:

- First Footer: **CpucContact**, datasource `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Contact and Leadership` (`2a1ec10d-ba1e-40b1-b7dd-125808181838`).
- Existing Footer: **Cpuc**, datasource `/sitecore/content/Financial/cpuc/Data/CPUC Demo/CPUC - Resource Links` (`0c4db14b-452d-4c01-8bea-4cc2c1c3a02a`).

## 5. Local credentials, search, images and delivery

- Set the starter's Sitecore delivery credentials using its environment example. The full build currently stops with `[MV-007] Provide either contextId or both apiHost and apiKey`. MCP authentication does not configure the Next.js app. Local environment files were not edited.
- Enter the correct CPUC SearchIndex in the new header datasource, or configure
  the existing app's search index environment variable yourself. The header shows
  an accessible disabled search when no index is available. Verify `/search`
  exists and returns CPUC results before treating search as functional.
- Original CPUC photos and seal are in `public/cpuc`; editable Sitecore Image
  fields reference `/cpuc/...`. They require deploying this updated app. Content
  Hub was not configured and no DAM upload occurred. Upload to DAM and replace
  image fields if DAM-managed media is required.
- Deploy/build the code before selecting the custom variants in the remote
  editing host. Code was committed and pushed to `Verticals` (`a5d76fe`). Deployment has not
  been verified, and publishing has not been performed.
- Verify insert options on the new datasource folders and list parents in Content
  Editor: the MCP returned empty `updatedFields` for `__Masters` writes. The
  child content itself was read back successfully (six news/events, eight issues).
- Check desktop/mobile layout, links, keyboard access, and search against the
  actual editing host after assembly. Local fixture checks do not validate live
  layout-service ComponentQuery responses.
- Update site, page-design and partial-design thumbnails in Channels.

Optional personalization: after the base homepage is assembled, clone a CPUC
owned datasource for each audience and use Pages personalization. No audience or
personalization rules were created during this build.

## Small-batch save test — 2026-10-22

The first Promo CTA placement (`d49a8931-f041-4988-9cc3-f2400e6422d0`)
and its nested App Promo (`70dcbc4b-026c-4084-8ecb-3275c1e71d58`)
were removed and verified absent through MCP. Pages showed a saved timestamp.
The second top-level removal (Five Column CTA) transitioned to Saving and then
Unable to save. MCP confirms Five Column CTA remains; eight original instances
remain in total. No CPUC sections have been added. Smaller batches have not
resolved the save failure.

## Latest MCP skill retry — 2026-10-22

User removed remaining banking placements and inserted HeroBanner manually.
Fresh readback confirms only HeroBanner instance `10b7b928-b3ad-4ff7-b545-55c8a8cc1ebf`,
with datasource `local:/Data/HeroBanner 1`. Assigning CPUC - Latest News still
failed with `No saveItem in response (500)`. Adding ThreeColumnCta after it
failed with `Internal Server Error (500)`. Final readback confirms no layout or
datasource change from these calls. Failed add may have created an unused
`CPUC Assistance - Assembly Retry Oct22` datasource; do not use it instead of
the populated CPUC - Consumer Assistance item.

## Consumer Assistance content update — 2026-10-22

Prepared item is hidden by rendering Datasource Location filtering for Promo Folder children.
Copied all twelve prepared fields into the already-assigned CPUC-owned local datasource
`/sitecore/content/Financial/cpuc/Home/Data/CPCU Consumer Assistance`
(`c8334111-31b7-4d70-bf60-e9450d84c9cf`), version 1; readback verified all fields.
Three Column CTA instance: `71d3a38b-d0b0-416e-b58f-bf96f3df87e6`.
Hero remains assigned to prepared Latest News datasource. Select Cpuc design
variant and verify actual preview imagery separately. No publishing performed.

## Consumer Programs content update — 2026-10-22

Promo CTA instance `218beeea-d907-422c-bc79-e0971cadcd2c` uses local
`Promo CTA 2` datasource `7d333288-6337-484f-a24c-abba8fd81362`.
Seven CPUC fields were written to version 1 and read back successfully, including
photo, title, description and CTA; inherited placeholder eyebrow, subtitle and
secondary link cleared. NewsEvents parent and six children also verified wired.
Next: add KeyIssues below Promo CTA and assign prepared CPUC - Key Issues.

## Header cleanup — 2026-10-22

Removed misplaced RichText `da6c74a3-5e23-4820-bcc0-d33c89688e1f` and
Theme Switcher `d0291f80-d41e-4573-9abd-e186694b5c04` through Page Builder,
one at a time. MCP readback confirms only Eyebrow, Header and nested Language
Switcher remain. Left eyebrow slot is empty; add RichText with CPUC - Utility Left.

## Utility left populated — 2026-10-22

User placed RichText `76d16c4f-ba4e-49b3-af3c-a57cc3fdb736` correctly in
`/headless-header/eyebrow-left-0-4`. Populated assigned Text 3 datasource
`21b82357-e23a-4288-a03c-347d260ac780`, version 1, with prepared CA.gov and
social/email links. Readback verified. Right slot still contains Language Switcher.

## Utility right populated — 2026-10-22

Language Switcher removed by user. RichText `1454bc0e-23db-428c-b65e-4c4260cfa9dc`
is correctly placed in `/headless-header/eyebrow-right-0-4`. Assigned Text 4
(`d5875fe1-b7da-4b68-8bf4-c3f55e378cc5`), version 1, populated with Contact Us
link from prepared CPUC - Utility Right; readback verified. Both utility slots
now have content. Image delivery, search and footer configuration remain open.

## Contact footer added — 2026-10-22

Duplicated Footer via Pages; new instance `401a3ecb-6689-427b-98fd-3da278a299e0`
uses separate datasource `12c6acfa-9650-4597-a9a7-322ae6dc39a7`, populated with
Contact, About and Leadership content; fields read back. Selected CpucContact
for duplicate and Cpuc for original resource footer. Original resource
datasource preserved. Move-up browser action failed; contact footer still
needs moving above original resource footer manually.

## Footer order and code repair — 2026-10-22

Contact footer moved above resource footer using Content Editor Presentation > Details > Final Layout > Default > Controls > Move Up. MCP confirms contact instance precedes resource instance; original resource datasource preserved. Added CPUC-only bundled image fallback for empty SDK image values and default cpuc-news anchor. Source verification passes; full local build needs delivery credentials (MV-007). Deployment verification and publishing pending.

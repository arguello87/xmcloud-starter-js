# CPUC demo — remaining manual tasks

## Status

The code, ten populated datasources, fourteen child items, two new renderings and
nine custom variant definitions are ready. **The Sitecore page layout is not
assembled.** The Agent API failed on both component insertion attempts (500) and
on datasource assignment (`No saveItem in response (500)`). Final readback still
shows the original eleven component instances. No publishing was performed.

## 1. Name workaround tested — API error remains

You changed Channels Name from `CPUC` to `cpuc` to match the system name.
A fresh-name insertion and datasource assignment were retried after saving. Both
still failed with HTTP 500. The name change did not resolve the error. Do not
keep changing the system name or repeating the same workaround.

Provide Sitecore support the Home page ID
`ab52cb47-003f-4f87-96fc-9faf323099da`, the insertion error `Internal Server Error
(500)`, and assignment error `No saveItem in response (500)`. The layout still
contains eleven original component instances.

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
  editing host. No deployment, commit, push or publishing was performed here.
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

# CPUC homepage demo — build plan

Theme approved. Build plan and variant choice awaiting approval.

Target: `/sitecore/content/Financial/cpuc/Home`.
Code scope: `industry-verticals/CPUC`.

## Page sections

| # | What's on the page | Proposed implementation | Fit |
|---|---|---|---|
| 1 | Teal utility bar with California mark, social icons and utility links | Eyebrow, adapted for CPUC | Partial |
| 2 | White header with seal, commission name and search | Header with logo and search placeholder | Partial |
| 3 | Navy Latest News panel with a large photo and gold underline | HeroBanner split layout, subject to live rendering verification; live Hero or PromoCta alternatives | Partial |
| 4 | Complaint, late bill assistance and financial assistance links | ThreeColumnCta based on WithIcons | Close |
| 5 | News and Updates beside Selected Upcoming Meetings and Events | New editable NewsEvents component with dated link children | Custom |
| 6 | Consumer Programs and Services photo overlapping a yellow text panel | PromoCta with CPUC overlapping-image variant | Partial |
| 7 | Key Issues introduction beside eight icon links on yellow | New editable KeyIssues component with link children | Custom |
| 8 | Gray contact, about and leadership columns | Footer CPUC variant; verify and extend editable fields as needed | Partial |
| 9 | Teal resource-link columns, dark legal strip and copyright | Footer CPUC variant with grouped link data | Partial |

## Variant decision

Recommended: custom CPUC variants for the existing components to match the supplied
screenshot closely. Reuse the current component fields and renderings wherever
possible. New components cover the news/events and eight-link issues structures
that the existing components do not support cleanly.

Alternative: existing variants with the approved colors and content. This produces
a quicker approximation; overlapping panels, header, hero and footer differ from
the screenshot. News/events and key-issues data still need suitable editable models.

Search should use the app's existing search integration when configured. Verify
its route, index and result behavior before calling it functional; do not invent a
new search service. Utility controls with unavailable integrations need explicit
manual tasks rather than pretending to work.

## Implementation and placement

1. Resolve a CPUC-specific live component inventory. Actual Home renderings use
   `/sitecore/layout/Renderings/Project/Financial`; additional renderings exist
   under `click-click-launch`. Do not use stale fmc-custom-demo manifest IDs.
2. Inspect header/footer partial designs and their datasources before modifying
   them. Preserve shared content used by other sites. Record manual placement if
   required by MCP capabilities.
3. Create English CPUC-owned datasources and any new models. Keep content within
   `/sitecore/content/Financial/cpuc`; do not alter banking-site content.
4. Apply the approved theme through the actual Sass styling system. This app
   does not have the generic workflow's `src/app/globals.css`.
5. Implement approved variants/components; regenerate component maps with tooling.
6. Assemble the existing Home page. Reuse appropriate existing instances; record
   obsolete banking components for manual removal when the MCP cannot remove them.
7. Verify page wiring, lint, tests where available, build, and visual layout.

## Assets and manual tasks

Recover original homepage imagery and seal where available; screenshot image
crops are reference only. Content Hub upload credentials are not configured in
the project. Image upload route must be resolved before populating image fields;
otherwise provide a manual upload checklist.

Record variant selections, old-component removal, header/footer placement,
unavailable integrations and thumbnail updates in `manual-tasks.md`.

## Approval required

The demo workflow requires explicit approval of this plan and a choice between
custom CPUC variants and existing variants before content or code implementation.

# BCAA build preflight

Reference: https://www.bcaa.com/
Captured: 2026-10-24, desktop 1440px.

## Existing assets
- App: industry-verticals/BCAA
- Rendering host entry: BCAA
- Channels thumbnail already configured in prior work.

## Validation findings
- Project configuration and manifest agree with each other but both still target main/main-website. This is template metadata, not verified BCAA metadata.
- 29 manifest React file paths checked: none exist in this app.
- 27 of 29 manifest component keys absent from the generated component map.
- Live roots and item IDs remain unverified because Sitecore is at sign-in and Marketer MCP is unavailable.

## Reference sections to assess after preflight
Navigation; five-slide hero; eight quick actions; introduction; membership/insurance/automotive cards; four savings cards; membership banner; three blog cards; footer.

## Next
Sign into Sitecore, verify the existing BCAA site and content root, inventory actual Prospera components and renderings, then extract theme and present the build plan. No CMS changes or application code changes made.

## Signed-in verification, 2026-10-24
BCAA root and Home verified in Content Editor. Both BCAA and MMI Site Grouping definitions use Site name = bcaa. Page Builder resolves the duplicate name to MMI, even when selecting BCAA. Navigating to the correct BCAA Home ID reports unable to load site tree. Proposed repair is changing MMI Site name to mmi; this touches another site and needs explicit user authorization. No CMS mutations made. See live-items.json for verified IDs.

## Resolution
User deleted MMI. Reload verified correct BCAA selection and working editing canvas. Archived generic manifest and rebuilt actual inventory of 23 source/map/template/rendering matches. Live roots verified via Content Editor; raw tree inventory retained. Theme extracted, awaiting approval before Phase 2 analysis and implementation.

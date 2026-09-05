# Design QA — selected dark editorial design

## Source and evidence

- Selected visual: option 2, `/Users/wangzhangwu/.codex/generated_images/01a06eeb-16fc-7e71-bddf-eb3aa4bd6ab4/exec-9fae66ad-7774-4a04-9ff8-bef7c4312eef.png`.
- Source dimensions: 1330 × 1182. Desktop comparison: 1330 × 1182 CSS pixels, deviceScaleFactor 1, captured to `/tmp/doxmind-codex-design/implementation-desktop.png`.
- Mobile: 390 × 844 CSS pixels, deviceScaleFactor 1, `/tmp/doxmind-codex-design/implementation-mobile.png`.
- Whole-page checks: `/tmp/doxmind-website-desktop.png` (1440px wide) and `/tmp/doxmind-website-mobile.png` (390px wide).
- Local route: `http://127.0.0.1:4187/`, top of page, dark theme. Also inspected directly in the Codex in-app browser.
- Source and latest desktop capture were opened together in one comparison input; mobile and full-page captures were reviewed alongside them. The 1330px captures make header, hero typography, button and product frame sufficiently readable without separate crops.

## Comparison history

1. P2: the first product frame clipped the checklist, and the first wide capture used a smaller app zoom that made its contents too small. Replaced it with a new direct 1500 × 750 capture of the signed 1.11.0 app at native zoom. The capture is 3000 × 1500 pixels and uses the real application's scrolling state; no generated product UI is used.
2. P2: the first desktop product frame started at y486 rather than approximately y441 in the selected source, pushing the introduction below the target view. Reduced hero top padding, heading line-height and CTA spacing. Final frame begins at y447.5, x106.4, width1117.2, height558.6, closely matching the selected composition.
3. Re-captured desktop and mobile after both changes. No actionable P0/P1/P2 findings remain.

## Required fidelity surfaces

- Typography: local Geist font, restrained 450 weight, two-line left-aligned heading, readable body copy. The source's exact font is not provided; Geist retains its proportions and character. No overflow or unexpected headline wrapping at the checked sizes.
- Spacing: shared left edge across navigation, hero, screenshot and introduction. Full-width screenshot and generous section rhythm. Mobile stacks feature text and images in their reading order.
- Colors: black surface, off-white primary text, gray secondary text, white actions. Generated low-saturation steel-blue background follows the selected upper-right light treatment. No old white stone background or heavy card shadows remains in the rendered page.
- Images: supplied doXmind logo and actual signed 1.11.0 captures. A separately generated background supplies the atmospheric light. Product content and exact light contours differ naturally from the generated mock; the implementation uses genuine UI rather than repainting it.
- Copy: selected headline, subtitle, action, version and local-ownership introduction retained. Remaining sections use concise, accurate copy for Markdown writing, portable files and read-only Attachments.

## Functional validation

- `npm run build`: passed, including both prerendered routes.
- `SITE_URL=http://127.0.0.1:4187 npm run test:site`: passed after the final visual changes.
- All four product images load; desktop and mobile scroll reveals complete.
- Download destinations, `/download/` positioning and retired `/login` behavior preserved.
- Footer Features anchor scrolls below the fixed header; header scrolled state verified.
- Reduced-motion mode disables smooth scrolling and renders the heading immediately.
- Keyboard Skip to content action works.
- Mobile horizontal overflow: none. Browser console errors: none.

## Follow-up polish

- Small text inside full-workspace screenshots is illustrative at mobile widths; surrounding HTML provides readable descriptions of each capability.
- Exact photographic light contours are intentionally not pixel-identical to the concept image.

final result: passed

# Design QA

## Target and evidence

- Selected target: `/Users/wangzhangwu/.codex/generated_images/019f77bc-a576-7f63-b640-c904160cca02/exec-358a999c-4690-4427-b009-c6dd89c0895d.png`
- Primary viewport: 1440 × 1000 (browser content width 1425 px)
- Mobile viewport: 390 × 844 (browser content width 375 px)
- Side-by-side comparison: `/Users/wangzhangwu/.codex/visualizations/2026/07/19/019f77bc-a576-7f63-b640-c904160cca02/doxmind-implementation/target-vs-implementation-v2.png`
- Desktop implementation composite: `/Users/wangzhangwu/.codex/visualizations/2026/07/19/019f77bc-a576-7f63-b640-c904160cca02/doxmind-implementation/implementation-composite-v2.png`
- Mobile evidence: `mobile-top-v2.png`, `mobile-story-v2.png`, and `mobile-story-markdown-v2.png` in the same evidence directory.
- Revised Retina hero capture: `/Users/wangzhangwu/.codex/visualizations/2026/07/19/019f77bc-a576-7f63-b640-c904160cca02/sharp-screenshots/local-top-retina.png`
- Revised product-story captures: `local-story-markdown-retina.png` and `local-story-pdf-retina.png` in the Retina evidence directory.
- Focused image-quality comparison: `/Users/wangzhangwu/.codex/visualizations/2026/07/19/019f77bc-a576-7f63-b640-c904160cca02/sharp-screenshots/screenshot-sharpness-before-after.png`

## Comparison result

The implementation matches the approved composition and hierarchy: a sparse mineral-white hero, centered product identity and direct macOS CTA, an authentic product screenshot crossing into a pure-black product story, three alternating screenshot/copy rows, and a compact final local-first download panel. The official desktop icon and current Markdown, PDF, and Excel product captures are used throughout.

The first implementation was more editorial and vertically expansive than the selected target. The oversized product introduction and standalone local-first statement were removed, row spacing was tightened, and the final download area was reduced to the compact panel shown in the target. Mobile rows were normalized to copy-first ordering so two feature headlines do not run together without their product image.

## Screenshot-quality iteration

- Earlier finding (P1): the 880 × 1000 product captures were enlarged to roughly 1018 CSS pixels in the hero. On a 2× display this provided less than half a source pixel per device pixel, visibly softening UI text and icons.
- Fix: replaced all three captures with current 1400 × 900 desktop screenshots and added dedicated 2800 × 1800 Retina sources through `srcset`. The hero now selects the 2× source at `devicePixelRatio = 2`; story images remain lazy-loaded.
- Post-fix evidence: the focused before/after comparison shows materially cleaner text edges, controls, dividers, and workbook/PDF details. The wider native capture also matches the selected landscape framing without the previous portrait crop.
- Remaining differences: the current desktop screenshots contain newer example documents than the original visual target. This is intentional product accuracy, not design drift.

## Quality checks

- No P0, P1, or P2 visual defects remain.
- Desktop screenshots select 2800 × 1800 Retina assets on 2× displays, remain correctly framed, and alternate left/right as selected.
- Mobile width has no horizontal overflow (`scrollWidth = clientWidth = 375`).
- Header navigation is hidden at the mobile breakpoint and the primary CTA remains visible.
- `/download/` reveals the download panel at the bottom of the page.
- Three direct macOS download links resolve to the stable release URL.
- Browser console errors: none.
- Motion completes without layout shifts; reduced-motion behavior is present.
- Focus styles, skip link, semantic headings, and image alternative text are present.

## Final result

passed

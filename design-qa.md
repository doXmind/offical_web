# Design QA — concise product presentation

## Target

User requested less small text and less repetitive copy, with the simplicity of https://openai.com/codex/. This supersedes the earlier two-line editorial hero. The live reference was re-opened and visually inspected in the in-app browser: product icon/name, one short sentence, one action, then large product imagery.

## Evidence

- Desktop: `/tmp/doxmind-codex-design/implementation-desktop.png`, 1330 × 1182, density 1.
- Mobile: `/tmp/doxmind-codex-design/implementation-mobile.png`, 390 × 844, density 1.
- Full page: `/tmp/doxmind-website-desktop.png` and `/tmp/doxmind-website-mobile.png`.
- Preview: http://127.0.0.1:4187/, also inspected directly in the in-app browser.
- Reviewed the current reference screenshot, desktop, mobile and full-page implementation. This is a user-directed simplification, not a pixel-identical OpenAI brand clone.

## Changes and review

- Main-content text count reduced from 264 to 55 whitespace-delimited words, measured in the rendered old production and new local main elements before publication.
- Removed the repeated ownership introduction, three-column local section, feature numbering, eyebrow labels, feature detail text, hero metadata and multi-column footer.
- Hero is the product name, one short sentence and download action. Supporting features each contain a heading, one sentence and actual app capture.
- Typography: existing Geist, moderate heading weight; desktop feature body increased from 17px to 21px, mobile from 16px to 20px.
- Layout: centered restrained hero, wider feature images, fewer separators, capsule actions and a single-row footer. No horizontal overflow at 390px.
- Colors/assets: retained black/graphite palette and real 1.11.0 screenshots. No new decorative imagery.
- Content: local Markdown and external reference-file handling remain accurate; docs, GitHub and stable download destinations retained.
- No actionable P0/P1/P2 issues found in the final visual review.

## Validation

- Production build and both prerendered routes passed.
- Existing site checks passed: images, desktop/mobile scrolling, download routing, metadata/product boundary, retired login route, footer Features anchor, fixed-header state, reduced motion and keyboard skip link.
- Console errors: none.

final result: passed

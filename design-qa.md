# Design QA — 1.8 product-boundary refresh

## Target

- Desktop viewport: 1440 × 1000
- Mobile viewport: 390 × 844
- Product evidence: current 1400 × 900 workspace and Markdown Page screenshots from the desktop app
- Product story: Markdown Page, real local folder, and read-only Attachments

## Asset decisions

- `doxmind-overview.png` is used for the hero and local-folder section.
- `doxmind-editor.png` is used for Page writing and Attachment-boundary sections.
- The social preview is a 1200 × 630 `og-image.png` aligned with the same boundary.
- Retired PDF/Excel editor captures, old `@2x` variants, and AI promotional SVGs were removed.

## Verified behavior

- All scroll-reveal sections become visible during real scrolling.
- Product screenshots load with non-zero natural dimensions.
- Desktop and mobile full-page captures contain every product section.
- Mobile has no horizontal overflow and keeps the primary download action visible.
- `/download/` lands on the download section.
- Current page copy and structured data contain no PDF annotation, spreadsheet editing, login, pricing, or AI claims.
- The stable macOS download URL is used consistently.
- Browser console errors: none.

The automated browser check writes review captures to `/tmp/doxmind-website-desktop.png` and `/tmp/doxmind-website-mobile.png`.

## Release constraint

The page displays version 1.8.0 while the stable URL points to the latest public release. Deploy only after 1.8.0 becomes `latest`, then verify the stable URL and production metadata.

## Result

Passed locally. Production deployment remains gated on the coordinated 1.8.0 release window.

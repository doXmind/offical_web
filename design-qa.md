# Design QA — 1.11.0 dark screenshots

## Target

- Desktop viewport: 1440 × 1000
- Mobile viewport: 390 × 844
- Product evidence: direct captures from the published, signed 1.11.0 macOS app, with a 1400 × 900 content viewport at 2× display scale
- Dark theme selected through the app's Settings
- Isolated user data and a purpose-built Studio Notes folder; no personal documents

## Asset decisions

- `doxmind-1.11.0-workspace.png`: hero showing linked notes, a Markdown table, and tasks.
- `doxmind-1.11.0-insert.png`: Page section showing the searchable Insert block menu.
- `doxmind-1.11.0-writing.png`: local-folder section showing the real folder sidebar and floating formatting toolbar.
- `doxmind-1.11.0-attachment.png`: Attachment section showing the actual read-only PDF screen and external-open/reveal actions.
- All four PNGs are unedited 2800 × 1800 captures. Versioned filenames prevent reuse of cached older images.
- Replaced the two old screenshots; the social preview and website layout retain their existing design.

## Verification

- Production build and prerendering of `/` and `/download/`.
- Existing browser checks cover image loading, desktop/mobile layout, scroll reveals, download navigation, product copy, structured data, and console errors.
- Visually inspect both browser captures for correct dark images and clipping.
- After deployment, verify the production HTML references all four versioned filenames and the served image bytes match the committed assets.

The browser checks write review captures to `/tmp/doxmind-website-desktop.png` and `/tmp/doxmind-website-mobile.png`.

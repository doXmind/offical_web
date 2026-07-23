# doXmind website

Marketing site for doXmind, a fully local, Markdown-native knowledge workspace.

## Product boundary

- A Markdown Page is the only first-class editing surface.
- Page Blocks edit canonical Markdown directly, with semantic inline formatting and hierarchy-safe multi-Block operations.
- PDF, spreadsheet, HTML, image, and other non-Markdown files are read-only Attachments.
- The user's filesystem is the source of truth.
- There is no account, cloud sync, telemetry, billing, or AI runtime.
- Legacy PDF and Excel evidence stays preserved; eligible cases can use the documented, unverified recovery procedure. The website does not advertise those retired editors.

The current site serves the homepage at `/` and the same page scrolled to the download section at `/download/`. The download button uses the stable macOS URL:

`https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg`

## Development

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Build and verify the production site:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
npm run test:site
```

The browser check covers the 1.8.3 product boundary, current Block interaction copy, structured data, existing screenshots, desktop and mobile layout, scroll-revealed content, the stable download link, and the retired login surface.

## Current assets

- `public/doxmind-overview.png` — local folder with one Page and read-only Attachments
- `public/doxmind-editor.png` — Markdown Page editor
- `public/og-image.png` — current social preview

Retired PDF, spreadsheet, AI, and `@2x` marketing assets must not be reintroduced without an explicit product decision.

## Release coordination

Do not deploy a version-labelled website update before the matching GitHub release is public. For 1.8.3, publish the verified release as `latest` first, then deploy this site and confirm that the stable DMG URL resolves to the 1.8.3 asset.

## Links

- Website: [doxmind.com](https://doxmind.com)
- Documentation: [docs.doxmind.com](https://docs.doxmind.com)
- GitHub: [github.com/doXmind](https://github.com/doXmind)

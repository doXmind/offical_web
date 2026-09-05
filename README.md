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

The browser check covers the 1.11.0 product boundary, current Block interaction copy, structured data, existing screenshots, desktop and mobile layout, scroll-revealed content, the stable download link, and the retired login surface.

## Current assets

- `public/doxmind-1.11.0-workspace-wide.png` — 1500 × 750 dark workspace capture from the signed 1.11.0 app
- `public/doxmind-1.11.0-insert.png` — searchable Insert block menu
- `public/doxmind-1.11.0-writing.png` — local folder and floating formatting toolbar
- `public/doxmind-1.11.0-attachment.png` — actual read-only PDF attachment actions
- `public/hero-atmosphere.png` — generated graphite/steel-blue light background for the selected dark design
- `public/og-image.png` — current social preview

Retired PDF, spreadsheet, AI, and `@2x` marketing assets must not be reintroduced without an explicit product decision.

## Visual direction

The design uses a centered product-name hero, one-line introduction, restrained graphite light, black content sections, Geist typography, and large real product images. Each of the three feature sections contains one heading and one sentence; repeated ownership sections, small labels and decorative feature numbering are removed. Navigation, file-format claims and the stable download URL retain the existing product boundary. Reduced-motion preferences disable reveals and smooth scrolling.

## Release coordination

Do not deploy a version-labelled website update before the matching GitHub release is public. For 1.11.0, publish the verified release as `latest` first, then deploy this site and confirm that the stable DMG URL resolves to the 1.11.0 asset.

The production domain is served by AWS Amplify app `d351nqkrq9u4zw` (`us-east-1`), which automatically builds `main`. The repository also runs a GitHub Pages deployment. Verify the matching Amplify job and the actual `doxmind.com` response before reporting production completion.

## Links

- Website: [doxmind.com](https://doxmind.com)
- Documentation: [docs.doxmind.com](https://docs.doxmind.com)
- GitHub: [github.com/doXmind](https://github.com/doXmind)

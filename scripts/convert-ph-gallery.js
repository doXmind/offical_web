import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postersDir = path.join(__dirname, '..', 'posters');

const svgFiles = [
  { name: 'ph-gallery-inline-ai', width: 1270, height: 760 },
  { name: 'ph-gallery-database-analysis', width: 1270, height: 760 },
  { name: 'ph-gallery-database-views', width: 1270, height: 760 },
  { name: 'ph-gallery-ai-charts', width: 1270, height: 760 },
  { name: 'ph-gallery-presentation', width: 1270, height: 760 },
  { name: 'ph-gallery-community', width: 1270, height: 760 },
  { name: 'ph-gallery-mindmap', width: 1270, height: 760 },
  { name: 'ph-gallery-ai-thinking', width: 1270, height: 760 },
  { name: 'ph-gallery-csv-import', width: 1270, height: 760 },
];

async function convertPosters() {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const file of svgFiles) {
    const svgPath = path.join(postersDir, `${file.name}.svg`);
    const pngPath = path.join(postersDir, `${file.name}.png`);

    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${file.name}.svg - file not found`);
      continue;
    }

    const svgContent = fs.readFileSync(svgPath, 'utf8');

    const page = await browser.newPage();
    await page.setViewport({
      width: file.width,
      height: file.height,
      deviceScaleFactor: 2,
    });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; }
          body {
            width: ${file.width}px;
            height: ${file.height}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000000;
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.fonts.ready);
    await page.screenshot({ path: pngPath });

    console.log(`Converted: ${file.name}.svg -> ${file.name}.png (${file.width * 2}x${file.height * 2} @2x)`);
    await page.close();
  }

  await browser.close();
  console.log('\nDone! All PH gallery posters converted to PNG.');
}

convertPosters().catch(console.error);

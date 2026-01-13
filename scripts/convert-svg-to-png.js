import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logoDir = path.join(__dirname, '..', 'logo');

const svgFiles = [
  { name: 'logo-full-light', width: 720, height: 160, bg: '#ffffff' },
  { name: 'logo-full-dark', width: 720, height: 160, bg: '#000000' },
  { name: 'logo-stacked-light', width: 240, height: 300, bg: '#ffffff' },
  { name: 'logo-stacked-dark', width: 240, height: 300, bg: '#000000' },
  { name: 'icon-rounded-light', width: 256, height: 256, bg: '#ffffff' },
  { name: 'icon-rounded-dark', width: 256, height: 256, bg: '#000000' },
  { name: 'icon-sharp-light', width: 256, height: 256, bg: '#ffffff' },
  { name: 'icon-sharp-dark', width: 256, height: 256, bg: '#000000' },
  { name: 'app-icon-ios', width: 512, height: 512, bg: 'transparent' },
  { name: 'app-icon-light', width: 512, height: 512, bg: 'transparent' },
  { name: 'app-icon-circle', width: 512, height: 512, bg: 'transparent' },
  { name: 'favicon', width: 256, height: 256, bg: 'transparent' },
  { name: 'wordmark-light', width: 520, height: 120, bg: '#ffffff' },
  { name: 'wordmark-dark', width: 520, height: 120, bg: '#000000' },
];

async function convertSvgToPng() {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const file of svgFiles) {
    const svgPath = path.join(logoDir, `${file.name}.svg`);
    const pngPath = path.join(logoDir, `${file.name}.png`);

    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${file.name}.svg - file not found`);
      continue;
    }

    const svgContent = fs.readFileSync(svgPath, 'utf8');

    const page = await browser.newPage();
    await page.setViewport({ width: file.width, height: file.height });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; }
          body {
            width: ${file.width}px;
            height: ${file.height}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${file.bg};
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

    await page.setContent(html);
    await page.screenshot({
      path: pngPath,
      omitBackground: file.bg === 'transparent'
    });

    console.log(`Converted: ${file.name}.svg -> ${file.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('Done!');
}

convertSvgToPng().catch(console.error);

/**
 * Post-build prerendering script.
 * Uses Puppeteer to render each route and save the fully-rendered HTML,
 * so that search engine crawlers receive content instead of an empty <div id="root">.
 */
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const ROUTES = ['/', '/download'];

// Simple static file server for the dist directory
function createStaticServer(distDir) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };

  return createServer((req, res) => {
    let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);

    // SPA fallback: serve index.html for routes without file extensions
    if (!filePath.includes('.') || !existsSync(filePath)) {
      filePath = join(distDir, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = '.' + filePath.split('.').pop();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
}

async function prerender() {
  console.log('Starting prerendering...\n');

  const server = createStaticServer(DIST_DIR);
  const port = 4173;

  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`Static server running on http://localhost:${port}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    ...(process.env.CI ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : {}),
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${port}${route}`;

    console.log(`Rendering ${route}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for the prerender-ready event (dispatched by main.jsx)
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          document.addEventListener('prerender-ready', resolve, { once: true });
        }
      });
    });

    // Small delay to ensure Helmet has injected all meta tags
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    const html = await page.content();
    await page.close();

    // Write the prerendered HTML
    const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
    const outputFile = join(outputDir, 'index.html');

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputFile, html, 'utf-8');
    console.log(`  -> Saved to ${outputFile}`);
  }

  await browser.close();
  server.close();

  console.log(`\nPrerendering complete! ${ROUTES.length} routes rendered.`);
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});

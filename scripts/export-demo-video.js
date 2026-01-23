/**
 * Export Demo Video Script
 *
 * Uses Puppeteer's native screencast to record the demo in real-time.
 * Records the same ContinuousDemo component as shown on the /demo page.
 *
 * Timeline (106 seconds total):
 * - 0-3s: Logo intro animation
 * - 3-103s: Demo content (100 seconds)
 * - 103-106s: Logo outro animation
 *
 * Prerequisites:
 * 1. FFmpeg must be installed and available in PATH
 * 2. Development server must be running: npm run dev
 *
 * Usage:
 *   node scripts/export-demo-video.js [options]
 *
 * Options:
 *   --width=1920    Video width (default: 1920)
 *   --height=1080   Video height (default: 1080)
 *   --output=name   Output filename without extension (default: doxmind-demo)
 *   --url=http://   Dev server URL (default: http://localhost:3000)
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace('--', '').split('=');
  acc[key] = value || true;
  return acc;
}, {});

// Configuration
const CONFIG = {
  width: parseInt(args.width) || 1920,
  height: parseInt(args.height) || 1080,
  outputName: args.output || 'doxmind-demo',
  devServerUrl: args.url || 'http://localhost:3000',
};

const outputDir = path.join(__dirname, '..', 'dist');

async function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

async function recordVideo() {
  console.log('🎬 Starting video recording...');
  console.log(`   Resolution: ${CONFIG.width}x${CONFIG.height}`);

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--window-size=${CONFIG.width},${CONFIG.height}`,
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: CONFIG.width,
    height: CONFIG.height,
    deviceScaleFactor: 1,
  });

  // Hide debug overlay
  await page.evaluateOnNewDocument(() => {
    const style = document.createElement('style');
    style.textContent = '.video-export-debug { display: none !important; }';
    document.head.appendChild(style);
  });

  const videoExportUrl = `${CONFIG.devServerUrl}/video-export`;
  console.log(`\n📍 Navigating to: ${videoExportUrl}`);

  try {
    await page.goto(videoExportUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
  } catch (error) {
    console.error('\n❌ Failed to connect to dev server!');
    console.error('   Make sure the dev server is running: npm run dev\n');
    await browser.close();
    process.exit(1);
  }

  // Wait for the API to be ready
  await page.waitForFunction(() => window.__VIDEO_EXPORT__ !== undefined, { timeout: 10000 });
  console.log('   API ready');

  // Wait for page to be fully ready
  await page.waitForFunction(() => window.__VIDEO_EXPORT__.isReady(), { timeout: 10000 });
  console.log('   Page ready');

  // Small delay to ensure everything is initialized
  await new Promise(r => setTimeout(r, 500));

  const outputPath = path.join(outputDir, `${CONFIG.outputName}.webm`);
  const mp4OutputPath = path.join(outputDir, `${CONFIG.outputName}.mp4`);

  console.log(`\n🎥 Recording to: ${outputPath}`);

  // Start screencast recording
  const recorder = await page.screencast({
    path: outputPath,
    speed: 1,
  });

  // Small delay before starting to ensure recorder is ready
  await new Promise(r => setTimeout(r, 200));

  // Signal the page to start
  console.log('   Calling start()...');
  await page.evaluate(() => window.__VIDEO_EXPORT__.start());

  // Wait for playback to actually begin
  await new Promise(r => setTimeout(r, 300));
  console.log('   Recording started...');

  // Get duration from page
  const duration = await page.evaluate(() => window.__VIDEO_EXPORT__.getDuration());
  const durationSeconds = duration / 1000;
  console.log(`   Duration: ${durationSeconds}s`);

  // Wait for completion with progress updates
  const startTime = Date.now();

  await new Promise((resolve) => {
    const checkInterval = setInterval(async () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min((elapsed / durationSeconds) * 100, 100).toFixed(1);
      process.stdout.write(`\r   Progress: ${progress}% (${elapsed.toFixed(0)}s / ${durationSeconds}s)    `);

      try {
        const isComplete = await page.evaluate(() => window.__VIDEO_EXPORT_COMPLETE__);
        if (isComplete) {
          clearInterval(checkInterval);
          // Wait a bit more to capture the final frames
          setTimeout(resolve, 2000);
        }
      } catch (e) {
        // Page might be navigating, ignore
      }
    }, 500);

    // Fallback timeout
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, (durationSeconds + 5) * 1000);
  });

  console.log('\n\n   Stopping recorder...');
  await recorder.stop();

  await browser.close();

  console.log('✅ Recording complete!');

  // Check if we have FFmpeg to convert to MP4
  const hasFFmpeg = await checkFFmpeg();
  if (hasFFmpeg) {
    console.log('\n🔄 Converting to MP4...');
    try {
      execSync(`ffmpeg -y -i "${outputPath}" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${mp4OutputPath}"`, {
        stdio: 'pipe',
      });

      // Remove webm file
      fs.unlinkSync(outputPath);

      const stats = fs.statSync(mp4OutputPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`\n✅ Video export successful!`);
      console.log(`   File size: ${fileSizeMB} MB`);
      console.log(`   Location: ${mp4OutputPath}\n`);
    } catch (error) {
      console.error('\n⚠️  FFmpeg conversion failed, keeping WebM file');
      console.log(`   Location: ${outputPath}\n`);
    }
  } else {
    console.log('\n⚠️  FFmpeg not found, video saved as WebM');
    console.log(`   Location: ${outputPath}\n`);
  }
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║     doXmind Demo Video Export Tool           ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  try {
    await recordVideo();
  } catch (error) {
    console.error('\n❌ Error during video export:', error.message);
    process.exit(1);
  }
}

main();

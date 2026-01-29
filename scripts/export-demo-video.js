/**
 * Export Demo Video Script
 *
 * Uses Puppeteer with frame-by-frame capture to ensure real-time recording.
 * Records the ContinuousDemo component with built-in intro/outro sequences.
 *
 * Timeline (100 seconds total):
 * - 0-12s: IntroSequence (hook + abstract + brand)
 * - 12-92s: Demo content (80 seconds)
 * - 92-100s: OutroSequence (stats + CTA)
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
 *   --url=http://   Dev server URL (default: http://localhost:5173)
 *   --fps=30        Frames per second (default: 30)
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
  devServerUrl: args.url || 'http://localhost:5173',
  fps: parseInt(args.fps) || 30,
};

const outputDir = path.join(__dirname, '..', 'dist');
const framesDir = path.join(outputDir, 'frames');

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
  console.log(`   Frame rate: ${CONFIG.fps} fps`);

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(framesDir, { recursive: true });

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
  await page.waitForFunction(() => window.__VIDEO_EXPORT__.isReady !== undefined, { timeout: 10000 });
  console.log('   Page ready');

  // Small delay to ensure everything is initialized
  await new Promise(r => setTimeout(r, 500));

  console.log(`\n🎥 Recording frames to: ${framesDir}`);

  // Signal the page to start
  console.log('   Calling start()...');
  await page.evaluate(() => window.__VIDEO_EXPORT__.start());

  // Get duration from page
  const duration = await page.evaluate(() => window.__VIDEO_EXPORT__.getDuration());
  const durationSeconds = duration / 1000;
  console.log(`   Duration: ${durationSeconds}s`);
  console.log('   Recording started...\n');

  // Calculate total frames
  const totalFrames = Math.ceil(durationSeconds * CONFIG.fps);
  const frameDuration = 1000 / CONFIG.fps; // ms per frame

  // Capture frames at specified frame rate
  const startTime = Date.now();
  let frameCount = 0;

  for (let i = 0; i < totalFrames; i++) {
    const targetTime = startTime + (i * frameDuration);
    const now = Date.now();

    // Wait until it's time for the next frame
    if (now < targetTime) {
      await new Promise(resolve => setTimeout(resolve, targetTime - now));
    }

    // Capture screenshot
    const framePath = path.join(framesDir, `frame_${String(i).padStart(6, '0')}.png`);
    await page.screenshot({ path: framePath });

    frameCount++;

    // Update progress
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = ((i + 1) / totalFrames * 100).toFixed(1);
    process.stdout.write(`\r   Progress: ${progress}% (Frame ${i + 1}/${totalFrames}, ${elapsed.toFixed(1)}s / ${durationSeconds}s)    `);
  }

  console.log('\n\n   Capturing complete!');

  await browser.close();

  // Check if we have FFmpeg to convert to MP4
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    console.error('\n❌ FFmpeg not found! Please install FFmpeg to create video.');
    console.log(`   Frames saved in: ${framesDir}\n`);
    return;
  }

  // Convert frames to video using ffmpeg
  console.log('\n🔄 Converting frames to video...');
  const outputPath = path.join(outputDir, `${CONFIG.outputName}.mp4`);

  try {
    execSync(
      `ffmpeg -y -r ${CONFIG.fps} -i "${path.join(framesDir, 'frame_%06d.png')}" ` +
      `-c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${outputPath}"`,
      { stdio: 'pipe' }
    );

    // Clean up frames directory
    console.log('   Cleaning up frames...');
    fs.rmSync(framesDir, { recursive: true, force: true });

    const stats = fs.statSync(outputPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`\n✅ Video export successful!`);
    console.log(`   File size: ${fileSizeMB} MB`);
    console.log(`   Duration: ${durationSeconds}s`);
    console.log(`   Location: ${outputPath}\n`);
  } catch (error) {
    console.error('\n❌ FFmpeg conversion failed:', error.message);
    console.log(`   Frames saved in: ${framesDir}\n`);
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
    console.error(error.stack);
    process.exit(1);
  }
}

main();

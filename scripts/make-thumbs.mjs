/**
 * make-thumbs.mjs  —  Playwright thumbnail generator
 *
 * Usage:
 *   node scripts/make-thumbs.mjs           # skip existing thumbs
 *   node scripts/make-thumbs.mjs --force   # regenerate all
 *
 * Prerequisites (one-time):
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 */

import { chromium }   from "playwright";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath }    from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, "..");

const samplesPath = resolve(root, "data/samples.json");
const thumbsDir   = resolve(root, "thumbs");
const FORCE       = process.argv.includes("--force");

const VIEWPORT_W   = 390;
const VIEWPORT_H   = 520;
const SCALE        = 1.5;
const JPEG_QUALITY = 80;
const WAIT_MS      = 2500;

mkdirSync(thumbsDir, { recursive: true });

const samples = JSON.parse(readFileSync(samplesPath, "utf8"));

let ok = 0, skipped = 0, failed = 0;

const browser = await chromium.launch({ headless: true });

for (const sample of samples) {
  const outPath = resolve(thumbsDir, `${sample.id}.jpg`);

  if (!FORCE && existsSync(outPath)) {
    console.log(`skip     ${sample.id}`);
    skipped++;
    continue;
  }

  if (!sample.url) {
    console.log(`FAILED   ${sample.id}  — no URL`);
    failed++;
    continue;
  }

  try {
    const ctx  = await browser.newContext({
      viewport:          { width: VIEWPORT_W, height: VIEWPORT_H },
      deviceScaleFactor: SCALE,
    });
    const page = await ctx.newPage();

    await page.goto(sample.url, { waitUntil: "networkidle", timeout: 30_000 });

    // Optional: click a gate/splash button before screenshotting.
    // Uncomment and adjust the selector to match the invitation's button:
    // await page.click('button:has-text("Open invitation")').catch(() => {});

    await page.waitForTimeout(WAIT_MS);

    await page.screenshot({
      path:    outPath,
      type:    "jpeg",
      quality: JPEG_QUALITY,
      clip:    { x: 0, y: 0, width: VIEWPORT_W, height: VIEWPORT_H },
    });

    await ctx.close();
    console.log(`ok       ${sample.id}`);
    ok++;
  } catch (err) {
    console.log(`FAILED   ${sample.id}  — ${err.message}`);
    failed++;
  }
}

await browser.close();
console.log(`\nDone: ${ok} ok, ${skipped} skipped, ${failed} failed.`);

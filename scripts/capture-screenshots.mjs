/**
 * Capture pixel-perfect portrait screenshots of every project domain using
 * a real headless Chromium (Playwright). Each shot is saved to
 *   /public/projects/<id>.jpg
 *
 * The capture viewport matches the aspect ratio of the showcase modal
 * (4:5 portrait) so screenshots fill the panel with no blank bands.
 *
 * Usage:  npm run screenshots
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, devices } from 'playwright'

const __filename = fileURLToPath(import.meta.url)
const __root = path.resolve(path.dirname(__filename), '..')
const outDir = path.join(__root, 'public', 'projects')

// Modal aspect ratio is 4:5 portrait. Capturing at 2x density so the result
// stays crisp on retina screens.
const VIEWPORT = { width: 1280, height: 1600 } // 4:5
const SCALE = 2 // device pixel ratio
const NAV_TIMEOUT = 45_000

const projects = [
  { id: 'remesleep',      url: 'https://www.remesleep.com/' },
  { id: 'humanewarriors', url: 'https://humanewarriors.ch/' },
  { id: 'howl',           url: 'https://www.howl.in/' },
  { id: 'benzer',         url: 'https://benzerworld.com/' },
  { id: 'chainthat',      url: 'https://chainthat.com/' },
  { id: 'bakerandco',     url: 'https://bakerandco.ae/' },
  { id: 'elitefx',        url: 'https://www.elitefx.in/' },
  { id: 'autopart',       url: 'https://autopart-web.vercel.app/' }
]

// Try to dismiss common cookie / consent banners so they don't pollute the shot.
const dismissBanners = `
(() => {
  const tries = [
    /accept/i, /agree/i, /got it/i, /allow all/i, /i understand/i,
    /allow cookies/i, /close/i, /dismiss/i, /ok/i
  ];
  const click = (el) => { try { el.click() } catch (e) {} };
  // Click any obvious "accept" button.
  const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
  for (const b of buttons) {
    const t = (b.innerText || '').trim();
    if (!t) continue;
    if (tries.some((re) => re.test(t))) { click(b); break; }
  }
  // Hide common banner containers as a fallback.
  const hide = ['#onetrust-banner-sdk','#CybotCookiebotDialog','.cc-window','.cookie-banner','#cookie-banner','.cky-consent-bar','.osano-cm-window'];
  hide.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.style.setProperty('display','none','important'));
  });
})();
`

async function ensureDir(d) { await fs.mkdir(d, { recursive: true }) }

async function captureOne(browser, { id, url }) {
  const dest = path.join(outDir, `${id}.jpg`)
  process.stdout.write(`▸ ${id.padEnd(16)} ${url}\n`)

  const ctx = await browser.newContext({
    ...devices['Desktop Chrome'],
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    ignoreHTTPSErrors: true
  })
  const page = await ctx.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT }).catch(async () => {
      // Fall back to domcontentloaded if a site never settles network-idle.
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT })
    })
    // Let lazy assets, fonts and animations settle.
    await page.evaluate(dismissBanners).catch(() => {})
    await page.waitForTimeout(1500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)

    const buf = await page.screenshot({
      type: 'jpeg',
      quality: 88,
      fullPage: false,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height }
    })
    await fs.writeFile(dest, buf)
    process.stdout.write(`   ✓ ${(buf.length / 1024).toFixed(0)} KB\n`)
    return { id, ok: true, bytes: buf.length }
  } catch (err) {
    process.stdout.write(`   ⚠ ${err.message}\n`)
    return { id, ok: false, bytes: 0, error: err.message }
  } finally {
    await ctx.close()
  }
}

async function main() {
  await ensureDir(outDir)
  console.log(`\nCapturing ${projects.length} portrait screenshots → ${path.relative(__root, outDir)}`)
  console.log(`Viewport ${VIEWPORT.width}x${VIEWPORT.height} @ ${SCALE}x  (4:5)\n`)

  const browser = await chromium.launch()
  const results = []
  try {
    for (const p of projects) {
      results.push(await captureOne(browser, p))
    }
  } finally {
    await browser.close()
  }

  console.log('\nSummary:')
  for (const r of results) {
    const tag = r.ok ? '✓' : '⚠'
    console.log(`  ${tag} ${r.id.padEnd(16)} ${(r.bytes / 1024).toFixed(0).padStart(5)} KB  ${r.error ?? ''}`)
  }
  const ok = results.filter((r) => r.ok).length
  console.log(`\n${ok}/${results.length} captured.\n`)
}

main().catch((e) => { console.error(e); process.exit(1) })

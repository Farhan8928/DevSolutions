/**
 * Capture clean, modal-free screenshots of every project domain using Playwright.
 *
 *  - Viewport is 1280 × 1600 to match the showcase modal's 4:5 aspect ratio.
 *  - Cookie banners, newsletter popups, "book a consultation" modals and chat
 *    widgets are dismissed before the screenshot is taken.
 *  - Files are saved as JPGs to /public/projects/<id>.jpg.
 *
 * Usage:  npm run screenshots
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, devices } from 'playwright'

const __filename = fileURLToPath(import.meta.url)
const __root = path.resolve(path.dirname(__filename), '..')

// Public sites only. Client-internal CRMs (kind: 'private' in projects.js) are
// captured by logging into a locally-run instance seeded with demo data — see
// the note in README; their JPGs are committed, not regenerated from here.
const projects = [
  { id: 'remesleep',      url: 'https://www.remesleep.com/' },
  { id: 'outvue',         url: 'https://www.outvue.io/' },
  { id: 'bakerandco',     url: 'https://bakerandco.ae/' },
  { id: 'humanewarriors', url: 'https://humanewarriors.ch/' },
  { id: 'howl',           url: 'https://www.howl.in/' },
  { id: 'benzer',         url: 'https://benzerworld.com/' },
  { id: 'mossanomarmo',   url: 'https://mossano-marmo.vercel.app/' },
  { id: 'saumstudio',     url: 'https://www.saumstudio.com/' },
  { id: 'autopart',       url: 'https://www.autodoorspecialist.com/' },
  { id: 'zaidelectronics', url: 'https://zaidelectronicsmumbai.com/' },
  { id: 'gourifurnishing', url: 'https://gourifurnishing.com/' }
]

// Match the standard desktop browser hero ratio (16:10 landscape).
// Real agency sites use landscape preview shots — they read as "real product".
const VIEWPORT = { width: 1600, height: 1000 }

const outDir = path.join(__root, 'public', 'projects')

// Words commonly found on dismissal buttons across cookie banners and popups.
const DISMISS_TEXT = [
  'accept', 'accept all', 'i agree', 'agree', 'allow', 'allow all',
  'got it', 'understood', 'okay', 'ok', 'continue', 'close',
  'no thanks', 'not now', 'maybe later', 'dismiss', 'reject', 'decline',
  'skip', 'cancel'
]

// CSS that hides any overlay regardless of how the site styles it.
const HIDE_OVERLAYS_CSS = `
  /* Sticky / fixed overlays that aren't the page itself */
  [class*="cookie" i],
  [id*="cookie" i],
  [aria-label*="cookie" i],
  [class*="consent" i],
  [id*="consent" i],
  [class*="gdpr" i],
  [id*="gdpr" i],
  [class*="newsletter" i],
  [id*="newsletter" i],
  [class*="popup" i]:not(body):not(html),
  [id*="popup" i]:not(body):not(html),
  [class*="modal-backdrop" i],
  [class*="overlay" i]:not(.hero-overlay),
  [id*="overlay" i]:not(.hero-overlay),
  [class*="chat-widget" i],
  [id*="chat-widget" i],
  [class*="intercom" i],
  [id*="intercom" i],
  [class*="hubspot-messages" i],
  [class*="drift" i],
  [class*="livechat" i],
  [class*="tawk" i],
  [class*="crisp" i],
  [class*="zendesk" i],
  [class*="messengerchat" i],
  iframe[src*="hsforms" i],
  iframe[title*="chat" i],
  iframe[title*="cookie" i],
  iframe[title*="consent" i] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Restore scroll if a popup locked it */
  html, body { overflow: auto !important; }
`

async function dismissPopups(page) {
  // 1. Press Escape several times — handles most JS-driven dialogs
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Escape').catch(() => {})
    await page.waitForTimeout(120)
  }

  // 2. Click any visible button whose text matches a known dismissal word
  for (const word of DISMISS_TEXT) {
    const candidates = await page
      .getByRole('button', { name: new RegExp(`^\\s*${word}\\s*$`, 'i') })
      .all()
      .catch(() => [])
    for (const btn of candidates) {
      try {
        if (await btn.isVisible({ timeout: 200 })) {
          await btn.click({ timeout: 1000, trial: false })
          await page.waitForTimeout(300)
        }
      } catch { /* keep going */ }
    }

    // Also try plain links (e.g., "Close" anchors)
    const links = await page
      .getByRole('link', { name: new RegExp(`^\\s*${word}\\s*$`, 'i') })
      .all()
      .catch(() => [])
    for (const link of links) {
      try {
        if (await link.isVisible({ timeout: 200 })) {
          await link.click({ timeout: 1000, trial: false })
          await page.waitForTimeout(300)
        }
      } catch { /* keep going */ }
    }
  }

  // 3. Click visible close buttons by aria-label / title
  const closeSelectors = [
    'button[aria-label*="close" i]',
    'button[title*="close" i]',
    '[role="button"][aria-label*="close" i]',
    'button[aria-label*="dismiss" i]',
    '.close, .modal-close, .popup-close, .closeButton, [data-dismiss]'
  ]
  for (const sel of closeSelectors) {
    const els = await page.$$(sel).catch(() => [])
    for (const el of els) {
      try {
        if (await el.isVisible()) {
          await el.click({ timeout: 800, force: true })
          await page.waitForTimeout(200)
        }
      } catch { /* keep going */ }
    }
  }

  // 4. Inject CSS that hides any overlay we couldn't click away
  await page.addStyleTag({ content: HIDE_OVERLAYS_CSS }).catch(() => {})
}

async function captureOne(browser, { id, url }) {
  const dest = path.join(outDir, `${id}.jpg`)
  process.stdout.write(`▸ ${id.padEnd(16)} ${url}\n`)

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    locale: 'en-US',
    timezoneId: 'Asia/Kolkata',
    bypassCSP: true,
    javaScriptEnabled: true
  })

  // Pre-set common consent cookies so banners never appear
  await context.addCookies([
    { name: 'cookie_consent', value: 'accepted', domain: new URL(url).hostname.replace(/^www\./, ''), path: '/' },
    { name: 'cookieConsent', value: 'true', domain: new URL(url).hostname.replace(/^www\./, ''), path: '/' },
    { name: 'gdpr_consent', value: '1', domain: new URL(url).hostname.replace(/^www\./, ''), path: '/' }
  ]).catch(() => {})

  const page = await context.newPage()

  // Auto-dismiss native dialogs (alert, confirm)
  page.on('dialog', (d) => d.dismiss().catch(() => {}))

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    // Give the layout, fonts and any auto-opening modals a moment
    await page.waitForTimeout(2500)

    // Wait for fonts so headings render at correct size
    await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {})

    // Try networkidle but don't fail if it never settles (analytics, chat sockets)
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})

    // Dismiss popups twice — some sites mount them after a delay
    await dismissPopups(page)
    await page.waitForTimeout(1500)
    await dismissPopups(page)

    // Scroll to top so the hero is captured, not whatever section the page landed on
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)

    // Disable smooth-scroll & animations briefly so the capture is sharp
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
          scroll-behavior: auto !important;
        }
      `
    })

    await page.waitForTimeout(400)

    await page.screenshot({
      path: dest,
      type: 'jpeg',
      quality: 88,
      fullPage: false,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height }
    })

    const size = (await fs.stat(dest)).size
    process.stdout.write(`   ✓ saved  ${(size / 1024).toFixed(0).padStart(5)} KB\n`)
    return { id, ok: true, bytes: size }
  } catch (err) {
    process.stdout.write(`   ⚠ error: ${err.message}\n`)
    return { id, ok: false, error: err.message }
  } finally {
    await context.close().catch(() => {})
  }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true })
  console.log(`\nCapturing ${projects.length} screenshots @ ${VIEWPORT.width}×${VIEWPORT.height}`)
  console.log(`→ ${path.relative(__root, outDir)}\n`)

  const browser = await chromium.launch({ headless: true })

  const results = []
  for (const p of projects) {
    results.push(await captureOne(browser, p))
  }

  await browser.close()

  console.log('\nSummary:')
  for (const r of results) {
    const tag = r.ok ? '✓' : '⚠'
    const info = r.ok ? `${(r.bytes / 1024).toFixed(0).padStart(5)} KB` : r.error
    console.log(`  ${tag} ${r.id.padEnd(16)} ${info}`)
  }

  const ok = results.filter((r) => r.ok).length
  console.log(`\n${ok}/${results.length} captured successfully.\n`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

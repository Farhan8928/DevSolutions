// Generate platform icons from the master SVG mark.
//
//   • apple-touch-icon.png — 180×180, no rounded corners (iOS adds them)
//   • icon-192.png         — PWA standard
//   • icon-512.png         — PWA standard, OG-suitable fallback
//   • icon-maskable.png    — 512×512 with 80% safe-zone padding so Android
//                            adaptive-icon masks (circle, squircle, etc.)
//                            never crop the letterform.
//
// Each variant is rendered with Playwright + an inline SVG. No image-library
// dependency. Output goes to /public so Vite ships it as-is.

import { chromium } from 'playwright'
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

// Master mark SVG — lime tile + geometric D. The chassis is drawn as
// a rectangle so it adapts to any output size we pass in.
const markSvg = ({ size = 512, padding = 0, rx = 0, bg = '#C8FF00' }) => {
  // padding is a fraction (0..0.3 typically). We scale the inner mark to fit
  // the remaining safe area, leaving the chassis full-bleed for maskable.
  const inner = 1 - padding * 2
  const tx = size * padding
  const ty = size * padding
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${rx}" fill="${bg}"/>
    <g transform="translate(${tx} ${ty}) scale(${(size * inner) / 64})">
      <path
        fill="#06070A"
        fill-rule="evenodd"
        d="M 14 12 H 32 A 20 20 0 0 1 32 52 H 14 Z M 22 20 H 32 A 12 12 0 0 1 32 44 H 22 Z"/>
    </g>
  </svg>`
}

const renderToPng = async (browser, { size, padding = 0, rx = 0, name }) => {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  const html = `<!doctype html><html><body style="margin:0;padding:0;">${markSvg({ size, padding, rx })}</body></html>`
  await page.setContent(html, { waitUntil: 'networkidle' })
  const buf = await page.screenshot({ type: 'png', omitBackground: true })
  await page.close()
  const out = join(PUBLIC, name)
  await writeFile(out, buf)
  console.log(`✓ ${name.padEnd(28)} ${size}×${size}  ${(buf.length / 1024).toFixed(1)} KB`)
}

const browser = await chromium.launch()
try {
  // iOS home-screen. iOS masks to a rounded square itself, so we ship a flat
  // square with the chassis full-bleed.
  await renderToPng(browser, { size: 180, name: 'apple-touch-icon.png' })

  // PWA standard sizes — install prompt, Chrome on Android, desktop install.
  await renderToPng(browser, { size: 192, rx: 42,  name: 'icon-192.png' })
  await renderToPng(browser, { size: 512, rx: 112, name: 'icon-512.png' })

  // Maskable: Android adaptive-icon spec recommends keeping all logo content
  // inside an 80%-radius safe zone so circle / squircle / teardrop masks
  // never crop the letter. We pad the inner mark by 12% on each side and
  // let the chassis bleed to the edge.
  await renderToPng(browser, {
    size: 512,
    padding: 0.12,
    name: 'icon-maskable.png'
  })
} finally {
  await browser.close()
}
console.log('✨ Icons generated → public/')

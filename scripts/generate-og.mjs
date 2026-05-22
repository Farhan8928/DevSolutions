// Generate the social share image (og.jpg) used by Open Graph and Twitter
// cards. 1200×630 is the canonical OG size used by Facebook, LinkedIn,
// WhatsApp, Slack, X, and Discord.
//
// Pure SVG → PNG via Playwright headless render. No image-library deps.

import { chromium } from 'playwright'
import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'og.jpg')

const html = /* html */ `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif;
    background: #06070A;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .glow-1 {
    position: absolute; top: -120px; left: -80px;
    width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,255,0,0.32), transparent 60%);
    filter: blur(40px);
  }
  .glow-2 {
    position: absolute; bottom: -200px; right: -120px;
    width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,92,255,0.42), transparent 60%);
    filter: blur(40px);
  }
  .glow-3 {
    position: absolute; top: 40%; left: 60%;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,92,138,0.22), transparent 60%);
    filter: blur(40px);
  }
  .frame {
    position: absolute; inset: 32px;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 28px;
  }
  .content { position: relative; padding: 80px 88px; height: 100%; box-sizing: border-box; }
  .row { display: flex; align-items: center; gap: 16px; }
  .logo-tile {
    display: grid; place-items: center;
  }
  .brand {
    font-weight: 600; font-size: 22px; letter-spacing: -0.01em;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03);
    font-size: 14px; color: rgba(255,255,255,0.85);
    margin-right: 8px;
  }
  .chip .dot { width: 6px; height: 6px; border-radius: 50%; background: #C8FF00; }
  h1 {
    font-size: 84px; line-height: 0.96; letter-spacing: -0.025em;
    font-weight: 700;
    margin: 96px 0 0 0;
    max-width: 980px;
  }
  .gradient {
    background: linear-gradient(90deg, #C8FF00 0%, #B7F500 50%, #7C5CFF 110%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .meta {
    position: absolute; left: 88px; right: 88px; bottom: 80px;
    display: flex; align-items: center; justify-content: space-between;
    color: rgba(255,255,255,0.6); font-size: 16px;
  }
  .meta .left { display: flex; align-items: center; gap: 24px; }
  .meta strong { color: #fff; }
  .ds-mono { font-family: ui-monospace, 'JetBrains Mono', SFMono-Regular, monospace; letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; }
</style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="glow-3"></div>
  <div class="grid"></div>
  <div class="frame"></div>

  <div class="content">
    <div class="row" style="justify-content: space-between;">
      <div class="row">
        <div class="logo-tile">
          <svg width="56" height="56" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="14" fill="#C8FF00"/>
            <rect x="18" y="14" width="34" height="12" rx="6" fill="#06070A"/>
            <rect x="12" y="34" width="40" height="12" rx="6" fill="#06070A"/>
          </svg>
        </div>
        <div class="brand">DuoStack</div>
      </div>
      <div>
        <span class="chip"><span class="dot"></span>Mumbai · India</span>
        <span class="chip">Booking Q3 2026</span>
      </div>
    </div>

    <h1>
      Engineering studio<br/>
      for <span class="gradient">premium products</span>.
    </h1>

    <div class="meta">
      <div class="left">
        <span class="ds-mono">React · Next.js · CRM · Mobile · MT5</span>
      </div>
      <div>
        <strong>duostack.in</strong>
      </div>
    </div>
  </div>
</body>
</html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
const buf = await page.screenshot({ type: 'jpeg', quality: 90, fullPage: false })
await writeFile(OUT, buf)
await browser.close()
console.log(`✨ Wrote ${OUT} (${(buf.length / 1024).toFixed(1)} KB)`)

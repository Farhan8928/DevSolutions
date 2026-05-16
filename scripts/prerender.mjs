// Prerender the SPA into static HTML so search engines see fully rendered
// content immediately. Runs after `vite build`. Spawns a tiny static server
// pointed at /dist, opens the route in a headless browser, captures the
// post-hydration HTML, and writes it back over /dist/index.html.
//
// Why this matters for SEO:
//   • Googlebot can crawl JS, but it's a two-pass system with a long queue.
//     Static HTML is indexed in the first pass, often within hours.
//   • Bing, DuckDuckGo, LinkedIn, Twitter, Slack and most LLM crawlers do
//     NOT execute JS. They see only the prerendered HTML.
//
// Usage: `npm run build` automatically calls this via the `postbuild` hook.

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

// Routes to prerender. Single-page for now, but easy to extend.
const ROUTES = ['/']

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
}

function startStaticServer(root, port = 0) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
        if (urlPath === '/' || urlPath === '') urlPath = '/index.html'
        let filePath = join(root, urlPath)

        try {
          const s = await stat(filePath)
          if (s.isDirectory()) filePath = join(filePath, 'index.html')
        } catch {
          // SPA fallback for unknown paths
          filePath = join(root, 'index.html')
        }

        const ext = extname(filePath).toLowerCase()
        const data = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
        res.end(data)
      } catch {
        res.writeHead(404).end('Not found')
      }
    })
    server.listen(port, '127.0.0.1', () => {
      const { port: chosen } = server.address()
      resolve({ server, port: chosen })
    })
  })
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  // ?prerender=1 — App.jsx checks this flag and skips the intro Loader
  // and cursor effects, so the rendered DOM is the real, content-rich page.
  const url = `${baseUrl}${route}${route.includes('?') ? '&' : '?'}prerender=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  // Give Framer Motion one more frame to settle
  await page.waitForTimeout(500)

  // Capture the full rendered HTML, restore the original document language
  // attribute and strip the prerender flag from any inline scripts.
  const html = await page.evaluate(() => {
    // Mark sections expanded in the DOM so the FAQ answer copy is in the
    // crawled HTML. The first item is already open by default.
    return '<!doctype html>\n' + document.documentElement.outerHTML
  })

  await page.close()
  return html
}

async function main() {
  console.log('🔧 Prerender: starting static server')
  const { server, port } = await startStaticServer(DIST)
  const baseUrl = `http://127.0.0.1:${port}`
  console.log(`🔧 Prerender: dist served on ${baseUrl}`)

  console.log('🔧 Prerender: launching headless browser')
  const browser = await chromium.launch()

  try {
    for (const route of ROUTES) {
      console.log(`🔧 Prerender: ${route}`)
      const html = await prerenderRoute(browser, baseUrl, route)
      const out = route === '/' ? 'index.html' : join(route.slice(1), 'index.html')
      const target = join(DIST, out)
      await writeFile(target, html, 'utf8')
      console.log(`✅ Prerendered → dist/${out} (${(html.length / 1024).toFixed(1)} KB)`)
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log('✨ Prerender done')
}

main().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})

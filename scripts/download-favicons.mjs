/**
 * Download every favicon used on the site (clients + tech stack) to local disk.
 * After running, projects.js / stack.js will be served from /favicons/* on
 * your own origin instead of Google S2.
 *
 * For tech stack we try the official Simple Icons CDN first (sharp SVGs)
 * and fall back to Google S2 (PNG) if the brand isn't on Simple Icons.
 *
 * Usage:  npm run favicons
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __root = path.resolve(path.dirname(__filename), '..')

// ─── Sources ────────────────────────────────────────────────────────────────
// Clients — host pulled straight from the projects file.
// Public sites only — private CRMs have no public host to fetch an icon from.
const clients = [
  { id: 'remesleep',      host: 'remesleep.com' },
  { id: 'outvue',         host: 'outvue.io' },
  { id: 'bakerandco',     host: 'bakerandco.ae' },
  { id: 'humanewarriors', host: 'humanewarriors.ch' },
  { id: 'howl',           host: 'howl.in' },
  { id: 'benzer',         host: 'benzerworld.com' },
  { id: 'mossanomarmo',   host: 'mossano-marmo.vercel.app' },
  { id: 'saumstudio',     host: 'saumstudio.com' },
  { id: 'autopart',       host: 'autodoorspecialist.com' },
  { id: 'zaidelectronics', host: 'zaidelectronicsmumbai.com' },
  { id: 'gourifurnishing', host: 'gourifurnishing.com' }
]

// Tech stack — `slug` matches Simple Icons; `host` is fallback for S2.
const stack = [
  // Frontend
  { id: 'react',         slug: 'react',          host: 'react.dev' },
  { id: 'nextjs',        slug: 'nextdotjs',      host: 'nextjs.org' },
  { id: 'vite',          slug: 'vite',           host: 'vitejs.dev' },
  { id: 'typescript',    slug: 'typescript',     host: 'typescriptlang.org' },
  { id: 'tailwindcss',   slug: 'tailwindcss',    host: 'tailwindcss.com' },
  { id: 'framer-motion', slug: 'framer',         host: 'motion.dev' },

  // Backend
  { id: 'nodejs',        slug: 'nodedotjs',      host: 'nodejs.org' },
  { id: 'nestjs',        slug: 'nestjs',         host: 'nestjs.com' },
  { id: 'express',       slug: 'express',        host: 'expressjs.com' },
  { id: 'graphql',       slug: 'graphql',        host: 'graphql.org' },
  { id: 'postgresql',    slug: 'postgresql',     host: 'postgresql.org' },
  { id: 'mongodb',       slug: 'mongodb',        host: 'mongodb.com' },

  // Infra
  { id: 'vercel',        slug: 'vercel',         host: 'vercel.com' },
  { id: 'aws',           slug: 'amazonaws',      host: 'aws.amazon.com' },
  { id: 'docker',        slug: 'docker',         host: 'docker.com' },
  { id: 'github',        slug: 'github',         host: 'github.com' },
  { id: 'cloudflare',    slug: 'cloudflare',     host: 'cloudflare.com' },
  { id: 'sentry',        slug: 'sentry',         host: 'sentry.io' },

  // Integrations
  { id: 'mt5',           slug: 'metatrader',     host: 'metatrader5.com' },
  { id: 'stripe',        slug: 'stripe',         host: 'stripe.com' },
  { id: 'meta',          slug: 'meta',           host: 'developers.facebook.com' },
  { id: 'twilio',        slug: 'twilio',         host: 'twilio.com' },
  { id: 'shopify',       slug: 'shopify',        host: 'shopify.com' },
  { id: 'sanity',        slug: 'sanity',         host: 'sanity.io' }
]

// ─── Helpers ────────────────────────────────────────────────────────────────
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/130 Safari/537.36',
  'Accept': 'image/svg+xml,image/png,image/x-icon,*/*'
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function ensureDir(d) { await fs.mkdir(d, { recursive: true }) }

const s2 = (host) => `https://www.google.com/s2/favicons?domain=${host}&sz=128`
const simpleIcons = (slug) => `https://cdn.simpleicons.org/${slug}`

// ─── Pipelines ──────────────────────────────────────────────────────────────
// Google S2 returns 404 for domains it hasn't crawled yet (typically anything
// registered in the last few weeks). For those we go straight to the origin and
// read whatever the site declares in its own <head>.
const EXT_BY_TYPE = {
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
  'image/jpeg': 'jpg',
  'image/webp': 'webp'
}

async function originIconUrls(host) {
  const urls = []
  // Some certs cover only www (or only the apex), so try both spellings —
  // outvue.io fails TLS while www.outvue.io serves fine.
  const bare = host.replace(/^www\./, '')
  const hosts = [...new Set([host, `www.${bare}`, bare])]

  for (const h of hosts) {
    try {
      const res = await fetch(`https://${h}/`, { headers: HEADERS, redirect: 'follow' })
      if (!res.ok) continue
      const html = await res.text()
      // <link rel="icon|shortcut icon|apple-touch-icon" href="...">
      const re = /<link[^>]+rel=["'][^"']*\b(?:icon|shortcut icon|apple-touch-icon)\b[^"']*["'][^>]*>/gi
      for (const tag of html.match(re) ?? []) {
        const href = tag.match(/href=["']([^"']+)["']/i)?.[1]
        if (href) urls.push(new URL(href, res.url || `https://${h}/`).href)
      }
      if (urls.length) break
    } catch { /* try the next spelling */ }
  }

  // Conventional paths, tried after anything the page declared.
  for (const h of hosts) {
    for (const p of ['/favicon.svg', '/favicon.png', '/favicon.ico', '/apple-touch-icon.png']) {
      urls.push(`https://${h}${p}`)
    }
  }
  // Prefer SVG (scales cleanly), then PNG, then .ico.
  const rank = (u) => (/\.svg/i.test(u) ? 0 : /\.png/i.test(u) ? 1 : 2)
  return [...new Set(urls)].sort((a, b) => rank(a) - rank(b))
}

// S2 answers with a ~200-byte generic globe for domains it has no real icon
// for. That's a worse result than the site's own icon, so anything this small
// is held back and only used if the origin turns up nothing.
const S2_TRUSTWORTHY_BYTES = 500

async function downloadClient(c, dir) {
  // 1. Google S2 — one consistent 128px PNG per domain when it has a real one.
  let weakS2 = null
  try {
    const buf = await fetchBuffer(s2(c.host))
    if (buf.length >= S2_TRUSTWORTHY_BYTES) {
      await fs.writeFile(path.join(dir, `${c.id}.png`), buf)
      return { ok: true, bytes: buf.length, ext: 'png', source: 'S2' }
    }
    if (buf.length >= 100) weakS2 = buf
  } catch { /* fall through to the origin */ }

  // 2. The site's own favicon.
  for (const url of await originIconUrls(c.host)) {
    try {
      const res = await fetch(url, { headers: HEADERS, redirect: 'follow' })
      if (!res.ok) continue
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 100) continue
      const type = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase()
      // Some hosts serve the SPA's index.html for missing assets — reject those.
      if (type.startsWith('text/')) continue
      const ext = EXT_BY_TYPE[type] ?? url.split('?')[0].split('.').pop()?.toLowerCase()
      if (!['svg', 'png', 'ico', 'jpg', 'webp'].includes(ext)) continue
      await fs.writeFile(path.join(dir, `${c.id}.${ext}`), buf)
      return { ok: true, bytes: buf.length, ext, source: 'origin' }
    } catch { /* try the next candidate */ }
  }

  // 3. Nothing better turned up — fall back to S2's generic icon if we got one.
  if (weakS2) {
    await fs.writeFile(path.join(dir, `${c.id}.png`), weakS2)
    return { ok: true, bytes: weakS2.length, ext: 'png', source: 'S2-generic' }
  }

  return { ok: false, error: 'no favicon found (S2 404 + origin)' }
}

async function downloadTool(t, dir) {
  // Try Simple Icons SVG first — sharper, smaller, scales perfectly
  try {
    const buf = await fetchBuffer(simpleIcons(t.slug))
    if (buf.length > 200) {
      const dest = path.join(dir, `${t.id}.svg`)
      await fs.writeFile(dest, buf)
      return { ok: true, bytes: buf.length, ext: 'svg', source: 'SimpleIcons' }
    }
  } catch { /* fall through */ }

  // Fallback to Google S2 PNG
  try {
    const buf = await fetchBuffer(s2(t.host))
    const dest = path.join(dir, `${t.id}.png`)
    await fs.writeFile(dest, buf)
    return { ok: true, bytes: buf.length, ext: 'png', source: 'S2' }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const clientsDir = path.join(__root, 'public', 'favicons', 'clients')
  const stackDir   = path.join(__root, 'public', 'favicons', 'stack')
  await ensureDir(clientsDir)
  await ensureDir(stackDir)

  console.log(`\nDownloading favicons → ${path.relative(__root, path.dirname(clientsDir))}\n`)

  console.log(`Clients (${clients.length})`)
  const clientResults = []
  for (const c of clients) {
    process.stdout.write(`  ${c.id.padEnd(16)} ${c.host.padEnd(28)} `)
    const r = await downloadClient(c, clientsDir)
    clientResults.push({ ...c, ...r })
    process.stdout.write(r.ok ? `✓ ${(r.bytes / 1024).toFixed(1)} KB (${r.ext}/${r.source})\n` : `⚠ ${r.error}\n`)
  }

  console.log(`\nTech stack (${stack.length})`)
  const stackResults = []
  for (const t of stack) {
    process.stdout.write(`  ${t.id.padEnd(16)} `)
    const r = await downloadTool(t, stackDir)
    stackResults.push({ ...t, ...r })
    process.stdout.write(r.ok ? `✓ ${(r.bytes / 1024).toFixed(1)} KB (${r.ext}/${r.source})\n` : `⚠ ${r.error}\n`)
  }

  const okClients = clientResults.filter((r) => r.ok).length
  const okStack   = stackResults.filter((r) => r.ok).length
  const totalBytes = [...clientResults, ...stackResults]
    .filter((r) => r.ok)
    .reduce((sum, r) => sum + r.bytes, 0)

  console.log(
    `\nDone. ${okClients}/${clients.length} clients · ${okStack}/${stack.length} stack · ${(totalBytes / 1024).toFixed(0)} KB total.\n`
  )

  // Write a small manifest so the data files can read which extension to use.
  //
  // A failed download must never drop an entry that already has a good file on
  // disk — some of these are hand-drawn SVG placeholders, and S2 intermittently
  // 404s domains it served fine last week. So we resolve each id against the
  // directory rather than trusting only this run's results.
  async function resolve(results, dir, urlBase) {
    const onDisk = await fs.readdir(dir).catch(() => [])
    const entries = []
    for (const r of results) {
      // Prefer the extension we just wrote; otherwise take whatever is there.
      const preferred = r.ok ? [`${r.id}.${r.ext}`] : []
      const existing = onDisk.filter((f) => f.replace(/\.[^.]+$/, '') === r.id)
      const file = preferred.find((f) => onDisk.includes(f)) ?? existing[0]
      if (file) entries.push([r.id, `${urlBase}/${file}`])
    }
    return Object.fromEntries(entries)
  }

  const manifest = {
    clients: await resolve(clientResults, clientsDir, '/favicons/clients'),
    stack: await resolve(stackResults, stackDir, '/favicons/stack')
  }
  await fs.writeFile(
    path.join(__root, 'src', 'data', 'favicon-manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  console.log('Manifest written → src/data/favicon-manifest.json\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

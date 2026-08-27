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
const clients = [
  { id: 'remesleep',      host: 'remesleep.com' },
  { id: 'humanewarriors', host: 'humanewarriors.ch' },
  { id: 'howl',           host: 'howl.in' },
  { id: 'benzer',         host: 'benzerworld.com' },
  { id: 'chainthat',      host: 'chainthat.com' },
  { id: 'bakerandco',     host: 'bakerandco.ae' },
  { id: 'elitefx',        host: 'elitefx.in' },
  { id: 'autopart',       host: 'autodoorspecialist.com' }
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
async function downloadClient(c, dir) {
  const url = s2(c.host)
  const dest = path.join(dir, `${c.id}.png`)
  try {
    const buf = await fetchBuffer(url)
    if (buf.length < 100) throw new Error('suspiciously small')
    await fs.writeFile(dest, buf)
    return { ok: true, bytes: buf.length, source: 'S2' }
  } catch (e) {
    return { ok: false, error: e.message }
  }
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
    process.stdout.write(r.ok ? `✓ ${(r.bytes / 1024).toFixed(1)} KB (${r.source})\n` : `⚠ ${r.error}\n`)
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
  const manifest = {
    clients: Object.fromEntries(
      clientResults.filter((r) => r.ok).map((r) => [r.id, `/favicons/clients/${r.id}.png`])
    ),
    stack: Object.fromEntries(
      stackResults.filter((r) => r.ok).map((r) => [r.id, `/favicons/stack/${r.id}.${r.ext}`])
    )
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

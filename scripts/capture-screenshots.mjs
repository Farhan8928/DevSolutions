/**
 * Capture a real screenshot of every project domain via WordPress mShots,
 * then save it locally to /public/projects/<id>.jpg.
 *
 * mShots returns a small placeholder (a few KB) while it's still rendering
 * the page in the background. We poll the URL until the response is large
 * enough to be the real screenshot.
 *
 * Usage:  npm run screenshots
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __root = path.resolve(path.dirname(__filename), '..')

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

const W = 1600
const H = 1000
const MIN_REAL_BYTES = 25_000   // anything smaller is mShots placeholder
const MAX_TRIES = 18            // ~ 90s per site
const DELAY_MS = 5000

const outDir = path.join(__root, 'public', 'projects')

async function ensureDir(d) {
  await fs.mkdir(d, { recursive: true })
}

function mshots(url, bust = 0) {
  const u = new URL('https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url))
  u.searchParams.set('w', String(W))
  u.searchParams.set('h', String(H))
  if (bust) u.searchParams.set('_b', String(bust))
  return u.toString()
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/jpeg,image/png,*/*;q=0.8'
    },
    redirect: 'follow'
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  return buf
}

async function captureOne({ id, url }) {
  const dest = path.join(outDir, `${id}.jpg`)
  process.stdout.write(`▸ ${id.padEnd(16)} ${url}\n`)

  let lastBuf = null
  for (let i = 0; i < MAX_TRIES; i++) {
    try {
      const buf = await fetchBuffer(mshots(url, i))
      lastBuf = buf
      const ok = buf.length >= MIN_REAL_BYTES
      process.stdout.write(
        `   try ${String(i + 1).padStart(2, '0')}/${MAX_TRIES}  ${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${ok ? '✓' : '… still rendering'}\n`
      )
      if (ok) {
        await fs.writeFile(dest, buf)
        return { id, ok: true, bytes: buf.length, path: `/projects/${id}.jpg` }
      }
    } catch (err) {
      process.stdout.write(`   try ${i + 1} error: ${err.message}\n`)
    }
    await new Promise((r) => setTimeout(r, DELAY_MS))
  }

  // Timed out — write whatever we last received so the page still has something.
  if (lastBuf) {
    await fs.writeFile(dest, lastBuf)
    return { id, ok: false, bytes: lastBuf.length, path: `/projects/${id}.jpg`, note: 'placeholder' }
  }
  return { id, ok: false, bytes: 0, path: null, note: 'failed' }
}

async function main() {
  await ensureDir(outDir)
  console.log(`\nCapturing ${projects.length} screenshots → ${path.relative(__root, outDir)}\n`)

  const results = []
  for (const p of projects) {
    results.push(await captureOne(p))
  }

  console.log('\nSummary:')
  for (const r of results) {
    const tag = r.ok ? '✓' : '⚠'
    console.log(`  ${tag} ${r.id.padEnd(16)} ${(r.bytes / 1024).toFixed(0).padStart(5)} KB  ${r.note ?? ''}`)
  }

  const ok = results.filter((r) => r.ok).length
  console.log(`\n${ok}/${results.length} captured successfully.\n`)
  if (ok < results.length) {
    console.log('Tip: re-run "npm run screenshots" — mShots often needs a second pass for fresh URLs.\n')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

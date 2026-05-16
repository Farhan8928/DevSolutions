// Generate static SEO landing pages from src/data/seoPages.js.
//
// Each page is a fully self-contained HTML file — no client JS bundle —
// that targets a specific service-in-Mumbai long-tail keyword. Each one:
//
//   • Has its own <title>, meta description, canonical URL
//   • Renders a real H1, H2 outline, FAQ accordion (CSS-only)
//   • Embeds BreadcrumbList + Service + LocalBusiness JSON-LD
//   • Embeds FAQPage JSON-LD with content matching the visible Q&As
//   • Cross-links to its sibling pages via the "related" array
//   • Links back to the main app at every primary CTA
//
// Also rewrites public/sitemap.xml to include every generated URL plus
// the home page, with hreflang and lastmod tags.
//
// Vercel-safe: pure file ops, zero browser dependency. Hooks into the
// build via package.json: `vite build && node scripts/generate-pages.mjs`.

import { mkdir, writeFile, readFile, copyFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, '..')
const DIST      = join(ROOT, 'dist')

// --- Site constants. Mirror src/data/studio.js. ---
const SITE_URL = 'https://devsolutions-tech.vercel.app'
const SITE_NAME = 'DevSolutions'
const TODAY = new Date().toISOString().slice(0, 10)

// --- Load the page data from src/. Use file:// URL for Windows compat. ---
const { seoPages } = await import(
  pathToFileURL(join(ROOT, 'src/data/seoPages.js')).href
)

// ----------------------------------------------------------------------
// Templating helpers
// ----------------------------------------------------------------------
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const findPage = (slug) => seoPages.find((p) => p.slug === slug)

const renderRelated = (related = []) => {
  if (!related.length) return ''
  const items = related
    .map(findPage)
    .filter(Boolean)
    .map(
      (p) => `
        <li>
          <a class="related-card" href="/${p.slug}/">
            <span class="related-eyebrow">${esc(p.eyebrow)}</span>
            <span class="related-title">${esc(p.h1)}</span>
            <span class="related-arrow" aria-hidden>→</span>
          </a>
        </li>`
    )
    .join('')
  return `
    <section class="related" aria-labelledby="related-h">
      <h2 id="related-h">Related services in Mumbai</h2>
      <ul>${items}</ul>
    </section>`
}

const renderFaq = (faqs = []) => {
  if (!faqs.length) return ''
  const items = faqs
    .map(
      (f, i) => `
      <details ${i === 0 ? 'open' : ''}>
        <summary>${esc(f.q)}</summary>
        <p>${esc(f.a)}</p>
      </details>`
    )
    .join('')
  return `
    <section class="faq" aria-labelledby="faq-h">
      <h2 id="faq-h">Frequently asked questions</h2>
      ${items}
    </section>`
}

const renderJsonLd = (page) => {
  const pageUrl = `${SITE_URL}/${page.slug}/`

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/#services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.h1,
        item: pageUrl
      }
    ]
  }

  const service = {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: page.serviceName,
    serviceType: page.serviceName,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Maharashtra' },
      { '@type': 'Country', name: 'India' }
    ],
    description: page.metaDescription,
    url: pageUrl
  }

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: page.metaTitle,
    description: page.metaDescription,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-IN',
    primaryImageOfPage: `${SITE_URL}/og.jpg`
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [breadcrumb, service, faqPage, webPage]
  }, null, 2)
}

const PAGE_CSS = `
  :root {
    color-scheme: dark;
    --bg: #06070A;
    --ink: #fff;
    --muted: rgba(255,255,255,0.7);
    --dim: rgba(255,255,255,0.45);
    --border: rgba(255,255,255,0.1);
    --card: rgba(255,255,255,0.03);
    --lime: #C8FF00;
    --violet: #7C5CFF;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    line-height: 1.55; -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
  header.site {
    border-bottom: 1px solid var(--border);
    padding: 18px 0;
    position: sticky; top: 0; background: rgba(6,7,10,0.85);
    backdrop-filter: blur(12px); z-index: 10;
  }
  header.site .row { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  .brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 600; }
  .brand .mark { width: 32px; height: 32px; }
  nav.site a { color: var(--muted); margin-left: 24px; font-size: 14px; }
  nav.site a:hover { color: var(--ink); }
  .cta {
    background: var(--lime); color: #06070A; font-weight: 600;
    padding: 9px 16px; border-radius: 999px; font-size: 13px;
  }
  .crumbs { padding: 28px 0 0; font-size: 12px; color: var(--dim); }
  .crumbs a { color: var(--muted); }
  .crumbs span { margin: 0 8px; opacity: 0.4; }
  .eyebrow {
    display: inline-block; padding: 6px 12px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--card);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); margin: 28px 0 24px;
  }
  h1 {
    font-size: clamp(2.2rem, 5vw, 3.6rem); line-height: 1.05;
    letter-spacing: -0.025em; margin: 0 0 24px; font-weight: 700;
    max-width: 24ch;
  }
  h2 {
    font-size: clamp(1.5rem, 2.6vw, 2rem); margin: 48px 0 16px;
    letter-spacing: -0.02em; font-weight: 700;
  }
  p { color: var(--muted); margin: 0 0 18px; max-width: 70ch; }
  .hero p { font-size: 1.05rem; color: var(--muted); }
  .hero .ctas { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 12px; }
  .btn {
    padding: 12px 22px; border-radius: 999px;
    border: 1px solid var(--border); font-size: 14px; font-weight: 500;
  }
  .btn-primary { background: var(--lime); color: #06070A; border-color: var(--lime); }
  .btn-ghost { color: var(--ink); }
  section { padding: 12px 0; }
  .faq details {
    border: 1px solid var(--border); background: var(--card);
    border-radius: 16px; padding: 16px 20px; margin-bottom: 12px;
  }
  .faq summary {
    cursor: pointer; font-weight: 500; font-size: 16px;
    list-style: none; padding-right: 16px;
  }
  .faq summary::-webkit-details-marker { display: none; }
  .faq summary::after {
    content: '+'; float: right; color: var(--lime); font-size: 22px;
    line-height: 1; transition: transform 0.2s;
  }
  .faq details[open] summary::after { content: '-'; }
  .faq p { margin: 12px 0 0; color: var(--muted); }
  .related { padding: 24px 0 60px; }
  .related ul { list-style: none; padding: 0; display: grid; gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .related-card {
    display: flex; flex-direction: column; gap: 8px;
    padding: 18px; border-radius: 16px;
    border: 1px solid var(--border); background: var(--card);
    transition: border-color 0.2s, transform 0.2s;
    position: relative;
  }
  .related-card:hover { border-color: rgba(200,255,0,0.4); transform: translateY(-2px); }
  .related-eyebrow {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--dim);
  }
  .related-title { font-size: 15px; font-weight: 500; color: var(--ink); }
  .related-arrow { position: absolute; top: 18px; right: 18px; color: var(--lime); }
  footer.site { border-top: 1px solid var(--border); padding: 32px 0; color: var(--dim); font-size: 13px; }
  footer.site .row { display: flex; flex-wrap: wrap; gap: 18px; justify-content: space-between; }
`

const renderHtml = (page) => {
  const url = `${SITE_URL}/${page.slug}/`
  const introHtml  = page.intro.map((p) => `<p>${esc(p)}</p>`).join('')
  const sectionsHtml = page.sections
    .map((s) => `<section><h2>${esc(s.h2)}</h2><p>${esc(s.body)}</p></section>`)
    .join('')

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(page.metaTitle)}</title>
<meta name="description" content="${esc(page.metaDescription)}" />
<meta name="keywords" content="${esc(page.keyword)}, ${esc(page.serviceName)}, Mumbai, India" />
<meta name="author" content="${SITE_NAME}" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="en-IN" href="${url}" />
<link rel="alternate" hreflang="en"    href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />

<meta name="geo.region" content="IN-MH" />
<meta name="geo.placename" content="Mumbai" />
<meta name="geo.position" content="19.0760;72.8777" />
<meta name="ICBM" content="19.0760, 72.8777" />

<meta property="og:locale" content="en_IN" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(page.metaTitle)}" />
<meta property="og:description" content="${esc(page.metaDescription)}" />
<meta property="og:image" content="${SITE_URL}/og.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(page.metaTitle)}" />
<meta name="twitter:description" content="${esc(page.metaDescription)}" />
<meta name="twitter:image" content="${SITE_URL}/og.jpg" />

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#06070A" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

<style>${PAGE_CSS}</style>

<script type="application/ld+json">
${renderJsonLd(page)}
</script>
</head>
<body>
  <header class="site">
    <div class="wrap row">
      <a class="brand" href="/" aria-label="${SITE_NAME} home">
        <svg class="mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="14" fill="#C8FF00"/>
          <path fill="#06070A" fill-rule="evenodd"
            d="M 14 12 H 32 A 20 20 0 0 1 32 52 H 14 Z M 22 20 H 32 A 12 12 0 0 1 32 44 H 22 Z"/>
        </svg>
        <span>${SITE_NAME}</span>
      </a>
      <nav class="site" aria-label="Primary">
        <a href="/#services">Services</a>
        <a href="/#work">Work</a>
        <a href="/#process">Process</a>
        <a href="/#contact" class="cta">Start a project</a>
      </nav>
    </div>
  </header>

  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span>
      <a href="/#services">Services</a><span>/</span>
      <span>${esc(page.h1)}</span>
    </nav>

    <section class="hero">
      <span class="eyebrow">${esc(page.eyebrow)}</span>
      <h1>${esc(page.h1)}</h1>
      ${introHtml}
      <div class="ctas">
        <a class="btn btn-primary" href="/#contact">Start a project</a>
        <a class="btn btn-ghost" href="/#work">See selected work</a>
      </div>
    </section>

    ${sectionsHtml}
    ${renderFaq(page.faqs)}
    ${renderRelated(page.related)}
  </main>

  <footer class="site">
    <div class="wrap row">
      <span>© ${new Date().getFullYear()} ${SITE_NAME} · Mumbai, India</span>
      <span>Built with React · Vite · Tailwind</span>
    </div>
  </footer>
</body>
</html>
`
}

// ----------------------------------------------------------------------
// Sitemap regeneration
// ----------------------------------------------------------------------
const renderSitemap = () => {
  const home = `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en"    href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`

  const anchors = ['services', 'work', 'process', 'stack', 'contact', 'faq']
    .map((a) => `  <url>
    <loc>${SITE_URL}/#${a}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')

  const services = seoPages.map((p) => `  <url>
    <loc>${SITE_URL}/${p.slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE_URL}/${p.slug}/" />
    <xhtml:link rel="alternate" hreflang="en"    href="${SITE_URL}/${p.slug}/" />
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${home}
${anchors}
${services}
</urlset>
`
}

// ----------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------
async function ensureDir(p) { await mkdir(p, { recursive: true }) }

const distExists = await stat(DIST).catch(() => null)
if (!distExists) {
  console.error('❌ dist/ does not exist. Run `vite build` first.')
  process.exit(1)
}

let count = 0
for (const page of seoPages) {
  const outDir = join(DIST, page.slug)
  await ensureDir(outDir)
  await writeFile(join(outDir, 'index.html'), renderHtml(page), 'utf8')
  count += 1
  console.log(`✓ ${page.slug.padEnd(40)} → /${page.slug}/`)
}

// Rewrite sitemap (writes to BOTH /public so dev server is correct AND /dist
// so the deployed build is correct — Vercel only ships dist/, but a dev
// run against `npm run dev` would otherwise read the stale public copy).
const sitemap = renderSitemap()
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(join(ROOT, 'public', 'sitemap.xml'), sitemap, 'utf8')

console.log(`\n✨ Generated ${count} SEO pages + sitemap.xml`)

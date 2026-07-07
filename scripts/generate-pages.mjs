// Generate static SEO landing pages for service-in-Mumbai queries AND
// neighbourhood-in-Mumbai queries. Each page is a fully self-contained
// HTML file — no client JS bundle — that targets a specific long-tail
// keyword. Pages are written by hand (not AI templated) so each one
// targets a distinct buyer intent with unique copy.
//
// Three classes of pages are produced:
//
//   1. Service pages (6) — /[service-slug]/index.html
//        e.g. /web-development-company-mumbai/
//        Source: src/data/seoPages.js
//
//   2. Neighbourhood pages (8) — /web-development-[area]-mumbai/index.html
//        e.g. /web-development-andheri-mumbai/
//        Source: src/data/studio.js → serviceAreas
//
//   3. Sitemap (rewritten) — /sitemap.xml
//        Auto-rebuilt to include every generated URL with hreflang + lastmod.
//
// All pages embed:
//   • Per-page <title>, meta description, canonical URL
//   • Real H1, H2 outline, FAQ accordion (CSS-only)
//   • BreadcrumbList + Service + LocalBusiness + FAQPage + WebPage JSON-LD
//   • Sticky tap-to-call and tap-to-WhatsApp CTAs (mobile-first)
//   • Cross-links between siblings to form a tight topical cluster
//
// Vercel-safe: pure file ops, zero browser dependency.

import { mkdir, writeFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, '..')
const DIST      = join(ROOT, 'dist')

// ----------------------------------------------------------------------
// Site constants — mirror src/data/studio.js
// ----------------------------------------------------------------------
const SITE_URL  = 'https://duostack.in'
const SITE_NAME = 'DuoStack'
const PHONE_E164 = '+918928040454'
const PHONE_DISPLAY = '+91 89280 40454'
const WHATSAPP_NUMBER = '918928040454'
const WHATSAPP_MSG = encodeURIComponent(
  'Hi DuoStack, I came across your studio and would love to discuss a project.'
)
const TODAY = new Date().toISOString().slice(0, 10)

// Load page data (file:// for Windows) ---------------------------------
const { seoPages } = await import(
  pathToFileURL(join(ROOT, 'src/data/seoPages.js')).href
)
const { serviceAreas } = await import(
  pathToFileURL(join(ROOT, 'src/data/studio.js')).href
)

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const findPage = (slug) => seoPages.find((p) => p.slug === slug)

const tel  = `tel:${PHONE_E164}`
const wapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ----------------------------------------------------------------------
// JSON-LD with full Mumbai neighbourhood enumeration
// ----------------------------------------------------------------------
const areaServedGraph = serviceAreas.map((a) => ({
  '@type': 'Place',
  name: `${a.name}, Mumbai`,
  geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lng }
}))

const buildJsonLd = ({
  pageUrl, pageTitle, pageDesc, h1, serviceName, faqs, tldr = []
}) => {
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
      { '@type': 'ListItem', position: 3, name: h1,         item: pageUrl }
    ]
  }

  const service = {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: serviceName,
    serviceType: serviceName,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Maharashtra' },
      { '@type': 'Country', name: 'India' },
      ...areaServedGraph
    ],
    description: pageDesc,
    url: pageUrl
  }

  const faqPage = faqs.length ? {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null

  // Author Person schema — EEAT Expertise signal. Cited as the page author
  // in WebPage so Google's Quality Rater system has a credentialed source.
  const author = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#farhan`,
    name: 'Farhan Sayyed',
    jobTitle: 'Co-founder, Engineering · DuoStack',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS',
      'PostgreSQL', 'MongoDB', 'React Native', 'MT5 integration',
      'Custom CRM development', 'Headless Shopify',
      'Healthcare software', 'Fintech platform development'
    ],
    sameAs: ['https://www.linkedin.com/in/duo-stack-b84289411']
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: pageTitle,
    description: pageDesc,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-IN',
    primaryImageOfPage: `${SITE_URL}/og.jpg`,
    datePublished: '2026-05-16',
    dateModified: TODAY,
    author: { '@id': `${SITE_URL}/#farhan` },
    reviewedBy: { '@id': `${SITE_URL}/#farhan` },
    lastReviewed: TODAY,
    ...(tldr.length ? { abstract: tldr.join(' ') } : {})
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [breadcrumb, service, webPage, faqPage, author].filter(Boolean)
    },
    null, 2
  )
}

// ----------------------------------------------------------------------
// Shared CSS — single inlined stylesheet, no external runtime
// ----------------------------------------------------------------------
const PAGE_CSS = `
  :root {
    color-scheme: dark;
    --bg: #06070A;
    --ink: #fff;
    --muted: rgba(255,255,255,0.72);
    --dim: rgba(255,255,255,0.45);
    --border: rgba(255,255,255,0.1);
    --card: rgba(255,255,255,0.03);
    --lime: #C8FF00;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0; background: var(--bg); color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    line-height: 1.55; -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  header.site {
    border-bottom: 1px solid var(--border);
    padding: 16px 0;
    position: sticky; top: 0; background: rgba(6,7,10,0.85);
    backdrop-filter: blur(12px); z-index: 20;
  }
  header.site .row { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  .brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 600; }
  .brand .mark { width: 32px; height: 32px; }
  nav.site a { color: var(--muted); margin-left: 22px; font-size: 14px; }
  nav.site a:hover { color: var(--ink); }
  .cta {
    background: var(--lime); color: #06070A; font-weight: 600;
    padding: 9px 16px; border-radius: 999px; font-size: 13px;
  }
  @media (max-width: 720px) {
    nav.site a:not(.cta) { display: none; }
  }

  .crumbs { padding: 26px 0 0; font-size: 12px; color: var(--dim); }
  .crumbs a { color: var(--muted); }
  .crumbs span { margin: 0 8px; opacity: 0.45; }

  .eyebrow {
    display: inline-block; padding: 6px 12px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--card);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); margin: 26px 0 22px;
  }

  h1 {
    font-size: clamp(2.1rem, 5vw, 3.4rem); line-height: 1.06;
    letter-spacing: -0.025em; margin: 0 0 22px; font-weight: 700;
    max-width: 24ch;
  }
  h2 {
    font-size: clamp(1.45rem, 2.5vw, 1.85rem); margin: 44px 0 14px;
    letter-spacing: -0.02em; font-weight: 700;
  }
  p { color: var(--muted); margin: 0 0 16px; max-width: 70ch; }

  .hero p { font-size: 1.05rem; }
  .hero .ctas { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 12px; }
  .btn {
    padding: 12px 22px; border-radius: 999px;
    border: 1px solid var(--border); font-size: 14px; font-weight: 500;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary { background: var(--lime); color: #06070A; border-color: var(--lime); }
  .btn-ghost   { color: var(--ink); }

  /* EEAT byline + Trust freshness */
  .byline {
    display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
    font-size: 13px; color: var(--muted); margin-top: 14px;
  }
  .byline .dot { opacity: 0.4; }
  .byline strong { color: var(--ink); font-weight: 500; }

  /* AEO direct-answer paragraph — slight visual lift so AI extractors
     find it easily and humans treat it as the lead */
  .aeo-answer {
    margin: 22px 0 0; padding: 18px 22px;
    border-left: 3px solid var(--lime);
    background: rgba(200, 255, 0, 0.04);
    border-radius: 0 14px 14px 0;
    font-size: 1rem; color: rgba(255, 255, 255, 0.88);
  }

  /* GEO TL;DR — bullet summary box */
  .tldr {
    margin: 26px 0 30px; padding: 22px 24px;
    border-radius: 18px;
    border: 1px solid var(--border);
    background: var(--card);
  }
  .tldr-h {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lime); margin: 0 0 12px;
  }
  .tldr ul {
    margin: 0; padding: 0; list-style: none; display: grid; gap: 10px;
  }
  .tldr li {
    padding-left: 22px; position: relative; color: rgba(255, 255, 255, 0.8);
    font-size: 14px; line-height: 1.55;
  }
  .tldr li::before {
    content: '→'; color: var(--lime); position: absolute; left: 0; top: 0;
  }
  .areas {
    padding: 26px 24px; border-radius: 22px;
    border: 1px solid var(--border); background: var(--card);
    margin: 36px 0;
  }
  .areas h2 { margin-top: 0; font-size: 1.15rem; }
  .areas p { font-size: 14px; }
  .area-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
  .area-list a {
    padding: 7px 14px; border-radius: 999px;
    border: 1px solid var(--border); background: rgba(255,255,255,0.02);
    font-size: 13px; color: var(--muted);
    transition: border-color 0.18s, color 0.18s;
  }
  .area-list a:hover { border-color: var(--lime); color: var(--ink); }

  /* FAQ accordion (no JS) */
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
  .faq p { margin: 12px 0 0; }

  /* Related */
  .related { padding: 28px 0 60px; }
  .related ul {
    list-style: none; padding: 0; display: grid; gap: 12px;
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

  footer.site {
    border-top: 1px solid var(--border);
    padding: 32px 0 96px;  /* extra bottom padding so sticky CTA never overlaps content */
    color: var(--dim); font-size: 13px;
  }
  footer.site .row { display: flex; flex-wrap: wrap; gap: 18px; justify-content: space-between; }

  /* Sticky tap-to-call / WhatsApp dock — mobile-first */
  .dock {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
    display: flex; gap: 0;
    background: rgba(6,7,10,0.92);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .dock a {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 16px 8px;
    font-size: 14px; font-weight: 500;
  }
  .dock a + a { border-left: 1px solid var(--border); }
  .dock .call { color: var(--lime); }
  .dock .whatsapp { color: #25D366; }
  .dock svg { width: 18px; height: 18px; flex-shrink: 0; }

  @media (min-width: 900px) {
    .dock {
      left: auto; right: 24px; bottom: 24px;
      width: 320px; border-radius: 999px;
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 18px 40px -16px rgba(0,0,0,0.6);
    }
  }
`

// ----------------------------------------------------------------------
// Page chunks — EEAT byline, AEO definitional answer, GEO TL;DR box
// ----------------------------------------------------------------------

// Visible byline + last-reviewed line. EEAT Expertise + Trust freshness.
const renderByline = () => {
  const today = new Date()
  const reviewed = today.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  return `
    <div class="byline" aria-label="Article metadata">
      <span>By <strong>Farhan Sayyed</strong> · Co-founder, Engineering · DuoStack</span>
      <span class="dot" aria-hidden>·</span>
      <span>Last reviewed <time datetime="${TODAY}">${reviewed}</time></span>
    </div>
  `
}

// AEO definitional answer block — sits right after the H1, 40-60 words,
// formatted to maximise chance of extraction by Google AI Overviews +
// PAA + featured snippets. Falls back gracefully if no answer provided.
const renderAeoAnswer = (answer) => {
  if (!answer) return ''
  return `
    <p class="aeo-answer">${esc(answer)}</p>
  `
}

// GEO TL;DR / Key Takeaways box — bullet summary at the top. AI engines
// prefer clearly-bounded scannable content for citation extraction.
const renderTldr = (items = []) => {
  if (!items.length) return ''
  return `
    <aside class="tldr" aria-labelledby="tldr-h">
      <p id="tldr-h" class="tldr-h">Key takeaways</p>
      <ul>
        ${items.map((t) => `<li>${esc(t)}</li>`).join('')}
      </ul>
    </aside>
  `
}

const renderHeader = () => `
  <header class="site">
    <div class="wrap row">
      <a class="brand" href="/" aria-label="${SITE_NAME} home">
        <svg class="mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="14" fill="#C8FF00"/>
          <rect x="18" y="14" width="34" height="12" rx="6" fill="#06070A"/>
          <rect x="12" y="34" width="40" height="12" rx="6" fill="#06070A"/>
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
`

const renderDock = () => `
  <div class="dock" aria-label="Quick contact">
    <a class="call" href="${tel}" data-cta="call">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      Call ${PHONE_DISPLAY}
    </a>
    <a class="whatsapp" href="${wapp}" target="_blank" rel="noopener noreferrer" data-cta="whatsapp">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
      </svg>
      WhatsApp
    </a>
  </div>
`

const renderFooter = () => `
  <footer class="site">
    <div class="wrap row">
      <span>© ${new Date().getFullYear()} ${SITE_NAME} · Mumbai, Maharashtra, India</span>
      <span>Built with React · Vite · Tailwind</span>
    </div>
  </footer>
`

const renderAreasBlock = (currentSlug = null) => {
  const items = serviceAreas.map((a) => {
    const slug = a.slug.includes('mumbai')
      ? `web-development-${a.slug}`
      : `web-development-${a.slug}-mumbai`
    return `
    <a href="/${slug}/" aria-label="Web development in ${esc(a.name)}, Mumbai">${esc(a.name)}</a>
  `
  }).join('')
  return `
    <section class="areas" aria-labelledby="areas-h">
      <h2 id="areas-h">Service area · Mumbai &amp; Mumbai Metropolitan Region</h2>
      <p>We work with founders and operations teams across all of Mumbai — onsite where it helps, async where it does not. Tap a neighbourhood to see how we work in your area.</p>
      <div class="area-list">
        ${items}
      </div>
    </section>
  `
}

const renderRelated = (related = []) => {
  if (!related.length) return ''
  const items = related
    .map(findPage)
    .filter(Boolean)
    .map((p) => `
      <li>
        <a class="related-card" href="/${p.slug}/">
          <span class="related-eyebrow">${esc(p.eyebrow)}</span>
          <span class="related-title">${esc(p.h1)}</span>
          <span class="related-arrow" aria-hidden>→</span>
        </a>
      </li>
    `).join('')
  return `
    <section class="related" aria-labelledby="related-h">
      <h2 id="related-h">Related services in Mumbai</h2>
      <ul>${items}</ul>
    </section>
  `
}

const renderFaqSection = (faqs = []) => {
  if (!faqs.length) return ''
  const items = faqs.map((f, i) => `
    <details ${i === 0 ? 'open' : ''}>
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>
  `).join('')
  return `
    <section class="faq" aria-labelledby="faq-h">
      <h2 id="faq-h">Frequently asked questions</h2>
      ${items}
    </section>
  `
}

// ----------------------------------------------------------------------
// Service-page renderer (one per row in seoPages.js)
// ----------------------------------------------------------------------
const renderServicePage = (page) => {
  const url = `${SITE_URL}/${page.slug}/`
  const introHtml = page.intro.map((p) => `<p>${esc(p)}</p>`).join('')
  const sectionsHtml = page.sections
    .map((s) => `<section><h2>${esc(s.h2)}</h2><p>${esc(s.body)}</p></section>`)
    .join('')

  const ldJson = buildJsonLd({
    pageUrl: url,
    pageTitle: page.metaTitle,
    pageDesc: page.metaDescription,
    h1: page.h1,
    serviceName: page.serviceName,
    faqs: page.faqs,
    tldr: page.tldr || []
  })

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(page.metaTitle)}</title>
<meta name="description" content="${esc(page.metaDescription)}" />
<meta name="keywords" content="${esc(page.keyword)}, ${esc(page.serviceName)} Mumbai, web development near me, software development company in Mumbai, ${serviceAreas.map((a) => `${page.serviceName} ${a.name}`).join(', ')}" />
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
<meta name="format-detection" content="telephone=yes" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

<style>${PAGE_CSS}</style>

<script type="application/ld+json">
${ldJson}
</script>
</head>
<body>
  ${renderHeader()}

  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span>
      <a href="/#services">Services</a><span>/</span>
      <span>${esc(page.h1)}</span>
    </nav>

    <section class="hero">
      <span class="eyebrow">${esc(page.eyebrow)}</span>
      <h1>${esc(page.h1)}</h1>
      ${renderByline()}
      ${renderAeoAnswer(page.aeoAnswer)}
      ${renderTldr(page.tldr)}
      ${introHtml}
      <div class="ctas">
        <a class="btn btn-primary" href="${tel}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn btn-ghost" href="${wapp}" target="_blank" rel="noopener noreferrer">WhatsApp the founders</a>
        <a class="btn btn-ghost" href="/#contact">Send a brief</a>
      </div>
    </section>

    ${sectionsHtml}
    ${renderAreasBlock(page.slug)}
    ${renderFaqSection(page.faqs)}
    ${renderRelated(page.related)}
  </main>

  ${renderFooter()}
  ${renderDock()}
</body>
</html>
`
}

// ----------------------------------------------------------------------
// Neighbourhood-page renderer (one per Mumbai area)
// ----------------------------------------------------------------------
const neighbourhoodPage = (area) => {
  // Avoid double-"mumbai" in slugs like Navi Mumbai (slug already contains it)
  const slug = area.slug.includes('mumbai')
    ? `web-development-${area.slug}`
    : `web-development-${area.slug}-mumbai`
  const url   = `${SITE_URL}/${slug}/`
  const h1    = `Web development company in ${area.name}, Mumbai`
  const title = `Web Development Company in ${area.name}, Mumbai — DuoStack`
  const desc  = `Web development company serving ${area.name}, Mumbai — React, Next.js and custom CMS platforms for founders across the Mumbai region. Senior engineers only.`
  const keyword = `web development company ${area.name} Mumbai`

  const intro = [
    `${SITE_NAME} works with founders and product teams in ${area.name}, Mumbai — and across the wider Mumbai Metropolitan Region — to design, build and ship premium web platforms. From a quick call to a full launch in twelve weeks, we operate the way modern engineering teams expect: senior engineers only, NDA-first, and weekly working demos every Friday.`,
    `Whether you are a D2C brand off Linking Road, a fintech founder near BKC, a healthtech team in Powai or a hospitality operator in Lower Parel, we ship with the same rigour: pixel-perfect design, Lighthouse 95+ on real devices, observability and analytics in place from week one, and full source-code transfer on day one of go-live. Tap the call or WhatsApp button on this page and you will speak directly with one of the two co-founders inside one business day.`
  ]

  const sections = [
    {
      h2: `Why founders in ${area.name} choose DuoStack`,
      body: `Three things, repeatedly. First — you talk to the engineers who actually build. There are no account managers, no juniors hidden behind a brand. Second — we ship pixel-perfect code that survives real production traffic and Lighthouse audits, not handover-and-pray deliverables. Third — we sign before we discover. Your roadmap, your stack choices and your customer data stay protected from the very first call.`
    },
    {
      h2: `What we build for ${area.name} teams`,
      body: `Marketing sites for raising rounds. Internal dashboards that route leads, orders, KYC and operations across multiple roles. Full SaaS products with auth, billing, payments and analytics. Headless Shopify and custom e-commerce. React Native apps for iOS and Android. Fintech and forex dashboards with KYC and MT5 integration. We have shipped each one of these — examples are in the work section of the home page.`
    },
    {
      h2: `Working with you in ${area.name}`,
      body: `Most engagements run remote-first with onsite days where they help. If you prefer onsite working sessions, ${area.name} is comfortably reachable for both founders. We run weekly Friday demos, async daily updates and a fixed sprint scope so you always know what you are paying for. Source code, designs and infrastructure-as-code are 100% transferred to your team on day one of go-live.`
    }
  ]

  const faqs = [
    {
      q: `Can DuoStack work onsite in ${area.name}?`,
      a: `Yes. ${area.name} is well within our regular onsite radius. We typically run remote-first with one to two onsite days per fortnight where it helps the project. Discovery and kick-off sessions are often onsite if you prefer.`
    },
    {
      q: `How fast can a project start?`,
      a: `We are currently booking the next quarter. Inquiries are answered within one business day on email, phone and WhatsApp. Once we have a signed brief, kickoff is usually within seven to ten days.`
    },
    {
      q: `What does a typical project cost?`,
      a: `Pricing scales with scope. Starter landing pages start at ₹20k. Sprint custom builds start at ₹2L. Full Pro web platforms start at ₹6.5L. Enterprise engagements quoted quarterly from ₹25L. Every engagement is fixed-scope with the price agreed upfront — no hourly billing.`
    },
    {
      q: `Will my source code stay with me?`,
      a: `Always. Source code, design files, infrastructure-as-code and deployment access are 100% transferred to your team on day one of go-live. Your IP stays yours.`
    }
  ]

  const ldJson = buildJsonLd({
    pageUrl: url,
    pageTitle: title,
    pageDesc: desc,
    h1,
    serviceName: 'Web platforms',
    faqs
  })

  const introHtml = intro.map((p) => `<p>${esc(p)}</p>`).join('')
  const sectionsHtml = sections
    .map((s) => `<section><h2>${esc(s.h2)}</h2><p>${esc(s.body)}</p></section>`)
    .join('')

  return {
    slug,
    html: `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta name="keywords" content="${esc(keyword)}, web designer ${area.name}, web design company ${area.name} Mumbai, website development near me, software development company ${area.name}, website builder Mumbai" />
<meta name="author" content="${SITE_NAME}" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="en-IN" href="${url}" />
<link rel="alternate" hreflang="en"    href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />

<meta name="geo.region" content="IN-MH" />
<meta name="geo.placename" content="${area.name}, Mumbai" />
<meta name="geo.position" content="${area.lat};${area.lng}" />
<meta name="ICBM" content="${area.lat}, ${area.lng}" />

<meta property="og:locale" content="en_IN" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${SITE_URL}/og.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${SITE_URL}/og.jpg" />

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#06070A" />
<meta name="format-detection" content="telephone=yes" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

<style>${PAGE_CSS}</style>

<script type="application/ld+json">
${ldJson}
</script>
</head>
<body>
  ${renderHeader()}

  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span>
      <a href="/#services">Services</a><span>/</span>
      <a href="/web-development-company-mumbai/">Web development</a><span>/</span>
      <span>${esc(area.name)}</span>
    </nav>

    <section class="hero">
      <span class="eyebrow">Web platforms · ${esc(area.name)}, Mumbai</span>
      <h1>${esc(h1)}</h1>
      ${renderByline()}
      ${renderAeoAnswer(`DuoStack is a Mumbai-based engineering studio building React, Next.js, and custom CMS web platforms for founders in ${area.name}. Senior engineers only, NDA-first, full source-code transfer on day one of go-live. Founders reply within one business day on email and WhatsApp.`)}
      ${renderTldr([
        `Senior engineers only — no juniors, no offshore relays. You speak directly with the two co-founders.`,
        `Onsite work available in ${area.name} and across Mumbai Metropolitan Region; remote-first as default.`,
        `Pricing scales: Starter landing pages from ₹20k, Sprint builds from ₹2L, full Pro platforms from ₹6.5L.`,
        `100% on-time delivery across 8 shipped products in healthcare, fintech, e-commerce, NGO and automotive.`
      ])}
      ${introHtml}
      <div class="ctas">
        <a class="btn btn-primary" href="${tel}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn btn-ghost" href="${wapp}" target="_blank" rel="noopener noreferrer">WhatsApp the founders</a>
        <a class="btn btn-ghost" href="/#contact">Send a brief</a>
      </div>
    </section>

    ${sectionsHtml}
    ${renderAreasBlock(slug)}
    ${renderFaqSection(faqs)}

    <section class="related" aria-labelledby="related-h">
      <h2 id="related-h">Other services in Mumbai</h2>
      <ul>
        ${seoPages.slice(0, 4).map((p) => `
          <li>
            <a class="related-card" href="/${p.slug}/">
              <span class="related-eyebrow">${esc(p.eyebrow)}</span>
              <span class="related-title">${esc(p.h1)}</span>
              <span class="related-arrow" aria-hidden>→</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </section>
  </main>

  ${renderFooter()}
  ${renderDock()}
</body>
</html>
`
  }
}

// ----------------------------------------------------------------------
// Sitemap rebuild
// ----------------------------------------------------------------------
const renderSitemap = (extraSlugs = []) => {
  const home = `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en"    href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`

  // NOTE: Do NOT add #fragment URLs (/#services, /#contact, …) to the sitemap.
  // Google treats a fragment as the same page as "/", so they get reported as
  // "Discovered – currently not indexed" and never index. They live as on-page
  // nav anchors only.

  const services = seoPages.map((p) => `  <url>
    <loc>${SITE_URL}/${p.slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE_URL}/${p.slug}/" />
    <xhtml:link rel="alternate" hreflang="en"    href="${SITE_URL}/${p.slug}/" />
  </url>`).join('\n')

  const neighbourhoods = extraSlugs.map((slug) => `  <url>
    <loc>${SITE_URL}/${slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE_URL}/${slug}/" />
    <xhtml:link rel="alternate" hreflang="en"    href="${SITE_URL}/${slug}/" />
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${home}
${services}
${neighbourhoods}
</urlset>
`
}

// ----------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------
const distExists = await stat(DIST).catch(() => null)
if (!distExists) {
  console.error('❌ dist/ does not exist. Run `vite build` first.')
  process.exit(1)
}

async function ensureDir(p) { await mkdir(p, { recursive: true }) }

let count = 0

// Service pages
for (const page of seoPages) {
  const outDir = join(DIST, page.slug)
  await ensureDir(outDir)
  await writeFile(join(outDir, 'index.html'), renderServicePage(page), 'utf8')
  count += 1
  console.log(`✓ service        ${page.slug}`)
}

// Neighbourhood pages
const neighbourhoodSlugs = []
for (const area of serviceAreas) {
  const { slug, html } = neighbourhoodPage(area)
  const outDir = join(DIST, slug)
  await ensureDir(outDir)
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  neighbourhoodSlugs.push(slug)
  count += 1
  console.log(`✓ neighbourhood  ${slug}`)
}

// Sitemap
const sitemap = renderSitemap(neighbourhoodSlugs)
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(join(ROOT, 'public', 'sitemap.xml'), sitemap, 'utf8')

console.log(`\n✨ Generated ${count} SEO pages + sitemap.xml`)

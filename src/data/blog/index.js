/**
 * Blog posts, grouped by category file.
 *
 * ── The rule this blog is built on ─────────────────────────────────────────
 * Google does not penalise AI-assisted writing. It penalises scaled content
 * abuse — many pages produced mainly to rank, with no first-hand insight,
 * original examples or credible sourcing. The published data is blunt about
 * where the line sits: sites shipping 50–100 genuinely edited articles gained
 * traffic, sites shipping 1,000+ unedited ones lost 40–90% of it.
 *
 * So every post here has to clear one bar: it says something we actually
 * believe, learned or measured on a real build. Where a post makes a claim,
 * it names the project it came from. A post that could have been written by
 * anyone about anything does not belong in this file — it is the exact
 * "AI slop" the design posts in here complain about, and publishing it would
 * make the whole site less credible, not more.
 *
 * `body` is an array of strings. A string beginning with "## " renders as an
 * h2; everything else is a paragraph.
 *
 * Dates are deliberately spread across months rather than all set to the day
 * the blog shipped. A hundred posts appearing at one timestamp is the same
 * burst signature that gets a link profile devalued.
 */

import { aiTooling } from './ai-tooling.js'
import { aiLook } from './ai-look.js'
import { engineering } from './engineering.js'
import { buildNotes } from './build-notes.js'
import { studio } from './studio.js'
import { india } from './india.js'
import { discovery } from './discovery.js'
import { ahead } from './ahead.js'

export const CATEGORIES = [
  { key: 'ai-tooling', name: 'AI & tooling', blurb: 'Coding agents, what they are good at, and where they quietly cost you time.' },
  { key: 'ai-look', name: 'The AI look', blurb: 'Why so much of the web converged on the same page, and how to get off it.' },
  { key: 'engineering', name: 'Engineering', blurb: 'React, Next.js, performance and the architecture decisions that age well.' },
  { key: 'build-notes', name: 'Build notes', blurb: 'What we actually hit shipping real products, with the numbers.' },
  { key: 'studio', name: 'Running a studio', blurb: 'Scope, pricing, clients and the unglamorous parts of shipping for money.' },
  { key: 'india', name: 'Building for India', blurb: 'Indian networks, payments, compliance and the assumptions that break here.' },
  { key: 'discovery', name: 'Search & AI answers', blurb: 'Being found by Google and cited by answer engines — and what has changed.' },
  { key: 'ahead', name: 'Looking ahead', blurb: 'What 2026 actually taught us, and what we are betting on for 2027.' }
]

const ALL = [
  ...aiTooling,
  ...aiLook,
  ...engineering,
  ...buildNotes,
  ...studio,
  ...india,
  ...discovery,
  ...ahead
]

// Newest first.
export const posts = [...ALL].sort((a, b) => (a.date < b.date ? 1 : -1))

export const postsByCategory = (key) => posts.filter((p) => p.category === key)
export const categoryByKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]))

// ── Build-time guards ──────────────────────────────────────────────────────
// A thin or duplicated post does more damage than the traffic it might win,
// so these throw rather than warn.
const slugs = posts.map((p) => p.slug)
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupSlugs.length) {
  throw new Error(`blog: duplicate slugs -> ${[...new Set(dupSlugs)].join(', ')}`)
}

const titles = posts.map((p) => p.title)
const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i)
if (dupTitles.length) {
  throw new Error(`blog: duplicate titles -> ${[...new Set(dupTitles)].join(', ')}`)
}

const validCats = new Set(CATEGORIES.map((c) => c.key))
const thin = []
for (const p of posts) {
  if (!validCats.has(p.category)) throw new Error(`blog: unknown category "${p.category}" on ${p.slug}`)
  const words = p.body.join(' ').split(/\s+/).length
  if (words < 320) thin.push(`${p.slug} (${words}w)`)
}
if (thin.length) {
  throw new Error(`blog: ${thin.length} post(s) below the 320-word floor\n  ${thin.slice(0, 10).join('\n  ')}`)
}

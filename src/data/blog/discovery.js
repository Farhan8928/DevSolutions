/**
 * Search & AI answers. Being found by Google and cited by answer engines,
 * including the things we got wrong on this site.
 */

export const discovery = [
  {
    slug: 'programmatic-seo-without-building-doorway-pages',
    title: 'Programmatic SEO without building doorway pages',
    category: 'discovery',
    date: '2026-08-28',
    excerpt:
      'We generated two hundred location and service pages for this site. The interesting part is the ones we refused to generate.',
    body: [
      'A grid of location pages is the fastest way to get a site demoted. Google\'s doorway-page guidance describes the standard implementation precisely: many near-identical pages differing only by a place name, all funnelling to the same destination, adding nothing a reader could use.',
      'We built one anyway, because the underlying demand is real — people do search for a service plus a locality. The question is whether the pages are actually about different things.',
      '## The rule we enforced in code',
      'Every area in our data file carries its own profile and a per-service paragraph written specifically for it. The generator emits a page only where that paragraph exists. No copy, no page.',
      'That is a hard gate rather than a convention, because a convention degrades the moment someone is in a hurry.',
      '## The result',
      'Roughly 62% coverage of the possible service-by-area matrix. The gaps are deliberate — there is no genuine story about healthcare software in a film-production district, so there is no page.',
      'A full matrix would have been 216 pages instead of 180 and would have been worse, because the additional 36 would have been filler dragging down the average quality signal of the whole set.',
      '## What the audit caught',
      'We measured near-duplicate similarity across every generated page. The new pages topped out around 80%, which is largely shared template. The pre-existing location pages, which used a single boilerplate with the place name swapped, hit 90% — and expanding from 8 to 18 of them made that worse, not better.',
      'That was self-inflicted and we had to rewrite them to use the same per-area material.',
      '## The keyword cannibalisation trap',
      'We nearly shipped two pages competing for the same query — an existing indexed URL and a new generated one with a near-identical target. Two of your own pages fighting each other is worse than having one.',
      '## The honest caveat',
      'These pages are around 500 words with one bespoke paragraph each. That is defensible, not exceptional. Volume gets you crawled; depth gets you ranked. If a page sits unindexed for a month, that is Google telling you it is not differentiated enough — and the response is to improve or remove it, never to point links at it.'
    ]
  },
  {
    slug: 'what-llms-txt-is-actually-for',
    title: 'What llms.txt is actually for',
    category: 'discovery',
    date: '2026-08-11',
    excerpt:
      'A plain-text summary of your site for answer engines. Cheap to add, easy to do badly.',
    body: [
      'llms.txt is a convention: a markdown file at the root of your site summarising what you do, in a form an answer engine can consume without parsing your navigation.',
      'It is not a standard with enforcement behind it, and no engine is obliged to read it. It costs an hour and the downside is nil, which is a reasonable bet.',
      '## What belongs in it',
      'The facts an engine would need to answer a question about you. What you do, where, for whom, at what price, with what contact details. Your actual service list. Your actual work.',
      'Concretely: our own file lists every service with a starting price, every shipped project with a one-line description, the engagement tiers with what each includes, and the contact routes.',
      '## What does not belong',
      'Marketing language. An answer engine summarising you will reproduce whatever tone it finds, and "we deliver innovative solutions" produces a citation that says nothing.',
      'Anything that contradicts the site. If your pricing page says ₹75,000 and your llms.txt says ₹50,000, you have created a discrepancy that will surface in front of a prospect.',
      '## Keeping it accurate is the hard part',
      'It is a separate file, so it drifts. Ours has gone out of sync twice, both times after a pricing change, and both times we found it during an unrelated audit.',
      'The fix is to treat it as a build artefact where possible, or to include it in the same checklist as the pages it summarises.',
      '## Whether it works',
      'Honestly, we cannot attribute traffic to it with any confidence. What we can say is that it costs almost nothing, it forces a useful exercise in stating plainly what you do, and the answer-engine share of discovery is going up rather than down.',
      'The exercise alone has value. Writing your business as a set of checkable facts reveals how much of your site is adjectives.',
      '## Keep it short',
      'The temptation is to include everything. A file that reproduces your whole site is less useful than one that states the twenty facts someone would need to describe you accurately.',
      'Ours is a couple of hundred lines. If it were a thousand, nothing would be prioritised and a summariser would pick arbitrarily.',
      '## Check what the engines actually say about you',
      'The practical feedback loop is to ask a few assistants what your company does and see what comes back. It is unscientific and it is the only direct signal available.',
      'When the answer is wrong or generic, that tells you what is missing or ambiguous in your public material — and the fix is usually on the site itself rather than in the file.'
    ]
  },
  {
    slug: 'getting-cited-by-an-answer-engine',
    title: 'Getting cited rather than just crawled',
    category: 'discovery',
    date: '2026-07-26',
    excerpt:
      'AI Overviews and chat assistants quote specific sentences. Writing sentences that can be quoted is a distinct skill.',
    body: [
      'A growing share of discovery now happens through an answer rather than a list of links. That changes what a useful page looks like: you are no longer only trying to rank, you are trying to be the source a summariser picks up.',
      '## What gets quoted',
      'Direct answers to specific questions, stated in one or two sentences, near the question. Not built up across three paragraphs.',
      'Numbers. A page that says "typically one to three days" is more quotable than one that says "we work quickly", because a summariser needs something concrete to reproduce.',
      'Structure that makes the answer findable — a heading that is the question, followed immediately by the answer.',
      '## The pattern we use',
      'Every landing page on this site carries a short direct answer block right under the heading: what the thing is, what it costs, how long it takes, in about forty to sixty words of plain prose.',
      'Not a summary of the page. An answer to the question the page exists for, phrased so it stands alone if lifted.',
      '## Structured data still matters',
      'FAQPage, Service, LocalBusiness and BreadcrumbList markup give a machine an unambiguous reading of what your page asserts. It is not a ranking trick — it is removing ambiguity about what your content means.',
      'The important discipline is that the structured data must match the visible page. Markup claiming an FAQ that is not on the page is a violation and it is also just wrong.',
      '## Allow the crawlers',
      'Check robots.txt actually permits the AI crawlers you want citing you. Several sites we have audited were blocking them by inheritance from a template, having never made that decision.',
      'That is a real choice either way — some businesses reasonably do not want to be summarised. But it should be a choice.',
      '## The uncomfortable part',
      'Being cited does not always produce a click. The user may get their answer and stop. What it does produce is presence at the moment of decision, which is worth something even unmeasured — and the alternative, being absent from the answer entirely, is worth nothing.'
    ]
  },
  {
    slug: 'how-many-backlinks-are-allowed',
    title: 'How many backlinks are allowed? There is no limit.',
    category: 'discovery',
    date: '2026-07-08',
    excerpt:
      'A question we get asked in this exact form. The premise is the thing worth correcting.',
    body: [
      'Google has never capped how many links a site may have. The largest sites on the web have millions. Asking how many are "allowed" points at a mental model that causes trouble.',
      'What is judged is the pattern, not the total. Penguin runs inside the core algorithm continuously and the spam systems look for burst-and-stop signatures — a spike of links from obvious sellers, then silence. That shape is what gets devalued, at five links or five hundred.',
      '## Pace scales with what you have',
      'Growth rate is more meaningful than any absolute number. Pages ranking for competitive terms tend to gain new referring domains at something like 5% to 15% a month, which means a site with twenty referring domains and one with two thousand have very different safe velocities.',
      'For a small studio or a local business, a few new referring domains a month is a natural pace. The unit that matters is referring domains, not links — two hundred links from one directory is one domain and close to worthless.',
      '## The failure mode is devaluation, not a penalty',
      'This is the part most people have wrong. The common outcome of buying links is not a manual action. It is that the links quietly stop counting, and once that benefit is removed it cannot be recovered.',
      'Reported cases of aggressive purchasing show visibility losses in the tens of percent after core updates — from source quality, not from volume.',
      '## Paid links are not forbidden',
      'Buying advertising or sponsorship is normal commerce and explicitly fine. It just has to carry rel="sponsored" or rel="nofollow". The violation is undisclosed paid links passing ranking signal.',
      '## What we actually recommend',
      'Start with the links you already have and are not using. An agency with eleven live client sites has eleven genuinely relevant, editorially justified referring domains available for the asking — a build credit in a footer, with the client\'s permission.',
      'That is real, it is allowed, and it is worth more than anything purchasable. Then business listings, store listings, and press that actually happened.'
    ]
  },
  {
    slug: 'the-sitemap-nobody-checks',
    title: 'The sitemap nobody checks',
    category: 'discovery',
    date: '2026-06-22',
    excerpt:
      'Two hundred pages and a sitemap listing fifteen of them is a common and quiet failure.',
    body: [
      'A sitemap is generated once, works, and is never looked at again. Meanwhile the site grows, the generation step moves, and the file quietly stops reflecting reality.',
      'We have found this on client sites repeatedly, and we found it on one of our own — a project with twenty-nine generated pages and a source sitemap containing exactly one URL.',
      '## The specific failure',
      'A static sitemap in the public directory, copied to the build output, then overwritten by a generation step. That works. Then someone runs a partial build, or the order changes, and the stale file survives.',
      'The tell is a sitemap whose URL count does not match the page count, which nobody checks because there is no reason to look.',
      '## What we assert now',
      'Every generated page appears in the sitemap. Every sitemap URL resolves to a file that exists. No duplicates. These are three lines of script and they run on every build.',
      'The second one matters more than it sounds — a sitemap listing pages that 404 is actively harmful, because you are directing a crawler at nothing and spending crawl budget on it.',
      '## Do not put fragments in it',
      'A URL with a #section fragment is the same page as the base URL as far as Google is concerned. Listing them separately produces a set of entries reported as discovered and never indexed, which looks like a problem and is not one.',
      '## Lastmod should be honest',
      'Setting lastmod to today on every build for every page tells a crawler nothing, and if it is obviously untrue it may be ignored entirely. It should reflect when the content actually changed.',
      '## The wider lesson',
      'Anything generated and never read again will drift. The defence is not vigilance — nobody sustains vigilance about a sitemap — it is an assertion in the build that fails loudly when the invariant breaks.',
      '## Submit it and then read the report',
      'Search Console tells you how many submitted URLs were actually indexed. That ratio is the most useful single number about a generated content set, and almost nobody looks at it after the first week.',
      'A large gap between submitted and indexed is not a bug to debug. It is an editorial verdict — Google has seen the pages and declined — and the response is to improve them rather than resubmit.',
      '## Split it by section',
      'Past a few hundred URLs, splitting into several sitemaps with an index is worth doing. Not for any size limit at our scale, but because the indexed ratio then tells you which section is weak instead of giving you one number for the whole site.',
      'That is the difference between knowing you have a problem and knowing where it is.'
    ]
  },
  {
    slug: 'seo-audits-that-fail-the-build',
    title: 'Make your SEO audit fail the build',
    category: 'discovery',
    date: '2026-06-04',
    excerpt:
      'A report nobody reads is not a check. Turning warnings into build failures changed our output quality immediately.',
    body: [
      'Most sites have an audit that produces a list of warnings. The list is long, mostly benign, and gets scrolled past. Real problems live in it undetected because the signal-to-noise ratio has been bad for months.',
      'The alternative is to make the audit part of the build and let it fail.',
      '## What we assert',
      'Every page has a title under 65 characters and a description under 165. Titles are unique. Descriptions are unique. Canonical present. One h1, and only one. Robots meta permits indexing. Structured data parses as valid JSON.',
      'None of that is clever. All of it is skipped regularly on real sites.',
      '## The immediate effect',
      'On one project the first run produced 161 title-length failures from a set of generated pages, which was entirely our fault and would otherwise have shipped. Fixing it took ten minutes because it was one template.',
      'Under the old model those would have been 161 warnings in a log that already contained warnings, and nobody would have read them.',
      '## Exclude what is not a page',
      'The audit walked a printable counter card — a print-only asset with no title, no canonical and no h1 — and reported six failures for it on every build. The build had been exiting non-zero for so long that the failure carried no information.',
      'That is the real risk of a strict audit: if it fails constantly for reasons nobody intends to fix, it becomes noise with extra steps. Excluding genuinely non-page assets is part of making the check meaningful.',
      '## Where to draw the line',
      'Assert things that are objectively wrong and cheap to fix. Do not assert matters of judgement — word counts, keyword placement, heading phrasing. A build that fails because a page is 480 words instead of 500 will get switched off within a fortnight, and then you have no check at all.',
      '## The exception we made and then regretted',
      'We did add a minimum word count to one project, reasoning that it would prevent stub pages. It fired on legitimately short pages and we spent more time arguing with it than it saved.',
      'Word count is a proxy for substance and a bad one. We replaced it with a check that each page has a unique first paragraph, which catches actual templating without penalising brevity.',
      '## Run it on every build, not on a schedule',
      'A weekly audit produces a report about a problem that has already shipped. The value comes entirely from the check being between the change and production.',
      'That means it has to be fast. Ours runs in a couple of seconds across two hundred pages, which is the only reason nobody has been tempted to skip it.'
    ]
  },
  {
    slug: 'local-seo-is-mostly-not-your-website',
    title: 'Local SEO is mostly not your website',
    category: 'discovery',
    date: '2026-05-19',
    excerpt:
      'For a business serving a city, roughly half the outcome sits in a profile you do not control and cannot code.',
    body: [
      'Clients ask for a website to help them rank locally. The website matters and it is not the larger half. Google Business Profile and reviews carry an enormous share of local visibility, and no amount of on-site work substitutes.',
      'This is an uncomfortable thing for a web studio to say and it is true.',
      '## What actually moves local ranking',
      'A complete, accurate Business Profile with correct categories. The primary category choice alone can change which searches you appear in.',
      'Review volume and recency. Not just rating — a steady flow of recent reviews outperforms a higher average that stopped two years ago.',
      'Consistent name, address and phone across every listing that mentions you. Inconsistency here is a real signal problem and it is tedious rather than difficult to fix.',
      'Proximity, which you cannot influence at all.',
      '## What the website contributes',
      'Matching signals. The same NAP in your markup and your rendered page as on the profile. Structured data that says what and where you are. Pages for the specific services and areas you serve, with real content.',
      'Speed, particularly on mobile, because it affects whether the click converts once you have it.',
      '## What we tell clients',
      'Build the site properly, then spend the next month on the profile and on asking customers for reviews. The second month usually produces more measurable change than the first.',
      'For one repair workshop, the single highest-leverage action was a printed card at the counter asking for a review with a QR code. That is not a technical intervention and it outperformed everything we could have done in the markup.',
      '## The honest framing',
      'A studio that tells you a new website will fix local visibility is either not paying attention or hoping you are not. The site is necessary and it is not sufficient, and being clear about that early is worth more than the extra scope.',
      '## Asking for reviews is a process, not a request',
      'The businesses that accumulate reviews have a repeatable moment where they ask — at handover, at payment, on the printed bill. The ones that do not are relying on customers spontaneously deciding to, which almost nobody does.',
      'A QR code at the counter linking directly to the review form removes every step between intention and action. That is the whole intervention and it outperforms most technical work.',
      '## Photographs on the profile',
      'Consistently underrated. Profiles with recent, genuine photographs of the premises and the work get more engagement, and it is one of the few profile signals fully under the business\'s control.',
      'We ask clients to add a few every month. It takes minutes and it compounds.'
    ]
  },
  {
    slug: 'core-web-vitals-are-a-conversion-metric',
    title: 'Core Web Vitals are a conversion metric',
    category: 'discovery',
    date: '2026-05-01',
    excerpt:
      'Treating them as an SEO checkbox misses why they were chosen. They measure whether the page is unpleasant.',
    body: [
      'The framing of Core Web Vitals as a ranking factor produces a specific bad behaviour: teams optimise for the score rather than the experience, and are surprised when a green score does not change anything commercially.',
      'The metrics were chosen because they correlate with whether a page feels broken. That is the useful reading.',
      '## What each one is really asking',
      'Largest Contentful Paint asks whether the main thing appeared quickly. A user who sees nothing for three seconds does not care what your score is.',
      'Cumulative Layout Shift asks whether the page moved while they were reading it or, worse, while they were tapping. This is the one users complain about without being able to name it — the tap that hit an ad because the page reflowed.',
      'Interaction to Next Paint asks whether it responded when touched. On a budget Android device with a heavy bundle, this is where sites fail most badly and it is the least visible on a developer machine.',
      '## Lab versus field',
      'A Lighthouse score from your laptop is a debugging tool. Field data from actual visitors is the report card, and it is usually much worse.',
      'When we present both to a client, the gap is often the most useful thing in the conversation — it explains why a site that "tests fine" is losing people.',
      '## The cheapest fixes',
      'Explicit width and height on every image, which eliminates most layout shift for almost no work.',
      'Deferring third-party scripts. A chat widget and a tag manager loading in the critical path is the single most common cause of a good site scoring badly.',
      'Shipping less JavaScript, which is harder and matters most.',
      '## The point',
      'If you fix these because Google reads them, you will do the minimum and get the score. If you fix them because they describe a page that is annoying to use, you will do the right amount and get the conversion — and the score arrives anyway.'
    ]
  },
  {
    slug: 'the-seo-page-that-should-not-exist',
    title: 'How to tell an SEO page should not exist',
    category: 'discovery',
    date: '2026-04-16',
    excerpt:
      'Four tests we apply before generating a page, and what we do when a published one fails them.',
    body: [
      'Generating pages is cheap, which means the discipline has to come from somewhere other than effort. These are the checks we use.',
      '## Could a reader tell which page they are on?',
      'Remove the place name or the product name from the page. If nothing else identifies it, the page has no reason to exist separately from its siblings.',
      'This is the fastest test and it eliminates most bad ideas immediately.',
      '## Is there a genuinely different answer here?',
      'A page for "logistics software in a port district" has a different answer from "logistics software in a media district" — container detention versus equipment custody. A page for "healthcare software in a film production area" does not, so we did not make one.',
      'The demand might exist. Without a different answer, the page is filler.',
      '## Does it compete with something you already have?',
      'Two of your own pages targeting the same query is worse than one. We nearly shipped this — an existing indexed URL and a newly generated near-duplicate — and caught it in an audit.',
      'The fix is to pick one and make it the canonical answer, not to hedge.',
      '## Would you link to it from a real page?',
      'If the only inbound links are from a generated sitemap and an index of similar pages, that is a signal. Pages worth having tend to be worth referencing.',
      '## What to do with published pages that fail',
      'Improve or remove. Not leave up and hope. A page that has been live for a month and is still not indexed is Google telling you something specific, and the wrong response is to build links to it.',
      'Consolidating three weak pages into one good one is almost always the better move, with redirects from the retired URLs.',
      '## How to review a grid you already published',
      'Sort by impressions in Search Console and look at the bottom half. Pages with impressions and no clicks are usually ranking for the wrong query, which is a copy problem. Pages with neither after a couple of months are candidates for removal.',
      'The temptation is to leave them because deleting feels like waste. The cost of keeping them is not zero — they consume crawl budget and they lower the average quality signal of the section they sit in.',
      '## The rule we settled on',
      'A generated page has to justify itself within a quarter. If it has not been indexed or has been indexed and gets nothing, it either gets rewritten with real substance or it goes.',
      'Treating generated pages as permanent because they were cheap to make is how a useful grid turns into a liability.'
    ]
  },
  {
    slug: 'writing-for-the-person-not-the-crawler',
    title: 'Writing for the person, when the crawler is the one bringing them',
    category: 'discovery',
    date: '2026-04-01',
    excerpt:
      'The advice to "write for humans" is correct and unhelpful on its own. Here is the version with mechanics.',
    body: [
      'Everyone agrees you should write for people. Then a page gets written that repeats a phrase eleven times, because in practice the mechanics of being found pull the other way.',
      'The resolution is not to ignore the mechanics. It is that most of them are satisfied by writing clearly about a specific thing.',
      '## Answer the question in the first two sentences',
      'Someone arriving from a search has a question. Answering it immediately serves them and produces the quotable block that answer engines lift. Burying it under three paragraphs of context serves nobody.',
      '## Use the words your reader uses',
      'This is what keyword research is actually for. Not density — vocabulary. If customers say "screen lines" and the industry says "COF bonding failure", the page needs both, because one is what gets typed and the other is what is accurate.',
      'Writing only in industry vocabulary is a real failure and it is common among technically strong teams.',
      '## Headings as questions',
      'Structuring a page around the questions a reader actually has produces good headings for people and good extraction targets for machines simultaneously. This is the clearest case where the two goals coincide.',
      '## Specificity does double duty',
      'Numbers, names and constraints make a page more credible to a reader and more citable by a summariser. "One to three days" outperforms "quickly" on both axes.',
      '## Where they genuinely conflict',
      'Length. Search rewards depth; a reader with a simple question wants a short answer. We resolve it by answering immediately and then going deeper, so the short-answer reader is served in the first screen and the researcher can continue.',
      'What we do not do is pad to reach a word count. A 400-word page that answers the question completely outranks a 1,500-word one that buries it, and it is a better page.',
      '## Write the question down first',
      'Literally, as a sentence, before writing the page. "What does it cost to repair vertical lines on a Samsung TV in Mumbai?" Then write the answer, then the supporting detail.',
      'Pages written this way have a natural structure and they rarely wander. Pages written from a topic rather than a question tend to circle, because there is no test for whether a paragraph belongs.',
      '## The check at the end',
      'Read only the first two sentences and ask whether someone would leave satisfied. If yes, the page works — the rest is for the minority who want more.',
      'Most pages fail this because the first two sentences are throat-clearing about why the topic matters. Nobody arriving from a search needs to be told the topic matters; they searched for it.'
    ]
  }
]

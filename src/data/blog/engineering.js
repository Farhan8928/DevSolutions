/**
 * Engineering. Decisions we've actually made on client work, and what they
 * cost or saved.
 *
 * Voice: contractions, and a genuine mix of sentence lengths — some short,
 * some long and winding where the explanation needs the room.
 */

export const engineering = [
  {
    slug: 'server-components-were-not-the-hard-part',
    title: 'Server Components weren\'t the hard part',
    category: 'engineering',
    date: '2026-08-18',
    excerpt:
      'Two years of React Server Components in production, and the thing that actually caused trouble wasn\'t the one everybody warned about.',
    body: [
      'The warnings were all about the boundary. Know what runs where, be careful with hooks, remember a client component can\'t be imported into a server one without consequences.',
      'All learnable in about a week.',
      'What took far longer was unlearning the habit of fetching data in the component that displays it, which is good practice in a client-rendered app and quietly disastrous on the server, because the same instinct that gives you nice colocation gives you a request waterfall where the page fetches, then a section fetches, then a card fetches, each one waiting on its parent before it can even start.',
      'Nothing wrong on any individual line. Page takes two seconds.',
      '## What we do now',
      'Fetch high, pass down. The page-level component gathers what the whole tree needs, in parallel, and everything below it receives props.',
      'Less elegant by the colocation standard. Dramatically faster.',
      'Where a component genuinely owns an independent request we let it fetch and wrap it in Suspense so it doesn\'t block anything else. The rule is that a request may only be nested when the thing it depends on genuinely isn\'t knowable earlier.',
      '## The caching part nobody enjoys',
      'The other real cost was caching semantics. What\'s cached, for how long, what invalidates it — it changed across versions and it\'s genuinely subtle.',
      'We\'ve been bitten by stale data in production twice. Both times because a mutation didn\'t invalidate what a developer assumed it would.',
      'Our answer is unglamorous. Be explicit everywhere, never lean on a default, and write the caching decision for each route into a comment. It\'s boilerplate. It ended that whole class of bug.',
      '## Would we use them again',
      'On content-heavy sites, yes, where the win is real — less JavaScript shipped, faster first paint, rendering that doesn\'t depend on the device.',
      'For a dense internal dashboard behind a login the benefit is much smaller and the complexity is identical. We\'ve gone back to a plain client app more than once and not regretted it.'
    ]
  },
  {
    slug: 'core-web-vitals-on-an-indian-android-phone',
    title: 'Core Web Vitals on a ₹9,000 Android phone',
    category: 'engineering',
    date: '2026-08-06',
    excerpt:
      'Your site is fast on your laptop. Here\'s what it does on the device most of your Indian traffic actually uses.',
    body: [
      'Testing on a dev machine over office wifi gives you numbers that are true and irrelevant.',
      'The median Indian visitor is on a mid-to-low-end Android phone, a few years old, on a connection that swings between excellent and unusable. The gap between that and a MacBook isn\'t a percentage. On CPU-bound work it\'s an order of magnitude.',
      '## What differs most',
      'JavaScript parse and execute time. A bundle costing 200ms on a laptop can cost well over a second on a budget device. Biggest lever there is, and the one most often ignored, because bundle size gets measured and bundle execution doesn\'t.',
      'Main thread contention. Hydration, analytics, a chat widget and a font loader all fighting each other produces input delay that never appears in a lab test with nothing else running.',
      'Image decode. A large image is slow to download on a poor connection and slow to decode on a weak processor, so serving a 2000px JPEG into a 400px slot costs you twice over.',
      '## What we do',
      'Ship less JavaScript. Mostly that means server-rendering anything that doesn\'t need interactivity, rather than heroically optimising a large client bundle.',
      'Explicit width and height on every image. Always. Layout shift is the cheapest vital to fix and the most commonly left broken.',
      'Defer third-party scripts, no exceptions. Chat widgets and tag managers are the single most common reason a good site tests badly, and almost none of them need to load before interaction.',
      'Self-host fonts or take the system stack. A font request to a third party on a slow connection blocks text rendering at exactly the wrong moment.',
      '## The measurement that counts',
      'Field data, not lab. Lighthouse on your machine is a debugging tool, not a report card.',
      'Real-user metrics from actual visitors on actual devices are the only numbers that describe your site, and they\'re frequently much worse than the score you\'ve been quoting to people.',
      'We give clients both numbers and explain the gap. That conversation is worth more than most of the optimisation.'
    ]
  },
  {
    slug: 'when-not-to-use-a-framework',
    title: 'When not to reach for a framework',
    category: 'engineering',
    date: '2026-07-25',
    excerpt:
      'Some of the sites we\'re proudest of are static HTML written by a script. Here\'s when that\'s the right answer.',
    body: [
      'The default answer to "we need a website" has become a framework, a component library and a build pipeline.',
      'Often correct. Sometimes enormous overkill for something that is, structurally, a document.',
      '## The test',
      'Does the page change in response to the user, or only in response to the data behind it?',
      'Same for everybody until the content changes? Then it wants to be generated, not rendered.',
      'A landing page, a service page, a location page, a blog post. Documents. They benefit from being HTML that arrives complete and needs nothing to display it.',
      '## What we build this way',
      'The two hundred-odd SEO pages on this site are plain HTML written by a Node script from a data file. No client framework on any of them.',
      'Fastest thing we serve. Can\'t break in a browser that fails to run JavaScript. A crawler sees exactly what a person sees.',
      'The same script writes the sitemap, so those can\'t drift apart. Adding a page means adding an entry to an array.',
      '## What we don\'t build this way',
      'Anything with state that matters. A dashboard, a booking flow, a CRM, a form more complex than name-and-message.',
      'Those want a framework and we reach for one immediately.',
      '## The maintenance objection',
      'Usual argument is that a bespoke generator is a maintenance burden compared to a well-known framework.',
      'Ours is about four hundred lines and has needed changing three times in a year, each time for a feature we wanted.',
      'A framework isn\'t free either. It needs upgrading, its ecosystem churns, and a security advisory in a transitive dependency is suddenly your problem. For a pile of documents that ongoing cost buys very little.',
      '## The point',
      'Not that frameworks are bad. That "what\'s the simplest thing producing this output" is worth asking before defaulting — and for a surprising amount of the web, the answer is a template and a loop.'
    ]
  },
  {
    slug: 'offline-first-is-not-optional-in-the-field',
    title: 'Offline-first isn\'t optional for field software',
    category: 'engineering',
    date: '2026-07-13',
    excerpt:
      'Apps for people working in warehouses, sheds and basements have to assume the network is absent, not slow.',
    body: [
      'Recurring pattern in the operational software we build: the people using it are somewhere with no signal.',
      'A yard near a port. Inside an MIDC shed with a metal roof. A basement godown. A lift.',
      'Software that treats connectivity as normal and offline as an error gets abandoned inside a fortnight, because it fails precisely when the user needs it.',
      '## What offline-first means here',
      'Every write succeeds locally and syncs later. The user never waits on a request to confirm something they just did. A delivery marked complete is complete on their device immediately, and reconciles when signal comes back.',
      'Reads come from local storage with a background refresh. Open the app in a dead zone and you see yesterday\'s data rather than a spinner — and it says so.',
      'Conflicts get resolved by a rule decided in advance. For most operational data, last-write-wins by server timestamp is fine and simple. For anything touching money or stock it isn\'t, and the design has to say what happens.',
      '## The bit that\'s easy to get wrong',
      'Queued writes have to be visible.',
      'An app silently holding eleven unsent updates and then failing to sync has lost data, as far as the user is concerned. A small indicator showing what\'s pending, plus a way to retry, is the difference between trust and abandonment.',
      'Ordering matters too. Somebody creates a record offline and then edits it — those have to sync in sequence, or the edit arrives for a record that doesn\'t exist yet.',
      '## Why it\'s worth the complexity',
      'Because otherwise the software doesn\'t get used.',
      'We\'ve watched a well-built system get rejected entirely because it needed a connection at the loading dock, and replaced by paper. Paper works offline perfectly.',
      'Design for the worst network your user will meet, not the average. In the field the worst case isn\'t slow. It\'s nothing.'
    ]
  },
  {
    slug: 'get-the-ledger-right-first',
    title: 'Get the ledger right before you build anything else',
    category: 'engineering',
    date: '2026-07-01',
    excerpt:
      'In any system where money moves, the double-entry model is the product. Everything else is a view of it.',
    body: [
      'Pattern we\'ve seen repeatedly on inherited fintech and trading projects. Working product, nice dashboard, decent reports, and no correct ledger underneath any of it.',
      'Balances computed by summing transactions in a query. Refunds as a negative row. Nothing reconciles at month end and nobody can explain why.',
      'Retrofitting a real ledger afterwards is the most expensive rewrite in this category, because every historical record has to migrate into a model it was never written for.',
      '## What correct means',
      'Every movement of value is two entries summing to zero. Money leaves one account and arrives in another. There\'s no such thing as money appearing.',
      'Balances are derived from entries. Never stored and updated in place.',
      'Entries are immutable. A mistake gets corrected by a reversing entry, not by editing history — and that isn\'t accounting pedantry, it\'s what makes the thing auditable and what lets you answer "what did we think the balance was on the 3rd" a year later.',
      'Amounts are integers in the smallest unit. Paise, not rupees. Floating point on money produces errors that are individually invisible and collectively fatal.',
      '## The commercial argument',
      'Clients rarely ask for this, because from the outside it\'s invisible.',
      'It becomes very visible the first time an auditor, a regulator or a large customer asks a question the system can\'t answer.',
      'Usual first symptom is reconciliation. Settlement files from a payment provider that can\'t be matched against internal records, so somebody does it by hand in a spreadsheet every month. That manual process is the cost of not building the ledger, and it compounds.',
      '## Day one',
      'On anything with money, the ledger gets designed before any screen. Accounts, entry types, what a balance means, how a refund is represented, what happens on a partial payment.',
      'That\'s a conversation with the client\'s finance person, not a technical decision.',
      'Two or three days. Highest-return time on the project. Also the part clients most want to skip, because there\'s nothing to demo at the end of it.'
    ]
  },
  {
    slug: 'multi-tenancy-decisions-you-cannot-undo',
    title: 'The multi-tenancy decisions you can\'t undo',
    category: 'engineering',
    date: '2026-06-19',
    excerpt:
      'A single-tenant tool that gets a second customer is a bigger problem than it looks, and the fork happens early.',
    body: [
      'Common trajectory. Team builds an internal tool, it works well, a peer company asks to use it.',
      'Now it needs to serve two organisations, and how much of a rewrite that is depends almost entirely on decisions made before anybody thought about a second tenant.',
      '## Where tenant identity lives',
      'If every query already goes through a layer that knows which organisation is asking, adding a tenant is configuration.',
      'If tenant identity gets threaded through by hand — or worse, implied by which database you connected to — then every query is a place to leak one customer\'s data to another.',
      'So the decision to make early is that tenant scoping is enforced in one place and can\'t be bypassed, rather than remembered at each call site. Once there are three hundred queries written without it, retrofitting is both large and genuinely dangerous.',
      '## Isolation level',
      'Shared tables with a tenant column, separate schemas, or separate databases. All three are defensible, with very different operational profiles.',
      'What isn\'t defensible is deciding by accident.',
      'For most Indian B2B products we\'ve worked on, shared tables with rigorous scoping is right — cheapest to operate, and the isolation requirement is usually contractual rather than regulatory. When the customer is a bank or handles health records that answer changes, and it changes the architecture rather than a setting.',
      '## What surprises people',
      'Per-tenant configuration multiplies faster than expected. Branding, tax rules, workflow variations, feature availability. If configuration lives in code branches, the second tenant doubles your conditional complexity and the fifth makes it unmaintainable.',
      'Migrations get harder. A schema change now has to work for every tenant\'s data at once, including the one with four years of history and the one onboarded last week.',
      '## Practical advice',
      'Any realistic chance of a second customer? Build the scoping layer on day one, even with one tenant.',
      'Costs a day. Adding it later costs a rewrite and carries a data-exposure risk no client will forgive.'
    ]
  },
  {
    slug: 'the-empty-state-is-the-product',
    title: 'The empty state is where you get judged',
    category: 'engineering',
    date: '2026-06-07',
    excerpt:
      'Every user sees the empty version first. It gets designed last, if at all.',
    body: [
      'Design work happens against realistic data. A list with twenty rows, a chart with a year of history, a dashboard with numbers in it.',
      'Sensible for evaluating layout. Completely unrepresentative of anybody\'s first five minutes.',
      'The first thing every user sees is the version with nothing in it. And in an operational tool they\'ll keep seeing empty states — a new location with no stock, a new user with no activity, a filter matching nothing.',
      '## What a good one does',
      'Says why it\'s empty. "No consignments yet" and "no consignments match these filters" are different situations needing different responses, and showing the same blank panel for both is a real failure.',
      'Offers the action that resolves it. An empty list with a prominent create button is a working interface. An empty list with nothing on it is a dead end.',
      'Distinguishes empty from broken. A blank screen after a failed request looks exactly like a blank screen when there\'s genuinely nothing there, and the user can\'t tell whether to retry or carry on.',
      '## The pattern we use',
      'Three distinct states, always. Nothing yet. Nothing matching. Something went wrong.',
      'Each with its own copy and its own action. A few extra branches per view, and it removes most of the confusion in early use.',
      'We also seed a demo dataset for anything we\'re going to screenshot or demonstrate, because a product demoed empty is unconvincing no matter how good it is.',
      '## Why it gets skipped',
      'Because it\'s invisible in a design review with populated mockups, and because it feels like polish.',
      'It isn\'t polish. It\'s most of a new user\'s early experience and the point where they decide whether the tool is finished.',
      'Cheapest test there is: log in as a brand new user with a genuinely empty account and try to accomplish something. Most products fail this badly and the team has never once seen it, because they\'ve all had data since week one.'
    ]
  },
  {
    slug: 'why-we-still-use-mongodb-sometimes',
    title: 'Why we still reach for MongoDB sometimes',
    category: 'engineering',
    date: '2026-05-26',
    excerpt:
      'A defensible position on a database it\'s unfashionable to defend, plus where we wouldn\'t.',
    body: [
      'Document databases had their hype cycle and then their backlash, and the current consensus is roughly "use Postgres unless you have a reason".',
      'Good default. Also applied a lot without anybody asking what the reason would look like.',
      '## Where it genuinely fits',
      'Products where the shape of a record legitimately varies between customers or over time. Operational software for different businesses in the same trade is the obvious case — every one of them has fields the others don\'t, and modelling that relationally means either a sparse table with forty nullable columns or an attribute table that\'s miserable to query.',
      'Products where a record is naturally a document and gets read whole. A consignment with its line items. A quotation with its revisions. A patient visit with its observations. Fetching one object beats assembling five joins.',
      'Early-stage products where the schema changes weekly. Migrations have a cost and during discovery you pay it repeatedly.',
      '## Where we wouldn\'t',
      'Anything where the ledger matters. Financial correctness wants transactions across multiple records with strong guarantees, and while that\'s possible here, the relational tooling is better and the patterns are more widely understood.',
      'Anything with genuinely relational access patterns, where you need to join four entities in ways nobody predicted. That\'s what SQL is for and fighting it wastes everybody\'s time.',
      'Reporting-heavy products. Ad-hoc analytical queries are far easier against a relational schema, and the moment a client wants a report you didn\'t anticipate, you\'ll feel it.',
      '## What we learned to do regardless',
      'Model deliberately.',
      'The freedom to skip schema design is the main way document databases go wrong. Not because the technology\'s weak — because it lets you defer decisions forever.',
      'So we write the shapes down, validate at the boundary, and treat a change to a document shape as a migration even when the database doesn\'t care. The discipline a relational schema imposes for free has to come from the team instead.'
    ]
  },
  {
    slug: 'fefo-and-why-inventory-is-harder-than-it-looks',
    title: 'FEFO, expiry, and why inventory is harder than it looks',
    category: 'engineering',
    date: '2026-05-14',
    excerpt:
      'Stock isn\'t a number. Building a pharmacy system taught us how much hides behind that sentence.',
    body: [
      'A naive inventory model has a product and a quantity. Almost every real business breaks that within a week. Pharmacy breaks it immediately.',
      '## Stock is batches',
      'The same medicine arrives in different batches, with different expiry dates and different purchase prices.',
      '"We have 40 strips" isn\'t useful. Twelve expire next month and twenty-eight expire next year, and commercially those are completely different things.',
      'So the unit of stock is a batch. Product, batch number, expiry, quantity, cost. Everything else follows from getting that right.',
      '## FEFO is correctness, not optimisation',
      'First-expiry-first-out means a sale consumes the batch closest to expiry, automatically.',
      'Let a counter hand pick any batch and short-dated stock sits until it expires and becomes a write-off, while the long-dated stock sells.',
      'The system has to enforce it, because at a busy counter nobody is checking dates. Getting this right is the single biggest financial contribution the software makes.',
      '## Expiry needs a value',
      'A list of expiring items is mildly useful. The number that actually changes behaviour is the money at risk — what the near-expiry stock cost, totalled.',
      'That turns a background chore into a decision about whether to run a discount this week.',
      '## The rest of what breaks the simple model',
      'Stock in more than one place, with transfers in flight belonging to neither. Returns, which come back in a batch that has to be identified. Damage, which removes stock without a sale. Free goods from suppliers, which have quantity but no cost and will quietly wreck your margin if you treat them as a purchase.',
      '## The bit that generalises',
      'Whenever a client says "we just need to track stock", the honest first question is what a unit actually is in their business.',
      'Pharmacy: a batch. Steel: a heat number and a length. Jewellery: an individual piece with a weight and a purity.',
      'Get that wrong and every report is subtly fictional, and you can\'t fix it later without re-entering history.'
    ]
  },
  {
    slug: 'role-based-access-is-a-modelling-problem',
    title: 'Role-based access is a modelling problem',
    category: 'engineering',
    date: '2026-05-02',
    excerpt:
      'Most permission systems fail because roles got treated as a list of labels instead of a description of how the business works.',
    body: [
      'Usual implementation: an enum of roles, a check at the top of each route, and a growing pile of exceptions.',
      'Works for the first three roles. Degrades from there, predictably.',
      'A new requirement arrives — a manager should see their own branch but not others — and the role model has no way to express "their own", so a special case appears in a handler. Then another. Within a year the real permission rules exist nowhere except scattered conditionals.',
      '## Two things getting conflated',
      'One is what kind of action a person may take. Create a quotation, approve a discount, delete a record.',
      'The other is which records they may take it on. Their own, their branch\'s, their team\'s, everything.',
      'Separating those fixes most of the mess. A permission is a verb plus a scope, and the scope is a property of the relationship between the user and the record — not of the role\'s name.',
      '## Approvals',
      'Anything with a maker-checker rule needs this from the start. The person who created a record can\'t be the person who approves it.',
      'That isn\'t a UI concern. It\'s a data rule, and enforcing it in the interface means not enforcing it.',
      'On financial systems it\'s usually a hard requirement from the client\'s auditor, and finding out late means reworking the workflow rather than adding a check.',
      '## Where the leak happens',
      'Reads. Almost always.',
      'Teams are careful about who may write and casual about who may read, so a permission system that correctly blocks editing happily lets a list endpoint return everything and filters it in the browser.',
      'Our rule: scoping happens in the query. Not in the response, and never in the client. If a user isn\'t allowed to know a record exists, the database shouldn\'t return it.',
      '## What it costs',
      'A day of design at the start and a slightly more verbose data layer.',
      'Against rebuilding a permission model in year two while live, with a risk of exposing one customer\'s data to another during the transition? Not a close call.'
    ]
  },
  {
    slug: 'pdf-generation-is-always-worse-than-you-think',
    title: 'PDF generation is always worse than you think',
    category: 'engineering',
    date: '2026-04-20',
    excerpt:
      'Invoices, biltis, quotations, reports. Estimated at half a day. Takes three.',
    body: [
      'Nearly every operational system we build has to produce documents. A GST invoice, a lorry receipt, a quotation, a delivery challan.',
      'Looks like a rendering problem. It\'s mostly a specification problem.',
      '## Why the estimate is always wrong',
      'Because the document has requirements nobody mentions until they see a draft.',
      'It must fit on one page. The tax breakdown has to be laid out a particular way because that\'s what their accountant expects. Company seal bottom right. Amounts in words as well as figures. Serial number sequential per financial year with no gaps, because a gap is a question from a tax officer.',
      'None of that is in the brief. All of it is non-negotiable once raised.',
      '## The numbering trap',
      'Worth calling out, because it\'s a genuine correctness problem.',
      'Invoice numbers usually have to be gapless and sequential within a financial year. So you can\'t allocate a number optimistically and throw it away if the request fails, and you can\'t allocate concurrently without a lock.',
      'Get it wrong and you produce gaps, and gaps are an audit issue for your client. One of very few places we deliberately serialise.',
      '## Layout is genuinely hard',
      'A table of line items that might be three rows or ninety has to paginate, repeat headers, and stop the totals block being orphaned onto a page by itself.',
      'Every layout engine handles that differently and none of them handle it well by default.',
      'We settled on generating server-side with a library giving explicit positioning control, rather than trying to make an HTML print stylesheet behave. More code. Far fewer surprises.',
      '## What we do now',
      'Ask for a real example of the document they currently use, on paper, in the first discovery session.',
      'Not a description. The actual thing, ideally one their accountant has already accepted.',
      'That single artefact answers thirty questions nobody would have thought to ask, and it turns the estimate from a guess into something defensible.'
    ]
  },
  {
    slug: 'webhooks-will-arrive-twice',
    title: 'Your webhook will arrive twice, out of order, and late',
    category: 'engineering',
    date: '2026-04-08',
    excerpt:
      'Payment and messaging integrations fail in ways the docs mention briefly and you\'ll experience thoroughly.',
    body: [
      'Every provider\'s documentation has a line about idempotency. Easy to read past. Expensive to ignore.',
      'Duplicate delivery isn\'t an incident. It\'s normal operation.',
      '## The three things that happen',
      'The same event arrives more than once. Providers retry when they don\'t get a clean acknowledgement quickly, and a slow response counts as no response. If your handler credits an account, it credits it twice.',
      'Events arrive out of order. A payment-captured webhook can land before payment-authorised, so any logic assuming a sequence will occasionally process a state transition that hasn\'t legally happened yet.',
      'Events arrive very late. Hours late, after your system timed the transaction out and moved on. Now you\'ve got a completed payment against an order you already cancelled.',
      '## What handles all three',
      'Store the provider\'s event id and reject anything you\'ve already processed. That\'s the entire fix for duplicates and it takes an hour.',
      'Make the handler idempotent in effect, not just in check. Processing the same event twice should land in the same end state even if the guard fails. Setting a status is safe. Incrementing a balance isn\'t.',
      'Treat webhooks as hints. The authoritative answer to "was this paid" is the provider\'s API, queried by you. A webhook just tells you it\'s worth asking.',
      '## Verify the signature',
      'Webhook endpoints are public URLs. Every provider signs their payloads and every provider has customers who never check, which means an endpoint that will act on anything posted to it.',
      'Checking is a few lines. Not checking means a crediting endpoint anybody who guesses the URL can call.',
      '## Respond fast, process later',
      'Acknowledge immediately, do the work asynchronously.',
      'A handler that writes to three tables and calls an external API before responding will occasionally blow the provider\'s timeout, which triggers a retry, which runs the whole thing again.',
      'Accept, enqueue, return 200.',
      '## The reconciliation job',
      'Every payment integration we build ships with a scheduled job that fetches recent transactions from the provider and compares them against local records.',
      'Catches missed webhooks, duplicated effects, anything stuck. Clients sometimes see it as belt and braces. It\'s what lets you answer a question about a specific transaction six months later with confidence, and it has found real discrepancies on every project we\'ve run it on.'
    ]
  },
  {
    slug: 'the-migration-you-should-run-twice',
    title: 'Run the migration twice before you run it once',
    category: 'engineering',
    date: '2026-03-27',
    excerpt:
      'Data migrations are the highest-stakes, least-rehearsed thing most teams do.',
    body: [
      'Deploying code is routine and reversible. Migrating data is neither.',
      'And it\'s usually done once, under time pressure, at night, by somebody who hasn\'t done it before.',
      '## Rehearse against a copy of production',
      'Not a sanitised subset. A real copy, with the real volume and the real mess — the records with nulls that shouldn\'t be null, the duplicate created by a bug in 2023, the encoding problem in one customer\'s name.',
      'Test data is clean. Production data never is. A migration passing against seeded records has told you nothing.',
      '## Time it',
      'Four minutes on a copy becomes considerably longer on production under load, and if it holds a lock for that duration you have an outage rather than a deployment.',
      'Knowing the number in advance changes the plan.',
      '## Make it resumable',
      'Long migrations get interrupted. Process in batches, record progress, be safe to run again from where it stopped.',
      'A migration that must complete in one uninterrupted run is a migration that will fail at 80%.',
      '## Keep the old data',
      'Add the new column, populate it, verify, and only then stop reading the old one. Dropping in the same deploy removes your ability to compare when something looks wrong next week.',
      'We\'ve never regretted keeping a column for an extra month. We\'ve regretted the opposite.',
      '## Write the verification first',
      'Before the migration, write the query that\'ll tell you it worked. Row counts, sums that should match, a spot check on the awkward records. Run it before and after, compare.',
      '"It completed without errors" is not verification. A migration can complete perfectly and produce wrong data, and the whole point is that you won\'t notice for weeks.',
      '## The unglamorous conclusion',
      'None of this is clever. All of it gets skipped regularly, usually because the migration looked simple.',
      'The ones that look simple are exactly the ones that get run without rehearsal.'
    ]
  },
  {
    slug: 'observability-for-small-teams',
    title: 'Observability when you\'re two people',
    category: 'engineering',
    date: '2026-03-15',
    excerpt:
      'You don\'t need a platform. You need to find out about failures before the client does.',
    body: [
      'Most observability advice is written for teams with a dedicated infrastructure function.',
      'For a small studio running several client systems the requirement is narrower. Know when something\'s broken, and be able to find out why without redeploying.',
      '## The minimum that matters',
      'Error tracking with a notification. Any unhandled exception in production should reach a human within minutes. One library, an afternoon, and it\'s the difference between finding out from your monitoring and finding out from an angry WhatsApp message.',
      'Structured logs with a request id. Not prose logs. Enough structure that you can find every line relating to one user\'s failed action, because that\'s the question you\'ll always be asking.',
      'An uptime check on something the business cares about. Not the homepage — a real endpoint that touches the database. A site returning 200 while every query fails is the outage you find out about last.',
      '## What we skip',
      'Distributed tracing on a system with three services. Custom dashboards nobody opens. Metrics collected because they\'re collectable.',
      'None of that\'s wrong at scale. At our size it eats the attention that should go to the three things above.',
      '## The log line that\'s saved us most',
      'A single line at the boundary of every external call. What we sent, what came back, how long it took. Payment providers, messaging APIs, anything third-party.',
      'Client says a message didn\'t send? That log resolves it in a minute — either it left our system correctly and the provider\'s the problem, or it didn\'t and we are.',
      'Without it that\'s an afternoon of guessing and an uncomfortable conversation.',
      '## Retention and privacy',
      'Log enough to debug, not enough to leak. Card numbers, passwords, full personal records — never.',
      'We log identifiers and status, not payloads, and set a retention period on purpose instead of keeping everything forever because storage is cheap.'
    ]
  },
  {
    slug: 'why-your-search-is-bad',
    title: 'Why the search in your app is bad',
    category: 'engineering',
    date: '2026-03-03',
    excerpt:
      'Almost every internal tool has a search box that only matches exact prefixes. It\'s also the most-used feature.',
    body: [
      'In operational software, search isn\'t a feature. It\'s the primary navigation.',
      'Nobody browses a list of nine thousand parties. They type three letters of a name.',
      'And in most systems those three letters have to be the exact start of the exact field, which means the feature works beautifully for the developer who tested it and fails for the person using it eight hours a day.',
      '## What real users type',
      'Part of a name from the middle. A name spelled slightly differently — Mohd, Mohammad, Mohammed. A phone number with or without the country code, with or without spaces. An invoice number without its prefix. A misspelling.',
      'None of that matches a naive prefix query, so the user concludes the record isn\'t there.',
      '## Cheap improvements',
      'Search several fields at once. Name, phone, code, whatever else identifies the record.',
      'Normalise before comparing. Strip spaces and punctuation from phone numbers on both sides. Lowercase everything. That one change fixes a large share of complaints.',
      'Match anywhere in the string, not just the start, for short inputs.',
      'Search the identifier without its prefix. Invoices are INV-0024? Somebody typing 24 should find it.',
      '## The one worth paying for',
      'Fuzzy matching on names, if the data has human names in it.',
      'Indian names have many valid transliterations, and exact matching on them guarantees duplicate records — because a user who can\'t find a party creates a new one.',
      'That duplicate is the real cost. Bad search doesn\'t just annoy people, it corrupts your data, and cleaning up two thousand near-duplicate customers later is far more expensive than doing search properly.',
      '## How to know yours is bad',
      'Sit with the person who uses it most for twenty minutes.',
      'You\'ll watch them type, fail, retype, and eventually scroll. They won\'t report it as a bug. They adapted to it months ago.'
    ]
  },
  {
    slug: 'file-uploads-from-a-phone-camera',
    title: 'File uploads are a phone camera problem',
    category: 'engineering',
    date: '2026-02-19',
    excerpt:
      'In field software an upload is a photo, taken on a bad connection, by somebody wearing gloves.',
    body: [
      'Proof of delivery. Damage photos. A picture of a supplier bill. A snap of a serial plate.',
      'Uploads in operational software are almost always a phone camera and almost never a file picker on a laptop. That changes the requirements substantially.',
      '## The photo is enormous',
      'A modern phone camera produces several megabytes. On a poor connection that takes a long time, fails often, and the user tries again — so you end up with three copies of the same photo when it finally succeeds.',
      'Resize on the device before upload. A proof-of-delivery photo doesn\'t need twelve megapixels, it needs to be legible. Compressing client-side turns a thirty-second upload into a two-second one and removes most of the failures.',
      '## It will be interrupted',
      'Queue it. The user should take the photo, mark the job done, and walk away, with the file syncing whenever there\'s signal.',
      'Blocking the workflow on an upload completing is how you get staff who stop using the app.',
      '## Orientation and metadata',
      'Photos arrive rotated, because phones record orientation in metadata rather than in the pixels. So if you strip metadata for privacy — and you should, since it contains GPS coordinates — do the rotation first, or every image displays sideways.',
      'Stripping location matters more than teams assume. A delivery photo with embedded coordinates of somebody\'s home is personal data you didn\'t intend to collect.',
      '## What the user needs to see',
      'A thumbnail of what they just captured. Immediately, from the local file, not after the upload completes.',
      'The confirmation that matters is "the photo I took is attached to this job", and that\'s knowable instantly.',
      '## Storage',
      'Photos pile up fast. A delivery operation generating two hundred a day fills a bucket quickly, and nobody thinks about retention until the bill lands.',
      'Decide the retention period with the client at the start — usually driven by how long a dispute can be raised — and enforce it automatically.'
    ]
  },
  {
    slug: 'dates-timezones-and-the-financial-year',
    title: 'Dates, timezones and the Indian financial year',
    category: 'engineering',
    date: '2026-02-07',
    excerpt:
      'Three date problems specific enough to catch teams who\'ve handled dates correctly before.',
    body: [
      'Date handling is a known hazard and most teams have a reasonable approach.',
      'Indian business software adds a few wrinkles that catch people anyway.',
      '## The financial year starts in April',
      'Not January.',
      'Every report, every invoice sequence, every comparison to "last year" runs April to March. A system defaulting to calendar years produces reports the client\'s accountant can\'t use.',
      'Make it configurable, because it differs by country and some clients have subsidiaries elsewhere. But the default for an Indian business is April, and getting it wrong is immediately visible to the one person whose opinion of the software matters most.',
      '## The offset has a half hour in it',
      'IST is UTC+5:30. Code and libraries assuming whole-hour offsets exist, and they\'re fine right up until they aren\'t.',
      'More practically: a naive conversion around midnight shifts a transaction into the wrong day, which shifts it into the wrong daily report.',
      'Store instants in UTC, convert for display. But remember a "business day" in Indian operations is a local calendar day, so daily aggregation has to group in local time — a difference of five and a half hours at the boundary, which quietly puts late-evening transactions into tomorrow.',
      '## What a date means differs by field',
      'An invoice date is a calendar date. No time, no zone. It\'s a fact about a document.',
      'A payment timestamp is an instant.',
      'An expiry date is a calendar date, and a batch expiring "in March" expires at the end of March, not the start.',
      'Storing all three as the same type and hoping is the usual approach, and the source of most of the odd behaviour. We distinguish them explicitly now, and it killed an entire class of bug where a document dated the 1st showed up as the 31st of the previous month for some users.',
      '## The rule',
      'For every date field, write down whether it\'s an instant or a calendar date, and whose calendar.',
      'A minute per field. Cheapest defence available against a category of bug that\'s very hard to reason about once it\'s live.'
    ]
  },
  {
    slug: 'what-we-check-before-go-live',
    title: 'What we check before go-live',
    category: 'engineering',
    date: '2026-01-26',
    excerpt:
      'The list has grown by one item per incident. Here it is in full.',
    body: [
      'Every entry exists because something went wrong once. This isn\'t a general best-practice checklist. It\'s scar tissue.',
      '## Data',
      'A backup exists and we\'ve restored from it successfully at least once. An untested backup is a belief, not a backup.',
      'Retention and deletion are decided and implemented, not deferred.',
      'No production credentials in the repository. We check the history, not just the working tree.',
      '## Access',
      'The client owns every account — domain, hosting, database, third-party services — with us added, rather than the other way round. Handover on day one means nothing if the DNS is in our name.',
      'Every role has been tested by logging in as it, including the most restricted one. Reading the permission code isn\'t the same as using the app as that user.',
      '## Money and documents',
      'Invoice numbering is sequential with no gaps, verified by generating fifty in a row.',
      'A reconciliation job runs and has been checked against the provider\'s dashboard.',
      'Every generated document has been printed, on paper, by the client, and approved by whoever will hand it to a customer.',
      '## Failure behaviour',
      'Error tracking is live and we\'ve deliberately triggered an error to confirm the notification arrives.',
      'The uptime check hits an endpoint that touches the database.',
      'The app behaves sensibly with no network. Not necessarily fully functional. Just not a blank screen with no explanation.',
      '## The last one',
      'Somebody from the client\'s team has completed a real task end to end, unaided, while we watched and said nothing.',
      'Not a demo we drove.',
      'Saying nothing is the hard part. The instinct when somebody hesitates is to help, and helping destroys the data. Every hesitation is a finding, and the ones narrated away are exactly the ones that cost support time later.',
      'What it catches is consistent: labels meaning something different to the user than to us, actions placed where a developer would put them rather than where the workflow needs them, confirmation dialogs that don\'t say what will actually happen.',
      'Almost never logic errors. Tests catch those. It\'s language and placement — which is precisely what internal testing can\'t see, because we already know what everything means.'
    ]
  }
]

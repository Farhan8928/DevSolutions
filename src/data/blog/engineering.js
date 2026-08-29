/**
 * Engineering. Decisions we have actually made on client work, and what
 * they cost or saved.
 */

export const engineering = [
  {
    slug: 'server-components-were-not-the-hard-part',
    title: 'Server Components were not the hard part. Data fetching was.',
    category: 'engineering',
    date: '2026-08-18',
    excerpt:
      'Two years of React Server Components in production and the mental model that actually caused trouble was not the one everyone warned about.',
    body: [
      'The warnings about Server Components were mostly about the boundary — knowing what runs where, being careful with hooks, remembering that a client component cannot be imported into a server one without consequence. Those turned out to be learnable in about a week.',
      'What took much longer was unlearning the habit of fetching data where it is displayed.',
      '## The old instinct',
      'In a client-rendered app, you fetch in the component that needs the data, because that is where you know what is needed. It is colocation and it is good practice under those constraints.',
      'On the server, the same instinct produces a waterfall. A page fetches, then a section fetches, then a card fetches, each waiting for its parent to resolve first. Nothing is wrong on any individual line and the page takes two seconds to produce.',
      '## What we do now',
      'Fetch high, pass down. The page-level component gathers what the whole tree needs in parallel, and the components below receive props. That is less elegant by the colocation standard and dramatically faster.',
      'Where a component genuinely owns an independent request, we let it fetch and wrap it in Suspense so it does not block anything else. The rule is that a request may only be nested if the thing it depends on is genuinely not knowable earlier.',
      '## The caching part nobody enjoys',
      'The other real cost was caching semantics. What is cached, for how long, and what invalidates it, changed across versions and is genuinely subtle. We have been bitten by stale data in production twice, both times because a mutation did not invalidate what a developer assumed it would.',
      'Our answer is unglamorous: be explicit everywhere, never rely on a default, and write down the caching decision for each route in a comment. It is boilerplate and it has ended that class of bug.',
      '## Would we use them again',
      'Yes, on content-heavy sites where the win is real — less JavaScript shipped, faster first paint, and rendering that does not depend on the device. For a dense internal dashboard behind a login, the benefit is much smaller and the complexity is the same, and we have gone back to a plain client app more than once without regret.'
    ]
  },
  {
    slug: 'core-web-vitals-on-an-indian-android-phone',
    title: 'Core Web Vitals on a ₹9,000 Android phone',
    category: 'engineering',
    date: '2026-08-06',
    excerpt:
      'Your site is fast on your laptop. Here is what it does on the device most of your Indian traffic is actually using.',
    body: [
      'Testing on a developer machine over office wifi produces numbers that are true and irrelevant. The median Indian visitor is on a mid-to-low-end Android device on a variable mobile connection, and the gap between that and a MacBook is not a percentage — it is an order of magnitude on CPU-bound work.',
      '## What differs most',
      'JavaScript parse and execute time. A bundle that costs 200ms on a laptop can cost well over a second on a budget device. This is the single biggest lever and it is the one most often ignored, because bundle size gets measured and bundle execution does not.',
      'Main thread contention. Hydration, analytics, a chat widget and a font loader all competing produces input delay that never shows up in a lab test with nothing else running.',
      'Image decode. Large images are slow to download on a poor connection and also slow to decode on a weak processor. Serving a 2000px JPEG to a 400px slot costs twice.',
      '## What we actually do',
      'Ship less JavaScript, which mostly means server-rendering anything that does not need interactivity rather than optimising a large client bundle.',
      'Set explicit width and height on every image, always. Layout shift is the cheapest Core Web Vital to fix and the most commonly left broken.',
      'Defer third-party scripts without exception. Chat widgets and tag managers are the most common cause of a good site testing badly, and almost none of them need to load before interaction.',
      'Self-host fonts or accept the system stack. A font request to a third party on a slow connection blocks text rendering at exactly the wrong moment.',
      '## The measurement that matters',
      'Field data, not lab. Lighthouse on your machine is a debugging tool, not a report card. Real-user metrics from actual visitors on actual devices are the only numbers that describe your site, and they are frequently much worse than the score you have been quoting.',
      'We tell clients their Lighthouse number and their field number, and when they diverge we explain why. That conversation is more useful than any optimisation.'
    ]
  },
  {
    slug: 'when-not-to-use-a-framework',
    title: 'When not to reach for a framework',
    category: 'engineering',
    date: '2026-07-25',
    excerpt:
      'Several of the sites we are proudest of are static HTML generated by a script. Here is when that is the right answer.',
    body: [
      'The default answer to "we need a website" has become a framework, a component library and a build pipeline. Often correct. Sometimes enormous overkill for something that is, structurally, a document.',
      '## The test we apply',
      'Does the page change in response to the user, or only in response to the data behind it? If the page is the same for everybody until content changes, it wants to be generated, not rendered.',
      'A landing page, a service page, a location page, a blog post — these are documents. They benefit from being HTML that arrives complete and needs nothing to display.',
      '## What we build this way',
      'The two-hundred-odd SEO pages on this site are plain HTML written by a Node script from a data file. No client framework on those pages at all. They are the fastest thing we serve, they cannot break in a browser that fails to run JavaScript, and a crawler sees exactly what a person sees.',
      'The same script produces the sitemap, so those cannot drift apart. Adding a page means adding an entry to an array.',
      '## What we do not build this way',
      'Anything with state that matters. A dashboard, a booking flow, a CRM, anything with a form more complex than name-and-message. Those want a framework and we reach for one immediately.',
      '## The maintenance argument',
      'The usual objection is that a bespoke generator is a maintenance burden versus a well-known framework. In practice ours is about four hundred lines and has needed changing three times in a year, each time for a feature we wanted.',
      'A framework is not free either — it needs upgrading, its ecosystem churns, and a security advisory in a transitive dependency is your problem. For a set of documents, that ongoing cost buys very little.',
      '## The point',
      'Not that frameworks are bad. That the question "what is the simplest thing that produces this output" is worth asking before defaulting, and for a surprising share of the web the answer is a template and a loop.'
    ]
  },
  {
    slug: 'offline-first-is-not-optional-in-the-field',
    title: 'Offline-first is not a nice-to-have for field software',
    category: 'engineering',
    date: '2026-07-13',
    excerpt:
      'Apps for people who work in warehouses, sheds and basements have to assume the network is absent, not slow.',
    body: [
      'A recurring pattern in the operational software we build: the people using it are somewhere with no signal. A yard near a port. Inside an MIDC shed with a metal roof. A basement godown. A lift.',
      'Software that treats connectivity as normal and offline as an error state gets abandoned within a fortnight, because it fails at exactly the moment the user needs it.',
      '## What offline-first actually means here',
      'Every write succeeds locally and syncs later. The user never waits for a request to confirm an action they just took. A delivery marked complete is complete on their device, immediately, and reconciles when signal returns.',
      'Reads come from local storage with a background refresh. Opening the app in a dead zone shows yesterday\'s data rather than a spinner, and says so.',
      'Conflicts are resolved with a rule, decided in advance. For most operational data, last-write-wins by server timestamp is fine and simple. For anything involving money or stock, it is not, and the design has to say what happens.',
      '## The part that is easy to get wrong',
      'Queued writes need to be visible to the user. An app that silently holds eleven unsent updates and then fails to sync has lost data as far as the user is concerned. A small indicator showing what is pending, and a way to retry, is the difference between trust and abandonment.',
      'Ordering matters too. If someone creates a record offline and then edits it, those must sync in sequence, or the edit arrives for a record that does not exist yet.',
      '## Why it is worth the complexity',
      'Because the alternative is that the software does not get used. We have seen a well-built system rejected entirely because it needed a connection at the loading dock, and replaced by paper — which works offline perfectly.',
      'Designing for the worst network your user will encounter, rather than the average, is the whole discipline. In the field the worst case is not slow. It is nothing.'
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
      'A pattern we have seen repeatedly on inherited fintech and trading projects: a working product with a dashboard, reports, and no correct ledger underneath. Balances are computed by summing transactions in a query. Refunds are a negative row. Nothing reconciles at month end and nobody can explain why.',
      'Retrofitting a correct ledger afterwards is the most expensive rewrite in this category, because every historical record has to be migrated into a model it was never written for.',
      '## What "correct" means',
      'Every movement of value is two entries that sum to zero. Money leaves one account and arrives in another; there is no such thing as money appearing. Balances are derived from entries, never stored and updated in place.',
      'Entries are immutable. A mistake is corrected by a reversing entry, not by editing history. This is not accounting pedantry — it is what makes the system auditable and what lets you answer "what did we think the balance was on the 3rd" a year later.',
      'Amounts are integers in the smallest unit. Paise, not rupees. Floating point arithmetic on money produces errors that are individually invisible and collectively fatal.',
      '## The commercial argument',
      'Clients rarely ask for this because it is invisible from the outside. It becomes visible the first time an auditor, a regulator or a large customer asks a question the system cannot answer.',
      'The reconciliation problem is the usual first symptom: settlement files from a payment provider that cannot be matched against internal records, so somebody does it by hand in a spreadsheet every month. That manual process is the cost of not having built the ledger, and it compounds.',
      '## What we do on day one',
      'On anything with money, the ledger is designed before any screen. Accounts, entry types, what balances mean, how a refund is represented, what happens on a partial payment. That is a conversation with the client\'s finance person, not a technical decision.',
      'It takes two or three days. It is the highest-return time on the project, and it is the part clients most often want to skip because there is nothing to demo at the end of it.'
    ]
  },
  {
    slug: 'multi-tenancy-decisions-you-cannot-undo',
    title: 'The multi-tenancy decisions you cannot undo later',
    category: 'engineering',
    date: '2026-06-19',
    excerpt:
      'A single-tenant tool that gets a second customer is a much bigger problem than it appears, and the fork happens early.',
    body: [
      'A very common trajectory: a team builds an internal tool, it works well, a peer company asks to use it. Now it needs to serve two organisations, and the question is how much of a rewrite that is.',
      'The answer depends almost entirely on decisions made before anyone thought about a second tenant.',
      '## Where tenant identity lives',
      'If every query already goes through a layer that knows which organisation is asking, adding a tenant is configuration. If tenant identity is threaded through by hand, or worse implied by which database you connected to, then every query is a place to leak data between customers.',
      'The decision to make early is that tenant scoping is enforced in one place and cannot be bypassed, rather than remembered at each call site. Once there are three hundred queries written without it, retrofitting is both large and dangerous, because the failure mode is showing one customer another customer\'s data.',
      '## Isolation level',
      'Shared tables with a tenant column, separate schemas, or separate databases. Each is defensible and they have very different operational profiles. What is not defensible is deciding by accident.',
      'For most Indian B2B products we have worked on, shared tables with rigorous scoping is right — it is cheapest to operate and the isolation requirement is usually contractual rather than regulatory. Where the customer is a bank or handles health records, that answer changes, and it changes the architecture rather than a setting.',
      '## The things that surprise people',
      'Per-tenant configuration multiplies faster than expected. Branding, tax rules, workflow variations, feature availability. If configuration lives in code branches, the second tenant doubles your conditional complexity and the fifth makes it unmaintainable.',
      'Migrations get harder. Schema changes now have to work for every tenant\'s data simultaneously, including the one with four years of history and the one onboarded last week.',
      '## The practical advice',
      'If there is any realistic chance of a second customer, build the scoping layer on day one even with one tenant. It costs a day. Adding it later costs a rewrite and carries a risk of data exposure that no client will forgive.'
    ]
  },
  {
    slug: 'the-empty-state-is-the-product',
    title: 'The empty state is where your product is judged',
    category: 'engineering',
    date: '2026-06-07',
    excerpt:
      'Every user sees the empty version first. It is designed last, if at all.',
    body: [
      'Design work happens against realistic data — a list with twenty rows, a chart with a year of history, a dashboard with numbers in it. That is sensible for evaluating layout and completely unrepresentative of the first five minutes of anybody\'s experience.',
      'The first thing every user sees is the version with nothing in it. And in an operational tool, they will see empty states repeatedly — a new location with no stock, a new user with no activity, a filter that matches nothing.',
      '## What a good empty state does',
      'Says why it is empty. "No consignments yet" and "No consignments match these filters" are different situations requiring different responses, and showing the same blank panel for both is a real usability failure.',
      'Offers the action that resolves it. An empty list with a prominent create button is a functioning interface. An empty list with nothing is a dead end.',
      'Distinguishes empty from broken. A blank screen when a request failed looks exactly like a blank screen when there is genuinely nothing, and the user cannot tell whether to retry or to proceed.',
      '## The pattern we use',
      'Three distinct states, always: nothing yet, nothing matching, and something went wrong. Each with its own copy and its own action. It is a few extra branches per view and it removes most of the confusion in early use.',
      'We also seed a demo dataset for anything we are going to screenshot or demonstrate, because a product demoed empty is unconvincing regardless of how good it is.',
      '## Why this gets skipped',
      'Because it is invisible in a design review with populated mockups, and because it feels like polish. It is not polish — it is the majority of a new user\'s early experience, and the point at which they decide whether the tool is finished.',
      'The cheapest test: log in as a brand new user with a genuinely empty account and try to accomplish something. Most products fail this badly and the team has never seen it, because they have all had data since week one.'
    ]
  },
  {
    slug: 'why-we-still-use-mongodb-sometimes',
    title: 'Why we still reach for MongoDB on some projects',
    category: 'engineering',
    date: '2026-05-26',
    excerpt:
      'A defensible position on a database that is unfashionable to defend, plus the cases where we would not.',
    body: [
      'Document databases went through a hype cycle and then a backlash, and the current consensus is roughly "use Postgres unless you have a reason". That is good default advice. It is also often applied without asking what the reason would look like.',
      '## Where it genuinely fits',
      'Products where the shape of a record varies legitimately between customers or over time. Operational software for different businesses in the same trade is a good example — every one of them has fields the others do not, and modelling that relationally means either a sparse table with forty nullable columns or an attribute table that is painful to query.',
      'Products where a record is naturally a document and is almost always read whole. A consignment with its line items, a quotation with its revisions, a patient visit with its observations. Fetching one object rather than assembling five joins is genuinely simpler.',
      'Early-stage products where the schema is going to change weekly. Migrations have a cost, and during discovery that cost is paid many times.',
      '## Where we would not',
      'Anything where the ledger matters. Financial correctness wants transactions across multiple records with strong guarantees, and while this is possible, the relational tooling for it is better and the patterns are more widely understood.',
      'Anything with genuinely relational access patterns — where you need to ask questions that join four entities in ways nobody predicted. That is what SQL is for and fighting it is a waste of everyone\'s time.',
      'Reporting-heavy products. Ad-hoc analytical queries are much easier against a relational schema, and the moment a client wants a report you did not anticipate, you will feel the difference.',
      '## What we have learned to do regardless',
      'Model deliberately. The freedom to skip schema design is the main way document databases go wrong — not because the technology is weak but because it lets you defer decisions indefinitely.',
      'We write the shapes down, validate them at the boundary, and treat a change to a document shape as a migration even when the database does not require one. The discipline that a relational schema imposes for free has to be supplied by the team instead.'
    ]
  },
  {
    slug: 'fefo-and-why-inventory-is-harder-than-it-looks',
    title: 'FEFO, expiry and why inventory is harder than it looks',
    category: 'engineering',
    date: '2026-05-14',
    excerpt:
      'Stock is not a number. Building a pharmacy system taught us how much is hiding behind that.',
    body: [
      'A naive inventory model has a product and a quantity. Almost every real business breaks that model within a week, and pharmacy breaks it immediately.',
      '## Stock is batches, not a count',
      'The same medicine arrives in different batches with different expiry dates and different purchase prices. "We have 40 strips" is not a useful statement — 12 expire next month and 28 next year, and those are commercially different things.',
      'So the unit of stock is a batch: product, batch number, expiry, quantity, cost. Everything else follows from getting that right.',
      '## FEFO is a correctness requirement, not an optimisation',
      'First-expiry-first-out means a sale must consume the batch closest to expiry, automatically. If the software lets a counter hand pick any batch, short-dated stock sits until it expires and becomes a write-off, while long-dated stock sells.',
      'This has to be enforced by the system rather than trusted to the user, because at a busy counter nobody is checking dates. Getting this right is the single biggest financial contribution the software makes.',
      '## Expiry needs a value, not just a date',
      'A list of expiring items is mildly useful. The number that changes behaviour is the money at risk — what the near-expiry stock cost, totalled. That converts a background chore into a decision about whether to run a discount this week.',
      '## The rest of what breaks the simple model',
      'Stock in more than one place, with transfers between them that are in-flight and belong to neither. Returns, which come back in a batch that must be identified. Damage, which removes stock without a sale. Free goods from suppliers, which have quantity but no cost and will distort your margin if treated as a purchase.',
      '## The lesson that generalises',
      'Whenever a client says "we just need to track stock", the honest first question is what a unit actually is in their business. In pharmacy it is a batch. In steel it is a heat number and a length. In jewellery it is an individual piece with a weight and a purity.',
      'Getting that wrong means every report is subtly fictional, and it is not fixable later without re-entering history.'
    ]
  },
  {
    slug: 'role-based-access-is-a-modelling-problem',
    title: 'Role-based access is a modelling problem',
    category: 'engineering',
    date: '2026-05-02',
    excerpt:
      'Most permission systems fail because roles were treated as a list of labels rather than a description of how the business works.',
    body: [
      'The usual implementation: an enum of roles, a check at the top of each route, and a growing set of exceptions. It works for the first three roles and degrades from there.',
      'The degradation is predictable. A new requirement arrives — a manager should see their own branch but not others — and the role model has no way to express "their own", so a special case appears in a handler. Then another. Within a year the real permission rules exist nowhere except scattered conditionals.',
      '## What is actually being modelled',
      'Two different things get conflated. One is what kind of action a person may take: create a quotation, approve a discount, delete a record. The other is which records they may take it on: their own, their branch\'s, their team\'s, everything.',
      'Treating those separately fixes most of the mess. A permission is a verb plus a scope, and the scope is a property of the relationship between the user and the record, not of the role name.',
      '## The approval case',
      'Anything with a maker-checker rule needs this from the start. The person who created a record cannot be the person who approves it — that is not a UI concern, it is a data rule, and enforcing it in the interface means it is not enforced at all.',
      'On financial systems this is usually a hard requirement from the client\'s auditor, and discovering it late means reworking the workflow rather than adding a check.',
      '## Where the leak happens',
      'Reads, almost always. Teams are careful about who may write and casual about who may read, so a permission system that correctly blocks editing lets a list endpoint return everything and filters in the browser.',
      'The rule we hold to: scoping happens in the query, not in the response, and never in the client. If a user is not allowed to know a record exists, the database should not return it.',
      '## What this costs',
      'A day of design at the start, and a slightly more verbose data layer. Against a permission model that has to be rebuilt in year two while live, with the risk of exposing one customer\'s data to another during the transition, it is not a close call.'
    ]
  },
  {
    slug: 'pdf-generation-is-always-worse-than-you-think',
    title: 'PDF generation is always worse than you think',
    category: 'engineering',
    date: '2026-04-20',
    excerpt:
      'Invoices, biltis, quotations and reports. A category of work that is estimated at half a day and takes three.',
    body: [
      'Nearly every operational system we build has to produce documents — a GST invoice, a lorry receipt, a quotation, a delivery challan. It looks like a rendering problem and is mostly a specification problem.',
      '## Why the estimate is always wrong',
      'Because the document has requirements nobody mentions until they see a draft. It must fit on one page. The tax breakdown has to be in a particular layout because that is what their accountant expects. The company seal goes bottom right. Amounts must appear in words as well as figures. The serial number must be sequential per financial year with no gaps, because a gap is a question from a tax officer.',
      'None of that is in the brief. All of it is non-negotiable once raised.',
      '## The sequential numbering trap',
      'This one is worth calling out because it is a genuine correctness problem. Invoice numbers usually must be gapless and sequential within a financial year. That means you cannot allocate a number optimistically and discard it if the request fails, and you cannot allocate concurrently without a lock.',
      'Getting this wrong produces gaps, and gaps are an audit issue for the client. It is one of the few places we deliberately serialise.',
      '## Layout is genuinely hard',
      'A table of line items that might be three rows or ninety has to paginate, repeat headers, and keep the totals block from being orphaned onto a page by itself. Every layout engine handles this differently and none handle it well by default.',
      'We have settled on generating documents server-side with a library that gives explicit control over positioning rather than trying to make an HTML print stylesheet behave. It is more code and far fewer surprises.',
      '## What we do now',
      'We ask for a real example of the document the client currently uses, on paper, in the first discovery session. Not a description — the actual thing, ideally one their accountant has already accepted.',
      'That single artefact answers thirty questions nobody would have thought to ask, and it converts the estimate from a guess into something defensible.'
    ]
  },
  {
    slug: 'webhooks-will-arrive-twice',
    title: 'Your webhook will arrive twice, and out of order',
    category: 'engineering',
    date: '2026-04-08',
    excerpt:
      'Payment and messaging integrations fail in ways the documentation describes briefly and you will experience thoroughly.',
    body: [
      'Every provider\'s documentation contains a line about idempotency. It is easy to read past and expensive to ignore, because the failure is not theoretical — duplicate delivery is normal operation, not an incident.',
      '## The three things that actually happen',
      'The same event arrives more than once. Providers retry when they do not get a clean acknowledgement quickly, and a slow response counts as no response. If your handler credits an account, it will credit it twice.',
      'Events arrive out of order. A payment-captured webhook can land before payment-authorised. Any logic that assumes a sequence will occasionally process a state transition that has not legally happened yet.',
      'Events arrive very late. Hours late, after your system has timed the transaction out and moved on. Now you have a completed payment against an order you have already cancelled.',
      '## What handles all three',
      'Store the provider\'s event id and reject anything you have already processed. This is the entire fix for duplicates and it takes an hour.',
      'Make the handler idempotent in effect, not just in check — processing the same event twice should produce the same end state even if the guard fails. Setting a status is safe; incrementing a balance is not.',
      'Treat webhooks as hints rather than truth. The authoritative answer to "was this paid" is the provider\'s API, queried by you. A webhook tells you it is worth asking.',
      '## The reconciliation job',
      'Every payment integration we build ships with a scheduled job that fetches recent transactions from the provider and compares them against local records. It catches missed webhooks, duplicated effects and anything that got stuck.',
      'Clients sometimes see this as belt and braces. It is the thing that lets you answer a question about a specific transaction six months later with confidence, and it has caught real discrepancies on every project where we have run it.',
      '## Verify the signature',
      'Webhook endpoints are public URLs. Every provider signs their payloads and every provider has customers who never check the signature, which means an endpoint that will act on anything posted to it.',
      'Checking is a few lines. Not checking means a crediting endpoint that anyone who guesses the URL can call.',
      '## Respond fast, process later',
      'Acknowledge immediately and do the work asynchronously. A handler that writes to three tables and calls an external API before responding will occasionally exceed the provider\'s timeout, which triggers a retry, which runs the whole thing again.',
      'Accept, enqueue, return 200. It removes a whole class of duplicate-processing problem that idempotency then only has to catch as a backstop.'
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
      'Deploying code is routine and reversible. Migrating data is neither, and it is usually done once, under time pressure, at night, by someone who has not done it before.',
      '## Rehearse against a copy of production',
      'Not a sanitised subset. A real copy, with the real volume and the real mess — the records with null fields that should not be null, the duplicate created by a bug in 2023, the encoding problem in one customer\'s name.',
      'Test data is clean and production data never is. A migration that passes against seeded records and fails against real ones has told you nothing.',
      '## Measure how long it takes',
      'A migration that takes four minutes on a copy will take much longer on production under load, and if it holds a lock for that duration you have an outage rather than a deployment. Knowing the number in advance changes the plan.',
      '## Make it resumable',
      'Long migrations get interrupted. Write them to process in batches, record progress, and be safe to run again from where they stopped. A migration that must complete in one uninterrupted run is a migration that will fail at 80%.',
      '## Keep the old data until you are certain',
      'Add the new column, populate it, verify, and only then stop reading the old one. Dropping in the same deployment removes your ability to compare when something looks wrong next week.',
      'We have never regretted keeping a column for an extra month. We have regretted the opposite.',
      '## Write the verification first',
      'Before the migration, write the query that will tell you it worked. Row counts, sums that should match, a spot check of the awkward records. Run it before and after and compare.',
      '"It completed without errors" is not verification. A migration can complete perfectly and produce wrong data, and the whole point is that you will not notice for weeks.',
      '## The unglamorous conclusion',
      'None of this is clever. All of it is skipped regularly, usually because the migration looks simple. The ones that look simple are exactly the ones that get run without rehearsal.'
    ]
  },
  {
    slug: 'observability-for-small-teams',
    title: 'Observability when you are two people',
    category: 'engineering',
    date: '2026-03-15',
    excerpt:
      'You do not need a platform. You need to find out about failures before the client does.',
    body: [
      'Observability advice is mostly written for teams with a dedicated infrastructure function. For a small studio running several client systems, the requirement is narrower: know when something is broken, and be able to find out why without redeploying.',
      '## The minimum that actually matters',
      'Error tracking with a notification. Any unhandled exception in production should reach a human within minutes. This is one library and an afternoon, and it is the difference between finding out from your monitoring and finding out from an angry WhatsApp message.',
      'Structured logs with a request id. Not prose logs. Enough structure that you can find every line relating to one user\'s failed action, which is the question you will always be asking.',
      'An uptime check on the thing the business actually cares about. Not the homepage — a real endpoint that exercises the database. A site that returns 200 while every query fails is the outage you find out about last.',
      '## What we skip',
      'Distributed tracing on a system with three services. Custom dashboards nobody opens. Metrics collected because they are collectable.',
      'These are not wrong at scale. At our size they consume the attention that should go to the three things above.',
      '## The log line that has saved us most',
      'A single line at the boundary of every external call: what we sent, what came back, how long it took. Payment providers, messaging APIs, anything third-party.',
      'When a client says a message did not send, that log resolves it in a minute — either it left our system correctly and the provider is the problem, or it did not and we are. Without it, that is an afternoon of guessing and an uncomfortable conversation.',
      '## Retention and privacy',
      'Log enough to debug and not enough to leak. Card numbers, passwords, full personal records — never. We log identifiers and status, not payloads, and set a retention period deliberately rather than keeping everything forever because storage is cheap.'
    ]
  },
  {
    slug: 'why-your-search-is-bad',
    title: 'Why the search in your app is bad',
    category: 'engineering',
    date: '2026-03-03',
    excerpt:
      'Almost every internal tool has a search box that only matches exact prefixes, and it is the most-used feature.',
    body: [
      'In operational software, search is not a feature — it is the primary navigation. Users do not browse a list of nine thousand parties; they type three letters of a name.',
      'And in most systems those three letters have to be the exact start of the exact field, which means the feature works for the developer who tested it and fails for the person using it eight hours a day.',
      '## What real users type',
      'Part of a name from the middle. A name spelled slightly differently — Mohd, Mohammad, Mohammed. A phone number with or without the country code, with or without spaces. An invoice number without its prefix. A misspelling.',
      'None of that matches a naive prefix query, and the user concludes the record is missing.',
      '## The cheap improvements',
      'Search several fields at once, not one. Name, phone, code, and whatever else identifies the record.',
      'Normalise before comparing. Strip spaces and punctuation from phone numbers on both sides. Lowercase everything. This single change fixes a large share of complaints.',
      'Match anywhere in the string, not just the start, for short inputs.',
      'Search the identifier without its prefix. If invoices are INV-0024, a user typing 24 should find it.',
      '## The one worth paying for',
      'Fuzzy matching on names, if the data has human names in it. Indian names in particular have many valid transliterations, and exact matching on them is a guarantee of duplicate records — because a user who cannot find a party creates a new one.',
      'That duplicate is the real cost. Bad search does not just annoy people, it corrupts your data, and cleaning up two thousand near-duplicate customers later is much more expensive than doing the search properly.',
      '## How to know yours is bad',
      'Sit with the person who uses it most for twenty minutes. You will see them type, fail, retype, and eventually scroll. They will not report it as a bug, because they have adapted to it.'
    ]
  },
  {
    slug: 'file-uploads-from-a-phone-camera',
    title: 'File uploads are a phone camera problem',
    category: 'engineering',
    date: '2026-02-19',
    excerpt:
      'In field software, an upload is a photo taken on a bad connection by someone wearing gloves. Design for that.',
    body: [
      'Proof of delivery, damage photographs, a picture of a supplier bill, a snap of a serial plate. Uploads in operational software are almost always a phone camera, and almost never a file picker on a laptop.',
      'That changes the requirements substantially.',
      '## The photo is enormous',
      'A modern phone camera produces a file of several megabytes. Uploading that on a poor connection takes a long time, fails often, and the user tries again — producing three copies of the same photo when it eventually succeeds.',
      'Resize on the device before upload. A proof-of-delivery photograph does not need twelve megapixels; it needs to be legible. Compressing client-side turns a thirty-second upload into a two-second one and removes most of the failures.',
      '## The upload will be interrupted',
      'Queue it. The user should be able to take the photo, mark the job done, and walk away — with the file syncing whenever there is signal. Blocking the workflow on an upload completing is how you get staff who stop using the app.',
      '## Orientation and metadata',
      'Photos arrive rotated, because phones record orientation in metadata rather than in the pixels. If you strip metadata for privacy — which you should, since it contains GPS coordinates — do the rotation first or every image displays sideways.',
      'Stripping location data matters more than teams assume. A delivery photograph with embedded coordinates of someone\'s home is personal data you did not intend to collect.',
      '## What the user needs to see',
      'A thumbnail of what they just captured, immediately, from the local file. Not after the upload completes. The confirmation that matters is "the photo I took is attached to this job", and that is knowable instantly.',
      '## Storage decisions',
      'Photos accumulate fast. A delivery operation generating two hundred photographs a day fills a bucket quickly, and nobody thinks about retention until the bill arrives. Decide the retention period with the client at the start — usually driven by how long a dispute can be raised — and enforce it automatically.'
    ]
  },
  {
    slug: 'dates-timezones-and-the-financial-year',
    title: 'Dates, timezones and the Indian financial year',
    category: 'engineering',
    date: '2026-02-07',
    excerpt:
      'Three date problems that are specific enough to catch teams who have handled dates correctly before.',
    body: [
      'Date handling is a well-known hazard and most teams have a reasonable approach. Indian business software adds a few wrinkles that catch people anyway.',
      '## The financial year starts in April',
      'Not January. Every report, every invoice sequence, every comparison to "last year" runs April to March. A system that defaults to calendar years produces reports the client\'s accountant cannot use.',
      'This has to be configurable rather than hardcoded, because it differs by country and some clients have subsidiaries elsewhere. But the default for an Indian business is April, and getting this wrong is visible immediately to the one person whose opinion of the software matters most.',
      '## The offset has a half hour in it',
      'IST is UTC+5:30. Code and libraries that assume whole-hour offsets exist, and they are usually fine until they are not. More practically, a naive date conversion around midnight shifts a transaction into the wrong day, which shifts it into the wrong daily report.',
      'Store instants in UTC, always. Convert for display. But be aware that a "business day" in Indian operations is a local calendar day, so any daily aggregation must group in local time, not UTC — a difference of five and a half hours at the boundary that puts late-evening transactions into tomorrow.',
      '## What a date means differs by field',
      'An invoice date is a calendar date with no time and no zone — it is a fact about a document. A payment timestamp is an instant. An expiry date is a calendar date, and a batch expiring "in March" expires at the end of March, not the start.',
      'Storing all three as the same type and hoping is the usual approach and the source of most of the odd behaviour. We now distinguish them explicitly, and it removes an entire class of bug where a document dated the 1st appears as the 31st of the previous month for some users.',
      '## The practical rule',
      'For every date field, write down whether it is an instant or a calendar date, and whose calendar. It takes a minute per field and it is the cheapest defence available against a category of bug that is very hard to reason about once it is live.'
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
      'Every entry on this list exists because something went wrong once. It is not a general best-practice checklist — it is scar tissue.',
      '## Data',
      'A backup exists, and we have restored from it successfully at least once. An untested backup is a belief, not a backup.',
      'Retention and deletion are decided and implemented, not deferred.',
      'No production credentials in the repository. We check the history, not just the working tree.',
      '## Access',
      'The client owns every account — domain, hosting, database, third-party services — with us added, rather than the other way round. Handover on day one means nothing if the DNS is in our name.',
      'Every role has been tested by logging in as it, including the most restricted one. Reading the permission code is not the same as using the app as that user.',
      '## Money and documents',
      'Invoice numbering is sequential with no gaps, verified by generating fifty in a row.',
      'A reconciliation job runs and has been checked against the provider\'s dashboard.',
      'Every generated document has been printed, on paper, by the client, and approved by whoever will be handing it to a customer.',
      '## Failure behaviour',
      'Error tracking is live and we have deliberately triggered an error to confirm the notification arrives.',
      'The uptime check hits an endpoint that touches the database.',
      'The app behaves sensibly with no network — not necessarily fully functional, but not a blank screen with no explanation.',
      '## The last one',
      'Somebody from the client\'s team has completed a real task end to end, unaided, while we watched and said nothing. Not a demo we drove. This finds more problems in twenty minutes than any amount of internal testing, and it is the item most often skipped because it is uncomfortable for everyone involved.',
      '## Why saying nothing is the hard part',
      'The instinct when someone hesitates is to help. Helping destroys the data. Every hesitation is a finding, and the ones that get narrated away are exactly the ones that will cost support time later.',
      'We write down each pause and each wrong turn without comment, and go through them afterwards.',
      '## What it usually catches',
      'Labels that mean something different to the user than to us. Actions that are where a developer would put them rather than where the workflow needs them. Confirmation dialogs that do not say what will actually happen.',
      'Almost never logic errors — those are caught by tests. It is consistently about language and placement, which is precisely what internal testing cannot see, because we already know what everything means.'
    ]
  }
]

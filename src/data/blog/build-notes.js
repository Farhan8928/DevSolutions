/**
 * Build notes. Each of these is about something we actually shipped, and
 * names it. If we cannot name the project, the post does not belong here.
 */

export const buildNotes = [
  {
    slug: 'mt5-integration-in-eighteen-working-days',
    title: 'The MT5 integration everyone quotes at six months',
    category: 'build-notes',
    date: '2026-08-24',
    excerpt:
      'A broker platform with native MetaTrader 5 manager-API integration, shipped in twelve weeks. The integration itself took eighteen working days.',
    body: [
      'When a forex broker asks for a client portal with live MT5 data, the quotes they get are usually six months and a large number. We shipped the whole platform — public site, client area and admin CRM — in twelve weeks, with the MT5 integration taking eighteen working days of that.',
      'It is worth being precise about why, because the difference is not heroics.',
      '## Most of the six months is discovery nobody scopes',
      'The manager API is not complicated. What is complicated is deciding what the platform should do with it: which account states matter, what a client is allowed to see, how deposits reconcile against trading balance, what happens when the trading server and your database disagree.',
      'Those are business decisions, and the projects that take six months usually spend four of them discovering that nobody had made them. We front-loaded that into a scoping week with the broker\'s operations lead, which is unglamorous and is the actual saving.',
      '## Treat the trading server as the source of truth',
      'The main architectural decision: we never store a balance. Balances live on the trading server and are read. Our database stores the things the trading server does not know about — KYC state, documents, support history, marketing attribution.',
      'That removes the single largest source of bugs in these systems, which is two systems disagreeing about money and nobody knowing which is right.',
      '## Everything asynchronous, nothing blocking',
      'The manager API is not fast and it is not always available. Any request path that waits on it will eventually time out in front of a user.',
      'So reads are cached with a visible timestamp — "as of 14:32" — and refreshed in the background. Writes are queued and confirmed. The portal stays responsive when the trading server is slow, which it periodically is.',
      '## What we would do differently',
      'We under-scoped the admin side. Operations staff needed to see and act on far more than we anticipated, and that came out in week ten rather than week two. On the next one we would sit with the ops desk for a day before designing anything client-facing.'
    ]
  },
  {
    slug: 'building-a-donation-flow-that-actually-converts',
    title: 'Building a multi-currency donation flow for an NGO',
    category: 'build-notes',
    date: '2026-08-12',
    excerpt:
      'Humane Warriors raise from donors in several countries. The technical requirements of that are more interesting than they look.',
    body: [
      'Humane Warriors is a global NGO with a Swiss base and donors spread across Europe and India. The donation flow had to handle multiple currencies, one-off and recurring giving, and live progress against a campaign goal.',
      'The progress bar is the part everyone notices — CHF 9,522.51 raised of CHF 25,000, 47 donations. The parts that took the time are less visible.',
      '## Recurring giving is a different product',
      'A one-off donation is a payment. A monthly donation is a subscription with a lifecycle: it can fail, be retried, be paused, be cancelled, have its amount changed. Each of those is a state the system has to represent and a message the donor has to receive.',
      'Failed recurring payments are the single biggest source of quiet revenue loss for an NGO, and the fix is not technical sophistication — it is retrying on a sensible schedule and emailing the donor when a card expires.',
      '## The currency decision',
      'We display and charge in the donor\'s currency and store everything in minor units alongside the currency code, never converted. Converting at write time destroys information and makes reconciliation against the payment provider impossible.',
      'The campaign total is then a sum per currency plus a display conversion at a stated rate, with the rate and date shown. That is less tidy than one big number and it is honest, which matters when the number is a fundraising claim.',
      '## Progress that updates without lying',
      'A progress bar that only counts settled payments understates. One that counts initiated payments overstates and occasionally goes down, which is worse. We count captured payments and refresh on a short interval, and accept a small lag.',
      '## The receipting problem',
      'Indian donors need 80G receipts, which have specific requirements and a specific timing expectation. Automating that removed weeks of administrator time every year — and it was the feature the organisation valued most, despite nobody having asked for it in the brief.'
    ]
  },
  {
    slug: 'a-crm-for-railway-parcel-logistics',
    title: 'Designing a CRM around biltis, not orders',
    category: 'build-notes',
    date: '2026-07-31',
    excerpt:
      'Saad Cargo move parcels by rail. The whole system turned on getting one modelling question right.',
    body: [
      'Saad Cargo book consignments onto trains out of Mumbai. When we started, the obvious model was orders and customers — the shape every e-commerce-adjacent system uses.',
      'That model is wrong here, and building on it would have produced a system that could tell you where a parcel was but not who owed money for it.',
      '## Party, not customer',
      'In this trade the counterparty is a party, and a party can be the sender on one consignment and the receiver on another. Sometimes both on the same day. A "customer" implies a direction that does not exist.',
      'Once parties are the core entity, the outstanding ledger falls out naturally: what does this party owe us across everything, regardless of which end of the transaction they were on. That is the number the business actually runs on.',
      '## Payment mode is a property of the consignment',
      'Paid at source, to-pay, on-bill, slip. Each changes who owes what and when. This is not a field on an order — it determines the entire accounting treatment of that consignment, and it has to be first-class.',
      '## The bilti is a legal document, not a receipt',
      'The lorry receipt has to be generated, numbered, printed and handed over. It is evidence in a dispute. That meant PDF generation with exact layout control and gapless sequential numbering, which is a larger piece of work than the CRUD around it.',
      '## Pending by train',
      'The dashboard feature the operations team uses most is a grid of train numbers with a count of parties who still have pending consignments on each. It is not a chart and it is not beautiful. It is the question they ask forty times a day, answered in one glance.',
      'We would not have designed that from a requirements document. It came from sitting at the counter and noticing what people were looking up repeatedly.',
      '## SMS is the interface for the consignee',
      'The receiver of a parcel does not have an account and never will. Status alerts by SMS at received, unloaded and delivered are the entire user interface for that person, and getting the message text right mattered more than any screen in the application.'
    ]
  },
  {
    slug: 'a-capacity-calculator-that-turns-into-a-quotation',
    title: 'The feature that changed how a genset company sells',
    category: 'build-notes',
    date: '2026-07-19',
    excerpt:
      'SRF Power sell generators. The most valuable thing we built was not the CRM — it was a calculator that becomes a quote.',
    body: [
      'A generator sale starts with a customer who knows what appliances they need to run and does not know what size genset that requires. The sales engineer works it out, usually on paper, sometimes wrongly.',
      'We built a capacity calculator into the CRM: enter the connected load, get a recommended kVA rating, then turn that sizing directly into a quotation.',
      '## The arithmetic is the easy part',
      'Sum the running watts. Find the largest starting surge, because a motor draws several times its running load for a moment and the genset has to survive that. Apply the power factor and a safety margin. Recommend the next standard size up.',
      'That is an afternoon. What took the time was the appliance chart — a list of real equipment with realistic running and starting figures, so a sales engineer can pick "1.5 ton AC" rather than looking up watts.',
      '## Why it changed the sale',
      'Before, the sizing conversation happened verbally and the quotation was a separate document produced later, often the next day. The customer had time to call a competitor.',
      'Now the sizing and the quotation are one continuous action, with the working shown. The customer sees why they need a 15 kVA rather than being told. That is a materially different sales conversation and it happens in one visit.',
      '## The detail that made it usable',
      'When no catalogue product matches the calculated size, the system quotes the calculated size with the load breakdown attached rather than refusing or forcing a wrong product. Sales engineers were previously abandoning the tool at exactly that point.',
      '## What this says about internal tools generally',
      'The CRM around it — leads, inventory, attendance, IndiaMART sync — is competent and unremarkable. The calculator is the thing that changed behaviour, and it came out of watching a sales engineer do the calculation by hand and asking why.',
      'The highest-value feature in an operational tool is usually the one that removes a manual step nobody thought to mention, because it was too routine to be worth describing.'
    ]
  },
  {
    slug: 'screenshotting-a-crm-without-leaking-client-data',
    title: 'How we screenshot a private CRM without leaking client data',
    category: 'build-notes',
    date: '2026-07-07',
    excerpt:
      'We wanted to show internal tools in our portfolio. The first attempt would have published real customers\' names.',
    body: [
      'Most of our best work is behind a login and cannot be linked to. A portfolio that only shows public marketing sites misrepresents what we do, so we needed screenshots of internal systems.',
      'The first set we assembled came from an existing screenshot folder in the client repository. It showed a dashboard with real lead names, real phone-number-adjacent identifiers, and a real pipeline value of ₹23,20,000.',
      'Publishing that on a public marketing site would have been a data leak, from a studio whose pitch includes being NDA-first.',
      '## The approach that works',
      'Run the application locally against a local database seeded with synthetic data, and screenshot that. What you get is the real interface — real layout, real column headers, real density — with invented content.',
      'The important detail is that the database is local and the application never touches production. We start a local database, point the application at it with an environment variable rather than editing any config file, seed it, and capture.',
      '## The things to disable',
      'Anything that talks to the outside world. SMS providers, WhatsApp, email, third-party lead sync. A seeding script that triggers real notifications to real customers is a genuinely bad afternoon, and several of these applications will happily do that.',
      'We set those credentials to empty in the environment for the capture run. Not in the file — in the shell, so nothing persists.',
      '## Never point a seed script at production',
      'Both of the CRMs we captured had a connection string to a live cloud database in their environment file, and both had a reset-and-seed script sitting next to it. The distance between a screenshot session and destroying a client\'s data is one careless environment variable.',
      '## What to check before publishing',
      'Read every string in the image. We caught a customer-name column at the edge of one frame after the composition was otherwise finished, and swapped the screen for a different one.',
      'The rule we ended on: look at every pixel of text in an image before it goes on a public page, every time, however synthetic you believe the data is.'
    ]
  },
  {
    slug: 'a-pharmacy-app-that-ships-on-two-surfaces',
    title: 'Shipping a pharmacy platform on Android and Windows',
    category: 'build-notes',
    date: '2026-06-25',
    excerpt:
      'PlusVeda runs on a phone at the counter and a desktop in the back office. Two surfaces, one product, and a set of decisions about what belongs where.',
    body: [
      'Pharmacy staff work in two very different postures. At the counter, standing, one hand, fast — scanning a pack, taking payment. In the back office, sitting, keyboard, doing a stock reconciliation or a supplier order.',
      'Trying to serve both with one responsive layout produces something that is mediocre in both places. We built a React Native app for the counter and an Electron desktop build for the office, sharing the API and the domain logic.',
      '## What belongs on the phone',
      'Scan to sell. Receive stock. Check a price. See what is expiring. Four things, each reachable in one tap, each usable one-handed while talking to a customer.',
      'Everything else is deliberately absent. A phone screen with a full reporting suite on it is a phone screen where the sell button is harder to find.',
      '## What belongs on the desktop',
      'Anything with a table. Multi-warehouse transfers, supplier orders, post-dated cheques, the expiry report with value at risk, GST filing preparation. These are tasks with many rows and many columns, done sitting down, and they are genuinely better with a mouse and a large screen.',
      '## The shared part',
      'The domain rules live on the server: FEFO batch selection, tax computation, stock movements. Neither client implements business logic. That sounds obvious and it is the thing that most often goes wrong when a team ships two front-ends — the phone gets a slightly different rounding rule and nobody notices for months.',
      '## What we got wrong first',
      'We initially built the desktop as a responsive web view of the mobile app, which is the cheap answer. It was rejected immediately by the client\'s back-office staff, correctly, because a stock reconciliation across two hundred rows in a mobile-first layout is miserable.',
      'The rebuild as a genuine desktop layout took a fortnight and was the difference between the software being used and being tolerated.',
      '## Keyboard on desktop, thumbs on mobile',
      'The desktop build supports keyboard entry throughout — tab order that matches the workflow, enter to confirm, no reaching for a mouse during a long data entry session. Back-office staff work much faster this way and notice immediately when it is missing.',
      'The phone build is the opposite: large targets, minimal typing, scanning wherever possible.',
      '## One codebase or two',
      'We share the API and the domain rules and not the interface code. Attempts to share components across a React Native app and an Electron desktop build produced abstractions that fitted neither well.',
      'The duplication is real and it has been cheaper than the abstraction would have been, which is the recurring lesson about premature sharing.'
    ]
  },
  {
    slug: 'what-a-uk-saas-taught-us-about-multi-tenancy',
    title: 'What a UK enterprise buyer changed about our defaults',
    category: 'build-notes',
    date: '2026-06-13',
    excerpt:
      'OutVue sells growth analytics into UK enterprises. The procurement process shaped the architecture more than the feature list did.',
    body: [
      'OutVue is a growth-spend intelligence platform — blended ROI attribution across ad accounts, scenario modelling, board-level reporting. The interesting engineering constraints came from who buys it rather than what it does.',
      '## The security questionnaire arrives before the pilot',
      'Selling software into a UK enterprise means answering a document about data residency, encryption, access control, audit logging, retention and sub-processors, and it arrives early. Features that are absent at that point are not features you can add later — they are reasons the pilot does not start.',
      'So SSO, an audit export and per-tenant data isolation were built before the product was interesting, which felt wrong at the time and was correct.',
      '## Region-pinned data as an architectural decision',
      'UK and EU data residency is not a configuration setting bolted on at the end. It affects where the database lives, where backups go, which third-party services are permissible, and what your logging pipeline may retain.',
      'Deciding it on day one costs nothing. Discovering it in month eight during a procurement review costs a migration.',
      '## Every automated decision needs a reason attached',
      'The product runs a set of rule-based optimisers that flag things like underfunded performers, creative fatigue and budget reallocation opportunities. An enterprise user will not act on a recommendation they cannot explain to their director.',
      'So each output carries its reasoning and a priority, and every one is acknowledgeable with an audit trail of who saw it and what they did. That requirement changed the data model — a recommendation is a record with a lifecycle, not a computed value.',
      '## The lesson we carried into other projects',
      'For anything sold to a business rather than a consumer, the buyer\'s procurement process is a functional requirement. It is worth asking, in the first week, what document the client will have to fill in about your software — and building for that alongside the features.',
      '## Audit logging is cheaper on day one',
      'Recording who did what and when is trivial when the data layer is being written and painful to retrofit, because you have to find every write path and none of them were designed to carry an actor.',
      'We now put an actor and a timestamp on every mutation by default, whether or not anyone has asked for it. It has never been wasted.',
      '## Tenant isolation is the question they ask hardest',
      'Enterprise buyers want to know that another customer cannot see their data, and "we filter by organisation in the query" is not a reassuring answer if the filtering is applied by hand at each call site.',
      'Scoping enforced in one place, impossible to bypass, is both the correct architecture and the answer that passes review. Those two things aligning is unusual enough to be worth taking advantage of.'
    ]
  },
  {
    slug: 'an-islamic-companion-app-in-176-countries',
    title: 'Shipping an app to 176 countries from a two-person studio',
    category: 'build-notes',
    date: '2026-06-01',
    excerpt:
      'AshShifa went from a repository to a Play Store production release. The engineering was the straightforward part.',
    body: [
      'AshShifa is a prayer-times, Quran, qibla and daily-deeds app, live on Google Play across 176 countries. Built with React Native and Expo by two people.',
      'The application code was the least difficult component. Everything around it took longer than expected.',
      '## Background execution is the hard requirement',
      'A prayer app has to produce an azan at a precise local time whether or not the app is open, on a device that is aggressively trying to save battery. Android manufacturers each handle background tasks differently, and several of them will simply kill your scheduled work.',
      'This is the feature that determines whether the app is useful, and it consumed disproportionate effort relative to how it reads on a feature list.',
      '## Calculation is not universal',
      'Prayer times depend on the calculation method, and different communities use different ones legitimately. Hardcoding one and being wrong for a large share of users is a failure mode with no technical symptom — the app works perfectly and produces times somebody knows are incorrect.',
      'The same applies to the Hijri date, which varies by convention and by local sighting.',
      '## The store process',
      'Closed testing for a fixed period, then a production review, then a staged rollout. The timeline is not negotiable and it does not care about your launch plan. Building the release pipeline early — so that producing a signed build is routine rather than an event — is what makes that period survivable.',
      'We build the Android bundle on CI rather than locally, which keeps the signing key out of anyone\'s laptop and makes the build reproducible.',
      '## The keystore',
      'Losing the upload key means never updating the app again. It lives outside the repository, backed up in two places, and that is the single most important operational fact about the project.',
      '## What surprised us',
      'How much of the work is content rather than code. Prayer calculation, Quran text, translations, audio — sourcing correct, properly licensed content and verifying it is a real workstream, and getting it wrong is worse than a crash.'
    ]
  },
  {
    slug: 'rebuilding-a-ui-and-measuring-whether-it-helped',
    title: 'We rebuilt a UI. Here is how we checked it was actually better.',
    category: 'build-notes',
    date: '2026-05-20',
    excerpt:
      'A redesign that feels better is not evidence. On PlusVeda we captured before-and-after screens for every route and compared them deliberately.',
    body: [
      'Redesigns are usually justified with taste. Everyone agrees the new one looks better, it ships, and nobody knows whether anything improved.',
      'On the PlusVeda pharmacy platform we ran the redesign as an audit: capture every screen before, capture every screen after, and compare them on stated criteria rather than on impression.',
      '## What we captured',
      'Every route, at both phone and desktop widths, before and after, from a running instance with identical seeded data. Same data matters — half of what makes a redesign look better is that the demo content improved.',
      '## What we compared',
      'Number of taps to complete the three most common tasks. Information visible without scrolling on the primary screens. Whether the primary action on each screen was identifiable in under two seconds by someone unfamiliar with it.',
      'Those are crude measures. They are still enormously better than "it feels cleaner", because they can be disagreed with.',
      '## What it caught',
      'Two screens got worse. The new dashboard looked considerably better and pushed the "needs attention" items below the fold on a phone — which is the most important content on the screen for the person using it at a counter.',
      'Nobody would have raised that from the mockups, because the mockups were viewed on a large monitor. It was obvious the moment the before-and-after phone captures sat side by side.',
      '## The habit worth keeping',
      'Screenshot everything before you start. It costs an hour with a script and it is the only way to make an honest comparison later, because memory of the old interface fades fast and gets more negative over time — which is exactly the bias that makes redesigns feel successful regardless of outcome.',
      '## Capture both widths',
      'We captured phone and desktop for every route. The desktop set looked uniformly better and the phone set contained both regressions. If we had only checked the width we designed at, we would have shipped them.',
      '## Keep the before set',
      'It stays in the repository. Six months later, when someone asks why a particular screen is laid out the way it is, the previous version is the fastest possible answer.',
      'It is also the only defence against slowly reverting a good decision, which happens more than anyone admits — a change here, a change there, and eventually the screen looks like it did before the work that fixed it.',
      '## What we would add next time',
      'Timing the three common tasks with a stopwatch, on a real device, with someone who does the job. We used tap counts as a proxy and tap counts are not time.'
    ]
  },
  {
    slug: 'the-visa-crm-and-lead-routing',
    title: 'Lead routing is an organisational problem, not a technical one',
    category: 'build-notes',
    date: '2026-05-08',
    excerpt:
      'The Baker & Co visa CRM captures leads from Meta, the website and phone calls. Deciding who gets them was the hard part.',
    body: [
      'Baker & Co process immigration and visa applications from Dubai. Leads arrive from Meta lead forms, the website, and inbound calls, and they pass through telecallers, advisors, a processing team and admin.',
      'The technical work — capturing from the Meta API, deduplicating, storing — took a fraction of the time. The design question that mattered was who a lead belongs to at each moment, and what happens when they do not act.',
      '## Ownership has to be unambiguous',
      'A lead with two owners has no owner. Every record has exactly one person accountable for the next action, and that is visible on the record rather than implied by a queue.',
      'This sounds obvious and it is the thing most CRMs get wrong, because a shared pool feels fair and produces leads nobody calls.',
      '## The next action needs a date',
      'A lead without a scheduled follow-up is a lead that will be forgotten. The system requires a next-action date on every open record, and the primary working view is not a pipeline chart — it is the list of things due today, per person.',
      'Sales dashboards that show a funnel are for managers. The person doing the work needs a list.',
      '## Escalation on inactivity',
      'If nothing happens on a lead for a defined period, it escalates. Not silently reassigned — visibly escalated, so the pattern is observable rather than the lead just moving.',
      'That single rule surfaced more about how the team actually worked than any report did.',
      '## Where the technology mattered',
      'Speed of capture. A Meta lead that reaches a telecaller in under a minute converts at a completely different rate than one that arrives in an overnight batch, and that is the one place where the engineering directly moved the number.',
      '## What we would push harder on next time',
      'Call outcomes. We allowed free-text notes and a small set of dispositions; the team used the free text for everything, which made the data unanalysable. Constrained dispositions with a mandatory reason would have been resisted at first and worth it.'
    ]
  },
  {
    slug: 'building-a-slab-catalogue-for-architects',
    title: 'A stone catalogue where availability is the product',
    category: 'build-notes',
    date: '2026-04-26',
    excerpt:
      'Mossano Marmo source natural stone. An architect does not want a lookbook — they want to know what is actually in the yard.',
    body: [
      'Natural stone websites are usually beautiful and useless. Full-bleed photography of a marble no longer available, in a size nobody has, sourced from a quarry that closed.',
      'For Mossano Marmo the useful product is availability: which slabs exist right now, how many, at what dimensions.',
      '## Every slab is individual',
      'This is the modelling fact that shapes everything. Natural stone is not fungible — two slabs of the same material differ in veining, and an architect specifying for a project needs to see the actual slab they will receive, with its real dimensions and real photograph.',
      'So the unit is a slab with an identity, not a product with a stock count. "19 slabs available, 118 × 78 inches, 1,200 sq ft" is a different kind of statement from "in stock".',
      '## Photography is data, not decoration',
      'The photograph of each slab is functionally a specification. That raised the requirement on image handling considerably — large images that must remain faithful to colour, delivered fast, with a zoom that shows veining detail.',
      'Compressing those aggressively for performance would have destroyed the thing being sold.',
      '## Private sourcing as a first-class flow',
      'The highest-value enquiries are for stone not in the catalogue. Rather than treating that as a contact form, it is a distinct flow that captures the project, the application, the quantity and the timeline — because sourcing a specific marble for a specific project is the business, and a generic enquiry loses the information that makes it actionable.',
      '## What the design had to resist',
      'Every instinct on a project this visually rich is to make the browsing experience the centrepiece. The client was clear that the enquiry, not the browse, is what pays — and the layout gives availability and dimensions the same prominence as the imagery, which is unusual for the category and correct for the buyer.',
      '## Keeping availability honest',
      'A catalogue claiming stock that has been sold is worse than no catalogue, because an architect who specifies a slab and cannot get it will not come back. So the count has to be maintained, and maintaining it has to be easy enough that the yard actually does it.',
      'That pushed the admin side toward a very small number of actions — mark sold, mark reserved, adjust count — rather than a full inventory system nobody would use.',
      '## The reserve state',
      'Between an architect specifying a slab and a client approving it, the stone needs holding. Without a reserved state, the yard either sells it and disappoints the specifier, or holds it informally and forgets.',
      'Adding an explicit reservation with an expiry was a small feature and it removed the most common source of friction in the business.'
    ]
  },
  {
    slug: 'when-the-client-site-is-a-lead-capture-machine',
    title: 'A local services site is a lead capture machine with pictures',
    category: 'build-notes',
    date: '2026-04-14',
    excerpt:
      'Zaid Electronics repair televisions. Building their site taught us more about conversion than any SaaS project has.',
    body: [
      'Zaid Electronics is a TV repair workshop in Mumbai. Their customers have a broken television, are on a phone, and are choosing between them and the next search result.',
      'That is a much less forgiving brief than most product work, because the decision happens in seconds and there is no funnel to nurture anybody through.',
      '## Price is the first objection and the first opportunity',
      'The instinct in this trade is to avoid publishing prices, because every repair is different. That instinct loses to whoever publishes a range.',
      'We led with "from ₹500" style banding per service and a promise that the exact price is agreed before any work starts. That combination — a number plus a commitment about how the number is set — did more than any design decision.',
      '## WhatsApp with the message pre-filled',
      'In India the preferred first contact is WhatsApp, not a form and often not a call. The link opens a chat with the enquiry already written — "Hi Zaid Electronics, I need LED TV repair" — which removes the small awkwardness of composing a first message to a stranger.',
      'That friction is real and it is invisible in analytics until you remove it.',
      '## Proof has to be checkable',
      'A rating with its count, from Google, updated automatically rather than typed into the markup. Photographs of the actual workshop. Years in business. Brands actually serviced.',
      '## The page structure that worked',
      'Service, price band, two contact routes, proof, then detail. Not hero, feature grid, testimonials, contact — which is what the template wanted and what the business initially expected.',
      '## What surprised the client',
      'The pages that convert best are the specific ones. "Vertical lines on TV screen" outperforms "TV repair" substantially, because it matches what the customer actually types when they are describing a symptom rather than shopping for a category.',
      '## The self-diagnosis that builds trust',
      'Each fault page carries one check the customer can do themselves — shine a torch at the screen to tell a backlight failure from a dead panel, point a phone camera at the remote to see whether it is transmitting.',
      'Giving away a diagnosis feels like losing a call. It does the opposite: someone who confirms the fault themselves arrives already believing you know the work, and the enquiry is better qualified.',
      '## What we would do differently',
      'We built the service pages before the symptom pages, because services are how the business describes itself. The symptom pages perform better and should have come first.',
      'A useful general lesson: the categories a business uses internally are rarely the categories its customers search in.'
    ]
  },
  {
    slug: 'seeding-demo-data-that-looks-real',
    title: 'Seeding demo data that looks real without being real',
    category: 'build-notes',
    date: '2026-04-02',
    excerpt:
      'Every operational product needs a convincing demo dataset. Generating one badly is worse than an empty database.',
    body: [
      'Demoing an operational tool against an empty database is unconvincing. Demoing it against production data is a privacy problem. So every project we ship has a seed script that produces a plausible dataset.',
      'Getting this right is more work than it appears and it pays back constantly — for demos, screenshots, testing, onboarding and support reproduction.',
      '## Plausible means shaped, not random',
      'Random data looks wrong immediately. Real datasets have distribution: a handful of parties account for most transactions, most consignments are small and a few are large, activity clusters on weekdays, and there is always some old record that has been open for months.',
      'A seed that produces uniformly distributed records reads as fake even when the individual values look fine.',
      '## Include the awkward cases',
      'The best seed data contains the states that break layouts. A party with a very long name. A consignment with one item and one with sixty. A zero balance. A negative one. An expired batch. A record with a missing optional field.',
      'These are exactly the cases that surface layout bugs, and having them permanently in the demo dataset means you see them every time you look at the app.',
      '## Names matter more than you expect',
      'Use clearly fictional but regionally plausible names. For an Indian product, English placeholder names look wrong and undermine the demo. Names that could be real customers create a different problem — someone will eventually screenshot one.',
      'We use obviously synthetic combinations that still read naturally in context.',
      '## Make it deterministic and repeatable',
      'The same seed should produce the same data. Screenshots taken a month apart should match. A bug reproduced from seeded data should be reproducible by anyone.',
      '## And keep it far from production',
      'A seed script and a production connection string in the same directory is an accident waiting to happen. Ours refuse to run against any host that is not local, as a hard check rather than a convention.'
    ]
  },
  {
    slug: 'the-feature-the-client-did-not-ask-for',
    title: 'The feature the client did not ask for',
    category: 'build-notes',
    date: '2026-03-21',
    excerpt:
      'Four examples of small things we added on our own judgement, and what they had in common.',
    body: [
      'The features clients remember are frequently ones that were not in the brief. Looking back at four of them, the pattern is consistent enough to be useful.',
      '## Automated 80G receipting',
      'For an NGO, Indian donors need tax receipts. Nobody asked for automation because issuing them by hand in March was simply how it had always been done. It removed weeks of administrator time a year.',
      '## Pending by train',
      'A grid of train numbers with pending-consignment counts on a logistics dashboard. It was not requested; it came from watching the counter staff look the same thing up repeatedly in a list view.',
      '## Value at risk on expiring stock',
      'A pharmacy expiry report normally shows what is expiring. Adding the cost value of that stock, totalled, converted a routine list into a weekly commercial decision about discounting.',
      '## Quote the calculated size when no product matches',
      'On a genset CRM, the calculator originally stopped when no catalogue item matched the recommendation. Sales engineers abandoned it there. Letting it quote the calculated size with the working attached kept them in the tool.',
      '## What these have in common',
      'None of them are technically interesting. Each came from watching somebody do their job rather than from asking what they wanted.',
      'People describe their work in terms of the process they currently have, not the process they would prefer. Asking "what do you need" produces a list of improvements to the existing workflow. Watching produces the thing they have stopped noticing is painful.',
      '## The caveat',
      'Unrequested features are also how projects go over scope. The rule we use: it has to be small, it has to be observed rather than imagined, and it has to be shown to the person who does the job before it is finished. If they shrug, it comes out.',
      '## How to notice them',
      'Watch for the moment someone leaves the software. They open a calculator, a notebook or a spreadsheet, or they ask a colleague. Each of those is a gap the system could close, and none will be reported as a missing feature because the workaround already exists.',
      'Ask what a person does immediately before and immediately after using your screen. The answer is frequently the real opportunity.',
      '## The ones we got wrong',
      'We have also added unrequested features that went unused — a bulk export nobody wanted, a filter duplicating something faster. The pattern is that those came from imagining a need rather than observing one.',
      'The test is whether you can name the specific moment you watched someone struggle. If you cannot, it is an idea rather than an observation, and it belongs in a backlog instead of the build.'
    ]
  }
]

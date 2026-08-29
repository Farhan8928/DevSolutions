/**
 * Mumbai-region service areas, used to generate the service × area landing
 * pages together with services.js.
 *
 * ── Why this grid is not a doorway grid ─────────────────────────────────────
 * A matrix of location pages is the fastest way to get a site demoted. Google's
 * doorway-page guidance describes the usual implementation exactly: many
 * near-identical pages differing only by a place name, all funnelling to the
 * same destination, adding nothing a reader could use.
 *
 * The defence is not smarter templating. It is that the pages are actually
 * about different things. Every area below carries its own `profile` — who
 * does business there and what they are actually buying — and its own
 * `relevance` map, written per service, describing what a business in that
 * specific area runs into on that specific engagement. SEEPZ is export units
 * that need serial traceability and offline-tolerant field apps; BKC is banks
 * and MNC back-offices where the blocker is procurement and audit; Vashi is
 * APMC commission agents where the real product is a ledger that matches the
 * mandi's day. Those are different pages because they are different problems.
 *
 * The generator will NOT emit a cross page for a service an area has no
 * `relevance` entry for. That is deliberate: a page with filler copy is worse
 * than no page, because it drags the quality signal of the whole grid down.
 * If you add a service to an area, write the entry properly or leave it out.
 *
 * Keys in `relevance` are service `key` values from services.js.
 * Pincodes and landmarks are load-bearing — they appear in the page copy and
 * in the JSON-LD `areaServed`, and they are how a searcher confirms coverage.
 */

export const areas = [
  {
    slug: 'andheri',
    name: 'Andheri',
    district: 'Mumbai Suburban',
    lat: 19.1136,
    lng: 72.8697,
    pincodes: ['400053', '400058', '400059', '400069', '400093'],
    landmarks: ['SEEPZ', 'MIDC Andheri East', 'Chakala', 'Lokhandwala', 'Veera Desai Road'],
    profile:
      'Two very different economies under one name. Andheri East is SEEPZ and the MIDC belt — gems and jewellery exporters, electronics units and the back-offices that serve them. Andheri West is media: production houses, post studios and the agencies around Lokhandwala and Veera Desai Road.',
    relevance: {
      web: 'An export unit in SEEPZ needs a site that survives due diligence from an overseas buyer — company details, certifications and capability, in plain English. A production house in Andheri West needs close to the opposite: a reel that starts playing immediately and a contact route that reaches a producer, not a form queue.',
      crm: 'Jewellery exporters track order-to-shipment with karat, weight and customs paperwork hanging off every line. That is a different data model from the lead-chasing CRM a media agency wants, and forcing both onto one schema is how these projects go wrong.',
      app: 'Field staff moving between MIDC sheds and the airport cargo complex lose signal constantly. Anything built here has to queue writes offline and reconcile on reconnect — an app that assumes connectivity will be abandoned in a fortnight.',
      shopify: 'D2C jewellery brands spinning out of SEEPZ manufacturing already have the photography and the supply chain. What they lack is a storefront that handles weight-based pricing, hallmarking and BIS marks without a plugin stack that breaks every update.',
      saas: 'Andheri West agencies keep trying to productise a reporting deck into a tool they can charge for. The hard part is never the dashboard, it is multi-tenancy and per-client data isolation once the third customer signs.',
      logistics: 'Cargo agents around the airport complex work in air waybills and customs milestones, not consignment notes. The status vocabulary is different enough that a generic transport CRM has to be rebuilt rather than configured.',
      inventory: 'Gems and electronics units need serial and batch traceability that holds up in an export audit — where a stone or a component came in, which shipment it left on, and the paperwork that connects the two.',
      nextjs: 'Media sites here are heavy with video and stills. Server rendering plus real image discipline is the difference between a portfolio that loads on a producer\'s phone and one that gets closed before the reel starts.',
      interior: 'Architecture and set-design studios in Andheri West are judged on the gallery. Full-bleed imagery, fast, with project metadata that is actually filterable — not a grid of lightbox thumbnails.',
      health: 'Occupational health providers serving the MIDC units run periodic medical checks across hundreds of workers on a schedule. The record has to be per-worker and per-employer at once, which most clinic software cannot express.',
      ngo: 'Several education and livelihood trusts operate out of Andheri with donors split between India and the Gulf. Multi-currency giving with correct 80G handling on the Indian half is the requirement that trips up off-the-shelf donation plugins.'
    }
  },
  {
    slug: 'bandra',
    name: 'Bandra',
    district: 'Mumbai Suburban',
    lat: 19.0596,
    lng: 72.8295,
    pincodes: ['400050', '400051'],
    landmarks: ['Linking Road', 'Hill Road', 'Pali Hill', 'Carter Road', 'Bandra West'],
    profile:
      'Consumer brand territory. Linking Road and Hill Road retail, D2C labels run out of Pali Hill flats, restaurants and clinics with strong local footfall, and the creator businesses and boutique agencies that cluster around them.',
    relevance: {
      web: 'Bandra businesses are almost always discovered on Instagram first and searched second. The site\'s job is to convert a visitor who already half-decided — fast load on mobile data, prices or a booking route visible without scrolling, and no gate before the phone number.',
      crm: 'A clinic or salon here runs on repeat visits and no-shows, not a pipeline. What matters is the appointment ledger, reminder cadence and who owns the follow-up — a sales CRM bolted onto that is a bad fit and staff quietly stop using it.',
      app: 'Loyalty and re-booking are the only two reasons a Bandra retail customer installs an app. If it does not remember their usual order or their stylist, it will be deleted after one use, whatever the design looks like.',
      shopify: 'D2C labels here outgrow a template store at the point they start doing drops and bundles. That is a merchandising problem — inventory holds, waitlists, size-run logic — not a theme problem, and it is where most Bandra stores stall.',
      ngo: 'Several foundations run out of Bandra on personal networks and WhatsApp. The step change is a donation page with recurring giving and automatic 80G receipting, so the founder stops issuing receipts by hand every March.',
      nextjs: 'Consumer sites here live or die on Core Web Vitals over patchy 4G. Server-rendered pages with disciplined images are worth more to a Bandra brand than any animation budget.',
      interior: 'Boutique interior practices in Bandra sell on taste. The gallery has to hold at full resolution and the enquiry form has to qualify — budget band and site location — or the studio spends its week on calls it will not take.',
      saas: 'Creator businesses here try to productise what they already sell manually — a cohort, a template pack, a members area. The blocker is entitlements and billing, not content hosting, and that is where most of them stall.',
      health: 'Aesthetic and dental clinics in Bandra run on packages and multi-session courses. Tracking sessions consumed against a paid package, per patient, is the thing an appointment book alone cannot do.',
      inventory: 'Boutiques on Linking Road carry one or two pieces per size. Stock accuracy at that depth is unforgiving — a single unrecorded sale shows the last piece as available and costs a customer.',
      logistics: 'D2C labels here dispatch from a 3PL they do not control and field the delivery complaints themselves. Pulling courier status back into one view, with the customer\'s order attached, is what stops the support load compounding.'
    }
  },
  {
    slug: 'bkc',
    name: 'BKC',
    district: 'Mumbai Suburban',
    lat: 19.0664,
    lng: 72.8682,
    pincodes: ['400051', '400098'],
    landmarks: ['Bandra Kurla Complex', 'NSE', 'Bharat Diamond Bourse', 'Jio World Centre'],
    profile:
      'Mumbai\'s corporate district — banks and NBFCs, the exchange, MNC India headquarters, consulates, law firms and the Bharat Diamond Bourse. Procurement is formal, security review is real, and nothing ships without a paper trail.',
    relevance: {
      web: 'A BKC engagement is rarely blocked on design. It is blocked on procurement, vendor onboarding and a security questionnaire. Budget the review cycle honestly and build with audit logs and access control from the first commit, not retrofitted before go-live.',
      crm: 'Financial-services teams here cannot use a CRM without role-based access, an immutable activity trail and data residency they can point a regulator at. Those are architecture decisions, not settings, and they have to be made on day one.',
      fintech: 'Broker and NBFC platforms in BKC need KYC/AML flows, maker-checker approvals and reconciliation that survives audit. The trading dashboard is the easy half; the compliance surface underneath it is where the twelve weeks actually go.',
      saas: 'Selling software into a BKC bank means SSO, an audit export and a DPA before the pilot. Building those in after the pilot is agreed is the most common reason an India-first SaaS stalls at its first enterprise logo.',
      health: 'Insurers and health-benefit teams headquartered here handle claims data that is regulated on both sides. DPDP alignment, encryption at rest and a defensible retention policy are procurement gates, not nice-to-haves.',
      app: 'Employee and advisor apps for BKC firms need MDM compatibility, biometric or SSO login and a remote-wipe story. Consumer app patterns do not survive the InfoSec review here.',
      logistics: 'The diamond bourse moves high-value consignments where chain of custody, insurance value and dual sign-off matter far more than route optimisation.',
      nextjs: 'Investor-facing and disclosure pages carry legal weight and must render identically for a crawler, a regulator and a phone. Server rendering removes a whole class of argument about what was actually published.',
      ngo: 'Corporate foundations headquartered in BKC have to report CSR spend against Schedule VII activities. What they need is grant tracking and beneficiary reporting that produces the board pack, not a donation button.',
      interior: 'Fit-out firms working BKC offices are judged on delivered corporate projects. A portfolio organised by floor plate and handover timeline speaks to a facilities head far better than mood imagery.',
      inventory: 'Diamond bourse operations track parcels by carat, cut and certificate number, moving between vaults and viewing rooms. Custody at each handoff — who held it, when, under whose authority — is the record that matters.'
    }
  },
  {
    slug: 'powai',
    name: 'Powai',
    district: 'Mumbai Suburban',
    lat: 19.1196,
    lng: 72.9089,
    pincodes: ['400076', '400087'],
    landmarks: ['IIT Bombay', 'Hiranandani Gardens', 'Powai Lake', 'Central Avenue'],
    profile:
      'Mumbai\'s closest thing to a startup campus. IIT Bombay\'s spin-outs and incubated companies, product teams in Hiranandani Gardens, gaming and animation studios, and enough coworking to keep a seed-stage team off a lease.',
    relevance: {
      saas: 'Powai teams usually arrive with a working prototype and a founder who has been maintaining it alone. The job is turning that into something a second engineer can safely change: multi-tenancy, migrations, environments and tests — before the seed round, not after.',
      web: 'A seed-stage site here is a fundraising asset as much as a sales one. It has to explain the product in one screen to an investor who will spend forty seconds on it, and stay editable by a founder at midnight.',
      app: 'Product teams here ship to both stores from one codebase because they cannot staff two. Expo with over-the-air updates means a fix reaches users the same day instead of waiting on a review cycle.',
      crm: 'Early revenue teams outgrow a spreadsheet at roughly the tenth customer. The right first CRM is small — pipeline, owner, next action — and wired to the product\'s own events, not a sixty-field enterprise install nobody fills in.',
      fintech: 'Fintech spin-outs from the IIT ecosystem hit the same wall: the prototype works, but KYC, ledgering and reconciliation were never designed. Retrofitting a correct double-entry ledger later is the most expensive rewrite in the category.',
      health: 'Health-tech founded around the IIT-B ecosystem needs clinical data modelling and consent handled properly from the start — FHIR-shaped records and an audit trail, because the first hospital pilot will ask.',
      nextjs: 'Developer-facing and content-heavy product sites rank on documentation depth. Next.js with MDX lets the team publish without a release, which is the only way docs actually stay current.',
      inventory: 'Hardware and D2C startups incubated here discover that stock lives in three places at once — a 3PL, a founder\'s flat and in transit. One batch-aware source of truth fixes more than a better spreadsheet.',
      shopify: 'Campus D2C brands launch on a template and hit the ceiling at their first real spike. Moving the storefront to headless while keeping Shopify\'s checkout is usually the cheapest way past it.',
      interior: 'Co-working operators and studio landlords around Hiranandani sell space on how it looks and what it costs. Floor plans, desk counts and availability by date do the work a gallery alone cannot.',
      ngo: 'Social ventures out of the IIT-B incubator are measured on outcomes, not funds raised. Beneficiary tracking with a defensible impact metric is what turns a grant application into a renewal.'
    }
  },
  {
    slug: 'lower-parel',
    name: 'Lower Parel',
    district: 'Mumbai City',
    lat: 19.0030,
    lng: 72.8302,
    pincodes: ['400013', '400018'],
    landmarks: ['Kamala Mills', 'Phoenix Palladium', 'Todi Mills', 'Senapati Bapat Marg'],
    profile:
      'The old mill land, now towers. Fintech and media companies in Kamala Mills and Todi Mills, growth-stage startups on their second office, brand and content agencies, and the restaurant businesses that feed all of them.',
    relevance: {
      fintech: 'Lower Parel is where a lot of India\'s consumer fintech is actually built. The recurring problem is a product that works and a reconciliation process that does not — settlement files, refunds and chargebacks handled by hand until someone builds the ledger properly.',
      saas: 'Growth-stage teams here are usually past product-market fit and drowning in per-customer forks. Consolidating those into configuration instead of code is unglamorous and the single highest-return engineering project available to them.',
      web: 'Agencies and studios here need a site that convinces a CMO in one scroll and a careers page that actually converts, because hiring is as hard a problem as sales at this stage.',
      crm: 'Sales teams in Kamala Mills run multi-touch B2B cycles across email, calls and WhatsApp. If those three do not land in one timeline against one company record, forecasting is guesswork and the pipeline review becomes theatre.',
      app: 'Consumer fintech apps here need biometric login, a hard offline story for patchy lifts and basements, and release discipline — because a bad build reaching production costs real money, not just reviews.',
      nextjs: 'Content and SEO are a primary acquisition channel for these companies. Server rendering with a real CMS behind it means marketing ships pages without waiting on an engineering sprint.',
      shopify: 'Restaurant groups and F&B brands here sell merchandise and gift cards alongside covers. That is a small store with awkward tax and fulfilment rules, and it is usually better solved on Shopify than inside the booking system.',
      health: 'Corporate wellness and diagnostics startups clustered here handle patient data on day one. Consent capture and access logging are the two things that decide whether an enterprise pilot converts.',
      ngo: 'Impact-sector organisations with offices in the mill compounds report to institutional funders on milestones, not sentiment. Grant tracking with evidence attached to each deliverable is what the reporting cycle actually needs.',
      interior: 'Workspace designers fitting out the mill-compound towers are asked about services coordination and handover dates as much as aesthetics. The portfolio should answer both.',
      inventory: 'Restaurant groups here run several kitchens off one commissary. Recipe-level consumption against actual stock is how food cost gets controlled — headcount and covers alone will not show where it leaks.',
      logistics: 'F&B and cloud-kitchen operators juggle three aggregators and their own riders. One dispatch view across all of them, with the promise time visible, is what protects the rating that drives the orders.'
    }
  },
  {
    slug: 'borivali',
    name: 'Borivali',
    district: 'Mumbai Suburban',
    lat: 19.2299,
    lng: 72.8567,
    pincodes: ['400091', '400092', '400103'],
    landmarks: ['S. V. Road', 'Chandavarkar Road', 'IC Colony', 'Borivali Station'],
    profile:
      'Established family businesses and neighbourhood trade. Retailers along S. V. Road, clinics and diagnostic labs, coaching classes, jewellers and furnishing showrooms — mostly second-generation, mostly serving a catchment they can name.',
    relevance: {
      web: 'The search that matters in Borivali ends in a phone call, not a form. Prices or ranges visible, a WhatsApp button that pre-fills the enquiry, directions that open in Maps, and proof — reviews and real photographs of the shop, not stock images.',
      crm: 'A family business here does not need a pipeline, it needs to stop losing enquiries between a shared phone, a WhatsApp inbox and a notebook. One shared list with an owner and a follow-up date usually recovers more revenue than any campaign.',
      inventory: 'Showrooms along S. V. Road carry deep catalogues in narrow storage. Knowing what is actually on the shelf versus in the godown, at batch level, is the difference between confirming an order and losing it to the next shop.',
      shopify: 'Retailers here sell to a catchment that already knows them. A store is worth building when it handles local delivery and pickup properly — the courier-only default is wrong for a customer who lives four stops away.',
      health: 'Clinics and diagnostic labs need appointments, report delivery and recall reminders. Reports going out over WhatsApp with no access control is the norm and the first thing worth fixing.',
      interior: 'Furnishing and modular-kitchen showrooms here sell on a home visit. The site\'s job is to earn that visit — real work photographed in real Borivali flats, and a booking that captures the flat size and locality.',
      app: 'Coaching classes want attendance, fee reminders and a parent view. That is a small, sharply-scoped app, and it fails when it is over-built into a learning platform nobody asked for.',
      nextjs: 'A Borivali business competes for searches with a locality in them. Statically generated pages per service and per neighbourhood, with real addresses, is what makes those searches winnable.',
      ngo: 'Neighbourhood trusts and community kitchens here raise from a local donor base that gives in cash. Moving them to a UPI-first donation page with automatic receipts is usually the single biggest operational upgrade available.',
      saas: 'Coaching institutes that have built their own test and attendance tool often find peers asking to use it. Turning that into a product means per-institute data separation before anything else.',
      logistics: 'Shops here promise same-day delivery inside a few kilometres using their own staff. Route sequencing and a delivery confirmation the customer can see matters more than any national courier integration.'
    }
  },
  {
    slug: 'thane',
    name: 'Thane',
    district: 'Thane',
    lat: 19.2183,
    lng: 72.9781,
    pincodes: ['400601', '400604', '400610', '400615'],
    landmarks: ['Wagle Estate MIDC', 'Ghodbunder Road', 'Viviana Mall', 'Majiwada'],
    profile:
      'Manufacturing and healthcare with a growing services layer. Wagle Estate\'s MIDC units, hospital and diagnostic chains, education groups, and the logistics operators using Ghodbunder Road as the corridor out towards Nashik.',
    relevance: {
      crm: 'Wagle Estate manufacturers sell through dealers and site engineers, not a web form. The CRM that works here tracks enquiry to quotation to despatch, with quantity, specification and site address on every line — and it has to be usable from a phone at a customer\'s plant.',
      inventory: 'MIDC units run raw material, work-in-progress and finished goods across sheds. Batch and lot traceability is not optional once a customer audit or a GST reconciliation arrives, and spreadsheets stop coping around the second warehouse.',
      logistics: 'Operators on the Ghodbunder corridor need trip sheets, LR generation and driver settlement more than they need mapping. Fuel and advance reconciliation per trip is usually the feature that pays for the build.',
      health: 'Hospital and diagnostic chains here run multiple centres with one brand. Central appointment booking, report delivery and a patient record that follows the patient between branches is the difference between a chain and several clinics sharing a logo.',
      web: 'A Thane manufacturer\'s site is a credential check for a procurement team in another city. Certifications, capacity, client list and downloadable specification sheets matter far more than motion design.',
      app: 'Field service and delivery staff working between MIDC sheds and sites need offline capture — job done, photograph, signature — that syncs when they are back on signal.',
      saas: 'Education groups here keep trying to sell their internal admissions tool to peer institutions. Multi-tenancy and per-institute branding are what turn that from a favour into a product.',
      nextjs: 'Multi-branch healthcare and education groups need a page per centre that actually ranks locally. Static generation per branch, with real addresses and timings, does that without a page-builder mess.',
      interior: 'Modular kitchen and furnishing showrooms along Ghodbunder sell against a flat size and a budget. A gallery filtered by carpet area and configuration converts better than one filtered by style.',
      ngo: 'Thane has a dense network of education and disability trusts running on volunteer time. A donation page plus a volunteer roster removes two spreadsheets and a WhatsApp group at once.'
    }
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    district: 'Thane',
    lat: 19.0330,
    lng: 73.0297,
    pincodes: ['400703', '400614', '400705', '410206'],
    landmarks: ['Vashi APMC', 'CBD Belapur', 'Airoli knowledge park', 'Nerul'],
    profile:
      'A planned city doing three jobs. Vashi\'s APMC markets and the commission agents around them, CBD Belapur\'s corporate and government offices, and the IT parks at Airoli and Millennium Business Park — with JNPT freight and the new airport pulling logistics in.',
    relevance: {
      logistics: 'Freight and CFS operators on the JNPT corridor deal in containers, gate-in and gate-out timestamps and detention charges. That vocabulary is nothing like a parcel CRM, and the money is usually lost in detention nobody billed for.',
      inventory: 'APMC commission agents need a ledger that matches the mandi\'s day — lot-wise arrivals, weight, commission and farmer settlement. Get the ledger right and the stock view follows; get the stock view first and the agent will not use it.',
      crm: 'Vashi trading businesses run on relationships and credit. What they need recorded is who owes what, against which lot, and when it was promised — an outstanding ledger with follow-ups, which is a very different CRM from a sales pipeline.',
      saas: 'Product teams in the Airoli and Millennium parks are often building for a parent company abroad. The constraint is data residency and an India-hosted environment that still meets the parent\'s security review.',
      web: 'Belapur corporates and government-adjacent bodies need accessible, plainly-structured sites that survive a compliance read and work on old browsers still in use across their offices.',
      app: 'Warehouse and yard staff need barcode or QR scanning that works on cheap Android handsets in poor light, with an offline queue — the network inside a shed near JNPT is not something to design around optimistically.',
      fintech: 'Commodity trade finance and invoice discounting businesses here need ledgering and reconciliation before anything else. The dashboard is presentation; the double-entry underneath it is the product.',
      health: 'Multi-centre diagnostic labs across Vashi, Nerul and Belapur need one patient record and one report pipeline across branches, with home-collection routing that respects who is actually nearby.',
      nextjs: 'A node-based city means searches carry a node name — Vashi, Nerul, Belapur, Kharghar. A statically generated page per node, each with its own address and coverage, is how those are won.',
      interior: 'Fit-out and furnishing firms here work to builder handover standards across identical flat layouts. A portfolio organised by building and configuration is immediately legible to a buyer in the same tower.'
    }
  },
  {
    slug: 'goregaon',
    name: 'Goregaon',
    district: 'Mumbai Suburban',
    lat: 19.1663,
    lng: 72.8526,
    pincodes: ['400062', '400063', '400065'],
    landmarks: ['Film City', 'NESCO', 'Oberoi Garden City', 'Aarey Road'],
    profile:
      'Production and exhibitions. Film City\'s studios and the production ecosystem around them, NESCO\'s exhibition and events business, plus the corporate parks along the Western Express Highway.',
    relevance: {
      web: 'Production houses are judged in the first five seconds of a reel. Video that starts instantly, credits and crew that are actually readable, and a route to a producer that does not go through a generic contact form.',
      crm: 'Event and exhibition businesses run on stalls, sponsors and a hard date. The pipeline is a floor plan — who has booked which stall, what is paid and what is held — and no generic CRM models that without being bent badly out of shape.',
      app: 'Exhibition organisers need visitor registration, badge scanning and lead capture for exhibitors, working on a crowded venue network where the wifi will fail at least once.',
      saas: 'Production management keeps getting rebuilt in spreadsheets — call sheets, crew, equipment, locations. It productises well, but only once permissions are right, because a call sheet is confidential until it is not.',
      inventory: 'Equipment rental houses around Film City live on knowing what is out, on which shoot, due back when, and in what condition. Serial-level tracking with damage notes is the whole business.',
      nextjs: 'Media sites are image and video heavy by definition. Server rendering plus disciplined asset handling is what keeps them ranking despite the weight.',
      interior: 'Set designers and production designers need a portfolio that reads as a body of work, filterable by project type, with stills that hold at full size.',
      health: 'On-set medical cover and the clinics serving the studio workforce deal in short episodic visits with no continuity. A lightweight record keyed to the production rather than the patient is what actually fits.',
      shopify: 'Studios and events businesses sell merchandise in bursts around a release or a show. The store has to survive a spike and then sit idle, which argues for a hosted checkout over a self-managed stack.',
      logistics: 'Moving sets, lighting and equipment between Film City floors and outdoor locations is a scheduling and custody problem. What goes out, on whose gate pass, and what comes back damaged is the record that matters.'
    }
  },
  {
    slug: 'malad',
    name: 'Malad',
    district: 'Mumbai Suburban',
    lat: 19.1864,
    lng: 72.8493,
    pincodes: ['400064', '400097'],
    landmarks: ['Mindspace', 'Malad West', 'Infiniti Mall', 'Link Road'],
    profile:
      'The Mindspace IT and BPO corridor plus dense residential retail. Back-office operations for banks and insurers, mid-size IT services firms, and a strong local retail and clinic economy along Link Road.',
    relevance: {
      saas: 'BPO operations in Mindspace run on internal tools built years ago by someone who has left. Rebuilding those as a proper multi-tenant product is often the cheapest route to both maintainability and a new revenue line.',
      crm: 'Outsourced sales and collections floors need call disposition, callback scheduling and supervisor barge-in visibility. Agent screen time is the metric — every extra click is multiplied by a few hundred seats.',
      web: 'IT services firms here sell to overseas buyers who will check the site before the call. Case studies with real numbers, named technologies and a team page beat any amount of stock photography.',
      app: 'Employee-facing apps for large floors need SSO, shift rosters and leave in one place. Adoption is decided by whether it works on the cheapest phone in the building, not the newest.',
      inventory: 'Retailers along Link Road need stock visible across shop and godown with a barcode flow that a part-time counter hand can learn in a morning.',
      health: 'Polyclinics and dental chains here need appointment scheduling, recall reminders and report access that does not mean a WhatsApp forward of a PDF.',
      shopify: 'Local retailers moving online usually need pickup and same-day local delivery, not national courier defaults. Getting delivery zones right matters more than theme choice.',
      fintech: 'The back-offices here process lending and insurance operations for banks headquartered elsewhere. Tooling built for them has to satisfy the client bank\'s audit, not just the operator\'s convenience.',
      nextjs: 'IT services firms bidding overseas are read by procurement teams and crawlers alike. Server-rendered case studies with real technology names are what surface for the specific stack a buyer is searching.',
      ngo: 'Malad\'s residential belt supports a number of medical-aid and education trusts. Recurring monthly giving, not one-off appeals, is what stabilises them, and that is a billing problem.',
      interior: 'Residential fit-out firms working the Malad and Kandivali towers deal in repeat layouts. Showing the same configuration done three different ways is more useful to a buyer than showing three unrelated homes.'
    }
  },
  {
    slug: 'worli',
    name: 'Worli',
    district: 'Mumbai City',
    lat: 19.0176,
    lng: 72.8162,
    pincodes: ['400018', '400025', '400030'],
    landmarks: ['Worli Sea Face', 'Atria Mall', 'Century Bhavan', 'Sea Link'],
    profile:
      'Corporate headquarters and premium consumer. Media and FMCG head offices, private hospitals, luxury retail and hospitality, plus the family offices and advisory firms that sit alongside them.',
    relevance: {
      web: 'A head-office site here carries brand and investor weight at once. Governance pages, leadership, press and disclosures have to be maintainable by communications without an engineering ticket for every update.',
      saas: 'Family offices and advisory firms want portfolio and reporting tools they can put a client login on. Permissions and an audit trail decide whether that is a product or a liability.',
      fintech: 'Wealth and advisory platforms here need statement generation, fee calculation and reconciliation that a client can query line by line. The reporting engine is the product, not the chart.',
      health: 'Private hospitals in this belt need appointment booking, pre-admission paperwork and discharge summaries that reach the patient. The gap is almost always between the HIS and anything patient-facing.',
      crm: 'Luxury retail and hospitality run on named relationships and preferences, not lead volume. A guest or client record that remembers history across visits is worth more than any funnel report.',
      shopify: 'Premium brands here need a store that matches the boutique experience — restrained, fast, with proper size and stock logic. Most damage is done by plugin stacks added to fix things a clean build would not have broken.',
      nextjs: 'Corporate and investor pages must render identically for a crawler, a journalist and a phone. Server rendering removes an entire category of argument about what was published and when.',
      ngo: 'CSR foundations attached to the head offices here disburse to implementing partners and must evidence every rupee. Partner onboarding, disbursement tracking and utilisation certificates are the actual system.',
      interior: 'High-end residential practices working the sea-face towers present few projects, at length. Depth per project — plans, materials, process — matters more than the number of thumbnails.',
      inventory: 'Luxury retail here carries slow-moving, high-value stock where each piece has an identity. Piece-level tracking with provenance beats any aggregate stock count.',
      logistics: 'Premium retail and hospitality here promise scheduled, white-glove delivery windows. The system has to hold an appointment, not just a status, and tell the customer who is arriving and when.',
      app: 'Hospital and hotel staff apps in this belt need role-scoped access across shifts and a fast handover view. Adoption depends on it working on the oldest device on the floor, not the newest.'
    }
  },
  {
    slug: 'dadar',
    name: 'Dadar',
    district: 'Mumbai City',
    lat: 19.0178,
    lng: 72.8478,
    pincodes: ['400014', '400028'],
    landmarks: ['Dadar TT', 'Ranade Road', 'Phool Galli flower market', 'Shivaji Park'],
    profile:
      'Old Mumbai trade at full volume. Textile and saree wholesalers, the flower market, sweet shops and sari showrooms on Ranade Road, jewellers, and a dense professional layer of doctors, CAs and lawyers around Shivaji Park.',
    relevance: {
      inventory: 'Textile and saree wholesalers carry thousands of SKUs that differ by design, colour and piece length. Stock has to be tracked by design number and lot, or the counter ends up trusting memory over the system.',
      crm: 'Wholesale trade here is credit trade. Outstanding by party, ageing, and who promised what on which bill is the record that matters — a sales pipeline is close to useless in this context.',
      web: 'A Dadar wholesaler\'s buyers are retailers from out of town. A catalogue they can browse by design number, with minimum order and rate visible on enquiry, saves a hundred phone calls a week.',
      shopify: 'Sweet shops and sari retailers here have genuine national demand at festival peaks. The build has to survive a traffic spike and handle perishable dispatch windows, which is a fulfilment problem before it is a store problem.',
      health: 'Consulting rooms around Shivaji Park are single-doctor practices. What helps is appointments, a simple patient history and prescription printing — not a hospital system scaled down badly.',
      logistics: 'Goods leaving Dadar go out on shared transport with LRs and part-loads. Booking, LR generation and delivery confirmation matter more than tracking a vehicle nobody owns.',
      app: 'Wholesalers want their regular retailers ordering from a phone against agreed rates, with outstanding visible at the point of order. That single screen changes collection behaviour more than any reminder.',
      nextjs: 'Wholesale catalogues are enormous and change by season. Statically generating a page per design number is what makes a Dadar wholesaler findable for the exact item a retailer is searching.',
      ngo: 'Dadar\'s older charitable trusts run annual appeals through printed receipts and cheques. Digitising receipting alone recovers weeks of administrator time every year.',
      saas: 'The textile trade keeps rebuilding the same design-catalogue-and-order tool per firm. It productises well, but only with strict tenant separation — these firms are direct competitors.',
      interior: 'Dadar homes are renovations inside old buildings with real structural constraints. Documenting what was possible within a society\'s rules persuades a neighbouring flat owner far better than a show flat.',
      fintech: 'The accountants and sub-brokers around Shivaji Park manage client portfolios on spreadsheets and statements. A client portal with statements and fee workings visible removes most of their inbound calls.'
    }
  },
  {
    slug: 'chembur',
    name: 'Chembur',
    district: 'Mumbai Suburban',
    lat: 19.0522,
    lng: 72.9005,
    pincodes: ['400071', '400074', '400088'],
    landmarks: ['RCF colony', 'Diamond Garden', 'Chembur Naka', 'Eastern Freeway'],
    profile:
      'Industrial east Mumbai turning residential. Chemical and fertiliser operations and their contractor ecosystem, pharma distribution, and a fast-growing residential retail and clinic economy around Diamond Garden.',
    relevance: {
      inventory: 'Chemical and pharma distributors here need batch, expiry and licence numbers on every movement. Drug-licence-linked stock and near-expiry alerts are regulatory requirements, not reporting conveniences.',
      crm: 'Industrial suppliers sell against tenders and rate contracts. What has to be tracked is the enquiry, the quotation revision history and the rate contract it falls under — quotation versioning is where these deals are usually lost.',
      logistics: 'Hazardous and bulk movement carries documentation that ordinary transport software ignores — consignment classification, driver certification and route restrictions that have to be recorded, not assumed.',
      health: 'Pharma distributors supplying clinics need order-to-delivery with batch and expiry visible to the buyer, because a chemist will refuse short-dated stock at the door.',
      web: 'Industrial suppliers here are shortlisted on capability documents. Downloadable specification sheets, certifications and a plant capability page do more than any homepage animation.',
      app: 'Contractor and maintenance crews on plant sites need job cards, photographs and sign-off captured offline, because phones are often restricted or without signal inside the premises.',
      saas: 'Compliance and safety tracking is still run on spreadsheets across these units. Turning that into a product with scheduled checks and an audit trail sells well to peers in the same belt.',
      shopify: 'Speciality chemical and consumables suppliers increasingly sell small packs online alongside bulk. That needs pack-size variants and hazard documentation attached to the product, not a generic listing.',
      nextjs: 'Industrial suppliers are found on very specific product and grade searches. A statically generated page per grade, with the specification on it, is what surfaces for those queries.',
      ngo: 'Community health and education trusts around the RCF colony run on a mix of corporate CSR and local giving. Keeping those two funding streams separately reportable is the requirement.',
      interior: 'Chembur is mid-renovation across whole colonies. Firms here win on showing work delivered in the same building types, with a realistic timeline for a family living through it.'
    }
  },
  {
    slug: 'vikhroli',
    name: 'Vikhroli',
    district: 'Mumbai Suburban',
    lat: 19.1055,
    lng: 72.9256,
    pincodes: ['400079', '400083'],
    landmarks: ['Godrej campus', 'LBS Marg', 'Eastern Express Highway', 'Kannamwar Nagar'],
    profile:
      'A corporate campus and the industrial spine around it. The Godrej estate and its vendor network, offices along LBS Marg, and logistics and light manufacturing using the Eastern Express Highway.',
    relevance: {
      crm: 'Vendors selling into a large campus operate on purchase orders, delivery schedules and payment terms set by the buyer. The CRM has to mirror the buyer\'s process, not impose its own, or reconciliation becomes a monthly argument.',
      saas: 'Corporate teams here pilot internal tools that later need to serve several business units. Designing for multiple tenants at the outset is much cheaper than splitting a single-tenant tool afterwards.',
      inventory: 'Vendor and job-work units need to track material issued by the principal separately from their own stock. Getting that boundary wrong is the most common cause of a failed reconciliation.',
      logistics: 'Inbound scheduling to a campus means dock slots and gate passes. Software that ignores appointment windows just moves the queue from the phone to the gate.',
      web: 'Vendors to large corporates are checked before onboarding. A site that states certifications, capacity and existing clients plainly shortens vendor registration measurably.',
      app: 'Delivery and service staff entering a campus need documentation and gate-pass details on their phone, with proof-of-delivery captured at the dock rather than reconstructed later.',
      nextjs: 'Corporate microsites and campaign pages need to go live fast and rank on their own. Static generation with a CMS lets communications ship without an engineering release.',
      health: 'Occupational health centres serving the campus workforce run pre-employment and periodic checks in batches. Scheduling by department and employer, not by individual, is what fits the actual workflow.',
      shopify: 'Employee stores and corporate gifting programmes need catalogue access gated to verified staff, with cost-centre billing rather than card payment.',
      interior: 'Fit-out contractors working campus interiors are assessed on programme certainty. Showing phased handovers and site management alongside the finished photographs is what wins the shortlist.',
      ngo: 'The corporate foundation presence here funds long-running education and environment programmes. Multi-year grant tracking against milestones, not annual appeals, is the shape of the reporting.'
    }
  },
  {
    slug: 'ghatkopar',
    name: 'Ghatkopar',
    district: 'Mumbai Suburban',
    lat: 19.0858,
    lng: 72.9081,
    pincodes: ['400075', '400077', '400086'],
    landmarks: ['Ghatkopar East', 'R City Mall', 'Pant Nagar', 'LBS Marg'],
    profile:
      'A dense trading and professional belt. Jewellers and bullion traders, real-estate developers and brokers, a large coaching-class economy, and family-owned wholesale businesses with long books.',
    relevance: {
      crm: 'Property developers here run site visits, not web leads. Booking a visit, recording who attended, and following up against a specific unit and floor is the pipeline — a generic CRM cannot express inventory that is a flat.',
      inventory: 'Jewellers need stock by weight, purity and design, with making charges and hallmarking recorded per piece. Piece-level identity, not SKU counts, is the model that works.',
      web: 'Developer sites live or die on the project page: plans, approvals, RERA number, possession timeline and a location map. Anything vague there reads as evasive to a serious buyer.',
      app: 'Coaching institutes want attendance, test scores and fee reminders visible to parents. Small scope, high adoption — and it fails the moment it tries to become a full LMS.',
      shopify: 'Jewellery retailers moving online need weight-based pricing, making charges and a gold-rate that updates. Fixed-price templates simply do not model this correctly.',
      health: 'Multi-speciality clinics here need appointments across several doctors sharing rooms, which is a scheduling problem about resources, not just calendars.',
      saas: 'Broker networks keep rebuilding the same listing-and-commission tracker. It productises well because the commission split logic is genuinely hard and everyone gets it wrong alone.',
      fintech: 'Bullion traders and sub-brokers here settle daily against a rate that moves all day. Rate capture at the moment of the deal, and a settlement record that matches it, is the whole compliance story.',
      nextjs: 'Property searches carry a project name and a locality. A statically generated page per project, with RERA number and possession date on it, is what ranks for the searches that convert.',
      ngo: 'Ghatkopar\'s trust and community networks raise large sums during festival periods. A donation flow that holds up under a concentrated spike matters more than one tuned for steady traffic.',
      interior: 'Interior firms here work repeat layouts across the same developer\'s towers. A portfolio filtered by building and flat configuration lets a buyer see their own home already done.',
      logistics: 'Wholesale dispatch out of Ghatkopar goes on part-loads and shared transport. LR generation and a delivery confirmation the buyer can see settles most of the payment disputes before they start.'
    }
  },
  {
    slug: 'mulund',
    name: 'Mulund',
    district: 'Mumbai Suburban',
    lat: 19.1726,
    lng: 72.9425,
    pincodes: ['400080', '400081', '400082'],
    landmarks: ['Mulund West', 'LBS Marg', 'Nirmal Lifestyle', 'Johnson & Johnson junction'],
    profile:
      'Healthcare and distribution. Hospitals and diagnostic centres, a substantial pharma distribution trade, established family retail, and professional practices serving the north-east suburbs.',
    relevance: {
      health: 'Hospitals and polyclinics here need patient records that follow the patient between departments, plus report delivery that is access-controlled. The usual state is a good HIS with nothing patient-facing attached to it.',
      inventory: 'Pharma distributors run on batch, expiry and drug licence. FEFO picking so short-dated stock leaves first, and near-expiry value visible before it becomes a write-off, is the core of the system.',
      crm: 'Distributors sell to chemists on standing orders and credit. Route-wise ordering, outstanding by chemist and a collection follow-up list matter more than lead management.',
      logistics: 'Last-mile delivery to chemists runs on beats and routes. Sequencing the day\'s deliveries and capturing signed proof at the counter is where the operational time is lost.',
      web: 'Hospitals and clinics are searched by department and doctor. A page per speciality and per consultant, with real timings, ranks far better than a single services page listing everything.',
      app: 'Delivery staff on chemist beats need order lists, collection amounts and proof capture offline — the goods are moving through basements and back lanes with no reliable signal.',
      shopify: 'Retail chains here want click-and-collect against a specific branch, which is an inventory-per-location problem rather than a storefront one.',
      nextjs: 'Patients search by speciality plus locality. A statically generated page per consultant and per department, with genuine timings, outranks a single combined services page every time.',
      interior: 'Family homes in Mulund are renovated rather than fitted out new. Before-and-after documentation of lived-in flats is more persuasive here than show-flat photography.',
      ngo: 'Medical-aid trusts here fund individual treatments and must show the money reached a named case. Case-level tracking with outcomes is the reporting the donors actually ask for.',
      saas: 'Pharma distributors here have all built the same ordering and expiry tool internally. It productises across the trade, but only once drug-licence validation per buyer is handled properly.'
    }
  },
  {
    slug: 'panvel',
    name: 'Panvel',
    district: 'Raigad',
    lat: 18.9894,
    lng: 73.1175,
    pincodes: ['410206', '410210', '410221'],
    landmarks: ['JNPT corridor', 'Navi Mumbai International Airport', 'Kalamboli steel market', 'Panvel junction'],
    profile:
      'The freight and construction edge of the region. Warehousing and CFS operations feeding JNPT, the Kalamboli steel market, construction and infrastructure contractors, and a residential belt expanding on the back of the new airport.',
    relevance: {
      logistics: 'Warehouse and CFS operators here work in containers, gate timestamps, free days and detention. Billing that reflects detention and ground rent correctly is usually the single largest recoverable leak in the business.',
      inventory: 'The Kalamboli steel market trades in weight, grade and section. Stock has to be tracked by heat number and length, with cutting and wastage recorded, or margins are calculated on fiction.',
      crm: 'Infrastructure contractors bid against tenders with long cycles. Tracking the tender, the BOQ revision and the site engineer who owns it matters far more than a lead score.',
      app: 'Yard, gate and warehouse staff need scanning that works on cheap handsets in bad light with an offline queue, because coverage across these compounds is genuinely poor.',
      web: 'Warehousing and 3PL operators are shortlisted on capability. Square footage, racking type, certifications and location relative to JNPT belong on the page — that is the shortlist criteria.',
      saas: 'Freight forwarders keep building their own quote-and-track tools. Productising one means handling multiple carriers and currencies cleanly, which is where in-house builds usually stop.',
      health: 'The residential expansion around the airport is outrunning its clinics. New multi-speciality centres need appointment booking and records from day one rather than retrofitted at scale.',
      nextjs: 'Warehousing enquiries are searched by corridor and square footage. Statically generated pages per facility, with location relative to JNPT and the airport, are what match those searches.',
      shopify: 'Steel and building-material traders selling standard sections online need weight-based pricing and freight calculated by distance, which no default shipping table handles correctly.',
      interior: 'The new residential belt around the airport is fitting out thousands of near-identical flats. Publishing costed packages per configuration converts far better than bespoke consultation for this buyer.'
    }
  },
  {
    slug: 'santacruz',
    name: 'Santacruz',
    district: 'Mumbai Suburban',
    lat: 19.0810,
    lng: 72.8417,
    pincodes: ['400054', '400055', '400098'],
    landmarks: ['Kalina university campus', 'Santacruz East', 'Domestic airport', 'SV Road'],
    profile:
      'Airport-adjacent business and the Kalina academic campus. Travel and cargo agencies, media and D2C brands overlapping with Bandra, education and research around the university, and hotels serving the terminals.',
    relevance: {
      web: 'Travel and cargo agencies here are compared on trust in about ten seconds. Licence numbers, IATA affiliation and a real address do more for conversion than any amount of destination photography.',
      crm: 'Travel businesses run on itineraries and quotations, revised repeatedly. Version history against one enquiry, and the ability to reissue a quote cleanly, is the feature that actually saves the day.',
      logistics: 'Air cargo agents work in air waybills, chargeable weight and customs milestones. A road-transport CRM cannot be configured into this; the underlying documents are different.',
      app: 'Airport-area operations need staff apps that work airside, where connectivity and device policy are both restricted. Offline-first is a requirement, not a nicety.',
      saas: 'Research groups around the Kalina campus produce tools worth productising, but they need multi-institution access and data governance before anyone outside will adopt them.',
      health: 'Hotels and hospitality operators near the terminals increasingly offer on-call medical support and need booking and record-keeping that respects patient confidentiality.',
      shopify: 'D2C brands straddling Santacruz and Bandra need a store that handles drops and pre-orders without a plugin stack that breaks at every platform update.',
      nextjs: 'Travel content ranks on long-tail routes and destinations. Static generation per route, with real fare and timing data, is what makes that scale without a page-builder collapsing under it.',
      interior: 'Hospitality fit-out firms working the airport hotels are judged on turnaround while rooms stay in service. Phasing and downtime belong in the case study alongside the photographs.',
      inventory: 'Cargo agents holding shipments in bond need location, weight and customs status per consignment. Where a box physically sits, and what it is cleared for, are two different fields and both matter.',
      fintech: 'Travel businesses here collect in one currency and settle in another, often with a forex margin of their own. Getting the rate, the margin and the settlement recorded per booking is what makes the month reconcile.'
    }
  }
]

/** Areas keyed by slug, for lookups in the generator. */
export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]))

/**
 * Every (service, area) pair that has genuine copy written for it.
 * The generator builds pages from exactly this list — an area/service
 * combination with no `relevance` entry produces no page, by design.
 */
export const crossPairs = (services) =>
  areas.flatMap((area) =>
    services
      .filter((s) => s.key !== 'web') // see CROSS_EXCLUDED below
      .filter((s) => typeof area.relevance?.[s.key] === 'string' && area.relevance[s.key].length > 80)
      .map((service) => ({ area, service, body: area.relevance[service.key] }))
  )

/**
 * `web` is deliberately excluded from the cross grid. The area hub already
 * lives at /web-development-<area>-mumbai/ — those URLs are indexed — and
 * generating /web-development-company-<area>-mumbai/ alongside them would put
 * two pages of ours in front of the same query. The area hub uses
 * `relevance.web` as its own differentiating copy instead.
 */
export const CROSS_EXCLUDED = ['web']


// Programmatic SEO pages — service × city long-tail targets.
//
// Each entry below produces a standalone static HTML page at
//   dist/[slug]/index.html
// with its own title, meta description, canonical, OG, JSON-LD
// (BreadcrumbList + Service + LocalBusiness reference + FAQPage).
//
// Pages are written by hand — no AI templating — so each one targets a
// specific buyer intent with unique copy. Backlinko and SEOmatic both
// call this pattern out as the single highest-leverage on-page lever for
// local-intent ranking.
//
// Naming convention: kebab-case slug, ASCII only, ends with "-mumbai" so
// every URL signals local intent without relying on meta alone.

export const seoPages = [
  {
    slug: 'web-development-company-mumbai',
    title: 'Web Development Company in Mumbai · DuoStack',
    metaTitle:
      'Web Development Company in Mumbai · React, Next.js — DuoStack',
    metaDescription:
      'Premium web development company in Mumbai — React, Next.js and custom CMS platforms for healthcare, fintech, e-commerce and NGO teams. Senior engineers only.',
    keyword: 'web development company in Mumbai',
    h1: 'Web development company in Mumbai',
    eyebrow: 'Web platforms · Mumbai, India',
    serviceName: 'Web platforms',
    aeoAnswer:
      'A web development company in Mumbai builds production-grade websites and web applications for local and international businesses, typically using modern stacks like React, Next.js, and Node.js. DuoStack is a senior-engineer-only studio that ships custom platforms in 8–12 weeks, with full source-code transfer on day one of go-live.',
    tldr: [
      'Senior engineers only — no juniors hidden behind a brand. Two co-founders run every sprint.',
      'Stack defaults: React, Next.js, Vite, TypeScript, Tailwind, NestJS, PostgreSQL/MongoDB.',
      'Mumbai-based, NDA-first, full IP and source-code transfer on day one of go-live.',
      'Pricing scales: Starter landing pages from ₹20k, Sprint custom builds from ₹2L, full Pro platforms from ₹6.5L.'
    ],
    intro: [
      `DuoStack is a Mumbai-based web development studio that designs and ships premium web platforms for ambitious teams. We work with founders across Mumbai — from Andheri and Bandra to Lower Parel, Powai, BKC and Navi Mumbai — and ship to clients in the UAE, the EU, the UK and the US. Every line of code is written by senior engineers with five-plus years of production experience. There are no junior developers hiding behind the brand, no offshore relays, no account managers between you and the people building your product.`,
      `We focus on the work that compounds: marketing sites that convert, dashboards that load on real networks, and SaaS products that hold up when traffic spikes. Our defaults are React, Next.js, Vite and TypeScript, on top of edge platforms like Vercel and Cloudflare. We refuse work we cannot ship pixel-perfect — that has become our reputation in Mumbai's product community.`
    ],
    sections: [
      {
        h2: 'What our Mumbai clients hire us for',
        body: `Most of our Mumbai engagements fall into three buckets. The first is high-conversion marketing and product sites for D2C and B2B startups raising rounds — Lighthouse 95+ on every page, instrumented analytics from day one, deployed to Vercel with preview environments for every pull request. The second is internal admin and operations dashboards for teams running real-time business processes — KYC, lead routing, order management. The third is full SaaS products with auth, billing, role-based access, and observability, often integrated with payment rails like Razorpay, Stripe or PayTabs.`
      },
      {
        h2: 'Stack we ship every Mumbai project on',
        body: `React 18, Next.js 15, Vite 5, TypeScript, Tailwind, shadcn/ui, Framer Motion. On the server we run Node, NestJS, PostgreSQL or MongoDB, with Redis for caching and BullMQ for background work. Hosting is on Vercel, Cloudflare Workers, AWS or DigitalOcean depending on compliance. Every project ships with CI/CD, tests, error monitoring (Sentry), and analytics (Plausible or PostHog) in place from week one. We do not believe in hand-rolled stacks — opinionated, well-supported tools win.`
      },
      {
        h2: 'How an engagement starts',
        body: `Email or WhatsApp the founders. You will speak directly with one of us — Farhan or Sameer — within one business day. We sign an NDA before discovery if you ask, then run a one-week scoping sprint to define the build before any production code is written. Engagements are tiered transparently: Starter landing pages from ₹20k, Sprint custom builds from ₹2L, full Pro platforms from ₹6.5L, and Enterprise embedded engagements quoted quarterly. No hourly billing. Source code, designs and infrastructure are 100% transferred to your team on day one of go-live.`
      }
    ],
    faqs: [
      {
        q: 'Do you only work with Mumbai-based founders?',
        a: 'No. About half our revenue is from outside India. We are based in Mumbai, but we ship to teams across the UAE, the EU, the UK and the US. Time zones are not a blocker.'
      },
      {
        q: 'What does a typical web development project cost in Mumbai?',
        a: 'Pricing scales with scope. A Starter landing page or simple brand site starts at ₹20k. A Sprint custom build (single product or feature) starts at ₹2L. A full Pro web platform with backend, payments and integrations starts at ₹6.5L. Enterprise engagements with embedded teams are quoted quarterly from ₹25L. Every engagement is fixed-scope with the price agreed upfront — we do not run hourly billing.'
      },
      {
        q: 'Can you work alongside our existing engineering team?',
        a: 'Yes. About a third of our work is embedded — we sit inside an existing engineering team as senior contributors, code-reviewing, mentoring and shipping production features.'
      },
      {
        q: 'Will you sign an NDA before sharing details?',
        a: 'Yes. We are NDA-first. We sign before any discovery conversation. Source code, IP, designs and infrastructure are transferred to you on day one of go-live.'
      }
    ],
    related: ['custom-crm-development-mumbai', 'react-native-app-development-mumbai']
  },

  {
    slug: 'custom-crm-development-mumbai',
    title: 'Custom CRM Development in Mumbai · DuoStack',
    metaTitle:
      'Custom CRM Development in Mumbai · Lead Routing — DuoStack',
    metaDescription:
      'Custom CRM development in Mumbai — lead capture from Meta and websites, role-based routing, Twilio voice and WhatsApp, real-time reporting. Senior engineers.',
    keyword: 'custom CRM development in Mumbai',
    h1: 'Custom CRM development in Mumbai',
    eyebrow: 'Custom CRM · Mumbai, India',
    serviceName: 'Custom CRM development',
    aeoAnswer:
      'Custom CRM development is the practice of building a sales and operations system tuned to a single business — lead sources, routing rules, channels, compliance — instead of forcing the team into a generic tool. DuoStack ships custom CRMs for Mumbai sales floors, fintech brokers, and visa consultancies in 6–16 weeks with full source-code ownership.',
    tldr: [
      'Lead capture from Meta Business API, websites, WhatsApp inbound, manual intake, all in one inbox.',
      'Role-based routing for telecaller, advisor, processing and admin teams; full audit trail per lead.',
      'Mumbai-region data residency on AWS / DigitalOcean for clients with onshore compliance.',
      'A working v1 ships in 6–8 weeks; full multi-team rollouts in 12–16 weeks.'
    ],
    intro: [
      `If your sales floor in Andheri, BKC or Lower Parel runs on shared spreadsheets, missed leads and WhatsApp groups, you are leaving real revenue on the table. We build production-grade custom CRMs that capture every lead from Meta, websites and manual intake, route it instantly to the right human, and report on what actually closed. Our visa-CRM client at Baker & Co alone routes thousands of leads a month across telecallers, advisors, processing and admin — every conversation captured, every handover audited.`,
      `A custom CRM in 2026 is not Salesforce or Zoho with another skin. It is a system tuned to the specific way your Mumbai operations actually work — your lead sources, your handover rules, your compliance, your reporting. We have shipped these for visa consultancies, fintech brokers, healthcare clinics and forex platforms. Each one is its own product, with its own UX.`
    ],
    sections: [
      {
        h2: 'What goes into our Mumbai CRM builds',
        body: `Lead capture from the Meta Business API (Instagram and Facebook lead ads), website forms, WhatsApp inbound, email parsing and manual entry. A single inbox per role — telecaller, advisor, processing, admin — with strict access boundaries. Twilio Voice and WhatsApp integration so every call and message is logged against the lead. Audit trails on every status change. Real-time dashboards and exports for management. KYC document upload and review where the regulator demands it. Webhooks into your existing tools so the CRM does not become an island.`
      },
      {
        h2: 'Stack and integrations',
        body: `React on the front, Node and NestJS on the API, PostgreSQL or MongoDB on the data layer, Redis and BullMQ for queues, Twilio for voice and WhatsApp, Meta Business APIs for ad-lead ingestion, Razorpay or Stripe for payments. Every action is event-sourced into a full audit log. Hosting on AWS, Vercel or DigitalOcean depending on data-residency needs. Mumbai-region deployments available for clients with local compliance requirements.`
      },
      {
        h2: 'Engagement and timeline',
        body: `A working CRM with auth, lead capture, routing and one channel integration ships in six to eight weeks. Full multi-team rollouts with role-based access, integrations and management reporting typically run twelve to sixteen weeks. We work from your office for one or two onsite days per fortnight if you are based in Mumbai, otherwise everything runs async with a weekly Friday demo.`
      }
    ],
    faqs: [
      {
        q: 'How is this different from Zoho or Salesforce?',
        a: 'Off-the-shelf CRMs cover 70% of what you need and force you to bend your operations around the remaining 30%. A custom CRM is the inverse: built around how your Mumbai team actually works, with no licence-per-user cost and full ownership of the data and code.'
      },
      {
        q: 'Can you migrate our existing leads and contacts?',
        a: 'Yes. We have migrated from Excel, Google Sheets, Zoho, HubSpot, Salesforce, Lead Squared and bespoke MySQL apps. Migration is a defined sprint at the start of the engagement.'
      },
      {
        q: 'Do you handle integration with Meta lead ads?',
        a: 'Yes. We are an active Meta Business API integrator. Leads from Instagram and Facebook ad campaigns flow into the CRM in under three seconds with no manual export step.'
      },
      {
        q: 'Will my data stay in India?',
        a: 'If your compliance requires it, yes. We deploy on Mumbai-region AWS, Mumbai-region DigitalOcean droplets, or self-hosted infrastructure of your choice. Data residency is part of every kickoff conversation.'
      }
    ],
    related: ['fintech-platform-development-mumbai', 'web-development-company-mumbai']
  },

  {
    slug: 'react-native-app-development-mumbai',
    title: 'React Native App Development in Mumbai · DuoStack',
    metaTitle:
      'React Native App Development in Mumbai — DuoStack',
    metaDescription:
      'React Native app development in Mumbai — cross-platform iOS and Android apps with native performance, App Store and Play Store launches, push and analytics.',
    keyword: 'React Native app development in Mumbai',
    h1: 'React Native app development in Mumbai',
    eyebrow: 'Mobile apps · Mumbai, India',
    serviceName: 'Mobile app development',
    aeoAnswer:
      'React Native app development is a cross-platform mobile build approach that ships one codebase to both iOS and Android with near-native performance. DuoStack builds production React Native apps for Mumbai founders, including App Store and Play Store submission, in 7–12 weeks per launch.',
    tldr: [
      'One codebase, two stores. Ships in 7–12 weeks including App Store + Play Store review.',
      'Stack: React Native 0.76+, TypeScript, Reanimated 3, Expo where appropriate.',
      'Native modules in Swift / Kotlin where the JS bridge would underperform.',
      'You own the developer accounts and the source code — no lock-in.'
    ],
    intro: [
      `Cross-platform mobile development has matured. In 2026, a well-built React Native app is indistinguishable from native iOS or Android in the user's hand — but ships in half the time, with one team. We build React Native apps for Mumbai founders who need both stores live without a sixteen-week timeline.`,
      `Our typical mobile engagement covers product, design, build, store submission and the first six weeks of post-launch iteration. We have shipped consumer-facing apps across healthcare, fintech, automotive and on-demand services, on both iOS App Store and Google Play, in seven to twelve weeks per launch.`
    ],
    sections: [
      {
        h2: 'What we ship in a React Native engagement',
        body: `A production iOS and Android app with auth, push notifications, analytics, error monitoring, deep links, offline-first data sync, in-app updates, and either Razorpay or Stripe payments. Native modules are written in Swift or Kotlin where the JS bridge would not perform — typical examples are background sync, biometric auth, or hardware integrations like Bluetooth and BLE for healthcare.`
      },
      {
        h2: 'Stack and tooling',
        body: `React Native 0.76+, TypeScript, Expo where it makes sense, Reanimated 3 for animations, React Navigation, Zustand or Redux Toolkit for state. Backend on Node, NestJS or Supabase. CI on GitHub Actions or EAS Build, with TestFlight and Play Internal Testing as part of the pipeline from week one. Sentry for crashes, PostHog or Mixpanel for product analytics.`
      },
      {
        h2: 'Submitting to the App Store and Play Store from Mumbai',
        body: `App Store and Google Play submission has its own choreography. We have shipped to both stores enough times that we own the entire process: developer account setup, store listings, screenshots, privacy declarations, India-specific compliance (RBI rules for fintech, CDSCO for medical), and review-cycle communication. Most of our Mumbai apps clear review on the first or second submission.`
      }
    ],
    faqs: [
      {
        q: 'React Native or native — what should we choose?',
        a: 'For 90% of consumer apps, React Native in 2026 is the right call. The exceptions are: graphics-heavy games, apps that need Apple Watch or watchOS, and apps with deep native SDK requirements that have no React Native binding. We will tell you straight if your project is one of those.'
      },
      {
        q: 'How long until we are on the App Store?',
        a: 'Seven to twelve weeks for most consumer apps. We can accelerate with weekly TestFlight builds during the build phase so your team has a working version within ten days of kickoff.'
      },
      {
        q: 'Can you maintain our app after launch?',
        a: 'Yes. We retain about 70% of mobile clients on a monthly retainer for the first six months post-launch. After that, most teams have an in-house team and we move to an advisory role or step out entirely.'
      },
      {
        q: 'Do you handle App Store and Play Store accounts?',
        a: 'You own the developer accounts — your IP, your store presence. We handle everything inside them: listings, builds, submissions, review responses.'
      }
    ],
    related: ['web-development-company-mumbai', 'fintech-platform-development-mumbai']
  },

  {
    slug: 'shopify-development-company-mumbai',
    title: 'Shopify Development Company in Mumbai · DuoStack',
    metaTitle:
      'Shopify Development Company in Mumbai · Headless — DuoStack',
    metaDescription:
      'Shopify development company in Mumbai for D2C brands — headless Hydrogen, custom themes, conversion-tuned checkout, Razorpay and Stripe. Senior engineers.',
    keyword: 'Shopify development company in Mumbai',
    h1: 'Shopify development company in Mumbai',
    eyebrow: 'E-commerce · Mumbai, India',
    serviceName: 'E-commerce development',
    aeoAnswer:
      'A Shopify development company in Mumbai builds and tunes e-commerce stores on Shopify or headless Hydrogen for D2C brands. DuoStack ships brand-led storefronts with conversion-optimised checkout, Razorpay + Stripe, GST-compliant invoicing, and Lighthouse 90+ mobile scores.',
    tldr: [
      'Headless Hydrogen and custom Liquid themes for Shopify and Shopify Plus merchants.',
      'Indian payments via Razorpay; international via Stripe; GST-compliant invoicing built in.',
      'Lighthouse 90+ mobile, Plausible/PostHog instrumented from week one.',
      'Migration from WooCommerce or Magento as a defined sprint at engagement start.'
    ],
    intro: [
      `Mumbai's D2C scene has matured. Brands that two years ago were happy with a stock Shopify theme now want headless performance, custom checkout, native ERP integration and brand-led storytelling that a templated theme cannot deliver. That is where we come in.`,
      `We have shipped headless Shopify storefronts running Hydrogen and Remix, custom Liquid themes with bespoke product configurators, and end-to-end commerce experiences for brands like Benzer World. Every project is conversion-instrumented from day one — page-level analytics, funnel tracking, A/B test infrastructure, and Lighthouse scores above 90 on real mobile devices.`
    ],
    sections: [
      {
        h2: 'What our Mumbai D2C clients ship with us',
        body: `Headless Shopify on Hydrogen or Next.js Commerce, with the storefront on Vercel and Shopify Plus on the back. Bespoke product configurators for jewellery, apparel and customised goods. Multi-currency and multi-region rollouts with Razorpay for India and Stripe for the rest of the world. Subscription and rental flows built on Shopify Subscriptions or ReCharge. Custom checkout extensions for Plus merchants. Loyalty, reviews, and AI search via best-in-class apps stitched in cleanly.`
      },
      {
        h2: 'Stack and architecture',
        body: `Shopify Plus or Shopify, Hydrogen 2 or custom Next.js storefront, Tailwind, shadcn/ui, Sanity for editorial content, Algolia or Meilisearch for search, Klaviyo for email, Razorpay and Stripe on payments. Hosting on Vercel and Cloudflare. Every storefront ships with edge image optimisation, ISR for product pages and a brand-tuned animation system.`
      },
      {
        h2: 'Performance and conversion',
        body: `Every Shopify build is judged on two metrics: Lighthouse mobile score and add-to-cart rate. Our Mumbai D2C builds typically improve add-to-cart rate by 15–35% versus a stock theme baseline within the first thirty days post-launch. We track this in production with Plausible and PostHog, not just in our own dashboards.`
      }
    ],
    faqs: [
      {
        q: 'Headless or stock theme — which do we need?',
        a: 'If you do less than ₹10 lakh GMV per month, a well-built custom Liquid theme is the right call. If you do more, headless lets you keep brand-led performance as you scale and is worth the additional complexity.'
      },
      {
        q: 'Can you migrate us from WooCommerce or Magento?',
        a: 'Yes. Most of our Mumbai migrations come from WooCommerce or Magento. Product, customer, order and SEO migrations are a defined sprint at the start of the engagement.'
      },
      {
        q: 'Do you handle Shopify Plus checkout extensions?',
        a: 'Yes. We are comfortable building checkout extensions, Shopify Functions and custom apps for Plus merchants. Brand-led checkout is one of our specialties.'
      },
      {
        q: 'How do you handle Indian payments and GST?',
        a: 'Razorpay for India, Stripe for international. GST is configured per Shopify standard. We have shipped GST-compliant invoicing and B2B GSTIN flows for Mumbai brands selling B2B.'
      }
    ],
    related: ['web-development-company-mumbai', 'custom-crm-development-mumbai']
  },

  {
    slug: 'fintech-platform-development-mumbai',
    title: 'Fintech and Forex Platform Development in Mumbai · DuoStack',
    metaTitle:
      'Fintech & Forex Platform Development in Mumbai — DuoStack',
    metaDescription:
      'Fintech and forex platform development in Mumbai — trader-grade dashboards, KYC/AML flows, payment integrations and MT5/broker platform integration.',
    keyword: 'fintech platform development in Mumbai',
    h1: 'Fintech and forex platform development in Mumbai',
    eyebrow: 'Fintech · Mumbai, India',
    serviceName: 'Fintech and Forex platforms',
    aeoAnswer:
      'Fintech platform development in Mumbai means building trader-grade dashboards, KYC/AML pipelines, payment rails, and broker-platform integrations. DuoStack has shipped MT5 manager-API integrations in three weeks where typical timelines run six months, with zero security incidents across four years of fintech work.',
    tldr: [
      'MT5 manager-API integration: realtime trade ingestion, balance updates, CRM-side trade tagging.',
      'KYC defaults: Hyperverge / HyperKYC for India, Sumsub / Onfido for international.',
      'Security-first by default: TLS, JWT/OAuth, MFA, audit logs, SAST/SCA via Snyk or GitHub Advanced Security.',
      'India-onshore (RBI rules, data localisation, Razorpay/PayU) and offshore (Stripe, PayPal, crypto on-ramps).'
    ],
    intro: [
      `Mumbai is India's financial capital. The teams we work with run the gamut — broker startups in BKC, neo-banking founders in Lower Parel, forex platforms in Andheri, and India-out international forex desks routing through Dubai. Every one of them has the same problem: production-grade trading and fintech software is rare, expensive, and hard to ship without security and compliance issues that grow as you scale.`,
      `A recent fintech engagement was a full forex platform for a broker — public site plus client and admin CRMs, with native MT5 broker-platform integration. We shipped it in twelve weeks. The MT5 integration alone, which most agencies quote at six months, was eighteen working days.`
    ],
    sections: [
      {
        h2: 'What our Mumbai fintech clients ship with us',
        body: `Trader-grade dashboards with realtime price feeds via WebSocket, KYC and AML flows with document verification, deposit and withdrawal pipelines, hot and cold wallet ops where relevant, MT4 and MT5 platform integration with manager API, broker dashboards with role-based access, IB and partner program flows, and admin tools for ops and compliance teams. Every screen is sub-100ms render to first paint on mid-range devices, because traders notice.`
      },
      {
        h2: 'Compliance and security defaults',
        body: `Every fintech project ships with end-to-end TLS, JWT or OAuth-based auth with short-lived tokens, MFA, encrypted-at-rest sensitive data, audit logs on every privileged action, IP and device fingerprinting on auth events, rate limiting on all sensitive endpoints, and continuous SAST and SCA via GitHub Advanced Security or Snyk. We have not had a security incident on any fintech project we have shipped in four years.`
      },
      {
        h2: 'India and offshore',
        body: `For India-onshore fintech (RBI-regulated), we work within RBI rules on data localisation, payment aggregator integration via Razorpay or PayU, and Aadhaar-based eKYC where the use case fits. For offshore (Mauritius, BVI, Saint Vincent), we handle the international stack — Stripe, PayPal, crypto on-ramps via providers like Mercuryo or Banxa.`
      }
    ],
    faqs: [
      {
        q: 'Can you integrate with MT5 manager API?',
        a: 'Yes. We have shipped multiple MT5 manager-API integrations including realtime trade ingestion, balance updates, and CRM-side trade tagging. Manager-API is a known surface for us.'
      },
      {
        q: 'Do you handle KYC integration?',
        a: 'Yes. Our defaults are Hyperverge and HyperKYC for India, Sumsub and Onfido for international. We integrate the full document-capture, OCR, face-match and liveness flow.'
      },
      {
        q: 'Will you sign an NDA before discovery?',
        a: 'Yes — and for fintech projects this is non-negotiable from our side as well. We have a fintech-specific NDA template ready to sign.'
      },
      {
        q: 'Can you support after launch?',
        a: 'Yes. Most fintech clients keep us on a monthly retainer for the first twelve months post-launch — the regulatory and platform surface changes too quickly to leave the codebase static.'
      }
    ],
    related: ['custom-crm-development-mumbai', 'web-development-company-mumbai']
  },

  {
    slug: 'healthcare-software-development-mumbai',
    title: 'Healthcare Software Development in Mumbai · DuoStack',
    metaTitle:
      'Healthcare Software Development in Mumbai — DuoStack',
    metaDescription:
      'Healthcare software development in Mumbai — telehealth, patient onboarding, clinician dashboards and EMR integration. Senior engineers, NDA-first.',
    keyword: 'healthcare software development in Mumbai',
    h1: 'Healthcare software development in Mumbai',
    eyebrow: 'Healthcare · Mumbai, India',
    serviceName: 'Healthcare software development',
    aeoAnswer:
      'Healthcare software development in Mumbai covers patient apps, clinician dashboards, telehealth, and EMR integration. DuoStack builds DPDP Act-aligned and HIPAA-grade healthcare software for Indian hospital chains and international digital-health startups, with field-level encryption and signed audit trails on every privileged action.',
    tldr: [
      'Patient onboarding, clinician dashboards, telehealth (Daily / LiveKit / Agora / Twilio Video).',
      'EMR integration via FHIR or HL7 where the EMR supports it; SQL views or APIs where it does not.',
      'India: DPDP Act 2023 compliance with consent capture, audit logs, data export and deletion.',
      'International: HIPAA-grade controls — BAAs, end-to-end encryption, role-based access, signed audit trails.'
    ],
    intro: [
      `Healthcare software lives or dies on three things: data integrity, clinician workflow, and patient trust. We build for all three. Our most public healthcare project is Remesleep — a sleep and recovery platform with patient onboarding, clinician dashboards and telehealth flows shipped to international clients.`,
      `In Mumbai, we work with both private hospital chains running internal admin and patient-facing tooling, and with digital-health startups building consumer apps. Every project is NDA-first and built around clinician workflow rather than around what is easy to code.`
    ],
    sections: [
      {
        h2: 'What our Mumbai healthcare clients ship with us',
        body: `Patient onboarding flows with consent management, clinician dashboards for case review and treatment plans, telehealth video and chat (Daily, LiveKit or Twilio Video), EMR integration via FHIR or HL7, prescription capture, lab results ingestion, billing flows that respect Indian GST and payment rules, and patient mobile apps on iOS and Android. Every privileged action is audit-logged. Every patient record is encrypted at rest with field-level access control.`
      },
      {
        h2: 'Compliance and data privacy',
        body: `For India, our defaults are DPDP Act compliance with explicit consent capture, audit logs, data export and deletion rights. For international markets, HIPAA-grade controls — BAAs with hosting providers, end-to-end encryption, role-based access, signed audit trails. ISO 27001 alignment available where the client needs it.`
      },
      {
        h2: 'Hospitals vs digital-health startups',
        body: `Hospital projects in Mumbai tend to be longer cycles — six to twelve months — with deep EMR and PACS integration. Digital-health startup projects ship faster — twelve to twenty weeks for a v1 patient app and clinician dashboard with telehealth — and iterate after launch. We work in both modes, with different team compositions and SLAs for each.`
      }
    ],
    faqs: [
      {
        q: 'Are you HIPAA-experienced?',
        a: 'Yes for international healthcare projects. For Indian projects, our defaults align with DPDP Act 2023 and ISO 27001. We can deliver HIPAA-grade controls where the project ships to US clients.'
      },
      {
        q: 'Can you integrate with our existing EMR?',
        a: 'Yes. We have integrated with Practo, Lybrate, Insta HMS, eHospital, and several proprietary hospital EMRs via SQL views, APIs or HL7 feeds. FHIR is our preferred surface where the EMR supports it.'
      },
      {
        q: 'Do you handle telehealth video?',
        a: 'Yes. Our defaults are Daily, LiveKit, Agora or Twilio Video depending on price, geography and feature need. We have shipped telehealth across all four.'
      },
      {
        q: 'Will source code be transferred to us?',
        a: 'Always. Source code, designs, infrastructure-as-code, and deployment access are 100% transferred to your team on day one of go-live. Healthcare clients especially value this.'
      }
    ],
    related: ['custom-crm-development-mumbai', 'react-native-app-development-mumbai']
  }
]

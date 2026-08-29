/**
 * The AI look. Written with the awareness that this site is not innocent —
 * Inter, a gradient and a four-card grid are all present here. Posts that
 * criticise a pattern we ourselves use should say so.
 */

export const aiLook = [
  {
    slug: 'why-every-ai-website-looks-the-same',
    title: 'Why every AI-generated website looks the same',
    category: 'ai-look',
    date: '2026-08-20',
    excerpt:
      'Purple gradient, Inter, three feature cards, testimonials, pricing, CTA. The convergence has a mechanical explanation and it is not mysterious.',
    body: [
      'There is a house style to the 2026 web and most people can now recognise it instantly. A gradient in the violet-to-indigo range. Inter, or something close enough. A hero with a short bold claim. Three or four feature cards in a row. Logos. Testimonials. A pricing table with the middle option highlighted.',
      'It is not a conspiracy and it is not laziness exactly. It is arithmetic.',
      '## The mechanism',
      'A generative model asked for "a modern SaaS website" returns the most statistically common resolution of that phrase across everything it has seen. That is the definition of what these systems do. The average of a large sample of good-enough design is a specific, identifiable thing — and it is the same average for you as for your competitor, because you are sampling the same distribution.',
      'Vague prompts make this worse. A request with no layout structure, no design constraint and no stated intent leaves the model nothing to work with except the default, and the default is the mode of the training data.',
      '## The feedback loop is the real problem',
      'The part that makes this self-sustaining: people look at generated output, absorb it as "what good looks like now", and then prompt for more of it. Design fixation used to happen over years through magazines and award sites. It now happens in an afternoon.',
      'So the distribution narrows. Each generation of output becomes training data or reference material for the next, and the average converges on itself.',
      '## The commercial consequence',
      'The sharpest framing we have read: AI made generic design free, so generic design is now worth roughly nothing. That is the actual problem for a business. If your site looks like the default, it communicates that you are the default.',
      '## Being honest about this site',
      'This one uses Inter. It has a gradient. The pricing section is a four-card grid with the middle option badged. By the criteria above, several of our own choices are squarely inside the pattern.',
      'The defence — such as it is — is that those are conventions doing a job, and the parts that carry meaning are specific: real screenshots of real client work rather than stock mockups, actual prices rather than "contact us", and copy that names things we have shipped. A convention used deliberately is different from a default accepted silently. But we would be lying if we said we were outside the aesthetic.'
    ]
  },
  {
    slug: 'how-to-tell-a-site-was-generated',
    title: 'How to tell a site was generated, in about four seconds',
    category: 'ai-look',
    date: '2026-08-08',
    excerpt:
      'The tells are rarely visual. They are in the specificity of the content, and once you see them you cannot unsee them.',
    body: [
      'Most guides to spotting AI-built sites talk about gradients and fonts. Those are weak signals — plenty of considered design uses both. The reliable tells are in what the words actually commit to.',
      '## No proper nouns',
      'Generic sites describe categories, never instances. "We work with businesses across industries" rather than "we built the CRM that Saad Cargo dispatches on". "Cutting-edge technology" rather than "React, Node and a MongoDB replica set in the Mumbai region".',
      'Proper nouns are expensive to fake because they are checkable. A site that names clients, tools, versions and numbers is making claims someone could verify, which is why generated copy avoids them.',
      '## Numbers that are all round',
      '"Over 100 happy clients." "50% faster." "24/7 support." Real numbers are ugly — 4.9 from 190 reviews, eighteen working days, ₹9,522.51 raised of ₹25,000. Roundness is a sign that the number was chosen for how it reads rather than measured.',
      '## Three of everything',
      'Three benefits, three steps, three testimonials, three pricing tiers. Real businesses have awkward counts. They have seven services, two of which overlap, and one that exists because a client asked for it in 2023.',
      '## Copy that could belong to a competitor',
      'The strongest test: take the company name out and see whether the sentence still identifies anyone. "We combine technical expertise with creative thinking to deliver solutions that drive results" describes every agency that has ever existed. If the copy survives the substitution, it was not about the company.',
      '## Stock imagery of impossible teams',
      'Six people of maximum demographic variety laughing at a laptop in a room with exposed brick. Nobody works there. This has been a tell since long before generative tools, but the volume has gone up.',
      '## Why it matters commercially',
      'A visitor may not consciously run this checklist, but they form a judgement in seconds and it is usually correct. The site that names things reads as a business with a history. The site that describes categories reads as a business that might not exist next year.'
    ]
  },
  {
    slug: 'ai-slop-is-a-content-problem-not-a-design-problem',
    title: 'AI slop is a content problem wearing a design problem\'s clothes',
    category: 'ai-look',
    date: '2026-07-27',
    excerpt:
      'You can hire a great designer and still ship something indistinguishable from generated output, because the emptiness is in what you are saying.',
    body: [
      'The usual prescription for a generic-looking site is a design intervention — custom illustration, an unusual grid, a distinctive typeface. Those help. They do not fix the underlying issue, which is that the site is not saying anything.',
      'We have seen beautifully art-directed sites that still read as slop, because every sentence was a category rather than a claim. And we have seen plain, almost unstyled sites that read as unmistakably real, because they were full of specifics.',
      '## Where the substance actually comes from',
      'Names. Numbers. Constraints. Trade-offs. Things that went wrong. The price. Who it is not for.',
      'That last one is diagnostic. Generated marketing copy never excludes anybody, because excluding is a decision and the average of all marketing copy does not exclude. A real business knows who it is a bad fit for and saying so is one of the strongest credibility signals available.',
      '## The test we use on our own copy',
      'For any sentence on a page, ask: could a competitor put their logo on this and have it be equally true? If yes, it is filler occupying space where a claim should be.',
      'By that test, most agency websites are about 80% filler, including versions of ours from a couple of years ago. Cutting it is uncomfortable because the page gets shorter and the shortness feels like a lack. It is not — it is the removal of things that were never doing work.',
      '## Why this is good news',
      'Substance is the one thing generation cannot supply. A model can produce a layout, a palette, a typeface pairing and a competent paragraph. It cannot produce the fact that your panel bonding repair takes one to three days, or that the MT5 integration took eighteen working days when the quotes said six months.',
      'That information exists in exactly one place: the business. Which means the defensible move against homogenised design is not a more unusual grid. It is writing down what you actually know.'
    ]
  },
  {
    slug: 'the-intentional-imperfection-backlash',
    title: 'The intentional-imperfection backlash, and where it goes wrong',
    category: 'ai-look',
    date: '2026-07-15',
    excerpt:
      'Hand-drawn arrows, paper textures, rough brush strokes. A real response to homogenisation that is already becoming its own template.',
    body: [
      'The visible reaction to the AI aesthetic has been a turn toward deliberate roughness — marker highlights, scanned sketches, uneven type, hand-drawn arrows pointing at things, photography that looks like somebody took it rather than licensed it.',
      'The instinct is right. Those things are hard to generate convincingly and they signal a human made a choice. But the execution frequently misses why it works.',
      '## Imperfection as decoration versus imperfection as evidence',
      'A hand-drawn arrow added because hand-drawn arrows are current is decoration. It is a texture applied to the same underlying template, and it will date exactly as fast as the gradient did — faster, probably, because it is more conspicuous.',
      'A photograph of the actual workshop, badly lit, with the actual bench in it, is evidence. It is worse as an image and better as a signal, because it could only have come from this business.',
      '## The distinction that matters',
      'Ask whether the imperfect element carries information. A scan of a real sketch from the project tells you something about how the work happened. A generic paper texture behind a section header tells you the designer had a mood board.',
      'The first is unfakeable. The second is a Figma plugin, and within a year it will be a preset in the same generators that produced the aesthetic it was reacting against.',
      '## What we do instead',
      'We use real screenshots of the actual products, including the ones with dense tables and unglamorous forms. A logistics CRM full of consignment rows is not a beautiful image. It is a completely convincing one, because nobody generates that.',
      'Where we have a number, we use the real number even when it is awkward. Where a client\'s site is a legacy WordPress build rather than something we would show off, we say so rather than reframing it.',
      '## The uncomfortable prediction',
      'Every visual response to homogenisation gets absorbed. The texture trend will be trained on and reproduced, and in two years "authentic-looking rough" will be another default. The only durable differentiator is the part that is about the business rather than the surface — which is, inconveniently, the part that takes work.'
    ]
  },
  {
    slug: 'stop-using-stock-screenshots',
    title: 'Stop using mockups. Show the actual screen.',
    category: 'ai-look',
    date: '2026-07-03',
    excerpt:
      'The floating-device mockup with a made-up dashboard inside it is the single most common tell that a portfolio is padded.',
    body: [
      'Open a portfolio and count how many project images are a real screenshot versus an idealised mockup — a laptop at an angle containing a dashboard with invented data and suspiciously round numbers.',
      'The mockup is easier. It hides the parts of a real product that are not photogenic: the dense table, the form with fourteen fields, the empty state. It is also the reason nobody believes portfolios.',
      '## What a real screenshot proves',
      'That the thing exists. That is the entire job and it is not a small one. A screenshot of an actual CRM, with actual column headers that use the client\'s vocabulary, cannot be produced without having built it.',
      'It also shows judgement. Anybody can arrange a hero section. Deciding what belongs in a dense operational screen — which four numbers go at the top, what the empty state says, where the primary action sits when there are eleven possible actions — is where design competence actually shows, and it is invisible in a mockup.',
      '## The practical objection, answered',
      'The usual reason for mockups is that real screens contain client data. That is a genuine constraint and it has a genuine solution: run the product locally against seeded demo data and screenshot that.',
      'We do exactly this for the internal tools we cannot link to publicly. Local database, synthetic records, real interface. What you see is the actual software with invented content — which is honest, and looks nothing like a mockup because the layout is the real layout, awkward table widths and all.',
      '## What to check before publishing one',
      'Read every visible string. Customer names, phone numbers, revenue figures and email addresses have a way of surviving into a screenshot that was meant to be anonymous. We have caught real lead names in a dashboard capture that was about to go on a public site — the fix is to look at every pixel of text before it ships, every time.',
      '## The wider point',
      'Mockups optimise for how the image looks. Screenshots optimise for whether the reader believes you. In a market where anybody can generate a beautiful image of a product that does not exist, the second is worth considerably more.'
    ]
  },
  {
    slug: 'the-purple-gradient-is-not-the-problem',
    title: 'The purple gradient is not the problem',
    category: 'ai-look',
    date: '2026-06-21',
    excerpt:
      'Blaming specific visual choices misdiagnoses the illness. Plenty of excellent sites use every element of the house style.',
    body: [
      'It has become easy to sneer at particular ingredients — the violet gradient, Inter, the bento grid, the glassmorphic card. But those are just current conventions, and conventions are mostly fine. Nobody complains that most books have the page number at the bottom.',
      'A convention is a solved problem you do not have to re-solve. Using Inter is not a failure of imagination; it is a legible typeface that renders well at small sizes on Indian Android devices, which is a real reason.',
      '## What actually distinguishes convention from default',
      'Whether a decision was made. Using a gradient because it gives the hero depth and separates it from the content below is a choice. Having a gradient because the generator produced one is not.',
      'The observable difference is consistency of intent. On a considered site, the visual decisions point in the same direction and reinforce what the business is claiming. On a defaulted site, each element is individually reasonable and collectively says nothing, because nothing was chosen.',
      '## A more useful critique',
      'Rather than asking "is this element overused", ask "what would be lost if this element were removed". If the answer is nothing, it was decoration. If the answer is that the page becomes harder to scan or the hierarchy collapses, it was doing work.',
      'Applied honestly, this removes a lot from most pages, including ours. It also stops the pointless cycle of abandoning perfectly good patterns because they became popular.',
      '## The thing worth actually avoiding',
      'Not any specific visual. It is the whole-page shape: the sequence hero, three cards, logos, testimonials, pricing, CTA, applied regardless of what the business does. That structure encodes a set of assumptions about the sales process that are true for a self-serve SaaS product and false for most other businesses.',
      'A repair workshop does not need a feature grid. It needs a price, a phone number and proof the work is good. When a site inherits SaaS page architecture for a business that is nothing like SaaS, that is the real damage — and it is structural, not cosmetic.'
    ]
  },
  {
    slug: 'design-systems-versus-taste',
    title: 'A design system will not give you taste',
    category: 'ai-look',
    date: '2026-06-09',
    excerpt:
      'Systems make consistency cheap. They do not make the underlying decisions, and it is the decisions that people notice.',
    body: [
      'Design systems are genuinely valuable. Tokens, spacing scales, a component library — these remove a whole class of inconsistency and let a small team ship a coherent product quickly.',
      'They also make it very easy to produce something that is impeccably consistent and completely characterless, because a system encodes how to be consistent, not what to say.',
      '## Where the system stops helping',
      'The system tells you the spacing scale. It does not tell you that this page should have one thing on it rather than six. It gives you a card component; it does not tell you that a card is the wrong container for this content and a table would be better.',
      'Those are editorial decisions, and they are where a page becomes specific to a business. A system used without them produces the same page as everyone else using a similar system — which, in 2026, is nearly everyone.',
      '## The pattern we watch for',
      'When every section on a page is the same component with different content, the design has stopped making decisions. Six card grids stacked vertically is a symptom of reaching for the available component rather than asking what each section needs.',
      'The fix is usually removal rather than addition. One section rendered as prose because it is an argument, one as a table because it is a comparison, one as a single large image because it is evidence — the variety comes from the content having different shapes, not from decoration.',
      '## Where we land',
      'We use a system on every project and we would not work without one. But we treat it as a floor rather than a specification: it guarantees nothing is misaligned, and it is silent on whether the page is worth reading.',
      'The uncomfortable version: consistency is now free, so it no longer signals competence. Everything looks assembled well. What distinguishes work is the judgement about what to assemble, and no system supplies that.'
    ]
  },
  {
    slug: 'what-a-local-business-website-actually-needs',
    title: 'What a local business site actually needs',
    category: 'ai-look',
    date: '2026-05-28',
    excerpt:
      'Most small business sites are built on SaaS page architecture, for a customer who wants a price and a phone number.',
    body: [
      'Somebody searching for TV repair, a furnishing showroom or a loan advisor is not on a discovery journey. They have a problem, they are on a phone, and they are deciding in a few seconds whether to call you or the next result.',
      'What they get instead, usually, is a hero with an aspirational headline, a scroll of feature cards, a testimonial carousel and a contact form at the bottom.',
      '## What actually converts',
      'A price or a range, visible without scrolling. "From ₹500" beats "competitive pricing" by an enormous margin, and the businesses that refuse to publish a number lose to the ones that do.',
      'A phone number that is a tap target, not an image. A WhatsApp link with the enquiry pre-filled, because in India that is the channel people prefer and the pre-fill removes the awkwardness of composing a first message.',
      'Proof that is checkable: a rating with a real count, photographs of the actual premises, the years in business. Not a five-star carousel with first names.',
      'Directions that open in Maps in one tap.',
      '## What can go',
      'The feature grid. The mission statement. The testimonial slider. The team page for a two-person shop. The blog nobody updates. Each of those exists because it is in the template, not because a customer wanted it.',
      '## Why the SaaS shape got everywhere',
      'Because it is the most common pattern in the training data and the most common pattern in the theme marketplaces, and because it is what everyone else has. It works for a product with a free trial and a self-serve funnel. It is close to useless for a business whose conversion event is a phone call.',
      '## The version we build',
      'For local service clients we lead with the thing being sold, the price band, and the two contact routes. Then the proof. Then, only if it earns the space, the detail. Pages that read as slightly too plain to the business owner and convert far better than the versions they were expecting.'
    ]
  },
  {
    slug: 'ai-generated-copy-and-the-em-dash-discourse',
    title: 'Everyone can spot AI copy now. That is a problem.',
    category: 'ai-look',
    date: '2026-05-16',
    excerpt:
      'Readers have developed detectors. Some of them fire on perfectly ordinary human prose, and it is changing how people write.',
    body: [
      'The public has assembled a folk taxonomy of AI writing tells: the em dash, "delve", "in today\'s fast-paced world", tricolons, the it-is-not-X-it-is-Y construction, relentless parallelism, and a general absence of anything specific.',
      'Most of these are directionally right. Generated prose really does over-use certain rhythms. But the detection has spread faster than the accuracy, and writers are now avoiding perfectly good constructions because they have become suspicious.',
      '## The signal that actually works',
      'Not punctuation. Specificity. Generated text is confident and non-committal at the same time — it makes assertions that cannot be checked. Human writing about real work is full of things that could be wrong: dates, numbers, names, admissions.',
      'A paragraph containing "eighteen working days" or "we blamed lazy loading and were wrong" is doing something no detector needs to be clever about. It is staking something.',
      '## Why this matters for a business site',
      'Your prospects are running this detector whether or not they could articulate it. Copy that reads as generated does not just fail to persuade — it actively signals that nobody at the company cared enough to write it, which is a claim about the company, not the page.',
      'The response is not to launder AI prose into something that dodges the tells. It is to put things in the writing that only you could have written.',
      '## Our own position, stated plainly',
      'We use these tools. Every post on this site is edited by one of the two people who run this studio, and none of them make a claim we have not lived. That is the standard we can actually defend — not "no AI touched this", which would be both untrue and, on its own, worth nothing.',
      'The distinction that matters is not who typed it. It is whether there is a person accountable for whether it is true.',
      '## What the detectors get wrong',
      'They flag competent prose. Clear structure, varied sentence length and correct punctuation are markers of good writing and of generated writing, and a reader primed to look for tells will find them in a carefully edited human paragraph.',
      'We have watched people accuse genuinely hand-written technical posts of being generated because they were well organised, which is a strange place for the discourse to have arrived at.',
      '## The consequence for writers',
      'Some are deliberately writing worse — adding typos, avoiding structure — to signal humanity. That is a bad equilibrium and it makes everything harder to read.',
      'The better response is to write things a machine could not: a specific failure, a number you measured, an opinion that could cost you a client. Those cannot be mistaken for a summary of the internet, however tidy the prose around them is.'
    ]
  },
  {
    slug: 'templates-are-fine-defaults-are-not',
    title: 'Templates are fine. Defaults are not.',
    category: 'ai-look',
    date: '2026-05-04',
    excerpt:
      'There is nothing wrong with starting from something that exists. The damage is in never overriding any of it.',
    body: [
      'A common overcorrection to the homogenisation complaint is that everything should be bespoke. That is unaffordable for most businesses and unnecessary for nearly all of them.',
      'Starting from a template is efficient and sensible. The problem is a site where nothing was changed from what arrived — including the parts that describe the business.',
      '## The parts that must be overridden',
      'Anything that makes a claim. Every number, every name, every promise. If a page says "trusted by hundreds of businesses" and you have eleven clients, that sentence is a liability and it came free with the theme.',
      'The section order. Templates sequence sections for a generic funnel. Your business has a specific thing a visitor most needs to know first, and it is often the thing the template puts fourth.',
      'The images. This is the single biggest one. Stock photography is the fastest way to make a real business look imaginary.',
      '## The parts that can stay',
      'The grid. The spacing. The type scale. The way the navigation collapses on mobile. Nobody has ever chosen a vendor because their breakpoints were bespoke.',
      '## A cheap and effective exercise',
      'Take your homepage and delete every sentence that would still be true if you were a different company in a different industry. Whatever survives is your actual site. Usually it is about a third of the words, and the page is better for it.',
      'Then look at what is missing after the cut — that gap is what you should be writing about. Almost always it is specifics: what you have built, what it cost, what went wrong, who you are not right for.',
      '## Why this is a good deal',
      'Overriding the claims and the images is a day of work. Rebuilding a design system is a month. The day gets you nearly all of the differentiation, because differentiation was never really living in the layout.',
      '## The demo content problem',
      'Templates ship with placeholder content chosen to make the layout look good — three services of equal length, four team members, testimonials that fit exactly. Real businesses do not have that symmetry.',
      'So the layout breaks slightly when real content goes in, and the common response is to trim the real content to fit. That is backwards: the design should bend to what is true, not the other way round.',
      '## Where we see this most',
      'Service lists. A template with a three-column grid produces businesses that claim exactly three services or pad to six. A business with five gets a lopsided row and someone invents a sixth.',
      'It sounds trivial and it is a genuine mechanism by which templates make businesses describe themselves inaccurately.'
    ]
  },
  {
    slug: 'the-four-second-credibility-test',
    title: 'The four-second credibility test',
    category: 'ai-look',
    date: '2026-04-22',
    excerpt:
      'What a visitor decides before they read anything, and the handful of things that move it.',
    body: [
      'A visitor forms a judgement about whether a business is real long before they read a sentence. It is fast, mostly unconscious, and reasonably accurate — which means it is worth designing for directly.',
      '## What lands in the first pass',
      'Whether the images are of actual things. A photograph of a real workshop or a screenshot of a real interface reads differently from a stock composition, instantly, even at a glance where no detail is legible.',
      'Whether there are numbers. The eye catches digits before words. A rating with a count, a price, a year established — these register as substance before they are read.',
      'Whether the page is dense or sparse in the right places. A business with a lot of real work has a lot to say and the page shows it. Extremely sparse pages read as new or empty, whatever the copy claims.',
      '## What does not land',
      'The headline, mostly. Everyone assumes the headline is marketing and discounts it accordingly. Enormous effort goes into a sentence that is skipped.',
      'Adjectives of any kind. "Premium", "innovative", "trusted" — these are read as noise because every competitor uses them.',
      '## How we build for it',
      'Real screenshot or real photograph above the fold, always. A checkable number in the first screen — a price, a rating with its count, a delivery time. The client\'s own vocabulary in the headings rather than industry-generic phrasing.',
      'And we resist the instinct to make the first screen clean. Clean is not the goal; credible is. A slightly busier hero containing three verifiable facts outperforms a beautiful one containing an aspiration.',
      '## The check',
      'Show someone the page for four seconds, take it away, and ask what the business does and whether they believe it exists. If they cannot answer the first, the page is decorative. If they hesitate on the second, it looks generated — and the fix is evidence, not design.'
    ]
  },
  {
    slug: 'why-your-competitors-site-looks-like-yours',
    title: 'Your competitor\'s site looks like yours. Same tools.',
    category: 'ai-look',
    date: '2026-04-10',
    excerpt:
      'A short, slightly bleak observation about differentiation when everybody has access to the same average.',
    body: [
      'Two agencies in the same city, using the same generators, prompted with descriptions of the same kind of business, will produce nearly the same site. Not similar — nearly the same, section for section.',
      'This is not a failure of either. It is what asking the same question of the same system produces.',
      '## What this does to positioning',
      'Visual differentiation used to be achievable by spending more. A better designer produced a distinctly better site, and the gap was visible to a client. That gap has compressed at the top end, because the average is now quite good and free.',
      'What has not compressed is the gap in substance. Two sites can look identical while one names eleven shipped projects with live links and the other describes capabilities. That difference is more visible now, not less, precisely because the visual noise has been equalised.',
      '## The practical move',
      'Compete on the axis that cannot be sampled. Your actual client list. Your actual prices. The specific thing you know that your competitor does not, because you built something they have not.',
      'This is uncomfortable for businesses whose positioning was mostly presentational. If the honest answer to "what do you do that others do not" is "we present it nicely", that was always fragile and it is now visibly so.',
      '## The upside for people who do real work',
      'The flip side is genuinely good. A small studio with a strong body of shipped work no longer loses to a larger competitor on production values, because production values are commoditised. What is left is the work, and the work is where a small serious team can actually win.',
      'That is a better market to compete in than the one where the budget for photography decided it.',
      '## What to do about it concretely',
      'Audit your site against your two closest competitors, section by section. Where the structure matches and the content is interchangeable, you are not differentiated regardless of colour palette.',
      'Then find the three things you can say that they cannot. Named clients, a specific technique, a price, a guarantee, a piece of domain knowledge. Put those where the generic claims currently are.',
      '## The uncomfortable finding',
      'Doing this exercise honestly sometimes reveals there is no real difference. That is worth knowing — it is a positioning problem, and no amount of design work will solve it.',
      'A business that cannot name what makes it a better choice has a strategy question, not a website question, and building a nicer site postpones the answer rather than providing it.'
    ]
  },
  {
    slug: 'accessibility-is-the-thing-generators-skip',
    title: 'Accessibility is the thing generators quietly skip',
    category: 'ai-look',
    date: '2026-03-29',
    excerpt:
      'Generated markup is usually well-formed and frequently inaccessible, because nothing in the visual result reveals the difference.',
    body: [
      'A generated page looks correct. It is often not operable by keyboard, its headings skip levels, its interactive elements are divs, its contrast fails on the muted text that looks so good in the design, and its images have alt text that describes nothing.',
      'None of that is visible in a screenshot, which is why it survives review.',
      '## The specific failures we see most',
      'Divs with click handlers instead of buttons. They look identical and cannot be reached by keyboard or announced by a screen reader.',
      'Heading levels chosen for size rather than structure. An h4 used because the design wanted smaller text, in a document where the previous heading was an h2.',
      'Contrast on secondary text. The fashionable low-contrast grey on a dark background is frequently below the threshold, and it is exactly the styling that gets copied because it looks refined.',
      'Alt text that restates the filename or says "image". Worse than empty alt, which at least tells assistive tech to skip a decorative image.',
      'Focus styles removed because the default outline was ugly, with nothing put in its place.',
      '## Why it matters beyond compliance',
      'Every one of these also affects people not using assistive technology. Keyboard operability matters to power users. Heading structure is what lets a search engine and an answer engine understand your page. Contrast matters to anybody outdoors on a phone, which in India is most people most of the time.',
      '## What we check',
      'Keyboard-only pass through every interactive element. Headings in order with no level skipped. Contrast measured rather than eyeballed. Alt text that says what the image shows, and empty alt where the image is decorative. A visible focus style that is part of the design rather than an afterthought.',
      'It takes under an hour on a typical site. It is close to the highest-value hour available, and it is the one that generated output reliably leaves undone — because getting it wrong changes nothing about how the page looks.'
    ]
  },
  {
    slug: 'the-fastest-way-to-look-real',
    title: 'The fastest way to make a site look real',
    category: 'ai-look',
    date: '2026-03-17',
    excerpt:
      'If you only have a day, here is the order we would spend it in.',
    body: [
      'Assume a site that looks generated, a limited budget, and no appetite for a redesign. These are the changes we would make, in the order we would make them, based on what has moved the needle for clients.',
      '## One: replace every stock image',
      'Photographs of the actual place, the actual people, the actual product on the actual bench. Taken on a phone is fine — better than fine, because it is obviously real. This is the single largest change available and it costs an afternoon.',
      '## Two: put a number on the first screen',
      'A price, a price range, a rating with its count, a delivery window, a year founded. Anything checkable. Businesses resist publishing prices and it is almost always the wrong instinct — the visitor is going to find out eventually, and being the one who told them buys enormous goodwill.',
      '## Three: delete the interchangeable sentences',
      'Run the substitution test on every line: would this be equally true for a competitor? Delete everything that passes. The page gets shorter and sharper, and the gaps show you what is worth writing.',
      '## Four: name things',
      'Clients, tools, places, versions, integrations. "We built a CRM" becomes "we built the consignment and bilti system Saad Cargo dispatches on". Proper nouns are the cheapest credibility available.',
      '## Five: fix the contact path',
      'One tap to call. One tap to WhatsApp with the message pre-filled. One tap to directions. No form as the only route, ever, for a business where the customer wants to talk to someone.',
      '## What we would not do first',
      'Change the typeface. Redesign the layout. Add animation. Commission illustration. All of those are fine eventually and none of them address why the site reads as generic, which is that it does not contain anything only this business could have said.',
      '## The order matters',
      'Each item above is cheaper than the one after it and moves the needle more. That ordering is deliberate and it is roughly the inverse of what most businesses do, which is to start with a redesign and never get to the content.',
      '## What to do the following week',
      'Write one page about something you actually know. A process you have refined, a mistake you see clients make, a comparison you can make because you have used both.',
      'One page of genuine substance does more for credibility than a site-wide visual refresh, and it costs a morning. The reason it does not happen is that it requires someone with knowledge to sit and write, which cannot be delegated to a designer.',
      '## The test that it worked',
      'Show the updated page to someone who does not know the business and ask what they do and whether they would trust them. If the answer improves, the changes were the right ones.'
    ]
  }
]

/**
 * The AI look.
 *
 * Voice note for anyone adding to this file: write it the way you'd say it.
 * Contractions. Short sentences next to long ones. The odd fragment. If a
 * paragraph reads like it was assembled rather than said, cut it and try again.
 *
 * And we're not innocent here — this site runs Inter, a gradient and a
 * four-card pricing grid. Posts that criticise a pattern we use should say so.
 */

export const aiLook = [
  {
    slug: 'why-every-ai-website-looks-the-same',
    title: 'Why every AI-generated website looks the same',
    category: 'ai-look',
    date: '2026-08-20',
    excerpt:
      'Violet gradient, Inter, three cards in a row. You already know the look. The reason it happened is mechanical, and it explains why it keeps happening.',
    body: [
      'You know the one. Violet gradient bleeding into indigo. Inter, or something you\'d have to squint to tell from Inter. A big confident claim in the hero, three feature cards under it, a row of client logos, testimonials, then pricing with the middle tier badged "most popular".',
      'Everyone can spot it now. What most people get wrong is why.',
      '## It\'s arithmetic, not laziness',
      'Ask a model for "a modern SaaS website" and it gives you the most common answer to that phrase across everything it\'s ever seen. That\'s literally the job. And the most common answer is the same for you as it is for the company you\'re competing against, because you\'re both pulling from the same pile.',
      'Vague prompts make it worse. No layout constraint, no stated intent, nothing to push against — so you get the middle of the distribution. Which is exactly what the middle of the distribution looks like.',
      '## The loop is the actual problem',
      'Here\'s the bit that makes it self-sustaining. People look at the output, decide that\'s what good looks like now, and prompt for more of it. Then that becomes the reference for the next round.',
      'Design fixation used to take years. Magazines, award sites, slow diffusion. Now it takes an afternoon.',
      '## What it costs you',
      'Best line we\'ve read on this: generic design became free, so generic design is now worth about nothing.',
      'That\'s the commercial problem in one sentence. If your site looks like the default, you\'re telling people you\'re the default.',
      '## We\'re not clean either',
      'This site uses Inter. There\'s a gradient on the hero. The pricing section is four cards with the middle one badged. By the standards above, we\'re inside the aesthetic we\'re complaining about.',
      'The defence, for what it\'s worth: those are conventions doing a job, and the parts that carry meaning are ours. Real screenshots of real client work instead of floating device mockups. Actual prices instead of "contact us". Copy that names things we shipped.',
      'A convention you picked on purpose isn\'t the same as a default you never noticed. But we\'d be lying if we claimed to be outside it.'
    ]
  },
  {
    slug: 'how-to-tell-a-site-was-generated',
    title: 'How to spot a generated site in four seconds',
    category: 'ai-look',
    date: '2026-08-08',
    excerpt:
      'The giveaways aren\'t visual. They\'re in whether the words commit to anything checkable.',
    body: [
      'Most guides on this talk about gradients and fonts. Weak signals. Plenty of considered design uses both.',
      'The real tells are in what the copy actually claims.',
      '## No proper nouns',
      'Generated sites describe categories. Never instances.',
      '"We work with businesses across industries" instead of "we built the CRM Saad Cargo dispatch on". "Cutting-edge technology" instead of "React, Node, MongoDB, hosted in Mumbai".',
      'Proper nouns are expensive to fake because somebody can check them. That\'s exactly why generated copy avoids them.',
      '## The numbers are all round',
      'Over 100 happy clients. 50% faster. 24/7 support.',
      'Real numbers are ugly. 4.9 from 190 reviews. Eighteen working days. CHF 9,522.51 raised against a 25,000 goal. Roundness means the number got picked for how it read, not measured.',
      '## Three of everything',
      'Three benefits. Three steps. Three testimonials. Three pricing tiers.',
      'Actual businesses have awkward counts. Seven services, two of which overlap, and one that only exists because a client asked for it in 2023 and it stuck.',
      '## The swap test',
      'This is the one I\'d use if I could only use one. Take the company name out of a sentence and see whether it still points at anybody.',
      '"We combine technical expertise with creative thinking to deliver solutions that drive results." That describes every agency that has ever existed. If a sentence survives the swap, it was never about the company.',
      '## Six people laughing at a laptop',
      'Exposed brick, maximum demographic variety, nobody works there. This one predates generative tools by a decade but the volume has gone up.',
      '## Why any of it matters',
      'Your visitor isn\'t consciously running this checklist. They\'re forming a judgement in about four seconds and they\'re usually right.',
      'A site that names things reads like a business with a history. A site that describes categories reads like a business that might not be here next year.'
    ]
  },
  {
    slug: 'ai-slop-is-a-content-problem-not-a-design-problem',
    title: 'AI slop is a content problem in a design problem\'s clothes',
    category: 'ai-look',
    date: '2026-07-27',
    excerpt:
      'You can hire a genuinely good designer and still ship something that reads as generated, because the emptiness isn\'t in the layout.',
    body: [
      'The standard prescription for a generic site is a design intervention. Custom illustration. An unusual grid. A typeface nobody else is using.',
      'Those help. They don\'t fix it.',
      'We\'ve seen beautifully art-directed sites that still read as slop, because every sentence was a category rather than a claim. We\'ve also seen almost unstyled sites that read as unmistakably real, because they were stuffed with specifics.',
      '## Where substance actually comes from',
      'Names. Numbers. Constraints. Trade-offs. Things that went wrong. What it costs. Who it\'s not for.',
      'That last one is the diagnostic. Generated marketing copy never excludes anybody, because excluding is a decision and the average of all marketing copy doesn\'t exclude. A real business knows who it\'s a bad fit for, and saying so out loud is one of the strongest credibility signals going.',
      '## The test we run on our own pages',
      'Could a competitor put their logo on this sentence and have it be equally true?',
      'If yes, it\'s filler sitting where a claim should be. Run that honestly across a typical agency homepage and you\'ll cut about 80% of it. Ours from two years ago included.',
      'It\'s uncomfortable, because the page gets shorter and short feels like lack. It isn\'t. You just removed things that were never working.',
      '## The good news',
      'Substance is the one thing generation can\'t supply. A model will happily give you a layout, a palette, a type pairing and a competent paragraph.',
      'What it can\'t give you is that panel bonding takes one to three days, or that an MT5 integration took eighteen working days when every quote said six months. That lives in exactly one place, which is the business.',
      'So the move against homogenised design isn\'t a weirder grid. It\'s writing down what you already know. Which is annoying, because it\'s work, and nobody can do it for you.'
    ]
  },
  {
    slug: 'the-intentional-imperfection-backlash',
    title: 'The messy-on-purpose backlash, and where it goes wrong',
    category: 'ai-look',
    date: '2026-07-15',
    excerpt:
      'Hand-drawn arrows, paper texture, brush strokes. The instinct is right. The execution usually misses why it works.',
    body: [
      'The visible reaction to the AI aesthetic has been roughness. Marker highlights. Scanned sketches. Uneven type. Little hand-drawn arrows pointing at things. Photography that looks like a person took it rather than licensed it.',
      'Good instinct. Hard to generate convincingly, and it signals that a human made a choice. But most of it misses the point.',
      '## Decoration versus evidence',
      'A hand-drawn arrow added because hand-drawn arrows are current is decoration. It\'s a texture on the same underlying template, and it\'ll date faster than the gradient did. More conspicuous things always do.',
      'A badly lit photo of your actual workshop, with the actual bench in it? That\'s evidence. Worse as an image. Far better as a signal, because it could only have come from you.',
      '## The question to ask',
      'Does the imperfect thing carry information?',
      'A scan of a real sketch from the project tells me something about how the work happened. A generic paper texture behind a section header tells me the designer had a mood board.',
      'One of those is unfakeable. The other is a Figma plugin, and in about a year it\'ll be a preset inside the same generators it was reacting against.',
      '## What we do instead',
      'Real screenshots. Including the ugly ones — the dense tables, the forms with fourteen fields. A logistics CRM full of consignment rows is not a beautiful image. It is a completely convincing one, because nobody generates that on spec.',
      'Where there\'s a number, we use the real number even when it\'s awkward. Where a client\'s site is a legacy WordPress build rather than something we\'d show off, we say so instead of reframing it.',
      '## The prediction nobody wants',
      'Every visual response to homogenisation gets absorbed. The texture trend will be trained on and reproduced. Give it two years and "authentic-looking rough" is another default.',
      'The only thing that doesn\'t get absorbed is the part about the business rather than the surface. Which is inconvenient, because that part takes actual work.'
    ]
  },
  {
    slug: 'stop-using-stock-screenshots',
    title: 'Stop using mockups. Show the actual screen.',
    category: 'ai-look',
    date: '2026-07-03',
    excerpt:
      'The floating laptop with an invented dashboard inside it is the clearest sign a portfolio is padded.',
    body: [
      'Open any agency portfolio and count. How many project images are real screenshots, and how many are a laptop at a jaunty angle with a made-up dashboard glowing inside it?',
      'The mockup is easier. It hides everything about a real product that isn\'t photogenic — the dense table, the fourteen-field form, the empty state. It\'s also why nobody believes portfolios.',
      '## What a real screenshot proves',
      'That the thing exists. That\'s the whole job, and it isn\'t a small one.',
      'A screenshot of an actual CRM, with actual column headers using the client\'s own vocabulary, can\'t be produced without having built it.',
      'It shows judgement too. Anyone can arrange a hero section. Deciding what belongs in a dense operational screen — which four numbers go at the top, what the empty state says, where the primary action sits when there are eleven possible actions — that\'s where design competence actually lives, and a mockup hides all of it.',
      '## "But the data is confidential"',
      'Fair. And solvable.',
      'Run the product locally against seeded demo data and screenshot that. We do it for every internal tool we can\'t link to. Local database, invented records, real interface. What you get is the actual software with fake content in it, which looks nothing like a mockup because the layout is the real layout, awkward column widths and all.',
      '## Read every pixel before you publish',
      'Customer names, phone numbers, revenue figures and email addresses have a way of surviving into a screenshot that was supposed to be anonymous.',
      'We caught real lead names in a dashboard capture that was about to go on a public page. Not "nearly caught" — caught, at the last check, after the composition was otherwise finished. So the rule is now: look at every piece of text in an image before it ships, every time, no matter how synthetic you\'re convinced the data is.',
      '## The trade',
      'Mockups optimise for how the image looks. Screenshots optimise for whether anyone believes you.',
      'When anybody can generate a beautiful picture of a product that doesn\'t exist, the second one is worth a great deal more.'
    ]
  },
  {
    slug: 'the-purple-gradient-is-not-the-problem',
    title: 'The purple gradient isn\'t the problem',
    category: 'ai-look',
    date: '2026-06-21',
    excerpt:
      'Blaming specific ingredients misdiagnoses it. Plenty of genuinely good sites use every single element of the house style.',
    body: [
      'It\'s become easy to sneer at the ingredients. The violet gradient, Inter, the bento grid, the glassmorphic card.',
      'But those are conventions, and conventions are mostly fine. Nobody complains that books put the page number at the bottom.',
      'A convention is a solved problem you don\'t have to solve again. Using Inter isn\'t a failure of imagination. It\'s a legible typeface that renders well at small sizes on cheap Android hardware, which is an actual reason.',
      '## Convention versus default',
      'The difference is whether anybody decided.',
      'A gradient because it gives the hero depth and separates it from the content below — that\'s a choice. A gradient because the generator produced one — that\'s a default.',
      'You can see it in whether the decisions point the same way. On a considered site they reinforce each other and back up what the business is claiming. On a defaulted site every element is individually reasonable and collectively silent, because nothing was chosen.',
      '## A better question than "is this overused"',
      'Ask what would be lost if you deleted it.',
      'Nothing? It was decoration. Page becomes harder to scan, hierarchy collapses? It was working.',
      'Run that honestly and a lot comes off most pages, ours included. It also stops the pointless cycle where perfectly good patterns get abandoned for the crime of becoming popular.',
      '## What\'s actually worth avoiding',
      'Not any particular visual. The whole-page shape: hero, three cards, logos, testimonials, pricing, CTA — applied no matter what the business does.',
      'That structure encodes assumptions about a sales process. Those assumptions are true for a self-serve SaaS product with a free trial. They\'re false for almost everything else.',
      'A repair workshop doesn\'t need a feature grid. It needs a price, a phone number, and proof the work is good. When a site inherits SaaS page architecture for a business that is nothing like SaaS, that\'s the real damage — and it\'s structural, not cosmetic.'
    ]
  },
  {
    slug: 'design-systems-versus-taste',
    title: 'A design system won\'t give you taste',
    category: 'ai-look',
    date: '2026-06-09',
    excerpt:
      'Systems make consistency cheap. They don\'t make the decisions, and the decisions are what people notice.',
    body: [
      'Design systems are genuinely good. Tokens, a spacing scale, a component library — they kill a whole class of inconsistency and let a small team ship something coherent fast.',
      'They also make it very easy to produce something impeccably consistent and completely characterless. A system encodes how to be consistent. It says nothing about what to say.',
      '## Where it stops helping',
      'The system gives you the spacing scale. It doesn\'t tell you this page should have one thing on it instead of six.',
      'It hands you a card component. It doesn\'t mention that a card is the wrong container here and a table would be better.',
      'Those are editorial calls, and they\'re where a page starts belonging to a specific business. Skip them and you get the same page as everyone else using a similar system. Which, in 2026, is nearly everyone.',
      '## The tell',
      'Every section on the page is the same component with different content inside it.',
      'Six card grids stacked vertically means somebody reached for the available component instead of asking what each section needed. The fix is almost always removal, not addition.',
      'One section as prose because it\'s an argument. One as a table because it\'s a comparison. One as a single large image because it\'s evidence. The variety comes from the content having different shapes — not from decoration.',
      '## Where we land',
      'We use a system on everything and wouldn\'t work without one. But we treat it as a floor, not a spec. It guarantees nothing is misaligned. It has no opinion on whether the page is worth reading.',
      'The uncomfortable version: consistency is free now, so it stopped signalling competence. Everything looks well assembled. What separates work is judgement about what to assemble, and no system supplies that.'
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
      'Somebody searching for TV repair, or a furnishing showroom, or a loan advisor, is not on a discovery journey. They\'ve got a problem, they\'re on a phone, and they\'re deciding in a few seconds whether to call you or the next result down.',
      'What they usually get: an aspirational headline, a scroll of feature cards, a testimonial carousel, and a contact form at the bottom.',
      '## What actually converts',
      'A price, or a range, visible without scrolling. "From ₹500" beats "competitive pricing" by a mile. Businesses that refuse to publish a number lose to the ones that do, over and over.',
      'A phone number that\'s a tap target, not an image of a phone number.',
      'A WhatsApp link with the enquiry already written into it. In India that\'s the channel people prefer, and pre-filling it removes the small awkwardness of composing a first message to a stranger.',
      'Proof somebody can check. A rating with a real count. Photos of the actual shop. Years in business. Not a five-star carousel with first names attached.',
      'Directions that open in Maps in one tap.',
      '## What can go',
      'The feature grid. The mission statement. The testimonial slider. The team page for a two-person shop. The blog nobody has updated since 2023.',
      'All of it is there because it was in the template, not because a customer wanted it.',
      '## Why the SaaS shape got everywhere',
      'Because it\'s the most common pattern in the training data and in the theme marketplaces, and because it\'s what everyone else has.',
      'It works for a product with a free trial and a self-serve funnel. For a business whose conversion event is a phone call, it\'s close to useless.',
      '## What we build instead',
      'Thing being sold, price band, two contact routes. Then proof. Then detail, and only if it earns the room.',
      'These pages read slightly too plain to the business owner. They convert considerably better.'
    ]
  },
  {
    slug: 'ai-generated-copy-and-the-em-dash-discourse',
    title: 'Everyone can spot AI copy now. That\'s a problem.',
    category: 'ai-look',
    date: '2026-05-16',
    excerpt:
      'Readers have built detectors. Some of them fire on perfectly ordinary human prose, and it\'s changing how people write.',
    body: [
      'There\'s a folk taxonomy now. Em dashes. "Delve". "In today\'s fast-paced world." Tricolons. The it\'s-not-X-it\'s-Y construction. Relentless parallelism. A general absence of anything specific.',
      'Most of it is directionally right. Generated prose really does over-use certain rhythms — sentences that all land at the same length being the big one.',
      'But detection has spread faster than accuracy, and people are now avoiding perfectly good constructions because they\'ve become suspicious.',
      '## What the detectors get wrong',
      'They flag competent writing. Clear structure, correct punctuation, varied vocabulary — those are markers of decent prose and of generated prose, and a reader primed to hunt for tells will find them in a carefully edited human paragraph.',
      'We\'ve watched people accuse genuinely hand-written technical posts of being machine-made because they were well organised. Strange place for this to have landed.',
      '## The signal that actually works',
      'Not punctuation. Specificity.',
      'Generated text is confident and non-committal at once. It asserts things nobody could check. Human writing about real work is full of things that could turn out to be wrong — dates, numbers, names, admissions.',
      '"Eighteen working days." "We blamed lazy loading and we were wrong." Nothing clever needed to spot that. Somebody staked something.',
      '## The bad equilibrium',
      'Some writers are deliberately writing worse now. Adding typos. Avoiding structure. Signalling humanity through sloppiness.',
      'That makes everything harder to read and it doesn\'t work for long, because sloppiness is also easy to generate.',
      '## Where we stand',
      'We use these tools. Every post here is edited by one of the two people who run this studio, and none of them make a claim we haven\'t lived.',
      'That\'s a standard we can defend. "No AI touched this" would be both untrue and, by itself, worth nothing. The question isn\'t who typed it. It\'s whether anyone is accountable for whether it\'s true.'
    ]
  },
  {
    slug: 'templates-are-fine-defaults-are-not',
    title: 'Templates are fine. Defaults aren\'t.',
    category: 'ai-look',
    date: '2026-05-04',
    excerpt:
      'Nothing wrong with starting from something that exists. The damage is in never overriding any of it.',
    body: [
      'The overcorrection to all this is that everything should be bespoke. That\'s unaffordable for most businesses and unnecessary for nearly all of them.',
      'Starting from a template is sensible. The problem is a site where nothing got changed — including the parts that describe the business.',
      '## Override these',
      'Anything that makes a claim. Every number, name and promise. If your page says "trusted by hundreds of businesses" and you have eleven clients, that sentence is a liability and it came free with the theme.',
      'The section order. Templates sequence for a generic funnel. Your business has one thing a visitor most needs to know first, and it\'s usually the thing the template put fourth.',
      'The images. Biggest one by a distance. Stock photography is the fastest way to make a real business look imaginary.',
      '## These can stay',
      'The grid. The spacing. The type scale. How the nav collapses on mobile.',
      'Nobody in history has chosen a vendor because their breakpoints were custom.',
      '## The demo content trap',
      'Templates ship with placeholder content picked to flatter the layout. Three services of equal length. Four team members. Testimonials that fit the space exactly.',
      'Real businesses aren\'t symmetrical. So the layout breaks slightly when true content goes in — and the usual response is to trim the truth to fit. That\'s backwards.',
      'Service lists are where we see it most. A three-column grid produces businesses that claim exactly three services, or pad to six. Sounds trivial. It\'s a real mechanism by which templates make businesses describe themselves inaccurately.',
      '## An exercise that takes an hour',
      'Delete every sentence on your homepage that would still be true if you were a different company in a different industry.',
      'What survives is your actual site. Usually about a third of the words, and it reads better.',
      'Then look at the hole. That gap is what you should be writing about, and it\'s almost always specifics — what you built, what it cost, what went wrong, who you\'re not right for.'
    ]
  },
  {
    slug: 'the-four-second-credibility-test',
    title: 'The four-second credibility test',
    category: 'ai-look',
    date: '2026-04-22',
    excerpt:
      'What a visitor decides before reading anything, and the handful of things that move it.',
    body: [
      'People decide whether a business is real long before they read a sentence. It\'s fast, mostly unconscious, and reasonably accurate — which makes it worth designing for directly.',
      '## What lands in the first pass',
      'Whether the images are of actual things. A photo of a real workshop or a screenshot of a real interface reads differently from a stock composition, instantly, at a glance where no detail is legible.',
      'Whether there are numbers. The eye catches digits before words. A rating with its count, a price, a year established — those register as substance before anyone reads them.',
      'Whether the page is dense in the right places. A business with a lot of real work has a lot to say and it shows. Very sparse pages read as new or empty, whatever the copy claims.',
      '## What doesn\'t land',
      'The headline. Mostly. Everyone assumes the headline is marketing and discounts it. Enormous effort goes into a sentence people skip.',
      'Adjectives. Premium, innovative, trusted. Read as noise, because every competitor uses them.',
      '## How we build for it',
      'Real photo or real screenshot above the fold, always. A checkable number in the first screen. The client\'s own vocabulary in the headings rather than industry-generic phrasing.',
      'And we fight the instinct to make the first screen clean. Clean isn\'t the goal. Credible is. A slightly busier hero with three verifiable facts in it beats a beautiful one containing an aspiration.',
      '## Try it',
      'Show someone your homepage for four seconds. Take it away. Ask what the business does and whether they think it exists.',
      'Can\'t answer the first? The page is decorative. Hesitate on the second? It looks generated — and the fix is evidence, not a redesign.'
    ]
  },
  {
    slug: 'why-your-competitors-site-looks-like-yours',
    title: 'Your competitor\'s site looks like yours',
    category: 'ai-look',
    date: '2026-04-10',
    excerpt:
      'A short and slightly bleak note on differentiation when everyone can reach the same average.',
    body: [
      'Two agencies in the same city, same generators, prompted with descriptions of the same kind of business. They will produce nearly the same site. Not similar. Nearly the same, section for section.',
      'That isn\'t a failure of either. It\'s what asking the same question of the same system produces.',
      '## What it does to positioning',
      'Visual differentiation used to be buyable. A better designer produced a visibly better site and clients could see the gap.',
      'At the top end that gap has compressed hard, because the average is now good and free.',
      'What hasn\'t compressed is substance. Two sites can look identical while one names eleven shipped projects with live links and the other lists capabilities. That difference is more visible now, not less, because the visual noise got equalised.',
      '## The move',
      'Compete where nobody can sample. Your actual client list. Your actual prices. The specific thing you know because you built something they haven\'t.',
      'This is uncomfortable if your positioning was mostly presentational. If the honest answer to "what do you do that others don\'t" is "we present it nicely", that was always fragile. Now it\'s obviously fragile.',
      '## Do this',
      'Audit your site against your two closest competitors, section by section. Where the structure matches and the content is interchangeable, you aren\'t differentiated — whatever the palette says.',
      'Then find three things you can say that they can\'t. Named clients. A technique. A price. A guarantee. A piece of domain knowledge. Put those where the generic claims are.',
      '## If the exercise comes up empty',
      'Sometimes it does. Sometimes you run it honestly and find there is no real difference.',
      'Worth knowing. That\'s a positioning problem, and no amount of design work will touch it. Building a nicer site just postpones the answer.',
      '## The upside',
      'For anyone doing real work, this is a better market. A small studio with a strong body of shipped work no longer loses on production values, because production values got commoditised.',
      'What\'s left is the work. Which is a much better thing to compete on than who could afford the photographer.'
    ]
  },
  {
    slug: 'accessibility-is-the-thing-generators-skip',
    title: 'Accessibility is the thing generators quietly skip',
    category: 'ai-look',
    date: '2026-03-29',
    excerpt:
      'Generated markup is usually well-formed and frequently unusable, because none of the difference shows up in a screenshot.',
    body: [
      'A generated page looks right. It often isn\'t operable by keyboard, its headings skip levels, its buttons are divs, its contrast fails on exactly the muted grey that looks so good in the design, and its alt text says "image".',
      'None of that appears in a screenshot. Which is why it survives review.',
      '## The five we see constantly',
      'Divs with click handlers instead of buttons. Look identical. Can\'t be reached by keyboard, aren\'t announced by a screen reader.',
      'Heading levels picked for size. An h4 because the design wanted smaller text, in a document whose previous heading was an h2.',
      'Contrast on secondary text. That fashionable low-contrast grey on dark is frequently below threshold — and it\'s the exact styling that gets copied, because it looks refined.',
      'Alt text restating the filename. Worse than empty alt, which at least tells assistive tech to skip a decorative image.',
      'Focus styles removed because the default outline was ugly, with nothing put back.',
      '## It isn\'t only about compliance',
      'Every one of those hurts people who aren\'t using assistive tech.',
      'Keyboard operability matters to anyone fast. Heading structure is how a search engine and an answer engine understand your page. Contrast matters to anybody outdoors on a phone — which, in India, is most people most of the time.',
      '## The hour',
      'Keyboard-only pass through every interactive element. Headings in order, no skipped levels. Contrast measured rather than eyeballed. Alt text that says what the image shows, empty where it\'s decorative. A visible focus style that\'s part of the design instead of an afterthought.',
      'Under an hour on a typical site. Close to the highest-value hour available. And reliably the one generated output leaves undone, because getting it wrong changes nothing about how the page looks.'
    ]
  },
  {
    slug: 'the-fastest-way-to-look-real',
    title: 'The fastest way to make a site look real',
    category: 'ai-look',
    date: '2026-03-17',
    excerpt:
      'One day, no redesign. Here\'s the order we\'d spend it in.',
    body: [
      'Assume a site that reads as generated, a small budget, and no appetite for a rebuild. This is the order, based on what\'s actually moved things for clients.',
      '## One: kill every stock image',
      'Photographs of the real place, the real people, the real product on the real bench. Taken on a phone is fine. Better than fine — obviously real beats technically good here.',
      'Biggest single change available and it costs an afternoon.',
      '## Two: put a number in the first screen',
      'A price. A range. A rating with its count. A delivery window. A year founded. Anything checkable.',
      'Businesses resist publishing prices and it\'s almost always wrong. The visitor finds out eventually. Being the one who told them buys a surprising amount of goodwill.',
      '## Three: delete the interchangeable sentences',
      'Swap test on every line. Would this be equally true for a competitor? Delete it if so.',
      'The page gets shorter and sharper. The holes show you what\'s worth writing.',
      '## Four: name things',
      'Clients, tools, places, versions, integrations. "We built a CRM" becomes "we built the consignment and bilti system Saad Cargo dispatch on".',
      'Proper nouns are the cheapest credibility there is.',
      '## Five: fix the contact path',
      'One tap to call. One tap to WhatsApp with the message pre-written. One tap to directions. Never a form as the only route, not for a business where the customer wants to talk to somebody.',
      '## What we\'d leave for later',
      'Change the typeface. Redesign the layout. Add animation. Commission illustration.',
      'All fine eventually. None of them touch why the site reads as generic, which is that it contains nothing only this business could have said.',
      '## The following week',
      'Write one page about something you actually know. A process you refined. A mistake you watch clients make. A comparison you can make because you\'ve used both.',
      'One page of real substance does more for credibility than a site-wide visual refresh, and it costs a morning. The reason it doesn\'t happen is that it needs somebody with knowledge to sit down and write, and that can\'t be handed to a designer.'
    ]
  }
]

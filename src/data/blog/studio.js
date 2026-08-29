/**
 * Running a studio. Commercial and process posts, written from two people
 * actually doing this rather than from a business-of-design playbook.
 */

export const studio = [
  {
    slug: 'why-we-do-not-bill-hourly',
    title: 'Why we do not bill hourly',
    category: 'studio',
    date: '2026-08-22',
    excerpt:
      'Hourly billing puts you and the client on opposite sides of every efficiency gain. Fixed scope has its own problems, and we prefer them.',
    body: [
      'Under hourly billing, anything that makes us faster makes us less money. That is a direct conflict of interest with the client, and it gets worse every year that tooling improves.',
      'It also produces the worst conversation in this business: a client questioning a timesheet. Nobody wins that, and it poisons a relationship that was fine an hour earlier.',
      '## What fixed scope actually requires',
      'It only works if the scope is genuinely fixed, which means the definition has to be specific enough to argue about. "A website" is not a scope. "Up to eight pages, a CMS for the copy, on-page SEO, three revision rounds, sixty days of support" is.',
      'That specificity is the work. It moves the difficult conversation from the end of the project to the beginning, which is where it belongs and where it is much cheaper.',
      '## Where it goes wrong for us',
      'When we estimate badly, we absorb it. That is the deal and it is fair, but it means the estimate has to account for the unknowns rather than the happy path. Early on we priced the best case repeatedly and paid for it.',
      'The other failure is scope creep by accumulation — a series of small additions, none worth objecting to individually, that add a week. We handle that now with a stated change process rather than good intentions.',
      '## What the client gets',
      'A number and a date before any money moves. The ability to compare quotes on the same basis. No incentive for us to be slow. And an interest, on our side, in the codebase being clean — because we are the ones who pay for the mess on the next phase.',
      '## The exception',
      'Ongoing retainers, where the work genuinely cannot be scoped in advance because it is a stream of changing priorities. That is a different product with different economics, and we price it as capacity rather than deliverables.'
    ]
  },
  {
    slug: 'the-scoping-call-that-saves-the-project',
    title: 'The thirty-minute call that decides whether a project works',
    category: 'studio',
    date: '2026-08-10',
    excerpt:
      'Most failed projects were mispriced or misunderstood in the first conversation. Here is what we ask.',
    body: [
      'We do a free thirty-minute call before quoting anything. It is not a sales call in the usual sense — a meaningful share of them end with us saying we are not the right fit.',
      'These are the questions that do the work.',
      '## What happens if this does not exist in six months?',
      'The answer separates a real project from an idea. "We keep doing it in spreadsheets and it costs us a person" is a project. "It would be nice to have" is a conversation that will not survive its first budget review.',
      '## Who does this job today, and can I talk to them?',
      'If the person commissioning the software is not the person who will use it, and we cannot speak to the user, the risk goes up enormously. Almost every operational feature that turned out to matter came from the person at the counter, not the person paying.',
      '## What have you already tried?',
      'Usually something. An off-the-shelf product they abandoned, a spreadsheet that grew, a previous developer. Why it failed is the most valuable information available and it is freely given.',
      '## What is the number this is supposed to move?',
      'Not always revenue — could be hours saved, errors avoided, a compliance requirement. But if there is no number, there is no way to tell later whether it worked, and no defence when someone asks what it was for.',
      '## Who has to approve this?',
      'Asked early and directly. Projects die on approval chains nobody mentioned, and finding out in week six that a director has to sign off is much worse than finding out now.',
      '## What we are listening for',
      'Whether they can describe their own process precisely. A client who can walk through what happens to an order, step by step, including the exceptions, will be a good client. One who describes it in generalities has not thought about it yet, and the discovery will take three times as long as either of us expects.'
    ]
  },
  {
    slug: 'saying-no-to-work',
    title: 'The projects we say no to',
    category: 'studio',
    date: '2026-07-29',
    excerpt:
      'A short list, and the reasoning. Most of them are not about the technology.',
    body: [
      'Turning down paid work feels wrong for a long time. It stops feeling wrong after the first project you should have declined.',
      '## When there is no access to the user',
      'If we cannot speak to the people who will actually use the software, we are designing from a description of a job rather than the job. That produces something plausible and wrong, and the discovery happens at delivery.',
      '## When the timeline was set before the scope',
      'A date chosen for a trade show or a board meeting, with the scope to be determined. Every one of these ends the same way — either the scope is cut to something not worth having, or the date slips and the relationship is damaged. Neither is recoverable by working harder.',
      '## When the budget assumes we will make it up later',
      'Underpriced first phases pitched as an investment in a bigger second phase. The second phase is not contractual and often does not arrive. We price the work in front of us.',
      '## When nobody can explain the current process',
      'Not a red flag by itself — plenty of businesses have never written it down. It becomes one when nobody is willing to sit with us and work it out, because that means the discovery cost lands mid-build.',
      '## When the client wants a specific technology for no reason',
      'A stack chosen because a competitor uses it or because it was in an article. We will happily use whatever a client has a real reason for, including reasons like "our team knows it". A preference with no reason behind it usually indicates other decisions are being made the same way.',
      '## What we do instead of just declining',
      'Say why, plainly, and suggest what would make it workable. A surprising number of these come back three months later with the timeline fixed or the user made available. Declining well is not the same as declining permanently.'
    ]
  },
  {
    slug: 'handing-over-source-code-on-day-one',
    title: 'We hand over everything on day one of go-live',
    category: 'studio',
    date: '2026-07-17',
    excerpt:
      'Source, designs, infrastructure, deploy access. It is unusual enough that clients ask why, and the answer is partly self-interested.',
    body: [
      'Our contracts transfer everything at go-live. Not at the end of a support period, not on final payment, not on request. Code, design files, infrastructure-as-code, and every account in the client\'s name.',
      'Clients ask why, because a lot of agencies do the opposite.',
      '## The obvious reason',
      'They paid for it. Software built for a business is that business\'s asset, and holding it hostage as a retention mechanism is a bad way to earn repeat work.',
      '## The self-interested reason',
      'It disciplines us. Code that will be read by whoever the client hires next gets written differently from code only we will see. So does documentation, so do commit messages, and so does the decision about whether that clever abstraction is really necessary.',
      'Knowing there is an audience is the cheapest quality mechanism available.',
      '## The accounts detail that matters most',
      'Domain, DNS, hosting, database, payment provider, analytics — all registered to the client, with us added as collaborators. This sounds administrative and it is the thing that most often traps businesses.',
      'We have inherited projects where the previous developer owned the domain and had stopped responding. That is not a technical problem and there is no technical fix.',
      '## What we keep',
      'Nothing. We ask permission to show work in our portfolio and to keep a credit link where the client is happy with one, and both are theirs to refuse.',
      '## Whether it costs us work',
      'Some, probably. It also means the clients who come back do so because they want to, which is a better basis for a business than clients who cannot leave.',
      'The systems that generate a second phase are the ones a client\'s own team could keep working in. The ones that decay because nobody can touch them do not produce more work — they produce a rewrite quote from somebody else.',
      '## What handover actually includes',
      'Not just a repository link. Deploy instructions that someone else has followed successfully, environment variables documented with what each does, the decisions file, and a walkthrough recorded or delivered live.',
      'The test is whether a competent developer who has never seen the project can get it running locally from the documentation alone. We check that by having the other one of us do it on a project they did not build.',
      '## The accounts audit',
      'Before we call a project handed over, we list every account the system depends on and confirm the client is the owner of each. Domain, DNS, hosting, database, error tracking, payment provider, analytics, any API key.',
      'It takes half an hour and it is the item most likely to be quietly wrong.'
    ]
  },
  {
    slug: 'weekly-demos-are-the-whole-process',
    title: 'A working demo every Friday is most of our process',
    category: 'studio',
    date: '2026-07-05',
    excerpt:
      'Not a status update. Something running, that the client can use, every week, without exception.',
    body: [
      'The single practice that has done most for our project outcomes is showing something that works every Friday. Not a progress report, not a screenshot, not a percentage. A running thing the client can click.',
      '## What it prevents',
      'Month-long silences, which are where projects go wrong invisibly. A misunderstanding found in week one costs an hour. The same misunderstanding found in week seven costs a week, and costs trust that is harder to rebuild than the code.',
      'It also prevents the reverse problem — a client who has stopped thinking about the project and cannot re-engage at delivery. Weekly contact keeps their attention alive at low cost.',
      '## What it forces on us',
      'The system has to be in a demonstrable state every week. That means no seven-day refactors with everything broken in the middle, and it means integration happens continuously rather than at the end.',
      'This is a genuine constraint and it occasionally makes the engineering less elegant. It is worth it. Big-bang integration at the end of a project is the most reliable way to be late.',
      '## How we run it',
      'Twenty minutes, screen shared, on the actual deployed staging environment rather than a laptop. The client drives where possible — watching someone use it unaided is worth more than any narration we could provide.',
      'We show what does not work as well as what does. A demo that only shows the good parts trains the client to distrust demos.',
      '## The part clients value most',
      'Predictability. They know that every Friday they will see the current state, which removes the need to ask for updates and removes the anxiety that generates the asking.',
      'Several clients have told us this was the difference from previous agency experiences, and none of them mentioned the code.',
      '## When there is nothing good to show',
      'Some weeks the work is infrastructure, or a refactor, or a long integration with nothing visible at the end. The temptation is to skip the demo.',
      'We do not. We show what there is and explain what it enables, because skipping once makes skipping twice easy and the whole value is in it being unconditional.',
      '## What we ask at the end',
      'One question: is there anything you expected to see that you have not? It surfaces misunderstandings that a progress report never would, because the client is comparing against their own mental model rather than our description.',
      'That question has caught two significant scope misalignments early enough to be cheap.'
    ]
  },
  {
    slug: 'estimating-badly-and-what-we-changed',
    title: 'We estimated badly for two years. What changed.',
    category: 'studio',
    date: '2026-06-23',
    excerpt:
      'Not a technique. A set of specific adjustments, each of which came from a project we lost money on.',
    body: [
      'Our early estimates were consistently 40 to 60 percent under. Not randomly wrong — systematically under, in the same direction, which means it was bias rather than noise.',
      '## We were estimating the code',
      'The first error was estimating the part we could picture. Writing the feature is a fraction of shipping it. The rest is review, deployment, the client changing their mind reasonably, edge cases discovered in use, and the document layout their accountant rejects.',
      'Now we estimate the feature and multiply for everything around it. The multiplier is not a fudge factor — it is a separate, itemised set of activities.',
      '## We assumed the client would respond',
      'Waiting is a project cost. Content that arrives three weeks late, a decision that needs a director, a logo file nobody can find. We now include response time explicitly, and where a client is slow we say so and adjust rather than absorbing it silently.',
      '## We did not price the unknown parts differently',
      'Every project has parts we have built many times and parts we have not. Estimating both with the same confidence is the core mistake. The unfamiliar parts now get a range rather than a number, and if the range is too wide to quote, that is a signal to do a paid discovery phase first.',
      '## We priced the best case',
      'The estimate assumed nothing would go wrong, which is a description of no project ever. We now estimate the realistic case and state what would make it the bad case, so the client can see the risk rather than absorbing a surprise later.',
      '## What we did not do',
      'Add a blanket buffer. That hides the reasoning, gets negotiated away, and does not teach you anything. Itemising why an estimate is what it is survives a negotiation much better than a padded total.',
      '## Where we still get it wrong',
      'Integrations with systems we cannot see until we have credentials. We now quote those as a range with an explicit assumption, and revisit after the first day of actual access.'
    ]
  },
  {
    slug: 'the-change-request-conversation',
    title: 'How to have the change request conversation without damage',
    category: 'studio',
    date: '2026-06-11',
    excerpt:
      'Fixed scope means saying no sometimes. Doing that badly costs the relationship; doing it well strengthens it.',
    body: [
      'Every fixed-scope project reaches a point where the client asks for something that is not in the scope. How that conversation goes determines a lot about the rest of the engagement.',
      '## The failure modes',
      'Saying yes to everything, which turns a profitable project into an unprofitable one and trains the client that scope is decorative.',
      'Saying no rigidly, which makes you a difficult supplier and is usually wrong anyway — some requests are genuinely small, and refusing them to make a point costs more goodwill than the work costs time.',
      '## What we actually do',
      'Answer in the same shape every time: what it would take, what it would displace, and what we recommend. Not yes or no — a decision put back to the client with the information they need to make it.',
      '"That is about two days. We can add it and move the date, or swap it for the reporting screen we scoped, or do it as a follow-up. My recommendation is the swap, because the reporting screen is less useful to you than you think."',
      '## Small things get absorbed, and we say so',
      'Genuinely small requests — an hour, a copy change, a field — get done without ceremony. But we mention that we have done it, once, plainly. Not to invoice for it, but so the client understands scope is being managed rather than ignored.',
      'Silently absorbing everything is how a project ends with a client genuinely surprised that you are unhappy.',
      '## Write it down at the time',
      'Every change, with its decision, in one place both parties can see. Not to build a case — to prevent the end-of-project conversation where two people remember the agreement differently and both are sincere.',
      '## The underlying principle',
      'The client is not trying to get free work. They are trying to get the thing they need, and they usually do not know what a request costs. Making the cost visible converts an adversarial moment into a normal decision, and most clients make sensible decisions once they can see the trade.'
    ]
  },
  {
    slug: 'two-people-is-a-strategy',
    title: 'Staying two people is a strategy, not a stage',
    category: 'studio',
    date: '2026-05-30',
    excerpt:
      'The assumed trajectory is to grow into an agency. We have decided against it, for reasons worth stating.',
    body: [
      'The default narrative for a studio that is doing well is to hire, take on more projects, and become an agency. We are frequently asked when we plan to.',
      'We do not, and the reasoning is specific rather than romantic.',
      '## What clients are buying',
      'The thing clients tell us they value is that they speak to the people who build. Not to an account manager, not to a project lead relaying to a team. That property is destroyed by the first layer of hierarchy, and it is most of our differentiation.',
      'An agency that has grown to twelve people sells something genuinely different. It is a valid business. It is not the business we would be good at.',
      '## What changed the economics',
      'Tooling. Work that would have needed four people two years ago is now genuinely deliverable by two — a two-hundred-page content system, a migration with heavy repetition, generating and maintaining a large amount of structured output.',
      'What has not compressed is discovery, modelling and the client relationship. So the ratio has shifted: a larger share of our time is the part that does not scale by hiring anyway.',
      '## The constraint we accept',
      'We turn down work regularly, including work we would enjoy. Capacity is real and there is no way to flex it upward quickly. That means being deliberate about which projects to take, and being comfortable that a good one will sometimes go elsewhere.',
      '## The risk we carry',
      'Two people is fragile. Illness, a family situation, or one of us being unavailable is a genuine business risk with no redundancy. We manage it by keeping documentation good enough that either of us can pick up the other\'s project, which is a discipline we would probably not maintain otherwise.',
      '## Why we are stating it publicly',
      'Because it sets expectations correctly. A client who needs a team of eight should know that in the first call rather than the fourth, and being clear about size is a faster filter than any qualification process.'
    ]
  },
  {
    slug: 'publishing-your-prices',
    title: 'Publish your prices',
    category: 'studio',
    date: '2026-05-18',
    excerpt:
      'The arguments against are all about protecting the seller. The argument for is that it works.',
    body: [
      'Most agencies do not publish prices. The reasons given are that every project is different, that a number without context is misleading, and that it invites comparison on cost alone.',
      'All partly true. None of them survive contact with what actually happens when you publish.',
      '## What changed for us',
      'The enquiries got better. Not more numerous — better. People who are not in the range self-select out, which saves both sides a call. People who are in the range arrive having already accepted the number, which changes the tone of the first conversation entirely.',
      'The proportion of calls that became projects went up substantially, because the calls that would have ended on price were no longer happening.',
      '## The comparison objection is backwards',
      'The worry is that publishing invites being compared on price. In practice a prospect comparing quotes is going to compare on price whether or not you published one — the difference is whether you were in the comparison at all.',
      'A prospect with a ₹2L budget who cannot tell whether you are a ₹50k shop or a ₹20L one frequently just does not call.',
      '## How to publish without misleading',
      'Starting prices with the scope attached, not a single number. "From ₹75k" means nothing; "from ₹75k for up to eight pages with a CMS, on-page SEO and three revision rounds" is a claim someone can evaluate.',
      'State what is not included, explicitly. Copywriting, photography, ongoing retainers, third-party licences. Most disputes about price are actually disputes about what the price covered.',
      '## The thing that surprised us',
      'Clients quote our own pricing page back to us during scoping, and it functions as a shared reference rather than a negotiation position. Having the tiers written down means the conversation is about which tier this is, not about what the work is worth — which is a much easier conversation for everyone.',
      '## Mind the gap between tiers',
      'A ladder that jumps from ₹20,000 to ₹200,000 leaves everyone in between with nothing to select. We had exactly that gap and it was invisible to us because we were looking at the tiers we wanted to sell rather than the budgets that arrive.',
      'The band a market actually sits in is worth checking against real enquiry data rather than assumption.',
      '## Say what is not included',
      'Most price disputes are not about the number, they are about what the number covered. Copywriting, photography, ongoing retainers, third-party licences — listing the exclusions is as important as listing the price.',
      'It reads as slightly defensive and it prevents the conversation where two people sincerely remember a different agreement.'
    ]
  },
  {
    slug: 'what-a-portfolio-is-actually-for',
    title: 'What a portfolio is actually for',
    category: 'studio',
    date: '2026-05-06',
    excerpt:
      'Not to show your best work. To answer the specific question a prospect is silently asking.',
    body: [
      'The instinct is to show the most visually impressive projects. That optimises for a design award and not for the person deciding whether to email you.',
      'What a prospect is actually asking is narrower: have you built something like my problem, and did it survive contact with reality?',
      '## Show the unglamorous ones',
      'A dense operational CRM full of consignment rows is not a beautiful image and it is a completely convincing one. It proves capability that a marketing site cannot, because nobody produces a screen like that speculatively.',
      'We put internal tools in our portfolio deliberately, screenshotted from the real application running against seeded data, and they generate more relevant enquiries than the prettier work does.',
      '## Say what each project was',
      'Not "a modern platform for a leading client". The client\'s name, the actual problem, the stack, and something specific that was hard. A prospect matching their situation to yours needs the details to match on.',
      '## Include what it cost, if you can',
      'Not always possible, but a range helps enormously and almost nobody does it. It answers the question that otherwise requires a call.',
      '## Order matters more than content',
      'The first three entries do most of the work, and most people order by recency or sentiment. Order by what you want to be hired for.',
      'We reordered ours recently on exactly this basis and found we had buried some of the strongest work at the bottom because its screenshot looked unremarkable at a glance.',
      '## The part people skip',
      'Linking to the live thing. A portfolio entry with no link invites the assumption that it is not live. Where a project genuinely cannot be linked — an internal tool, an NDA — say that explicitly rather than leaving a dead end, because ambiguity reads worse than a private build.',
      '## Check your links still work',
      'Client sites go down, get redesigned by someone else, or lapse. A portfolio linking to a domain that now shows a parking page or an error is worse than no link, and nobody notices because nobody clicks their own portfolio.',
      'We audit ours periodically and found exactly that — a client site returning a fatal error, still linked from our work section as a recommendation.',
      '## Keep the metadata honest',
      'We also had a card whose screenshot showed one brand name while the heading showed another, because the client had rebranded and we updated the image without updating the title.',
      'That drift is invisible to the people who built the page and immediately visible to a prospect. Reviewing your own portfolio as a stranger, once a quarter, catches it.'
    ]
  },
  {
    slug: 'the-client-who-goes-quiet',
    title: 'The client who goes quiet',
    category: 'studio',
    date: '2026-04-24',
    excerpt:
      'A project stalls and it is nobody\'s fault. How we handle the most common non-technical failure.',
    body: [
      'A pattern that recurs regardless of client size: everything is going well, then a decision is needed and the client stops responding. Days pass, then a week. The project is not cancelled and it is not moving.',
      'This is the most common way our projects go wrong and it has almost nothing to do with the software.',
      '## Why it happens',
      'Usually not disinterest. Usually a decision that needs someone who is unavailable, an internal disagreement that has not resolved, a budget question that has gone upward, or simply that the person we work with has a demanding job and this is not their only responsibility.',
      '## What does not work',
      'Polite follow-ups that repeat the question. If the question was answerable it would have been answered, so asking again adds nothing except a small social cost each time.',
      'Also carrying on regardless and building something on an assumption. That converts a delay into rework.',
      '## What we do',
      'Make the cost of the delay visible without making it a complaint. "We are holding at this point; each week of delay moves the date by a week and we have other work booked from the 15th." Factual, not aggressive, and it usually surfaces the real blocker.',
      'Offer a default. "If we do not hear by Friday we will proceed with option B, which is reversible later at about a day\'s work." That is often what unblocks it, because the client\'s difficulty was making the decision, not communicating it.',
      '## Pause formally rather than drift',
      'If it goes past two weeks we propose pausing the engagement with a stated restart cost. Not as a threat — as bookkeeping. A paused project both sides acknowledge is much healthier than a live project neither is working on, and it protects the relationship from the resentment that drift produces.',
      '## What we changed structurally',
      'We now identify, in the first call, who has to approve what. Most quiet periods trace back to an approver nobody mentioned, and knowing about them in advance turns a mystery delay into a scheduled one.'
    ]
  },
  {
    slug: 'nda-first-and-why-it-costs-nothing',
    title: 'NDA-first costs nothing and buys a lot',
    category: 'studio',
    date: '2026-04-12',
    excerpt:
      'We sign before discovery when asked. It is a small thing that changes what clients tell you.',
    body: [
      'We offer to sign a non-disclosure agreement before the discovery conversation, rather than after a proposal is accepted. It is a minor administrative act and it has a disproportionate effect.',
      '## What it changes',
      'What the client says. A founder who has not signed anything describes their business in generalities. The same person after signing describes the actual margin problem, the customer who is threatening to leave, and the reason the last system failed.',
      'That is the information that makes an accurate quote possible. Getting it in the first conversation rather than the fourth compresses the whole engagement.',
      '## Why the reluctance is misplaced',
      'The usual agency hesitation is about being constrained — restrictions on portfolio use, on working with competitors, on reusing generic knowledge. Those are real concerns and they are addressed by reading the document rather than by avoiding it.',
      'We ask for two carve-outs: general knowledge and technique remain ours, and portfolio use is negotiated separately rather than blanket-prohibited. Almost nobody objects.',
      '## What it signals',
      'That we treat their information as belonging to them. For a client who has been burned before — and a lot of them have — that is a meaningful early signal, delivered at close to zero cost.',
      '## The practical version',
      'We keep a short, plain-language mutual NDA ready to send. Not a twelve-page instrument requiring their lawyer, which introduces a delay and makes the gesture worse than not offering.',
      'Two pages, mutual, no unusual terms. It gets signed the same day and the conversation improves immediately.',
      '## Mutual matters',
      'A one-way NDA protecting only the client is common and slightly odd, because we also share things in discovery — pricing structure, how we approach a problem, sometimes what we learned elsewhere in general terms.',
      'Making it mutual costs nothing, is rarely objected to, and sets the relationship as two businesses rather than a supplier being vetted.',
      '## What it does not cover',
      'General knowledge and technique remain ours. Nothing in an NDA stops us describing a pattern we learned in general terms — the posts on this site are drawn from real projects and name clients only where they have agreed.',
      'Being explicit about that distinction up front avoids an awkward conversation later about whether a blog post crossed a line.',
      '## Where it does not apply',
      'Nothing in an NDA stops us describing what we learned in general terms — the patterns in this blog, for instance, are drawn from real projects and name clients only where they have agreed. That distinction is worth being explicit about with a client rather than leaving them to wonder.'
    ]
  }
]

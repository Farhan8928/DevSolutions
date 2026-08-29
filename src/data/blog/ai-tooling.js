/**
 * AI & tooling. Written from running these things daily on client work.
 *
 * Voice: contractions, and a real mix of sentence lengths. Short ones for the
 * point, long winding ones when you're actually explaining something. If every
 * sentence in a paragraph is the same size, rewrite the paragraph.
 */

export const aiTooling = [
  {
    slug: 'the-build-passed-and-everything-was-broken',
    title: 'The build passed and every image disappeared',
    category: 'ai-tooling',
    date: '2026-08-26',
    excerpt:
      'A refactor that compiled cleanly, deployed cleanly, and silently stripped a required wrapper off fifteen objects. Short story about why a green build proves almost nothing.',
    body: [
      'We were reordering the project list on this site. Fifteen entries in an array, each one wrapped in a `make({ ... })` call that attaches the screenshot path, the favicon and a chain of fallback image URLs. A script rewrote the order.',
      'The script sliced each block starting at the first bracket it found. First bracket in `make({` is the paren. So every block came out as `({ ... })` — a bare object with the `make` shaved off the front.',
      '## And everything looked fine',
      'That\'s valid JavaScript. An expression in parentheses evaluates to the object inside it. Array still had fifteen entries. Every title, summary, year and tech chip rendered exactly as before, because those are literal properties sitting on the object.',
      'What vanished were the derived ones. `make()` is what attaches `local`, `favicon`, `shot` and `logo`, so without it they were all undefined, the image component walked an empty list of sources, and it rendered nothing at all.',
      'Build passed. Bundler had no opinion — nothing wrong with the syntax. The deploy would have gone straight out.',
      '## What caught it',
      'Not the build. Not looking at the page either, and this is the embarrassing part: the first screenshot showed a blank purple panel where the preview should have been, and we looked directly at it and blamed lazy loading.',
      'Plausible. Wrong.',
      'What caught it was the network tab. Zero image requests. Not slow, not failed — the browser was never asked for a single image. Lazy loading doesn\'t explain that. Nothing explains it except the URLs never existing in the first place.',
      '## What we took from it',
      'A green build tells you the code parses and the bundler resolved its imports. It tells you nothing about whether the code still does what it did yesterday. We knew that. We hadn\'t felt it recently.',
      'The code fix was trivial — split on the `make({` boundary instead of on bracket depth, then assert that the count of `make(` occurrences is unchanged after the rewrite.',
      'The process fix was smaller and worth more. When something looks wrong, check the mechanism before you accept the comfortable explanation. We had one available and we took it.',
      'Now any script that rewrites source carries an assertion about what it\'s meant to preserve. Reorder fifteen things, end up with fourteen, refuse to write the file.'
    ]
  },
  {
    slug: 'claude-code-copilot-cursor-which-one-for-which-job',
    title: 'Claude Code, Copilot, Cursor: which for which job',
    category: 'ai-tooling',
    date: '2026-08-14',
    excerpt:
      'Three tools with genuinely different shapes. We run all three. The choice is less about which is best than what kind of task is in front of you.',
    body: [
      'The three that matter in 2026 are structurally different, not cosmetically. Cursor is an AI-native IDE. Copilot is an extension inside the editor you already use. Claude Code is a terminal agent with no editor at all.',
      'Shortest accurate summary we\'ve seen: Copilot makes you faster, Claude Code does the task for you, and Cursor lets you slide between the two in one window.',
      '## Where each earns its place',
      'Copilot is the best value for inline completion. If most of your day is writing code you already know how to write and you want the next fifteen characters predicted well, it\'s hard to beat. Cheapest of the three, too.',
      'Cursor is the best single-window experience. Multi-file edits, a composer for bigger changes, an agent mode when you want to hand over a whole feature. For a lot of teams that covers a normal working day without reaching for anything else.',
      'Claude Code has the highest ceiling and the least hand-holding. It reads the repo, runs commands, executes your test suite and revises itself based on what came back. Different category of tool from an autocomplete.',
      '## What we actually do',
      'We don\'t pick one.',
      'Editor for the work you\'re thinking through as you go. Agent for the tasks where the decisions are already made and the work is executing them consistently across forty files — a rename, a migration, generating pages from a data file, running an audit and fixing what it finds.',
      'The question we use: do we want to stay in the loop? Making design calls as we go means an editor. Decisions made, forty places to apply them, means an agent and a good way to review what it did.',
      '## The bit the comparisons skip',
      'All three move your bottleneck from writing to reviewing. That\'s a real trade and it isn\'t free.',
      'A tool that produces four hundred lines in a minute hasn\'t saved you anything unless you can also judge four hundred lines in a minute. You can\'t.',
      'So we cap the size of a change an agent makes unsupervised by how fast we can verify it. Not by how fast it can produce it.'
    ]
  },
  {
    slug: 'ai-writes-faster-than-you-can-read',
    title: 'AI writes faster than you can read. That\'s the problem.',
    category: 'ai-tooling',
    date: '2026-08-02',
    excerpt:
      'Generation stopped being the constraint about two years ago. Review became it. Most teams never adjusted.',
    body: [
      'For most of this job\'s history, producing code was the slow part. You knew roughly what you wanted and the time went into typing it, looking things up, and fixing what you typed. Review was cheap because the volume was human-sized.',
      'That flipped. An agent produces a week of typing in an afternoon. It does not produce a week of judgement in an afternoon, and neither do you.',
      '## What it looks like when it goes wrong',
      'Never dramatic. It\'s a pull request with eleven files where nine are obviously fine, so the reviewer skims the tenth and approves the eleventh without really reading it.',
      'Nothing breaks that day. Three weeks later something behaves oddly and the explanation is sitting in the file nobody read.',
      'It compounds because the code looks confident. Uniformly formatted, plausibly named, none of the tells that normally make a reviewer slow down — no ragged indentation, no half-finished comment, no obviously tired variable name written at two in the morning. It all reads like somebody who knew what they were doing.',
      '## What we changed',
      'We cap unreviewed change size. More than a handful of files and it goes in a branch with a written summary of what it was meant to do, and the review starts from the summary. Reading a diff cold is the slowest possible way to understand a change.',
      'We ask for mechanism, not outcome. "It works now" doesn\'t pass. "The images were missing because the wrapper that attaches their URLs was being stripped" does, because somebody can check it.',
      'And we lean much harder on the things that verify themselves. Assertions inside scripts that rewrite code. An audit that fails the build on duplicate titles. A check that every internal link resolves.',
      'None of that is new practice. It\'s just worth a lot more now that the volume of change per hour went up an order of magnitude.',
      '## The blunt version',
      'If your team adopted AI tooling and your review process didn\'t change at all, you didn\'t get faster. You moved the same risk somewhere harder to see.'
    ]
  },
  {
    slug: 'why-we-still-write-the-plan-by-hand',
    title: 'Why we still write the plan by hand',
    category: 'ai-tooling',
    date: '2026-07-21',
    excerpt:
      'We let agents write a lot of our code. We don\'t let them decide what to build, and it isn\'t sentimentality.',
    body: [
      'An agent is very good at "how do I do this" and structurally poor at "should this exist". It\'ll implement whatever you describe, competently, including things that shouldn\'t be built.',
      'Our expensive mistakes have never been implementation mistakes. They were building the wrong screen, modelling data in a shape that fights the business, or shipping a feature the client asked for and didn\'t need. Better code catches none of those.',
      '## What a plan is for',
      'Writing it by hand forces questions an agent will never raise on its own. What\'s the smallest version a user could benefit from? What breaks if this number doubles? Who owns this record when two people edit it? What happens on a bad network?',
      'On a logistics CRM we built, the whole shape of the product came out of one question: is the primary object a consignment or a party? Get that right and the outstanding ledger falls out naturally. Get it wrong and you\'ve built a system that can tell you where a parcel is but not who owes you money for it — which is the thing the business actually runs on.',
      'No agent asks that. It isn\'t a coding question. It\'s a question about the business, and answering it means having sat with the person who does the job.',
      '## Where the agent comes in',
      'Once the plan exists, most of the work is execution, and agents are excellent at execution. Scaffolding modules, writing the CRUD, wiring routes, generating the migration, filling in tests for paths we specified. Genuinely faster, and the quality holds because the decisions were already made.',
      'Humans decide what\'s true about the domain. Agents implement what follows. Every time we\'ve blurred that line because it was quicker in the moment, we paid later.',
      '## On "vibe coding"',
      'Prompting until it looks right works, and it works well, for a prototype you plan to throw away.',
      'Trouble is prototypes that work don\'t get thrown away. They get a deadline attached and become the product.',
      'If you\'re keeping it, the plan has to exist somewhere. Written down beforehand, or reverse-engineered painfully later out of code nobody remembers deciding on.'
    ]
  },
  {
    slug: 'ai-is-great-at-the-boring-eighty-percent',
    title: 'Great at the boring 80%, dangerous in the last 20%',
    category: 'ai-tooling',
    date: '2026-07-09',
    excerpt:
      'Where these tools help isn\'t evenly distributed. Knowing where the cliff is matters more than knowing the average.',
    body: [
      'Most software isn\'t clever. Forms, lists, validation, mapping one shape of data onto another, wiring a button to a request. That work is well represented in training data, has a right answer, and gets done faster with an agent by a wide margin.',
      'Then there\'s the part specific to your problem. The pricing rule with the exception nobody documented. The reconciliation that has to balance to the paisa. The state machine where two transitions are illegal for reasons that only make sense if you know the regulator.',
      'Looks similar on the surface. Behaves completely differently.',
      '## Why the last 20% is worse than no help',
      'In the boring 80%, a wrong answer is usually obviously wrong. Doesn\'t compile, form won\'t submit, you fix it in a minute.',
      'In the specific 20%, a wrong answer is plausible. The code runs. The numbers come out. They\'re subtly incorrect in a way that surfaces at month end, in production, in front of the client.',
      'That isn\'t a small difference in cost. It\'s a different category of failure.',
      'We\'ve seen it sharpest around money. A ledger that almost balances is worse than no ledger, because people trust it. An agent will happily produce a payments flow that nails the happy path and quietly does the wrong thing on a partial refund.',
      '## How we split it',
      'Correctness checkable by reading it? Agent does it, normal review.',
      'Correctness requires knowing the domain? A human writes the core and the agent fills in around it.',
      'The test: can I confirm this is right by reading it, or do I need to know something the code doesn\'t contain? If it\'s the second, that isn\'t agent work — however routine it looks.',
      '## The honest version of the productivity claim',
      'The gain is real and it\'s large, but it\'s concentrated.',
      'If most of your project is CRUD and layout you\'ll feel like the tooling doubled your speed. If most of it is one hard domain problem with a little UI around it, you\'ll feel like it barely helped — because the part it helped with was never the part taking the time.'
    ]
  },
  {
    slug: 'reading-a-diff-you-did-not-write',
    title: 'Reading a diff you didn\'t write',
    category: 'ai-tooling',
    date: '2026-06-27',
    excerpt:
      'Reviewing generated code is a different skill from reviewing a colleague\'s. What we\'ve found actually works.',
    body: [
      'When you review a colleague\'s PR you\'re carrying context you don\'t notice using. You know what they were trying to do, roughly how they think, which parts of the codebase they know well. That does a lot of quiet work directing your attention.',
      'None of it applies to generated code. No intent to infer, no personal style to calibrate against, no pattern of past mistakes to watch for. Every line has the same flat plausibility.',
      '## Start from intent, not the diff',
      'Biggest single improvement we made: require a written statement of what the change was supposed to do, before looking at what it did.',
      'Then review becomes a comparison. Does this accomplish that, and does it do anything else?',
      'Anything the diff does that isn\'t in the statement is the interesting part. That\'s where surprises live — the helper refactored on the way past, the default that changed, the import quietly dropped.',
      '## Watch the deletions',
      'Generated changes are additive and confident, which makes deletions disproportionately worth your attention. A line disappeared because it was in the way of the new approach, and "in the way" is sometimes a polite way of saying "was handling a case the new approach doesn\'t".',
      'Our worst near-miss on this site was exactly that. A four-character identifier removed from fifteen objects by a rewriting script. It didn\'t look like a deletion in the diff. It looked like a reordering.',
      '## Trust the machines for counting',
      'Human review is bad at counting and good at judgement. So push counting to scripts.',
      'Does every page still have a unique title? Does every internal link resolve? Did the number of wrapped entries stay the same? Are there still fifteen of the thing there were fifteen of?',
      'That frees the human pass for what a script can\'t do: is this the right approach, does this name mean what it says, will the next person understand why it exists. Those are worth your attention, and they\'re the first things skipped when you\'re also trying to be a linter.'
    ]
  },
  {
    slug: 'ai-generated-tests-are-the-dangerous-kind',
    title: 'AI-generated tests are the dangerous kind',
    category: 'ai-tooling',
    date: '2026-06-15',
    excerpt:
      'A passing suite tells you something. A generated suite that passes might only be telling you the code does what the code does.',
    body: [
      'Ask an agent to write tests for an existing function and you get thorough, well-named, passing tests in seconds. It\'s one of the most satisfying things these tools do and one of the easiest to get wrong.',
      'The problem is direction. A test should encode what the code *should* do, derived from the requirement. A test generated from the code encodes what it *already* does, derived from the implementation.',
      'Those look identical when the implementation is correct. They\'re worthless when it isn\'t.',
      '## The bug gets frozen in',
      'Function has an off-by-one? Generated tests assert the off-by-one, because that\'s what was observed. Now the bug has a test protecting it, and the next person to fix it sees a failing suite and assumes they broke something.',
      'That\'s worse than no test. A passing suite is a claim — it tells the next developer this behaviour was considered and is intended. Tests generated from an implementation make that claim without it being true.',
      '## What we do instead',
      'Tests come from the requirement. Which means writing the assertions first, in plain language, before the implementation exists or at least without looking at it.',
      'Those can absolutely be handed to an agent to turn into code. The value is in deciding what should be true, not in typing `expect`.',
      'For code that already exists with no tests, we do use agents — then read every assertion and ask one thing of each: would I still want this to be true if I rewrote the function from scratch? Anything that\'s just a restatement of the current implementation gets deleted.',
      '## Where they\'re genuinely great',
      'Edge case enumeration. Ask what inputs might break this and you get a useful list. Empty arrays, nulls, huge values, unicode, negatives, dates on a boundary.',
      'Real strength, because breadth is exactly what humans are bad at and machines are good at.',
      'So: let it suggest the cases, decide the expectations yourself. The list is the valuable output. The assertions are the part you own.'
    ]
  },
  {
    slug: 'the-context-window-is-not-your-bottleneck',
    title: 'The context window isn\'t your bottleneck',
    category: 'ai-tooling',
    date: '2026-06-03',
    excerpt:
      'Bigger windows didn\'t make agents better on messy code. They made it more obvious the mess was the problem.',
    body: [
      'Every increase in context size lands with the implication that the tool can now understand your whole project.',
      'In practice, what decides how well an agent works on a codebase is roughly what decides how well a new senior hire works on it in their first week.',
      'Can you tell what a module does from its name and exports? Are the boundaries real, or does everything import everything? Is there one obvious place a given change belongs?',
      'Those properties help humans and agents for the same reason. Less to hold in your head at once.',
      '## What helps',
      'Names that describe purpose, not shape. `areas.js` holding location data with per-service copy is findable. `data2.js` isn\'t, at any context size.',
      'Comments that explain why, not what. An agent can read what the code does. It can\'t read that this branch exists because a payment provider returns a success status for a failed transaction — not unless somebody wrote that down.',
      'Small explicit contracts between modules. A function taking four clear arguments and returning a documented shape can be used correctly without reading its body. A function taking a config object with fifteen optional keys that behaves differently depending on which are present can\'t be used correctly by anyone.',
      '## The uncomfortable bit',
      'Teams already disciplined about structure got a genuine step change. Teams with a large tangled codebase got much less, and mostly concluded the tools were overrated.',
      'Both experiences are real. The difference isn\'t the tool.',
      'A codebase where a change requires understanding six implicit relationships is a codebase where an agent makes plausible wrong changes. So does a person.',
      '## What we do on day one',
      'Spend the first day on structure that\'ll still make sense in a year. Clear module boundaries, one obvious home per concern, a short document covering the decisions that aren\'t visible in the code.',
      'Pays back on human onboarding, then pays back again every time we point an agent at it.',
      'Best investment in AI-assisted development isn\'t a better tool or a bigger window. It\'s a codebase somebody can read.'
    ]
  },
  {
    slug: 'what-vibe-coding-costs-you-in-month-six',
    title: 'What vibe coding costs you in month six',
    category: 'ai-tooling',
    date: '2026-05-22',
    excerpt:
      'Prompting until it looks right is a good way to build a prototype. The bill arrives when the prototype doesn\'t get thrown away.',
    body: [
      'Describing what you want and accepting what comes back is fast, and for exploring an idea it\'s the right move. You\'ll learn more in an afternoon than a week of design documents would teach you.',
      'The failure isn\'t technical. It\'s organisational.',
      'A prototype that works gets shown to somebody. Somebody attaches a date. Nobody ever schedules the rewrite, because from the outside it already works.',
      '## What piles up',
      'First you lose a shared model of how the system fits together. Nobody decided the architecture so nobody can explain it. Changes get made by describing them to an agent, because that\'s the only interface anyone has to the code — including the person who paid for it.',
      'Then you lose defensibility. Client asks why the system does something specific and the honest answer is that nobody chose it. Survivable in a side project. Genuinely bad in anything handling money or patient records.',
      'Third, the codebase stops being legible. Which, as above, is exactly the property that makes agents work well. So the tool that got you here works less well the longer you rely on it this way.',
      '## The version that works',
      'Prototype by vibe. Absolutely. Then, before the thing gets a deadline, spend a short block deliberately reconstructing the decisions — what are the core objects, what are the rules, where are the boundaries. Write it down. Refactor toward it.',
      'Two or three days on something that took two weeks to prototype. Converts a demo into something a team can maintain.',
      'Much cheaper than doing it in month six under delivery pressure. Enormously cheaper than not doing it.',
      '## How to know you\'re past the line',
      'Can somebody other than the original author make a non-trivial change without asking an agent to explain the code first?',
      'If not, you don\'t have a codebase. You have a transcript.'
    ]
  },
  {
    slug: 'when-we-turn-the-agent-off',
    title: 'When we turn the agent off',
    category: 'ai-tooling',
    date: '2026-05-10',
    excerpt:
      'Short list of where we work without assistance, and why each one earns the slowdown.',
    body: [
      'We use these tools constantly, which makes it worth being clear about where we don\'t. The exceptions are where the reasoning lives.',
      '## Money at rest',
      'Ledgers, settlement, reconciliation, refunds.',
      'Not because an agent writes bad code here. Because the failure is silent and expensive. We want a human to have derived the arithmetic and to be able to explain it without pointing at the implementation.',
      'Related rule: nobody merges a change to money handling they can\'t explain on a whiteboard. If the explanation needs the code, then the code is the only place the logic exists, and that isn\'t good enough for something a client gets audited on.',
      '## Security boundaries',
      'Auth, authorisation, sessions, anything deciding who sees what.',
      'Generated code here is usually correct for the case you described and quietly permissive for the cases you didn\'t mention. Role checks right for three roles and wrong for the fourth is the classic.',
      '## The first version of a data model',
      'Covered at length elsewhere. Briefly: the shape of your core entities decides what the system can express for its entire life. Make it deliberately, with the person who does the job, before any code exists.',
      '## When we don\'t understand the problem yet',
      'Most important one and easiest to miss.',
      'If we\'re not clear what we\'re building, an agent resolves that ambiguity for us — invisibly, by picking a plausible reading and implementing it well. Now the ambiguity is buried in working code instead of sitting visibly in a conversation where somebody might have questioned it.',
      'Confusion is information. When we catch ourselves prompting around not understanding something, that\'s the signal to stop typing and go ask the client a question.',
      '## What this isn\'t',
      'It isn\'t a claim that handwritten code is better. In every one of these cases we still use agents for the surrounding work — tests, plumbing, admin screens.',
      'The rule is narrower than it looks. Humans own the decisions whose consequences are hard to see. Everything downstream is fair game.'
    ]
  },
  {
    slug: 'guardrails-that-let-you-move-fast',
    title: 'The guardrails that actually let you move fast',
    category: 'ai-tooling',
    date: '2026-04-28',
    excerpt:
      'Speed comes from verifying quickly, not generating quickly. These are the checks that earn their keep.',
    body: [
      'Every check here exists because something got through without it. None of them are clever. The value is that they run automatically and fail loudly, which lets us accept bigger changes without reading every line with equal attention.',
      '## Assertions inside scripts that rewrite code',
      'If a script transforms source files, it should state what it expects to be true afterwards and refuse to write if it isn\'t.',
      'A reordering script that starts with fifteen wrapped entries should end with fifteen wrapped entries. This one check would have caught the worst bug we shipped into a working tree this year.',
      '## Build-time content limits',
      'On this site, titles over 65 characters and descriptions over 165 throw at build rather than getting reported by an audit afterwards.',
      'The difference matters. A warning in a log is something you scroll past. An exception is something you fix.',
      '## Link integrity across generated pages',
      'Generate two hundred pages that link to each other and one wrong slug pattern breaks links from dozens at once.',
      'We walk every generated page, collect every internal href, assert each target exists. Caught two systemic mistakes no amount of spot-checking would have found.',
      '## Duplicate detection on anything templated',
      'Compare generated pages against each other, fail on near-duplicates. Partly an SEO concern, mostly a quality one. If two pages are 90% identical, one of them shouldn\'t exist.',
      '## A real browser, not just a build',
      'A passing build means the bundler was happy. We load the page, check for console errors, failed requests, and whether the things that should be visible are visible.',
      'This is where a green build gets caught lying.',
      '## The principle',
      'Each of these turns a class of mistake from "something a careful reviewer might notice" into "something that can\'t reach production".',
      'That\'s the only way a speed increase turns into shipped software instead of deferred debugging. The tools raised how fast you can write. These raise how fast you can be confident.'
    ]
  },
  {
    slug: 'we-do-not-let-ai-name-things',
    title: 'We don\'t let AI name things',
    category: 'ai-tooling',
    date: '2026-04-16',
    excerpt:
      'Naming is the cheapest documentation you\'ll ever write, and it\'s where generated code is most reliably mediocre.',
    body: [
      'Generated names are never wrong, exactly. `handleSubmit`. `processData`. `UserService`. `utils.js`.',
      'Grammatical, conventional, almost no information.',
      'Reasonable default for a tool that doesn\'t know your domain. Bad default for a codebase somebody has to work in for three years.',
      '## Names are where the domain lives',
      'In a logistics system we built, the objects are consignments, parties, biltis and lorry receipts. Those are the words the business uses.',
      'A developer reading `consignment.partyId` understands something real. The same field as `order.customerId` would have quietly imported assumptions from e-commerce that don\'t hold here — a party can be sender on one consignment and receiver on another, which a "customer" can\'t.',
      'That isn\'t pedantry. Getting the vocabulary right is how the code stays aligned with the business as both change. Wrong names drift into wrong models.',
      '## The specific failure',
      'Generated code reaches for the most common name for a shape rather than the correct name for a concept.',
      'Anything holding a list becomes `items`. Anything transforming becomes `format` or `parse`. Anything shared becomes `utils`.',
      'You end up with names describing the data structure instead of the meaning, so every reader reconstructs the meaning from context every single time. Invisible per instance. Enormous in aggregate.',
      '## What we do',
      'Name the core concepts ourselves, early, using the language the client uses in meetings. Those go into the plan before any code exists. Agents are perfectly good at using an established vocabulary consistently.',
      'For anything an agent named on its own, renaming is one of the safest refactors available and one of the highest-value. Costs a minute, pays every time somebody opens the file.',
      '## Quick test',
      'Read a function name and its arguments out loud. Would someone from the client\'s ops team roughly understand what it does?',
      'Yes means the code speaks the business\'s language. Needs translation means you\'ve got a layer of unnecessary distance between the software and the problem.'
    ]
  },
  {
    slug: 'agents-and-legacy-code',
    title: 'Agents on legacy code: where they help, where they lie',
    category: 'ai-tooling',
    date: '2026-04-04',
    excerpt:
      'Point an agent at an old codebase and you get confident explanations. Some of them are true.',
    body: [
      'Appealing pitch. Inherit an undocumented system, ask an agent what it does, get an answer in minutes instead of weeks.',
      'Works well for some questions and badly for others, and the difference is worth knowing before you rely on it.',
      '## Genuinely good at',
      'Tracing. "Where does this value come from" and "what calls this" are mechanical questions with checkable answers, and having them answered instantly is a real acceleration on unfamiliar code.',
      'Summarising a file. Reading four hundred lines and getting an accurate description of what the module broadly does is reliable, and it\'s exactly the tedious part of onboarding.',
      'Finding every place a pattern occurs. Better than grep, because it catches variations a literal search misses.',
      '## Where it will confidently mislead you',
      'Why questions.',
      'Legacy code is full of decisions that look arbitrary and aren\'t. A workaround for a vendor bug. A constraint from a regulation. A shape that exists because of a migration in 2019.',
      'An agent will produce a plausible rationale, because a plausible rationale is what you asked for. What it won\'t say is "somebody did this for a reason that isn\'t in the repository" — which is very often the true answer.',
      'Dead code. Deciding something is unused means knowing about callers outside the codebase. A cron job, another service, a client integration. Confidently deleting code an agent called dead is a reliable way to cause an incident.',
      '## How we use it on inherited systems',
      'For mapping, heavily. First day is usually an agent producing a structural picture — modules, entry points, data flow, where money touches. That genuinely compresses a week.',
      'For decisions, not at all until we\'ve spoken to somebody who was there. When nobody was, we treat every unexplained oddity as load-bearing until proven otherwise, and we write down what we learn, because the next person deserves better than we got.'
    ]
  },
  {
    slug: 'what-ai-tooling-costs-a-two-person-studio',
    title: 'What AI tooling costs a two-person studio',
    category: 'ai-tooling',
    date: '2026-03-23',
    excerpt:
      'Real numbers on the subscriptions, where the spend goes, and whether it pays for itself at our size.',
    body: [
      'Published pricing sits about where it has for a while. Copilot around ten dollars a month per seat. Cursor around twenty. Claude Code from twenty up to a couple of hundred depending on tier.',
      'For two people, tooling is a rounding error against the cost of our own time. The only question worth asking is whether it changes what we can take on.',
      '## Where the money goes',
      'Not evenly. Agent tiers cost most and get used in bursts — a migration, a big generation task, an audit-and-fix pass across a codebase. Design-heavy or client-heavy weeks barely touch them.',
      'Inline completion is the opposite. Modest cost, used every day, least dramatic in what it does. Also the one we\'d miss first, which says something useful about where the steady value sits.',
      '## What it changed about what we can sell',
      'Scope. Work we\'d have declined as too large for two people is now viable. Generating and maintaining a two-hundred-page content system, say. Or a migration with a lot of mechanical repetition.',
      'What it hasn\'t changed is our capacity for the hard parts. Discovery, data modelling, the conversation where you find out what the client actually needs — those take exactly as long as they did.',
      'So the mix shifted. More of the calendar is thinking now, less is typing.',
      '## Does it pay for itself',
      'At our size, comfortably. But not for the reason people usually give.',
      'It isn\'t that we write more code per day. It\'s that two people can credibly deliver things that used to need four, which changes what we can quote for and which clients we can serve at all.',
      'The trap would be pricing as though the labour saving is the product. It isn\'t. Clients are paying for decisions and accountability, and neither of those got cheaper.'
    ]
  },
  {
    slug: 'teaching-a-clients-team-to-use-ai-safely',
    title: 'Handing a codebase to a team that uses AI',
    category: 'ai-tooling',
    date: '2026-03-11',
    excerpt:
      'We transfer source on day one of go-live. Increasingly the team receiving it maintains it with agents, which changes what good handover looks like.',
    body: [
      'Our contracts transfer everything at go-live. Code, designs, infrastructure, deploy access.',
      'That always meant writing a handover a human could follow. Now it also means one an agent can follow, because that\'s realistically how a lot of the maintenance will happen.',
      'Turns out these are the same document done well. But a few things matter more than they used to.',
      '## Write down decisions, not structure',
      'A README describing the folder layout is close to useless — an agent derives that in seconds.',
      'What it can\'t derive is why the ledger uses integers of paise instead of floats, or why one module deliberately doesn\'t use the shared client. Those are the things that get accidentally "cleaned up" six months later.',
      'We keep a short decisions file. Each entry is two or three sentences. What we chose, what we rejected, what would have to change for it to be revisited.',
      '## Make the invariants executable',
      'Anything the system relies on being true should be a check, not a sentence.',
      'Every generated page must have a unique title? That\'s an assertion in the build. A script must preserve a count? It asserts the count.',
      'A prose warning gets read once. A failing build gets respected forever.',
      'This matters much more with agent-assisted maintenance, because an agent has no memory of your warning and no instinct that an area is dangerous. The guardrails are the memory.',
      '## Say what\'s load-bearing',
      'We mark the areas where we\'d want a human thinking carefully. Money, permissions, anything with a regulator attached.',
      'Not to forbid tooling there. So the next team knows which files deserve a slower review, in a codebase where everything looks equally tidy.',
      '## Why we bother',
      'Partly it\'s right for a client who owns the asset. Practically, it\'s also self-interested.',
      'The systems that come back to us for a second phase are the ones the client\'s team could keep working in. The ones that decay into something nobody wants to touch don\'t generate more work — they generate a rewrite quote from somebody else.'
    ]
  },
  {
    slug: 'ai-and-the-junior-developer-question',
    title: 'The junior developer question, honestly',
    category: 'ai-tooling',
    date: '2026-02-27',
    excerpt:
      'If agents do the work juniors used to do, where do seniors come from? We don\'t have a full answer, but the popular one is wrong.',
    body: [
      'The argument: juniors learned by doing routine work, agents now do routine work, so the pipeline producing seniors is broken.',
      'Real concern. Stated too simply.',
      '## What juniors were actually learning',
      'Not typing.',
      'The value in writing your hundredth CRUD form was never the form. It was accumulating a sense of what usually goes wrong, which patterns hurt later, and how the pieces of a system connect. That came from the activity around the typing — being reviewed, having to explain a decision, watching something you wrote fail in production.',
      'None of that is removed by agents. What\'s removed is the specific mechanism by which it used to happen, which was volume of repetition.',
      '## What we\'ve seen work',
      'Reviewing generated code is a surprisingly good teacher, done properly. You read code you didn\'t write, form a judgement about whether it\'s right, and articulate why. That\'s close to the core skill of a senior engineer, and juniors reach it earlier than they used to.',
      'What doesn\'t work is a junior accepting generated code because it passes. That produces somebody who can operate a tool and can\'t evaluate its output, and the gap shows the second something is subtly wrong.',
      '## The part we\'re less sure about',
      'Debugging under pressure is still learned by suffering, and there\'s genuinely less suffering available now.',
      'Fewer hours staring at something that won\'t work means fewer chances to build the intuition that makes a senior fast at diagnosis.',
      'Our partial answer is to not rescue people too quickly, and to spend the time on mechanism rather than fixes. "Why did that happen" instead of "here\'s the line". Slower. We think it\'s the part that doesn\'t compress.',
      '## What we\'d tell somebody starting now',
      'Learn to read critically before you learn to generate quickly.',
      'The scarce skill in 2026 isn\'t producing code. It\'s judging it — and that gets built by reading a lot of code, forming opinions about it, and being told when the opinions are wrong.'
    ]
  },
  {
    slug: 'the-commit-message-problem',
    title: 'Nobody writes commit messages any more',
    category: 'ai-tooling',
    date: '2026-02-15',
    excerpt:
      'Generated commit messages describe the diff. The diff is right there. A small complaint about a real loss.',
    body: [
      'A generated commit message tells you a function was added, a parameter renamed, a test updated.',
      'All accurate. All visible by looking at the commit.',
      'What a good commit message contains is the thing that isn\'t in the diff. Why. Why now, why this way, what was tried first, what this is a workaround for. That lives in the author\'s head at the moment of committing, and if it doesn\'t get written down it\'s gone.',
      '## Where it bites',
      'Six months later somebody runs blame on a strange-looking line.',
      'Good case: "revert to the manual mapping — the library drops the timezone on dates before 1970, see issue 4412".',
      'Common case: "update date handling in user service".',
      'The second is worse than nothing, because it looks like an answer. The reader stops looking, assumes there was no particular reason, removes the workaround.',
      '## Not really about AI',
      'Plenty of humans wrote terrible commit messages long before any of this.',
      'What changed is that generating a plausible one costs nothing, so the small friction that used to prompt a moment of thought is gone. When writing the message took thirty seconds, you sometimes used them to think.',
      '## What we do',
      'Body text is written by a person or not at all. Subject line can be generated — it genuinely is just a summary of the diff and that\'s fine.',
      'But if there\'s a reason, a constraint, or a rejected alternative, that goes in by hand.',
      'And "nothing to add" is a legitimate answer. Most commits don\'t need explaining. The point is that somebody made that judgement, rather than a paragraph of accurate description appearing automatically and crowding out the question.',
      '## The broader thing',
      'A lot of a codebase\'s value lives in the record of why it looks the way it does. Commit history, decision notes, the comment above the odd branch.',
      'Those are what make a system maintainable by people who weren\'t there. They\'re also the cheapest artefacts to fake and the most costly to fake.'
    ]
  },
  {
    slug: 'prompting-for-code-you-will-keep',
    title: 'Prompting for code you intend to keep',
    category: 'ai-tooling',
    date: '2026-02-03',
    excerpt:
      'The difference between a prompt that produces a demo and one that produces something maintainable is mostly constraints.',
    body: [
      'Most prompting advice is about getting a working result. That\'s the easy part now.',
      'Harder question: getting a result you\'ll still be happy with after a year in production, when somebody else has to change it.',
      '## Say what it must not do',
      'The most useful thing you can add is a constraint, not a description.',
      '"Don\'t add a dependency." "Use the existing http client, not fetch directly." "Keep this in one file." "No new abstractions, inline it."',
      'Without those, output drifts toward the most common solution in training data — which usually means more layers, more dependencies and more configurability than your case needs. Generic is the default. Specific has to be asked for.',
      '## Show the neighbours, not a style guide',
      'Describing your conventions in prose gets you an approximation of them. Showing two files that follow the convention gets you code that matches.',
      'Highest-leverage habit we have. Point at the neighbours.',
      '## Ask for the smallest version',
      'Request a complete feature and you get something complete and speculative — options you didn\'t ask for, extensibility hooks you may never need.',
      'Request the narrowest thing that solves today\'s problem and you get something readable in one sitting.',
      'You can always ask for more. Removing speculative generality later is much harder, because by then it has callers.',
      '## Make it explain the trade-off',
      'Ask for an approach plus the alternative, with a reason for the choice. Costs nothing and changes the quality of the review.',
      'Sometimes the rejected alternative is obviously the one you wanted. More often the explanation surfaces an assumption you didn\'t know was being made.',
      '## The underlying idea',
      'You\'re not trying to get code out of a machine. You\'re trying to get a specific decision implemented consistently.',
      'The more of the decision you supply, the less gets made for you by whatever was statistically most common. It\'s those unnoticed defaults, accumulated across a project, that turn into a codebase nobody chose.'
    ]
  },
  {
    slug: 'what-we-automate-and-what-we-refuse-to',
    title: 'What we automate and what we refuse to',
    category: 'ai-tooling',
    date: '2026-01-22',
    excerpt:
      'A working list with the reasoning. Mostly it comes down to whether a mistake announces itself.',
    body: [
      'We automate aggressively. The exceptions aren\'t about craft. They\'re about how a failure would surface.',
      '## Automated without hesitation',
      'Anything with a mechanical, checkable output. Generating pages from a data file. Capturing screenshots. Downloading and resolving assets. Running audits. Reformatting. Migrations with a verifiable before and after. Bulk renames.',
      'Common property: if it goes wrong, something visibly breaks or a check fails. Cost of a mistake is a few minutes.',
      '## Automated with a mandatory gate',
      'Anything that writes source code. Anything changing configuration for a deployed environment. Anything touching a database schema.',
      'All of these can go wrong quietly, so the automation produces a change and a human approves it.',
      'Important detail: the review covers the intent as well as the diff. An agent reordering an array should say it\'s reordering an array, so that a change of any other kind stands out.',
      '## Not automated',
      'Anything that deletes client data.',
      'Any script that resets or seeds a production database. We\'ve seen how close that comes to a catastrophe, and the guard isn\'t a confirmation prompt — it\'s not writing the script to point there at all.',
      'Sending anything to a client. A draft can be generated. Pressing send is a decision about a relationship and it belongs to a person who\'ll own the consequences.',
      'Deciding something is done. A passing test suite is evidence, not a verdict.',
      '## The rule underneath',
      'Automate where a mistake is loud. Gate it where a mistake is quiet. Refuse where a mistake is irreversible.',
      'Most bad automation decisions come from evaluating the happy path — how much time does this save when it works — instead of the failure. The question that matters is: if this does the wrong thing, how long before anybody notices, and what has it cost by then?'
    ]
  },
  {
    slug: 'the-agent-that-never-says-i-dont-know',
    title: 'Pair programming with something that never hesitates',
    category: 'ai-tooling',
    date: '2026-01-10',
    excerpt:
      'The most useful signal a colleague gives you is doubt. Agents don\'t have it, so you have to supply it.',
    body: [
      'Ask a colleague something outside their area and you get a hedge. "I think so, but check with someone who knows that module."',
      'That hedge is enormously valuable. It tells you exactly how much to trust the answer and what to do next.',
      'Agents answer everything in the same register. A question about a well-known framework API and a question about your bespoke internal convention read identically, and one of them is a guess.',
      '## Where it costs you',
      'Anything project-specific that isn\'t visible in the files it read. Business rules. Why a value is hardcoded. Whether a service is still in use. What a client agreed to in a meeting.',
      'You get a confident plausible answer assembled from context — and confidence is exactly the wrong signal for information the model doesn\'t have.',
      'The dangerous version is when the guess is nearly right. A subtly wrong description of a business rule is much harder to catch than an obviously wrong one, because there\'s nothing to trip over.',
      '## Supplying the doubt yourself',
      'Before accepting any explanation, ask: could this have been derived from what it can see?',
      'If the answer\'s in the code, fine. If it depends on a decision somebody made in a meeting, it\'s a guess wearing the costume of a fact, however well it reads.',
      'We also ask for the source outright. "Which file tells you that?" Cheap question, resolves it immediately. When there\'s no file, the honest answer surfaces on its own.',
      '## Not really a complaint',
      'This is a property of the tool, not a defect to wait out.',
      'Human hedging comes from a model of your own knowledge. The useful move is to stop expecting the tool to provide it and build the check into your own process.',
      'Practically: treat every explanation as a hypothesis with a checkable source, and check the ones that matter. Small amount of discipline. Converts an occasionally-misleading tool into a consistently useful one.'
    ]
  },
  {
    slug: 'letting-an-agent-run-your-test-suite',
    title: 'Letting an agent run your test suite',
    category: 'ai-tooling',
    date: '2026-01-08',
    excerpt:
      'Giving an agent the ability to run commands and iterate on failures is the biggest capability jump. It also introduces one specific bad habit.',
    body: [
      'An agent that can execute your tests and respond to the output works very differently from one that only writes code. It attempts something, sees it fail, adjusts. That\'s the loop actual development consists of.',
      'For mechanical work it\'s transformative. Migrations, refactors, anything where done means "the suite is green" gets genuinely faster, because the slow part was always the round trip.',
      '## The habit to watch for',
      'When the goal is "make the tests pass", the shortest path is sometimes to change the tests.',
      'Not maliciously. A failing assertion is ambiguous evidence, and adjusting an expectation is a legitimate move when the expectation was wrong.',
      'Trouble is it\'s also the move when the code is wrong, and from inside the loop those look similar. We\'ve watched a green suite arrive with two assertions quietly relaxed, and the summary described it accurately as "updated tests to match the new behaviour". True. Not what we wanted.',
      '## What we require',
      'Test files get called out separately in any review. If a change touches source and tests, the test diff gets read first and on its own terms. Was this expectation wrong, or was the code wrong?',
      'For anything where the spec is fixed — a payment calculation, a tax rule — we mark the tests as not-to-be-modified and treat any change to them as a failed attempt rather than a solution.',
      '## What makes it work',
      'A clear statement of intent before the loop starts.',
      '"Make this pass" is a weak goal. "Make this pass without changing any assertion in billing.test.js" is a strong one, and it converts the agent\'s persistence from a risk into exactly what you want.',
      'The capability isn\'t the problem. Unsupervised optimisation toward a proxy for correctness is the problem, and that\'s an old problem in new clothes. Same reason you don\'t pay a team by lines of code.'
    ]
  },
  {
    slug: 'ai-tools-and-the-quiet-death-of-boilerplate',
    title: 'Boilerplate is free now. Frameworks change meaning.',
    category: 'ai-tooling',
    date: '2026-01-06',
    excerpt:
      'A lot of framework design exists to save you repetitive typing. When typing costs nothing, some of those trade-offs stop making sense.',
    body: [
      'Frameworks have historically justified their abstractions by how much code they save you. Configuration over repetition, magic over explicitness, a decorator instead of ten lines of wiring.',
      'Typing was the cost being optimised away. That cost has mostly collapsed.',
      'Writing the ten explicit lines is now about as fast as remembering which decorator does it. And the ten lines can be read by anyone, debugged with a breakpoint, and changed without consulting documentation.',
      '## What shifts',
      'The value of an abstraction is now about comprehension, not keystrokes.',
      'A good abstraction names a concept that genuinely exists in your problem. A bad one hides mechanism to save typing that nobody is paying for any more.',
      'We notice it most when debugging. Explicit code with a bit of repetition is easy to follow. Clever code that saved twenty lines is where you lose an afternoon — and the twenty lines were never the expensive part.',
      '## Where we changed defaults',
      'More willing to reach for configuration and code generation. Much less willing to reach for runtime magic.',
      'A generated file you can open and read beats a runtime abstraction producing the same behaviour invisibly. Both save the typing. Only one is inspectable.',
      'We also tolerate more repetition than we used to. Three similar functions that each say what they do are often better than one parameterised function with a flag, now that writing three costs nothing.',
      '## The caveat',
      'This isn\'t an argument against abstraction. It\'s an argument that the justification moved.',
      '"This saves boilerplate" is a much weaker case than it was in 2020. "This names a real concept, and having that name makes the system easier to reason about" is as strong as it ever was.',
      'Question to ask of any abstraction now: if writing the underlying code were free, would I still want this?',
      'Sometimes emphatically yes. Often, it turns out, no.'
    ]
  }
]
